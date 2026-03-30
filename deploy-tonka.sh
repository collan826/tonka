#!/bin/bash
# Tonka 项目部署脚本
# 使用方法：./deploy-tonka.sh [服务器IP]
# 示例：./deploy-tonka.sh 互联网IP

SERVER_IP=${1:-your-server-ip}

echo "🚀 开始部署 Tonka..."

# 1. 删除之前的项目
echo "🗑️ 删除之前的项目..."
rm -rf /root/TeslaPJ /root/wangmarket

# 2. 从GitHub克隆tonka代码
echo "📥 从GitHub克隆tonka代码..."
cd /root
git clone https://github.com/collan826/tonka.git

# 3. 加载nvm并使用Node.js 20
export NVM_DIR="/root/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 20

# 4. 初始化后端（如果有）
echo "🔧 初始化后端..."
if [ -d "/root/tonka/backend" ]; then
    cd /root/tonka/backend
    npm install
    node seed.js 2>/dev/null || true
fi

# 5. 构建前端
echo "🔨 构建前端..."
cd /root/tonka/frontend
rm -rf node_modules package-lock.json dist
npm install
npm run build

# 6. 复制前端文件到Nginx
echo "📤 部署前端到Nginx..."
rm -rf /usr/share/nginx/html/*
cp -r /root/tonka/frontend/dist/* /usr/share/nginx/html/

# 7. 停止旧的后端服务
echo "🔄 停止旧的后端服务..."
pkill -f "node.*index.js" || true

# 8. 启动新的后端服务（如果有）
if [ -d "/root/tonka/backend" ]; then
    echo "🚀 启动后端服务..."
    cd /root/tonka/backend
    nohup npm start > /root/tonka-backend.log 2>&1 &
fi

echo "✅ Tonka 部署完成！"
echo "🌐 前端访问地址：http://${SERVER_IP}:5173/"
if [ -d "/root/tonka/backend" ]; then
    echo "🔌 后端API地址：http://${SERVER_IP}:3000/"
fi
