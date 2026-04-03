const express = require('express')
const Database = require('better-sqlite3')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')

const app = express()
const PORT = process.env.PORT || 8080
const JWT_SECRET = 'tonka-secret-key-2024'

// 中间件
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))
app.use('/images', express.static(path.join(__dirname, '../frontend/public/images')))

// 确保上传目录存在
const uploadDir = path.join(__dirname, '../uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// 文件上传配置
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

// 初始化数据库
const dbPath = path.join(__dirname, 'tonka.db')
const db = new Database(dbPath)
console.log('✅ SQLite 数据库连接成功！')

// 初始化数据库表
function initDatabase() {
  // 系统配置表
  db.exec(`CREATE TABLE IF NOT EXISTS sys_config (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    config_key TEXT UNIQUE,
    config_value TEXT,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

  // 管理员表
  db.exec(`CREATE TABLE IF NOT EXISTS sys_admin (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    nickname TEXT,
    avatar TEXT,
    status INTEGER DEFAULT 1,
    last_login_at DATETIME,
    last_login_ip TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

  // 注册用户表
  db.exec(`CREATE TABLE IF NOT EXISTS web_user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    nickname TEXT,
    phone TEXT,
    email TEXT,
    avatar TEXT,
    status INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

  // 轮播图表
  db.exec(`CREATE TABLE IF NOT EXISTS banner (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_url TEXT,
    title TEXT,
    subtitle TEXT,
    button_text TEXT,
    link TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

  // 汽车服务表
  db.exec(`CREATE TABLE IF NOT EXISTS car_service (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

  // 汽车服务热点按钮表
  db.exec(`CREATE TABLE IF NOT EXISTS car_service_point (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    car_service_id INTEGER,
    position TEXT,
    title TEXT,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

  // 专业服务表
  db.exec(`CREATE TABLE IF NOT EXISTS professional_service (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_url TEXT,
    title TEXT,
    button_text TEXT,
    link TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

  // 专业配件表
  db.exec(`CREATE TABLE IF NOT EXISTS professional_accessory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_url TEXT,
    title TEXT,
    button_text TEXT,
    link TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

  // 热门产品表
  db.exec(`CREATE TABLE IF NOT EXISTS hot_product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_url TEXT,
    title TEXT,
    price TEXT,
    button_text TEXT,
    link TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

  // 插入默认管理员（如果不存在）
  const adminExists = db.prepare('SELECT id FROM sys_admin WHERE username = ?').get('admin')
  if (!adminExists) {
    const hashedPassword = bcrypt.hashSync('admin123', 10)
    db.prepare('INSERT INTO sys_admin (username, password, nickname, status) VALUES (?, ?, ?, ?)').run(
      'admin', hashedPassword, '管理员', 1
    )
    console.log('✅ 默认管理员已创建 (admin/admin123)')
  }
}

initDatabase()

// ==================== 认证相关 API ====================

// 普通用户注册
app.post('/api/user/register', (req, res) => {
  const { username, password, name, age, gender, email, phone } = req.body

  if (!username || !password) {
    return res.json({ code: 500, message: '用户名和密码不能为空' })
  }

  // 检查用户名是否已存在
  const exists = db.prepare('SELECT id FROM user WHERE username = ?').get(username)
  if (exists) {
    return res.json({ code: 500, message: '用户名已存在' })
  }

  // 创建用户
  const hashedPassword = bcrypt.hashSync(password, 10)
  const result = db.prepare(
    'INSERT INTO user (username, password, name, age, gender, email, phone, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  ).run(
    username, hashedPassword, name || '', age || null, gender || '', email || '', phone || '', 1
  )

  res.json({ code: 200, message: '注册成功' })
})

// 普通用户登录
app.post('/api/user/login', (req, res) => {
  const { username, password } = req.body

  const user = db.prepare('SELECT * FROM user WHERE username = ?').get(username)
  if (!user) {
    return res.json({ code: 500, message: '用户名或密码错误' })
  }

  if (user.status !== 1) {
    return res.json({ code: 500, message: '账号已禁用' })
  }

  const passwordMatch = bcrypt.compareSync(password, user.password)
  if (!passwordMatch) {
    return res.json({ code: 500, message: '用户名或密码错误' })
  }

  const token = jwt.sign({ id: user.id, username: user.username, type: 'user' }, JWT_SECRET, { expiresIn: '72h' })

  db.prepare('UPDATE user SET updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(user.id)

  res.json({
    code: 200,
    message: '登录成功',
    data: {
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        type: 'user'
      }
    }
  })
})

// 登录（管理员）
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body

  const admin = db.prepare('SELECT * FROM sys_admin WHERE username = ?').get(username)
  if (!admin) {
    return res.json({ code: 500, message: '用户名或密码错误' })
  }

  if (admin.status !== 1) {
    return res.json({ code: 500, message: '账号已禁用' })
  }

  const passwordMatch = bcrypt.compareSync(password, admin.password)
  if (!passwordMatch) {
    return res.json({ code: 500, message: '用户名或密码错误' })
  }

  const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '72h' })

  db.prepare('UPDATE sys_admin SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?').run(admin.id)

  res.json({
    code: 200,
    message: '登录成功',
    data: {
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        nickname: admin.nickname
      }
    }
  })
})

// 获取管理员信息
app.get('/api/auth/info', (req, res) => {
  const token = req.headers.authorization
  if (!token) {
    return res.json({ code: 500, message: '未登录' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    const admin = db.prepare('SELECT id, username, nickname FROM sys_admin WHERE id = ?').get(decoded.id)
    if (!admin) {
      return res.json({ code: 500, message: '用户不存在' })
    }
    res.json({ code: 200, data: admin })
  } catch (e) {
    res.json({ code: 500, message: 'Token 无效' })
  }
})

// 退出登录
app.post('/api/auth/logout', (req, res) => {
  res.json({ code: 200, message: '退出成功' })
})

// ==================== 管理后台 API ====================

// ==================== 普通用户管理 API ====================

// 获取普通用户列表（管理后台用）
app.get('/api/admin/users', (req, res) => {
  const rows = db.prepare('SELECT * FROM user ORDER BY created_at DESC').all()
  res.json({ code: 200, data: rows })
})

// 获取普通用户详情
app.get('/api/admin/users/:id', (req, res) => {
  const { id } = req.params
  const row = db.prepare('SELECT * FROM user WHERE id = ?').get(id)
  if (!row) {
    return res.json({ code: 500, message: '用户不存在' })
  }
  res.json({ code: 200, data: row })
})

// 添加普通用户
app.post('/api/admin/users', (req, res) => {
  const { username, password, name, age, gender, email, phone, status } = req.body
  if (!username || !password) {
    return res.json({ code: 500, message: '用户名和密码不能为空' })
  }
  // 检查用户名是否已存在
  const exists = db.prepare('SELECT id FROM user WHERE username = ?').get(username)
  if (exists) {
    return res.json({ code: 500, message: '用户名已存在' })
  }
  const hashedPassword = bcrypt.hashSync(password, 10)
  const result = db.prepare(
    'INSERT INTO user (username, password, name, age, gender, email, phone, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  ).run(
    username, hashedPassword, name || '', age || null, gender || '', email || '', phone || '', status !== undefined ? status : 1
  )
  res.json({ code: 200, message: '添加成功', data: { id: result.lastInsertRowid } })
})

// 更新普通用户
app.put('/api/admin/users/:id', (req, res) => {
  const { id } = req.params
  const { username, name, age, gender, email, phone, status } = req.body
  // 如果提供了密码，也更新密码
  if (req.body.password) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    db.prepare(
      'UPDATE user SET username = ?, password = ?, name = ?, age = ?, gender = ?, email = ?, phone = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    ).run(username, hashedPassword, name || '', age || null, gender || '', email || '', phone || '', status !== undefined ? status : 1, id)
  } else {
    db.prepare(
      'UPDATE user SET username = ?, name = ?, age = ?, gender = ?, email = ?, phone = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    ).run(username, name || '', age || null, gender || '', email || '', phone || '', status !== undefined ? status : 1, id)
  }
  res.json({ code: 200, message: '更新成功' })
})

// 删除普通用户
app.delete('/api/admin/users/:id', (req, res) => {
  const { id } = req.params
  db.prepare('DELETE FROM user WHERE id = ?').run(id)
  res.json({ code: 200, message: '删除成功' })
})

// ==================== 产品管理 API ====================

// 获取产品列表（所有产品）
app.get('/api/admin/products', (req, res) => {
  const rows = db.prepare('SELECT * FROM product ORDER BY sort_order').all()
  res.json({ code: 200, data: rows })
})

// 获取产品详情
app.get('/api/admin/products/:id', (req, res) => {
  const { id } = req.params
  const row = db.prepare('SELECT * FROM product WHERE id = ?').get(id)
  if (!row) {
    return res.json({ code: 500, message: '产品不存在' })
  }
  res.json({ code: 200, data: row })
})

// 添加产品
app.post('/api/admin/products', (req, res) => {
  const { image_url, name, description, price, original_price, button_text, link, sort_order, is_hot, is_active } = req.body
  const result = db.prepare(
    'INSERT INTO product (image_url, name, description, price, original_price, button_text, link, sort_order, is_hot, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  ).run(
    image_url, name || '', description || '', price || 0, original_price || null, button_text || '加入购物车', link || '#', sort_order || 0, is_hot !== undefined ? is_hot : 0, is_active !== undefined ? is_active : 1
  )
  // 如果是热门产品，同时插入到hot_product表（保持兼容）
  if (is_hot) {
    db.prepare(
      'INSERT INTO hot_product (id, image_url, name, price, button_text, link, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).run(result.lastInsertRowid, image_url, name, price, button_text, link, sort_order, is_active)
  }
  res.json({ code: 200, message: '添加成功', data: { id: result.lastInsertRowid } })
})

// 更新产品
app.put('/api/admin/products/:id', (req, res) => {
  const { id } = req.params
  const { image_url, name, description, price, original_price, button_text, link, sort_order, is_hot, is_active } = req.body
  db.prepare(
    'UPDATE product SET image_url = ?, name = ?, description = ?, price = ?, original_price = ?, button_text = ?, link = ?, sort_order = ?, is_hot = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).run(
    image_url, name, description, price, original_price, button_text, link, sort_order, is_hot, is_active, id
  )
  // 同步更新hot_product表
  if (is_hot) {
    // 如果是热门产品，更新或插入到hot_product表
    const exists = db.prepare('SELECT id FROM hot_product WHERE id = ?').get(id)
    if (exists) {
      db.prepare(
        'UPDATE hot_product SET image_url = ?, name = ?, price = ?, button_text = ?, link = ?, sort_order = ?, is_active = ? WHERE id = ?'
      ).run(image_url, name, price, button_text, link, sort_order, is_active, id)
    } else {
      db.prepare(
        'INSERT INTO hot_product (id, image_url, name, price, button_text, link, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
      ).run(id, image_url, name, price, button_text, link, sort_order, is_active)
    }
  } else {
    // 如果不是热门产品，从hot_product表删除
    db.prepare('DELETE FROM hot_product WHERE id = ?').run(id)
  }
  res.json({ code: 200, message: '更新成功' })
})

// 删除产品
app.delete('/api/admin/products/:id', (req, res) => {
  const { id } = req.params
  db.prepare('DELETE FROM product WHERE id = ?').run(id)
  db.prepare('DELETE FROM hot_product WHERE id = ?').run(id)
  res.json({ code: 200, message: '删除成功' })
})

// ==================== 热门产品管理 API ====================

// 测试API
app.get('/api/admin/test', (req, res) => {
  res.json({ code: 200, message: '测试成功' })
})

// 获取热门产品列表（管理后台用）- 保持兼容
app.get('/api/admin/hot-products', (req, res) => {
  const rows = db.prepare('SELECT * FROM hot_product ORDER BY sort_order').all()
  res.json({ code: 200, data: rows })
})

// 获取热门产品详情 - 保持兼容
app.get('/api/admin/hot-products/:id', (req, res) => {
  const { id } = req.params
  const row = db.prepare('SELECT * FROM hot_product WHERE id = ?').get(id)
  if (!row) {
    return res.json({ code: 500, message: '产品不存在' })
  }
  res.json({ code: 200, data: row })
})

// 添加热门产品 - 保持兼容
app.post('/api/admin/hot-products', (req, res) => {
  const { image_url, title, price, button_text, link, sort_order, is_active } = req.body
  const result = db.prepare(
    'INSERT INTO hot_product (image_url, name, price, button_text, link, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).run(
    image_url, title || '', price || 0, button_text || '立即选购', link || '#', sort_order || 0, is_active !== undefined ? is_active : 1
  )
  res.json({ code: 200, message: '添加成功', data: { id: result.lastInsertRowid } })
})

// 更新热门产品 - 保持兼容
app.put('/api/admin/hot-products/:id', (req, res) => {
  const { id } = req.params
  const { image_url, title, price, button_text, link, sort_order, is_active } = req.body
  db.prepare(
    'UPDATE hot_product SET image_url = ?, name = ?, price = ?, button_text = ?, link = ?, sort_order = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).run(
    image_url, title, price, button_text, link, sort_order, is_active, id
  )
  res.json({ code: 200, message: '更新成功' })
})

// 删除热门产品 - 保持兼容
app.delete('/api/admin/hot-products/:id', (req, res) => {
  const { id } = req.params
  db.prepare('DELETE FROM hot_product WHERE id = ?').run(id)
  res.json({ code: 200, message: '删除成功' })
})

// ==================== 专业服务管理 API ====================

// 获取专业服务列表（管理后台用）
app.get('/api/admin/professional-services', (req, res) => {
  const rows = db.prepare('SELECT * FROM professional_service ORDER BY sort_order').all()
  res.json({ code: 200, data: rows })
})

// 获取专业服务详情
app.get('/api/admin/professional-services/:id', (req, res) => {
  const { id } = req.params
  const row = db.prepare('SELECT * FROM professional_service WHERE id = ?').get(id)
  if (!row) {
    return res.json({ code: 500, message: '专业服务不存在' })
  }
  res.json({ code: 200, data: row })
})

// 添加专业服务
app.post('/api/admin/professional-services', (req, res) => {
  const { image_url, title, button_text, link, sort_order, is_active } = req.body
  const result = db.prepare(
    'INSERT INTO professional_service (image_url, title, button_text, link, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(
    image_url, title || '', button_text || '查看详情', link || '#', sort_order || 0, is_active !== undefined ? is_active : 1
  )
  res.json({ code: 200, message: '添加成功', data: { id: result.lastInsertRowid } })
})

// 更新专业服务
app.put('/api/admin/professional-services/:id', (req, res) => {
  const { id } = req.params
  const { image_url, title, button_text, link, sort_order, is_active } = req.body
  db.prepare(
    'UPDATE professional_service SET image_url = ?, title = ?, button_text = ?, link = ?, sort_order = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).run(
    image_url, title, button_text, link, sort_order, is_active, id
  )
  res.json({ code: 200, message: '更新成功' })
})

// 删除专业服务
app.delete('/api/admin/professional-services/:id', (req, res) => {
  const { id } = req.params
  db.prepare('DELETE FROM professional_service WHERE id = ?').run(id)
  res.json({ code: 200, message: '删除成功' })
})

// ==================== 专业配件管理 API ====================

// 获取专业配件列表（管理后台用）
app.get('/api/admin/professional-accessories', (req, res) => {
  const rows = db.prepare('SELECT * FROM professional_accessory ORDER BY sort_order').all()
  res.json({ code: 200, data: rows })
})

// 获取专业配件详情
app.get('/api/admin/professional-accessories/:id', (req, res) => {
  const { id } = req.params
  const row = db.prepare('SELECT * FROM professional_accessory WHERE id = ?').get(id)
  if (!row) {
    return res.json({ code: 500, message: '专业配件不存在' })
  }
  res.json({ code: 200, data: row })
})

// 添加专业配件
app.post('/api/admin/professional-accessories', (req, res) => {
  const { image_url, title, button_text, link, sort_order, is_active } = req.body
  const result = db.prepare(
    'INSERT INTO professional_accessory (image_url, title, button_text, link, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(
    image_url, title || '', button_text || '加入购物车', link || '#', sort_order || 0, is_active !== undefined ? is_active : 1
  )
  res.json({ code: 200, message: '添加成功', data: { id: result.lastInsertRowid } })
})

// 更新专业配件
app.put('/api/admin/professional-accessories/:id', (req, res) => {
  const { id } = req.params
  const { image_url, title, button_text, link, sort_order, is_active } = req.body
  db.prepare(
    'UPDATE professional_accessory SET image_url = ?, title = ?, button_text = ?, link = ?, sort_order = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).run(
    image_url, title, button_text, link, sort_order, is_active, id
  )
  res.json({ code: 200, message: '更新成功' })
})

// 删除专业配件
app.delete('/api/admin/professional-accessories/:id', (req, res) => {
  const { id } = req.params
  db.prepare('DELETE FROM professional_accessory WHERE id = ?').run(id)
  res.json({ code: 200, message: '删除成功' })
})

// 获取系统配置（管理后台用）
app.get('/api/admin/config', (req, res) => {
  const rows = db.prepare('SELECT * FROM sys_config').all()
  const config = {}
  rows.forEach(row => {
    config[row.config_key] = row.config_value
  })
  res.json({ code: 200, data: config })
})

// 保存系统配置
app.post('/api/admin/config', (req, res) => {
  const configData = req.body

  Object.keys(configData).forEach(key => {
    const existing = db.prepare('SELECT id FROM sys_config WHERE config_key = ?').get(key)
    if (existing) {
      db.prepare('UPDATE sys_config SET config_value = ?, updated_at = CURRENT_TIMESTAMP WHERE config_key = ?').run(
        configData[key], key
      )
    } else {
      db.prepare('INSERT INTO sys_config (config_key, config_value) VALUES (?, ?)').run(
        key, configData[key]
      )
    }
  })

  res.json({ code: 200, message: '保存成功' })
})

// ==================== 轮播图管理 API ====================

// 获取轮播图列表（管理后台用）
app.get('/api/admin/banners', (req, res) => {
  const rows = db.prepare('SELECT * FROM banner ORDER BY sort_order').all()
  res.json({ code: 200, data: rows })
})

// 添加轮播图
app.post('/api/admin/banners', (req, res) => {
  const { image_url, title, subtitle, button_text, link, sort_order, is_active } = req.body
  const result = db.prepare(
    'INSERT INTO banner (image_url, title, subtitle, button_text, link, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).run(
    image_url, title || '', subtitle || '', button_text || '', link || '#', sort_order || 0, is_active !== undefined ? is_active : 1
  )
  res.json({ code: 200, message: '添加成功', data: { id: result.lastInsertRowid } })
})

// 更新轮播图
app.put('/api/admin/banners/:id', (req, res) => {
  const { id } = req.params
  const { image_url, title, subtitle, button_text, link, sort_order, is_active } = req.body
  db.prepare(
    'UPDATE banner SET image_url = ?, title = ?, subtitle = ?, button_text = ?, link = ?, sort_order = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).run(
    image_url, title, subtitle, button_text, link, sort_order, is_active, id
  )
  res.json({ code: 200, message: '更新成功' })
})

// 删除轮播图
app.delete('/api/admin/banners/:id', (req, res) => {
  const { id } = req.params
  db.prepare('DELETE FROM banner WHERE id = ?').run(id)
  res.json({ code: 200, message: '删除成功' })
})

// ==================== 公开 API ====================

// 获取系统配置（公开用）
app.get('/api/public/config', (req, res) => {
  const rows = db.prepare('SELECT * FROM sys_config').all()
  const config = {}
  rows.forEach(row => {
    config[row.config_key] = row.config_value
  })
  res.json({ code: 200, data: config })
})

// 获取轮播图列表
app.get('/api/public/banners', (req, res) => {
  const rows = db.prepare('SELECT * FROM banner WHERE is_active = 1 ORDER BY sort_order').all()
  res.json({ code: 200, data: rows })
})

// 获取汽车服务
app.get('/api/public/car-service', (req, res) => {
  const row = db.prepare('SELECT * FROM car_service WHERE id = 1').get()
  res.json({ code: 200, data: row })
})

// 获取汽车服务热点按钮
app.get('/api/public/car-service/points', (req, res) => {
  const rows = db.prepare('SELECT * FROM car_service_point ORDER BY sort_order').all()
  res.json({ code: 200, data: rows })
})

// 获取专业服务
app.get('/api/public/professional-services', (req, res) => {
  const rows = db.prepare('SELECT * FROM professional_service WHERE is_active = 1 ORDER BY sort_order').all()
  res.json({ code: 200, data: rows })
})

// 获取专业配件
app.get('/api/public/professional-accessories', (req, res) => {
  const rows = db.prepare('SELECT * FROM professional_accessory WHERE is_active = 1 ORDER BY sort_order').all()
  res.json({ code: 200, data: rows })
})

// 获取热门产品
app.get('/api/public/hot-products', (req, res) => {
  const rows = db.prepare('SELECT * FROM hot_product WHERE is_active = 1 ORDER BY sort_order').all()
  res.json({ code: 200, data: rows })
})

// ==================== 文件上传 ====================

// 上传图片
app.post('/api/file/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.json({ code: 500, message: '请选择文件' })
  }
  const fileUrl = '/uploads/' + req.file.filename
  res.json({
    code: 200,
    message: '上传成功',
    data: {
      url: fileUrl,
      filename: req.file.filename
    }
  })
})

// ==================== 启动服务 ====================

// 获取本机IP地址
const os = require('os')
const getLocalIP = () => {
  const interfaces = os.networkInterfaces()
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address
      }
    }
  }
  return 'localhost'
}

const localIP = getLocalIP()

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  ========================================
  🚀 Tonka 后端启动成功！
  📍 本地访问: http://localhost:${PORT}
  🌐 局域网访问: http://${localIP}:${PORT}
  💾 数据库: SQLite (tonka.db)
  ========================================
  `)
})
