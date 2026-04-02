# 产品管理开发计划

## 📊 当前状态检查：

✅ **已有**：
- `hot_product` 表（数据库）
- 公开API：`/api/public/hot-products`
- 管理后台页面占位：`HotProduct.vue`
- 前端热门产品区域

❌ **缺少**：
- 后端管理API（CRUD）
- 管理后台产品管理完整功能
- 前端对接产品API

---

## 🎯 详细开发步骤（共6步）

### **第1步：后端 - 添加产品管理API**
在 `backend/index.js` 中添加：
- `GET /api/admin/hot-products` - 获取产品列表
- `GET /api/admin/hot-products/:id` - 获取产品详情
- `POST /api/admin/hot-products` - 新增产品
- `PUT /api/admin/hot-products/:id` - 修改产品
- `DELETE /api/admin/hot-products/:id` - 删除产品

### **第2步：管理后台 - 开发产品列表页面**
完善 `admin/src/views/page/HotProduct.vue`：
- 产品列表展示（表格）
- 搜索和筛选功能
- 新增产品按钮
- 编辑和删除操作

### **第3步：管理后台 - 开发产品表单**
在产品管理页面添加：
- 新增/编辑弹窗
- 表单字段（图片、标题、价格、按钮文字、链接、排序、是否启用）
- 图片上传功能
- 表单验证

### **第4步：后端 - 添加默认产品数据（可选）**
创建脚本插入默认产品数据，方便测试

### **第5步：前端 - 对接产品API**
修改 `frontend/src/App.vue`：
- 添加 `fetchHotProducts()` 函数
- 从API获取产品数据替换硬编码
- 测试显示效果

### **第6步：测试和部署**
- 本地测试完整流程
- 推送到GitHub
- 更新服务器

---

创建时间：2026-04-02
