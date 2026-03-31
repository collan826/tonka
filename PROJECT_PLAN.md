# Tonka 项目完整方案（基于若依）

## 一、项目整体架构

```
tonka/
├── backend/                    # 后端（基于 RuoYi-Vue）
│   ├── ruoyi-admin/           # 后台管理模块 + 业务API
│   ├── ruoyi-framework/       # 框架核心
│   ├── ruoyi-system/          # 系统模块
│   ├── ruoyi-common/          # 通用模块
│   ├── ruoyi-generator/       # 代码生成器
│   └── sql/                   # 数据库脚本
│       ├── ruoyi.sql          # 若依系统表
│       └── tonka.sql          # 业务表
├── admin-ui/                   # 管理后台前端（RuoYi-Vue）
│   └── (Vue 3 + Element Plus)
├── frontend/                   # 商城展示前端（现有）
│   └── (Vue 3 + Vite)
└── README.md
```

---

## 二、技术栈详细清单

| 层级 | 技术选型 | 版本 |
|------|---------|------|
| **后端框架** | Spring Boot | 2.7.x（若依稳定版） |
| **ORM** | MyBatis Plus | 3.5.x |
| **数据库** | MySQL | 8.0 |
| **缓存** | Redis | 6.x+ |
| **权限** | Spring Security + JWT | - |
| **管理前端** | Vue 3 + Element Plus | - |
| **商城前端** | Vue 3 + Vite + Tailwind | - |
| **Web服务器** | Nginx | - |

---

## 三、数据库设计

### 3.1 业务表 SQL（tonka.sql）

```sql
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
```

---

## 四、后端 API 设计

### 4.1 公开接口（商城前端用）

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/banners` | GET | 获取启用的轮播图列表 |
| `/api/products` | GET | 获取产品列表（支持分类、热门筛选） |
| `/api/products/:id` | GET | 获取产品详情 |
| `/api/categories` | GET | 获取启用的分类列表 |
| `/api/services` | GET | 获取启用的服务按钮列表 |
| `/api/config` | GET | 获取网站配置 |

### 4.2 管理接口（管理后台用）

| 接口 | 方法 | 说明 |
|------|------|------|
| `/business/banner/list` | GET | 轮播图列表（分页） |
| `/business/banner/:id` | GET | 轮播图详情 |
| `/business/banner` | POST | 新增轮播图 |
| `/business/banner` | PUT | 修改轮播图 |
| `/business/banner/:id` | DELETE | 删除轮播图 |
| `/business/product/*` | * | 产品CRUD（同上） |
| `/business/category/*` | * | 分类CRUD（同上） |
| `/business/service/*` | * | 服务按钮CRUD（同上） |
| `/business/config/*` | * | 网站配置CRUD（同上） |

---

## 五、目录结构详细说明

```
tonka/
├── backend/
│   ├── pom.xml                                    # 父pom
│   ├── ruoyi-admin/
│   │   ├── src/main/java/com/tonka/
│   │   │   ├── TonkaApplication.java              # 启动类
│   │   │   ├── controller/
│   │   │   │   ├── business/                      # 业务控制器
│   │   │   │   │   ├── BannerController.java
│   │   │   │   │   ├── ProductController.java
│   │   │   │   │   ├── CategoryController.java
│   │   │   │   │   ├── ServiceButtonController.java
│   │   │   │   │   └── SiteConfigController.java
│   │   │   │   └── api/                           # 公开API控制器
│   │   │   │       ├── ApiBannerController.java
│   │   │   │       ├── ApiProductController.java
│   │   │   │       └── ...
│   │   │   ├── entity/                             # 实体类
│   │   │   │   ├── Banner.java
│   │   │   │   ├── Product.java
│   │   │   │   ├── Category.java
│   │   │   │   ├── ServiceButton.java
│   │   │   │   └── SiteConfig.java
│   │   │   ├── mapper/
│   │   │   │   ├── BannerMapper.java
│   │   │   │   ├── ProductMapper.java
│   │   │   │   └── ...
│   │   │   ├── service/
│   │   │   │   ├── IBannerService.java
│   │   │   │   ├── impl/BannerServiceImpl.java
│   │   │   │   └── ...
│   │   │   └── domain/vo/                          # 视图对象
│   │   └── src/main/resources/
│   │       ├── application.yml
│   │       ├── application-druid.yml
│   │       └── mapper/
│   ├── ruoyi-framework/
│   ├── ruoyi-system/
│   ├── ruoyi-common/
│   ├── ruoyi-generator/
│   └── sql/
│       ├── ruoyi.sql
│       └── tonka.sql
├── admin-ui/                                        # 管理后台前端
│   ├── src/
│   │   ├── api/
│   │   │   └── business/
│   │   │       ├── banner.js
│   │   │       ├── product.js
│   │   │       └── ...
│   │   ├── views/
│   │   │   └── business/
│   │   │       ├── banner/
│   │   │       │   └── index.vue
│   │   │       ├── product/
│   │   │       │   └── index.vue
│   │   │       └── ...
│   │   └── ...
│   └── ...
├── frontend/                                        # 商城前端（现有）
│   ├── src/
│   │   ├── api/
│   │   │   └── index.js                            # 对接后端API
│   │   ├── App.vue                                 # 修改为从API获取数据
│   │   └── ...
│   └── ...
└── README.md
```

---

## 六、实施步骤（按天计划）

### 第1天：环境准备
- [ ] 下载 RuoYi-Vue 代码
- [ ] 安装 MySQL 8.0 和 Redis
- [ ] 创建数据库 `ry-vue` 和 `tonka`
- [ ] 导入若依系统表和 tonka 业务表
- [ ] 配置数据库连接和 Redis 连接
- [ ] 启动若依后端，验证能登录

### 第2天：业务模块开发
- [ ] 使用代码生成器生成 Banner、Product、Category、ServiceButton、SiteConfig 的代码
- [ ] 调整生成的代码，添加业务逻辑
- [ ] 创建公开 API 控制器（`/api/*`）
- [ ] 配置图片上传功能
- [ ] 测试管理后台的 CRUD 功能

### 第3天：商城前端对接
- [ ] 创建 API 服务文件（`frontend/src/api/index.js`）
- [ ] 修改 App.vue，从后端获取数据替换硬编码
- [ ] 测试轮播图、产品列表是否正常显示
- [ ] 配置跨域（开发环境）
- [ ] 整体联调测试

### 第4天：完善和部署
- [ ] 配置管理后台菜单
- [ ] 配置角色权限
- [ ] 初始化测试数据
- [ ] 编写部署文档
- [ ] 部署到测试服务器

---

## 七、部署配置（Nginx）

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 商城前端
    location / {
        root /var/www/tonka/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # 管理后台前端
    location /admin/ {
        alias /var/www/tonka/admin-ui/dist/;
        try_files $uri $uri/ /admin/index.html;
    }

    # 后端 API
    location /prod-api/ {
        proxy_pass http://localhost:8080/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # 上传的图片
    location /uploads/ {
        alias /var/www/tonka/uploads/;
    }
}
```

---

## 八、项目初始化数据建议

```sql
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
```

---

## 方案总结

这个方案的优势：
1. **快速开发**：若依代码生成器让 CRUD 几分钟搞定
2. **功能完善**：用户、角色、权限、日志都有了
3. **易于维护**：标准框架，文档齐全
4. **扩展性强**：以后加功能方便
5. **前后端分离**：管理后台和商城前端独立部署

---

创建时间：2026-03-31
