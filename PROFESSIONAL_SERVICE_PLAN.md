# 专业服务管理开发方案

## 📊 当前状态检查：

✅ 已有：
- `professional_service` 数据库表
- 前端硬编码的 `teslaServices` 数据
- 管理后台占位页面 `ProfessionalService.vue`
- 公开API已存在！

❌ 缺少：
- 管理后台CRUD API
- 管理后台完整功能页面
- 前端从API获取数据（现在还是硬编码）

---

## 🎯 开发步骤：

### **第1步：后端 - 添加专业服务管理API**
在 `backend/index.js` 中添加：
- `GET /api/admin/professional-services` - 获取服务列表
- `GET /api/admin/professional-services/:id` - 获取服务详情
- `POST /api/admin/professional-services` - 新增服务
- `PUT /api/admin/professional-services/:id` - 修改服务
- `DELETE /api/admin/professional-services/:id` - 删除服务

### **第2步：管理后台 - 完善专业服务管理页面**
完善 `admin/src/views/page/ProfessionalService.vue`：
- 服务列表展示（表格）
- 新增/编辑弹窗
- 图片上传功能
- 字段：图片、标题、按钮文字、链接、排序、是否启用

### **第3步：前端 - 对接专业服务API**
修改 `frontend/src/App.vue`：
- 删除硬编码的 `teslaServices` 数据
- 添加 `fetchProfessionalServices()` 函数
- 在 `onMounted()` 里调用
- 从API动态获取专业服务数据

---

## 💡 同样的流程也适用于：
- **专业配件管理**（`professional_accessory` 表）
- 步骤完全一样！

---

创建时间：2026-04-02
