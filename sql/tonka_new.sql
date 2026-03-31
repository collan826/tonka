-- =============================================
-- Tonka 新业务表
-- =============================================

-- 1. 系统设置表
CREATE TABLE sys_config (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    config_key VARCHAR(100) UNIQUE NOT NULL COMMENT '配置键',
    config_value TEXT COMMENT '配置值',
    description VARCHAR(500) COMMENT '说明',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统设置表';

-- 预置配置
INSERT INTO sys_config (config_key, config_value, description) VALUES
('company_name', 'Tonka 汽車周邊', '公司名称'),
('contact_phone', '400-888-8888', '联系电话'),
('contact_email', 'info@tonka.com', '联系邮箱'),
('address', '四川省成都市', '地址'),
('business_hours', '週一至週日 9:00-21:00', '营业时间');

-- 2. 管理员表
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='管理员表';

-- 默认管理员 (密码: admin123 - BCrypt加密)
INSERT INTO sys_admin (username, password, nickname) VALUES
('admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH', '超级管理员');

-- 3. 注册用户表
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='注册用户表';

-- 4. 轮播图表
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='轮播图表';

-- 5. 汽车服务表
CREATE TABLE car_service (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    service_center_text VARCHAR(500) COMMENT '一站式服务中心文字',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='汽车服务表';

-- 初始化汽车服务
INSERT INTO car_service (service_center_text) VALUES ('一站式服務中心');

-- 6. 汽车服务热点按钮表
CREATE TABLE car_service_point (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    position VARCHAR(50) NOT NULL COMMENT '位置:roof/front/side/rear/wheel',
    name VARCHAR(100) NOT NULL COMMENT '按钮名称',
    label VARCHAR(200) COMMENT '标签文字',
    link VARCHAR(500) COMMENT '跳转链接',
    sort_order INT DEFAULT 0 COMMENT '排序',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='汽车服务热点按钮表';

-- 初始化热点按钮
INSERT INTO car_service_point (position, name, label, link, sort_order) VALUES
('roof', '車體防護/隔熱紙', '通勤匯嘉竭誠為您服務', '#contact', 1),
('front', '車頭改裝', '通勤匯嘉竭誠為您服務', '#contact', 2),
('side', '車身包膜', '通勤匯嘉竭誠為您服務', '#contact', 3),
('rear', '露營車宿', '通勤匯嘉竭誠為您服務', '#contact', 4),
('wheel', '輪胎服務', '通勤匯嘉竭誠為您服務', '#contact', 5);

-- 7. 专业服务表
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='专业服务表';

-- 初始化专业服务
INSERT INTO professional_service (image_url, title, button_text, link, sort_order, is_active) VALUES
('/images/煥新-Model-Y.png', 'Model Y 煥新', '查看詳情', '#contact', 1, 1),
('/images/特斯拉必備配件.webp', '車體包膜', '立即預約', '#contact', 2, 1),
('/images/特斯拉鍍膜防曬.webp', '鍍膜防曬', '立即預約', '#contact', 3, 1),
('/images/0701_新Y交車禮包2.jpg', '輪胎服務', '立即預約', '#contact', 4, 1);

-- 8. 专业配件表
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='专业配件表';

-- 初始化专业配件
INSERT INTO professional_accessory (image_url, title, button_text, link, sort_order, is_active) VALUES
('/images/官網Banner_MOBEIL0316.jpg', 'Model Y 專用腳墊', '加入購物車', '#products', 1, 1),
('/images/煥新-Model-Y.png', 'Model 3 煥新套件', '加入購物車', '#products', 2, 1),
('/images/特斯拉必備配件.webp', '特斯拉必備配件', '加入購物車', '#products', 3, 1),
('/images/特斯拉鍍膜防曬.webp', '特斯拉收納盒', '加入購物車', '#products', 4, 1);

-- 9. 热门产品表
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='热门产品表';

-- 初始化热门产品
INSERT INTO hot_product (image_url, name, price, button_text, link, sort_order, is_active) VALUES
('/images/煥新-Model-Y.png', 'Model Y 煥新套件', 2999.00, '加入購物車', '#products', 1, 1),
('/images/特斯拉必備配件.webp', '特斯拉必備配件套裝', 1299.00, '加入購物車', '#products', 2, 1),
('/images/特斯拉鍍膜防曬.webp', '高級鍍膜防曬服務', 3599.00, '立即預約', '#products', 3, 1),
('/images/0701_新Y交車禮包2.jpg', 'Model Y 交車禮包', 899.00, '加入購物車', '#products', 4, 1);
