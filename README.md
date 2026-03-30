# Tonka 汽車周邊

專業汽車配件 · 一站式服務中心

## 項目簡介

Tonka 是一個基於 Vue 3 + Vite 構建的汽車周邊電商網站，參考了 https://spacet-lab.com/ 的設計風格。

## 技術棧

- **前端**: Vue 3 + Vite
- **後端**: Node.js + Express + SQLite (可選)
- **樣式**: 原生 CSS
- **部署**: Nginx

## 項目結構

```
tonka/
├── frontend/          # 前端代碼
│   ├── public/        # 靜態資源
│   │   └── images/    # 圖片資源
│   ├── src/
│   │   ├── App.vue    # 主頁面組件
│   │   ├── main.js    # 入口文件
│   │   └── style.css  # 樣式文件
│   └── package.json
├── backend/           # 後端代碼 (可選)
│   ├── index.js       # 後端服務器
│   ├── seed.js        # 數據庫初始化
│   └── package.json
└── README.md          # 項目說明
```

## 功能特性

- ✅ 響應式首頁設計
- ✅ 輪播圖（淡入淡出效果）
- ✅ 服務展示區域
- ✅ 產品展示區域
- ✅ 關於我們區域
- ✅ 頁尾信息

## 本地開發

### 前端開發

```bash
cd tonka/frontend
npm install
npm run dev
```

訪問地址：http://localhost:5173/

### 後端開發 (可選)

```bash
cd tonka/backend
npm install
node seed.js          # 初始化數據庫
npm start             # 啟動後端服務
```

後端訪問地址：http://localhost:3000/

## 部署指南

### 1. 構建前端

```bash
cd tonka/frontend
npm run build
```

構建產物將生成在 `dist/` 目錄。

### 2. 準備部署腳本

確保已創建 `deploy-tonka.sh` 部署腳本（位於項目根目錄）。

### 3. 部署到服務器

使用 SSH 連接到服務器並執行部署：

```bash
# 上傳部署腳本
scp deploy-tonka.sh root@your-server:/root/

# 遠程執行部署
ssh root@your-server "chmod +x /root/deploy-tonka.sh && /root/deploy-tonka.sh"
```

或者使用 `sshpass` 自動化部署（需要安裝 sshpass）：

```bash
sshpass -p 'your-password' scp deploy-tonka.sh root@your-server:/root/
sshpass -p 'your-password' ssh root@your-server "chmod +x /root/deploy-tonka.sh && /root/deploy-tonka.sh"
```

### 4. 服務器配置

確保服務器已安裝：
- Node.js 20+ (推薦使用 nvm)
- Nginx
- Git

Nginx 配置參考：
```nginx
server {
    listen 5173;
    listen [::]:5173;
    server_name _;
    root /usr/share/nginx/html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 訪問地址

- **本地開發**: http://localhost:5173/
- **局域網訪問**: http://局域网IP:5173/
- **測試服務器**: http://互联网IP:5173/

## 更新部署

當代碼更新後：

1. **提交代碼到 GitHub**
2. **推送指令後，自動同步到測試服務器**

## 注意事項

- 未經用戶指令，請勿隨意推送代碼到 GitHub 或更新測試服務器
- 每次更新前請先確認用戶需求
- 生產環境部署前請充分測試

## 開發者

Tonka 項目團隊

## 許可證

MIT License
