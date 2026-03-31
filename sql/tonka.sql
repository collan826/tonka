-- =============================================
-- Tonka 业务表
-- =============================================

-- 1. 轮播图表
CREATE TABLE t_banner (
    id BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
    image_url VARCHAR(500) DEFAULT '' COMMENT '图片地址',
    title VARCHAR(200) DEFAULT '' COMMENT '标题',
    subtitle VARCHAR(500) DEFAULT '' COMMENT '副标题',
    button_text VARCHAR(100) DEFAULT '' COMMENT '按钮文字',
    link VARCHAR(500) DEFAULT '' COMMENT '跳转链接',
    sort_order INT(11) DEFAULT 0 COMMENT '排序',
    is_active TINYINT(1) DEFAULT 1 COMMENT '是否启用:0-否,1-是',
    create_by VARCHAR(64) DEFAULT '' COMMENT '创建者',
    create_time DATETIME COMMENT '创建时间',
    update_by VARCHAR(64) DEFAULT '' COMMENT '更新者',
    update_time DATETIME COMMENT '更新时间',
    remark VARCHAR(500) DEFAULT '' COMMENT '备注',
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='轮播图表';

-- 2. 产品表
CREATE TABLE t_product (
    id BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
    category_id BIGINT(20) DEFAULT NULL COMMENT '分类ID',
    name VARCHAR(200) DEFAULT '' COMMENT '产品名称',
    description TEXT COMMENT '描述',
    image_url VARCHAR(500) DEFAULT '' COMMENT '图片地址',
    price DECIMAL(10,2) DEFAULT 0.00 COMMENT '价格',
    original_price DECIMAL(10,2) DEFAULT NULL COMMENT '原价',
    button_text VARCHAR(100) DEFAULT '加入购物车' COMMENT '按钮文字',
    link VARCHAR(500) DEFAULT '' COMMENT '跳转链接',
    sort_order INT(11) DEFAULT 0 COMMENT '排序',
    is_hot TINYINT(1) DEFAULT 0 COMMENT '是否热门:0-否,1-是',
    is_active TINYINT(1) DEFAULT 1 COMMENT '是否启用:0-否,1-是',
    create_by VARCHAR(64) DEFAULT '' COMMENT '创建者',
    create_time DATETIME COMMENT '创建时间',
    update_by VARCHAR(64) DEFAULT '' COMMENT '更新者',
    update_time DATETIME COMMENT '更新时间',
    remark VARCHAR(500) DEFAULT '' COMMENT '备注',
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='产品表';

-- 3. 分类表
CREATE TABLE t_category (
    id BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
    name VARCHAR(100) DEFAULT '' COMMENT '分类名称',
    icon VARCHAR(200) DEFAULT '' COMMENT '图标',
    sort_order INT(11) DEFAULT 0 COMMENT '排序',
    is_active TINYINT(1) DEFAULT 1 COMMENT '是否启用:0-否,1-是',
    create_by VARCHAR(64) DEFAULT '' COMMENT '创建者',
    create_time DATETIME COMMENT '创建时间',
    update_by VARCHAR(64) DEFAULT '' COMMENT '更新者',
    update_time DATETIME COMMENT '更新时间',
    remark VARCHAR(500) DEFAULT '' COMMENT '备注',
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='分类表';

-- 4. 服务按钮表
CREATE TABLE t_service_button (
    id BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
    position VARCHAR(50) DEFAULT '' COMMENT '位置:roof/front/side/rear/wheel',
    name VARCHAR(100) DEFAULT '' COMMENT '按钮名称',
    label VARCHAR(200) DEFAULT '' COMMENT '标签文字',
    link VARCHAR(500) DEFAULT '' COMMENT '跳转链接',
    sort_order INT(11) DEFAULT 0 COMMENT '排序',
    is_active TINYINT(1) DEFAULT 1 COMMENT '是否启用:0-否,1-是',
    create_by VARCHAR(64) DEFAULT '' COMMENT '创建者',
    create_time DATETIME COMMENT '创建时间',
    update_by VARCHAR(64) DEFAULT '' COMMENT '更新者',
    update_time DATETIME COMMENT '更新时间',
    remark VARCHAR(500) DEFAULT '' COMMENT '备注',
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='服务按钮表';

-- 5. 网站配置表
CREATE TABLE t_site_config (
    id BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
    config_key VARCHAR(100) NOT NULL COMMENT '配置键',
    config_value TEXT COMMENT '配置值',
    description VARCHAR(500) DEFAULT '' COMMENT '说明',
    create_by VARCHAR(64) DEFAULT '' COMMENT '创建者',
    create_time DATETIME COMMENT '创建时间',
    update_by VARCHAR(64) DEFAULT '' COMMENT '更新者',
    update_time DATETIME COMMENT '更新时间',
    remark VARCHAR(500) DEFAULT '' COMMENT '备注',
    PRIMARY KEY (id),
    UNIQUE KEY uk_config_key (config_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='网站配置表';

-- 初始化网站配置
INSERT INTO t_site_config (config_key, config_value, description, create_time) VALUES
('contact_phone', '400-888-8888', '联系电话', NOW()),
('contact_email', 'info@tonka.com', '联系邮箱', NOW()),
('footer_about', '我们是一家專註於汽車周邊產品與服務的專業機構...', '页脚关于我们', NOW()),
('address', '四川省成都市', '地址', NOW()),
('business_hours', '週一至週日 9:00-21:00', '营业时间', NOW());

-- 初始化轮播图
INSERT INTO t_banner (image_url, title, subtitle, button_text, link, sort_order, is_active, create_time) VALUES
('/images/官網Banner_MOBEIL0316.jpg', 'Tonka 汽車周邊', '專業汽車配件 · 一站式服務中心', '立即選購', '#products', 1, 1, NOW()),
('/images/煥新-Model-Y.png', 'Model Y 煥新', '讓您的愛車焕然一新', '查看詳情', '#products', 2, 1, NOW()),
('/images/特斯拉必備配件.webp', '必備配件', '精選優質汽車周邊配件', '立即選購', '#products', 3, 1, NOW()),
('/images/特斯拉鍍膜防曬.webp', '鍍膜防曬', '保護您的愛車', '立即預約', '#services', 4, 1, NOW());

-- 初始化产品
INSERT INTO t_product (name, description, image_url, price, button_text, sort_order, is_hot, is_active, create_time) VALUES
('Model Y 煥新套件', NULL, '/images/煥新-Model-Y.png', 2999.00, '加入購物車', 1, 1, 1, NOW()),
('特斯拉必備配件套裝', NULL, '/images/特斯拉必備配件.webp', 1299.00, '加入購物車', 2, 1, 1, NOW()),
('高級鍍膜防曬服務', NULL, '/images/特斯拉鍍膜防曬.webp', 3599.00, '立即預約', 3, 0, 1, NOW()),
('Model Y 交車禮包', NULL, '/images/0701_新Y交車禮包2.jpg', 899.00, '加入購物車', 4, 0, 1, NOW());

-- 初始化服务按钮
INSERT INTO t_service_button (position, name, label, link, sort_order, is_active, create_time) VALUES
('roof', '車體防護/隔熱紙', '通勤匯嘉竭誠為您服務', '#contact', 1, 1, NOW()),
('front', '車頭改裝', '通勤匯嘉竭誠為您服務', '#contact', 2, 1, NOW()),
('side', '車身包膜', '通勤匯嘉竭誠為您服務', '#contact', 3, 1, NOW()),
('rear', '露營車宿', '通勤匯嘉竭誠為您服務', '#contact', 4, 1, NOW()),
('wheel', '輪胎服務', '通勤匯嘉竭誠為您服務', '#contact', 5, 1, NOW());
