# Tonka 项目

## 项目简介

Tonka 汽车周边商城管理系统，包含商城展示前端、后台管理前端和后端 API。

---

## 技术栈

### 后端
- **语言**: Node.js
- **框架**: Express
- **数据库**: SQLite
- **认证**: JWT (jsonwebtoken)
- **密码加密**: bcryptjs
- **文件上传**: multer

### 管理后台前端
- **框架**: Vue 3
- **构建工具**: Vite
- **UI 组件**: Element Plus
- **状态管理**: Pinia
- **路由**: Vue Router 4
- **HTTP 客户端**: Axios

### 商城展示前端
- **框架**: Vue 3
- **构建工具**: Vite
- **CSS 框架**: Tailwind CSS

---

## 项目结构

```
tonka/
├── backend/                    # 后端（Node.js + Express + SQLite）
├── admin/                      # 管理后台前端（Vue 3）
├── frontend/                   # 商城展示前端（Vue 3）
├── upload/                     # 文件上传目录
├── sql/                        # 数据库脚本
├── memory/                     # 开发日志
└── README.md                   # 项目说明
```

---

## 快速开始

### 后端启动

```bash
cd backend
npm install
npm start
```

后端运行在 http://localhost:8080

### 管理后台前端启动

```bash
cd admin
npm install
npm run dev
```

管理后台运行在 http://localhost:1025

### 商城展示前端启动

```bash
cd frontend
npm install
npm run dev
```

---

## 默认账号

- **用户名**: admin
- **密码**: admin123

---

## 功能说明

### 系统管理
- **系统设置**: 配置公司名称、联系电话、邮箱、地址、营业时间等
- **用户管理**: 管理网站注册用户（用户名、姓名、电话、邮箱、状态等）

### 页面管理
- **轮播管理**: 管理首页轮播图
- **汽车服务**: 管理汽车服务相关内容
- **专业服务**: 管理专业服务展示
- **专业配件**: 管理专业配件展示
- **热门产品**: 管理热门产品展示

### 产品管理
- 待开发

### 订单管理
- 待开发

---

## 开发日志

- [2026-03-31](./memory/2026-03-31.md)

---

## 许可证

MIT License
