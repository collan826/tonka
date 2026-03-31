# Tonka 项目开发进度

---

## 🌐 访问地址（最新）：

| 服务 | 本机访问 | 局域网访问 | 说明 |
|------|---------|-----------|------|
| **后端 API** | http://localhost:8080 | http://192.168.0.120:8080 | 已配置 0.0.0.0 监听 |
| **管理后台** | http://localhost:1025 | http://192.168.0.120:1025 | ✅ 启动成功！ |
| **商城前端** | (查看你的商城前端端口) | http://192.168.0.120:(你的商城前端端口) | 页脚有后台管理链接 |

**默认管理员账号：**
- 账号：`admin`
- 密码：`admin123`

---

## 进度记录

- 2026-03-31: 开始项目，创建方案文档
- 2026-03-31: 下载 RuoYi-Vue，整理项目结构
- 2026-03-31: 创建业务表 SQL (sql/tonka.sql)
- 2026-03-31: 安装 Java 17、Maven、MySQL、Redis
- 2026-03-31: 创建并配置数据库 (ry_vue, tonka)
- 2026-03-31: 导入若依系统表和业务表
- 2026-03-31: 配置数据库和文件上传路径
- 2026-03-31: Maven 编译后端成功 (BUILD SUCCESS)
- 2026-03-31: 后端启动成功！(端口 8080，局域网可访问)
- 2026-03-31: 管理后台前端启动成功！(端口 1024，局域网可访问)
- 2026-03-31: 商城前端页脚添加后台管理链接
- 2026-03-31: 决定重新设计后端和管理后台
- 2026-03-31: 备份若依 (backend-ruoyi-backup, admin-ui-ruoyi-backup)
- 2026-03-31: 调整商城前端主页（去掉社交媒体，换成用户登录区域）
- 2026-03-31: 创建新项目方案 (NEW_PLAN.md)
- 2026-03-31: 创建新数据库表 SQL (sql/tonka_new.sql)
- 2026-03-31: 创建新数据库 tonka 并导入表（9张表）
- 2026-03-31: 创建 upload 目录
- 2026-03-31: 搭建新后端项目（Spring Boot 3.2 + MyBatis Plus）
- 2026-03-31: 后端编译成功！BUILD SUCCESS
- 2026-03-31: 搭建新管理后台前端（Vue 3 + Vite + Element Plus）
- 2026-03-31: 创建登录页面、主布局、路由、Store
- 2026-03-31: 更新商城前端后台链接指向端口 1025
- 2026-03-31: 管理后台启动成功！（端口 1025）🎉

---

## 今日完成工作总结（2026-03-31）

### 1. 新项目准备
- ✅ 备份若依（`backend-ruoyi-backup`, `admin-ui-ruoyi-backup`）
- ✅ 调整前端主页（去掉 Facebook/Instagram/Line，换成用户登录区域）
- ✅ 创建新项目方案（`NEW_PLAN.md`）
- ✅ 创建新数据库表 SQL（`sql/tonka_new.sql`）
- ✅ 创建新数据库 `tonka` 并导入表（9张表）
- ✅ 创建 `upload` 目录

### 2. 新后端项目搭建
- ✅ 创建 `pom.xml`（Spring Boot 3.2 + MyBatis Plus + JWT + Hutool）
- ✅ 创建 `application.yml`（数据库、Redis、文件上传配置）
- ✅ 创建通用响应类 `Result.java`
- ✅ 创建启动类 `TonkaApplication.java`
- ✅ 创建所有实体类（9个）
- ✅ 创建所有 Mapper 接口（9个）
- ✅ 创建登录认证 Controller（`AuthController.java`）
- ✅ 创建公开 API Controller（`PublicApiController.java`）
- ✅ 创建文件上传 Controller（`FileController.java`）
- ✅ 创建静态资源配置（`WebConfig.java`）
- ✅ **编译成功！BUILD SUCCESS** 🎉

### 3. 新管理后台前端搭建
- ✅ 创建 Vite + Vue 3 项目
- ✅ 安装 Element Plus、Vue Router、Pinia、Axios
- ✅ 创建路由配置（包含所有菜单）
- ✅ 创建 Pinia Store（用户登录状态管理）
- ✅ 创建登录页面
- ✅ 创建主布局（左边菜单 + 右边内容 + 顶部导航）
- ✅ 创建 Dashboard 首页
- ✅ 创建所有管理页面占位
- ✅ 配置端口为 1025（0.0.0.0 监听）
- ✅ **启动成功！** 🎉

### 4. 商城前端调整
- ✅ 去掉 Facebook/Instagram/Line
- ✅ 换成用户登录/注册区域
- ✅ 更新后台管理链接指向端口 1025

---

## 📊 项目结构（最新）：

```
tonka/
├── backend/                    # 新后端（Spring Boot）
├── admin/                      # 新管理后台（Vue 3）
├── frontend/                   # 商城展示前端（已调整）
├── backend-ruoyi-backup/       # 若依后端备份
├── admin-ui-ruoyi-backup/      # 若依管理后台备份
├── upload/                     # 文件上传目录
├── sql/                        # 数据库脚本
│   ├── tonka.sql              # 旧业务表
│   └── tonka_new.sql          # 新业务表（9张表）
├── PROJECT_PLAN.md             # 原始方案
├── NEW_PLAN.md                 # 新方案
└── PROGRESS.md                 # 进度记录
```

---

## 📊 新数据库表（9张）：

| 表名 | 说明 |
|------|------|
| sys_config | 系统设置 |
| sys_admin | 管理员 |
| web_user | 注册用户 |
| banner | 轮播图 |
| car_service | 汽车服务 |
| car_service_point | 汽车服务热点按钮 |
| professional_service | 专业服务 |
| professional_accessory | 专业配件 |
| hot_product | 热门产品 |

---

## 🎯 下一步计划：

1. 开发管理员管理 Controller（系统设置、用户设置等）
2. 开发页面管理 Controller（轮播、汽车服务、专业服务、专业配件、热门产品）
3. 完善管理后台各个功能页面
4. 测试并启动后端
5. 对接商城前端

---

## 📋 环境信息：

- **Java**: OpenJDK 17.0.18
- **Maven**: 3.8.7
- **MySQL**: 8.0 (root/tonka123)
- **Redis**: 6.x+ (localhost:6379)
- **数据库**: tonka (新业务表)

---

创建时间：2026-03-31
