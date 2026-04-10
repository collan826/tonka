# Tonka 订单管理系统设计

## 一、数据库表设计

### 1. 订单表 (`orders`)
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER | 主键 |
| order_no | TEXT | 订单号（唯一） |
| user_id | INTEGER | 用户ID |
| total_amount | REAL | 订单总金额 |
| status | INTEGER | 订单状态（0-待支付，1-已支付，2-已发货，3-已完成，4-已取消） |
| payment_method | TEXT | 支付方式 |
| payment_time | DATETIME | 支付时间 |
| shipping_name | TEXT | 收货人姓名 |
| shipping_phone | TEXT | 收货人电话 |
| shipping_address | TEXT | 收货地址 |
| remark | TEXT | 订单备注 |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

### 2. 订单商品表 (`order_items`)
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER | 主键 |
| order_id | INTEGER | 订单ID |
| product_id | INTEGER | 商品ID |
| product_name | TEXT | 商品名称（快照） |
| product_image | TEXT | 商品图片（快照） |
| price | REAL | 商品单价（快照） |
| quantity | INTEGER | 购买数量 |
| subtotal | REAL | 小计 |
| created_at | DATETIME | 创建时间 |

## 二、API 接口设计

### 前端API
- `POST /api/order/create` - 创建订单
- `GET /api/order/list` - 获取用户订单列表
- `GET /api/order/:id` - 获取订单详情
- `POST /api/order/:id/cancel` - 取消订单

### 管理后台API
- `GET /api/admin/orders` - 获取所有订单列表
- `GET /api/admin/order/:id` - 获取订单详情
- `PUT /api/admin/order/:id/status` - 更新订单状态
- `PUT /api/admin/order/:id/shipping` - 发货

## 三、前端页面设计

### 1. 结算页面（Checkout.vue）
- 购物车商品展示
- 收货地址填写
- 订单金额计算
- 提交订单

### 2. 订单列表页面（OrderList.vue）
- 订单列表展示
- 订单状态筛选
- 查看订单详情
- 取消订单

### 3. 订单详情页面（OrderDetail.vue）
- 订单信息展示
- 订单商品列表
- 订单状态跟踪
- 物流信息

## 四、管理后台页面

### 1. 订单管理页面（Orders.vue）
- 订单列表
- 订单筛选（状态、时间）
- 订单详情查看
- 订单状态更新
- 发货操作
