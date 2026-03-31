const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')

const app = express()
const PORT = 8080
const JWT_SECRET = 'tonka-secret-key-2024'

// 中间件
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

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
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('数据库连接失败:', err)
  } else {
    console.log('✅ SQLite 数据库连接成功！')
    initDatabase()
  }
})

// 初始化数据库表
function initDatabase() {
  // 系统配置表
  db.run(`CREATE TABLE IF NOT EXISTS sys_config (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    config_key TEXT UNIQUE,
    config_value TEXT,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

  // 管理员表
  db.run(`CREATE TABLE IF NOT EXISTS sys_admin (
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
  db.run(`CREATE TABLE IF NOT EXISTS web_user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    real_name TEXT,
    phone TEXT,
    email TEXT,
    avatar TEXT,
    status INTEGER DEFAULT 1,
    last_login_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

  // 轮播图表
  db.run(`CREATE TABLE IF NOT EXISTS banner (
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
  db.run(`CREATE TABLE IF NOT EXISTS car_service (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    service_center_text TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

  // 汽车服务热点按钮表
  db.run(`CREATE TABLE IF NOT EXISTS car_service_point (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    position TEXT,
    name TEXT,
    label TEXT,
    link TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

  // 专业服务表
  db.run(`CREATE TABLE IF NOT EXISTS professional_service (
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
  db.run(`CREATE TABLE IF NOT EXISTS professional_accessory (
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
  db.run(`CREATE TABLE IF NOT EXISTS hot_product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_url TEXT,
    name TEXT,
    price REAL,
    button_text TEXT,
    link TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

  // 初始化默认数据
  initDefaultData()
}

// 初始化默认数据
function initDefaultData() {
  // 检查是否有管理员，没有就创建默认管理员
  db.get('SELECT id FROM sys_admin WHERE username = ?', ['admin'], (err, row) => {
    if (!row) {
      const hashedPassword = bcrypt.hashSync('admin123', 10)
      db.run('INSERT INTO sys_admin (username, password, nickname) VALUES (?, ?, ?)',
        ['admin', hashedPassword, '超级管理员'])
      console.log('✅ 默认管理员创建成功！')
    }
  })

  // 检查是否有系统配置，没有就初始化
  db.all('SELECT config_key FROM sys_config', [], (err, rows) => {
    if (err) {
      console.error('查询系统配置失败:', err)
      return
    }
    if (!rows || rows.length === 0) {
      const configs = [
        ['company_name', 'Tonka 汽車周邊', '公司名称'],
        ['contact_phone', '400-888-8888', '联系电话'],
        ['contact_email', 'info@tonka.com', '联系邮箱'],
        ['address', '四川省成都市', '地址'],
        ['business_hours', '週一至週日 9:00-21:00', '营业时间']
      ]
      configs.forEach(config => {
        db.run('INSERT INTO sys_config (config_key, config_value, description) VALUES (?, ?, ?)', config)
      })
      console.log('✅ 默认系统配置创建成功！')
    }
  })
}

// ==================== 认证相关 API ====================

// 登录
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body

  db.get('SELECT * FROM sys_admin WHERE username = ?', [username], (err, admin) => {
    if (err || !admin) {
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

    db.run('UPDATE sys_admin SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?', [admin.id])

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
})

// 获取管理员信息
app.get('/api/auth/info', (req, res) => {
  const token = req.headers.authorization
  if (!token) {
    return res.json({ code: 500, message: '未登录' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    db.get('SELECT id, username, nickname FROM sys_admin WHERE id = ?', [decoded.id], (err, admin) => {
      if (err || !admin) {
        return res.json({ code: 500, message: '用户不存在' })
      }
      res.json({ code: 200, data: admin })
    })
  } catch (e) {
    res.json({ code: 500, message: 'Token 无效' })
  }
})

// 退出登录
app.post('/api/auth/logout', (req, res) => {
  res.json({ code: 200, message: '退出成功' })
})

// ==================== 管理后台 API ====================

// 获取系统配置（管理后台用）
app.get('/api/admin/config', (req, res) => {
  db.all('SELECT * FROM sys_config', [], (err, rows) => {
    if (err) {
      return res.json({ code: 500, message: '获取失败' })
    }
    const config = {}
    rows.forEach(row => {
      config[row.config_key] = row.config_value
    })
    res.json({ code: 200, data: config })
  })
})

// 保存系统配置
app.post('/api/admin/config', express.json(), (req, res) => {
  const configData = req.body
  const updates = []

  Object.keys(configData).forEach(key => {
    updates.push(new Promise((resolve, reject) => {
      db.get('SELECT id FROM sys_config WHERE config_key = ?', [key], (err, row) => {
        if (err) {
          return reject(err)
        }
        if (row) {
          db.run('UPDATE sys_config SET config_value = ?, updated_at = CURRENT_TIMESTAMP WHERE config_key = ?',
            [configData[key], key], (err) => {
              if (err) return reject(err)
              resolve()
            })
        } else {
          db.run('INSERT INTO sys_config (config_key, config_value) VALUES (?, ?)',
            [key, configData[key]], (err) => {
              if (err) return reject(err)
              resolve()
            })
        }
      })
    }))
  })

  Promise.all(updates).then(() => {
    res.json({ code: 200, message: '保存成功' })
  }).catch((err) => {
    console.error('保存配置失败:', err)
    res.json({ code: 500, message: '保存失败' })
  })
})

// ==================== 公开 API ====================

// 获取系统配置（公开用）
app.get('/api/public/config', (req, res) => {
  db.all('SELECT * FROM sys_config', [], (err, rows) => {
    if (err) {
      return res.json({ code: 500, message: '获取失败' })
    }
    const config = {}
    rows.forEach(row => {
      config[row.config_key] = row.config_value
    })
    res.json({ code: 200, data: config })
  })
})

// 获取轮播图列表
app.get('/api/public/banners', (req, res) => {
  db.all('SELECT * FROM banner WHERE is_active = 1 ORDER BY sort_order', [], (err, rows) => {
    if (err) {
      return res.json({ code: 500, message: '获取失败' })
    }
    res.json({ code: 200, data: rows })
  })
})

// 获取汽车服务
app.get('/api/public/car-service', (req, res) => {
  db.get('SELECT * FROM car_service WHERE id = 1', [], (err, row) => {
    if (err) {
      return res.json({ code: 500, message: '获取失败' })
    }
    res.json({ code: 200, data: row })
  })
})

// 获取汽车服务热点按钮
app.get('/api/public/car-service/points', (req, res) => {
  db.all('SELECT * FROM car_service_point ORDER BY sort_order', [], (err, rows) => {
    if (err) {
      return res.json({ code: 500, message: '获取失败' })
    }
    res.json({ code: 200, data: rows })
  })
})

// 获取专业服务
app.get('/api/public/professional-services', (req, res) => {
  db.all('SELECT * FROM professional_service WHERE is_active = 1 ORDER BY sort_order', [], (err, rows) => {
    if (err) {
      return res.json({ code: 500, message: '获取失败' })
    }
    res.json({ code: 200, data: rows })
  })
})

// 获取专业配件
app.get('/api/public/professional-accessories', (req, res) => {
  db.all('SELECT * FROM professional_accessory WHERE is_active = 1 ORDER BY sort_order', [], (err, rows) => {
    if (err) {
      return res.json({ code: 500, message: '获取失败' })
    }
    res.json({ code: 200, data: rows })
  })
})

// 获取热门产品
app.get('/api/public/hot-products', (req, res) => {
  db.all('SELECT * FROM hot_product WHERE is_active = 1 ORDER BY sort_order', [], (err, rows) => {
    if (err) {
      return res.json({ code: 500, message: '获取失败' })
    }
    res.json({ code: 200, data: rows })
  })
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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  ========================================
  🚀 Tonka 后端启动成功！
  📍 本地访问: http://localhost:${PORT}
  🌐 局域网访问: http://192.168.0.120:${PORT}
  💾 数据库: SQLite (tonka.db)
  ========================================
  `)
})
