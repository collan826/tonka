# Tonka 新项目方案

## 📋 项目概述

完全重做后端和后台管理，保留若依的布局风格，但用 Vue 3 重新实现。

---

## 🏗️ 技术栈

### 后端
- **语言**: Java 17
- **框架**: Spring Boot 3.x
- **ORM**: MyBatis Plus
- **数据库**: MySQL 8.0
- **缓存**: Redis
- **认证**: JWT
- **文件上传**: 本地文件系统 (upload 目录)

### 后台管理前端
- **框架**: Vue 3 + Vite
- **UI 组件**: Element Plus
- **状态管理**: Pinia
- **路由**: Vue Router 4
- **HTTP 客户端**: Axios

### 商城展示前端
- **保持现状**: Vue 3 + Vite + Tailwind

---

## 📊 数据库设计

### 1. 系统设置表 (sys_config)
```sql
CREATE TABLE sys_config (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    config_key VARCHAR(100) UNIQUE NOT NULL COMMENT '配置键',
    config_value TEXT COMMENT '配置值',
    description VARCHAR(500) COMMENT '说明',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 预置配置
INSERT INTO sys_config (config_key, config_value, description) VALUES
('company_name', 'Tonka 汽車周邊', '公司名称'),
('contact_phone', '400-888-8888', '联系电话'),
('contact_email', 'info@tonka.com', '联系邮箱'),
('address', '四川省成都市', '地址'),
('business_hours', '週一至週日 9:00-21:00', '营业时间');
```

### 2. 管理员表 (sys_admin)
```sql
CREATE TABLE sys_admin (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL COMMENT '用户名',
    password VARCHAR(255) NOT NULL COMMENT '密码',
    nickname VARCHAR(50) COMMENT '昵称',
    avatar VARCHAR(500) COMMENT '头像',
    status TINYINT DEFAULT 1 COMMENT '状态:0-禁用,1-启用',
    last_login_at DATETIME COMMENT '最后登录时间',
    last_login_ip VARCHAR(50) COMMENT '最后登录IP',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 默认管理员 (密码: admin123)
INSERT INTO sys_admin (username, password, nickname) VALUES
('admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH', '超级管理员');
```

### 3. 注册用户表 (web_user)
```sql
CREATE TABLE web_user (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL COMMENT '用户名',
    password VARCHAR(255) NOT NULL COMMENT '密码',
    real_name VARCHAR(50) COMMENT '真实姓名',
    phone VARCHAR(20) COMMENT '电话',
    email VARCHAR(100) COMMENT '邮箱',
    avatar VARCHAR(500) COMMENT '头像',
    status TINYINT DEFAULT 1 COMMENT '状态:0-禁用,1-启用',
    last_login_at DATETIME COMMENT '最后登录时间',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 4. 轮播图表 (banner)
```sql
CREATE TABLE banner (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    image_url VARCHAR(500) NOT NULL COMMENT '图片地址',
    title VARCHAR(200) COMMENT '标题',
    subtitle VARCHAR(500) COMMENT '副标题',
    button_text VARCHAR(100) COMMENT '按钮文字',
    link VARCHAR(500) COMMENT '跳转链接',
    sort_order INT DEFAULT 0 COMMENT '排序',
    is_active TINYINT DEFAULT 1 COMMENT '是否启用:0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 5. 汽车服务表 (car_service)
```sql
CREATE TABLE car_service (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    service_center_text VARCHAR(500) COMMENT '一站式服务中心文字',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 汽车服务热点按钮
CREATE TABLE car_service_point (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    position VARCHAR(50) NOT NULL COMMENT '位置:roof/front/side/rear/wheel',
    name VARCHAR(100) NOT NULL COMMENT '按钮名称',
    label VARCHAR(200) COMMENT '标签文字',
    link VARCHAR(500) COMMENT '跳转链接',
    sort_order INT DEFAULT 0 COMMENT '排序',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 6. 专业服务表 (professional_service)
```sql
CREATE TABLE professional_service (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    image_url VARCHAR(500) NOT NULL COMMENT '图片地址',
    title VARCHAR(200) NOT NULL COMMENT '标题',
    button_text VARCHAR(100) COMMENT '按钮文字',
    link VARCHAR(500) COMMENT '跳转链接',
    sort_order INT DEFAULT 0 COMMENT '排序',
    is_active TINYINT DEFAULT 1 COMMENT '是否启用:0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 7. 专业配件表 (professional_accessory)
```sql
CREATE TABLE professional_accessory (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    image_url VARCHAR(500) NOT NULL COMMENT '图片地址',
    title VARCHAR(200) NOT NULL COMMENT '标题',
    button_text VARCHAR(100) COMMENT '按钮文字',
    link VARCHAR(500) COMMENT '跳转链接',
    sort_order INT DEFAULT 0 COMMENT '排序',
    is_active TINYINT DEFAULT 1 COMMENT '是否启用:0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 8. 热门产品表 (hot_product)
```sql
CREATE TABLE hot_product (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    image_url VARCHAR(500) NOT NULL COMMENT '图片地址',
    name VARCHAR(200) NOT NULL COMMENT '产品名称',
    price DECIMAL(10,2) NOT NULL COMMENT '价格',
    button_text VARCHAR(100) DEFAULT '加入购物车' COMMENT '按钮文字',
    link VARCHAR(500) COMMENT '跳转链接',
    sort_order INT DEFAULT 0 COMMENT '排序',
    is_active TINYINT DEFAULT 1 COMMENT '是否启用:0-否,1-是',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## 🍱 后台管理菜单结构

```
├── 系统管理
│   ├── 系统设置
│   └── 用户设置
├── 页面管理
│   ├── 轮播管理
│   ├── 汽车服务
│   ├── 专业服务
│   ├── 专业配件
│   └── 热门产品
├── 产品管理 (待定)
└── 订单管理 (待定)
```

---

## 📁 项目结构

```
tonka/
├── backend/              # 后端 (Spring Boot)
├── admin/               # 后台管理前端 (Vue 3 + Element Plus)
├── frontend/            # 商城展示前端 (现有)
├── upload/              # 文件上传目录
├── sql/                 # 数据库脚本
└── docs/                # 文档
```

---

## 🎯 下一步计划

1. 创建数据库表
2. 搭建后端项目框架
3. 搭建后台管理前端项目
4. 实现系统设置功能
5. 实现页面管理功能
6. 实现图片上传功能
7. 开发公开 API 接口
8. 对接商城前端

---

创建时间: 2026-03-31
