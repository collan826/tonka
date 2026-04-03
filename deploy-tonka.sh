#!/bin/bash
# Tonka 项目部署脚本
# 使用方法：./deploy-tonka.sh [服务器IP]
# 示例：./deploy-tonka.sh 43.167.237.68

SERVER_IP=${1:-43.167.237.68}

echo "🚀 开始部署 Tonka..."

# 1. 删除之前的项目
echo "🗑️ 删除之前的项目..."
rm -rf /root/tonka

# 2. 从GitHub克隆tonka代码
echo "📥 从GitHub克隆tonka代码..."
cd /root
git clone https://github.com/collan826/tonka.git

# 3. 加载nvm并使用Node.js
export NVM_DIR="/root/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 18 || nvm use 20 || nvm use node

# 4. 安装后端依赖
echo "🔧 安装后端依赖..."
cd /root/tonka/backend
rm -rf node_modules package-lock.json
npm install

# 5. 安装前端依赖并构建
echo "🔨 构建前端..."
cd /root/tonka/frontend
rm -rf node_modules package-lock.json dist
npm install
npm run build

# 6. 复制前端文件到Nginx
echo "📤 部署前端到Nginx..."
rm -rf /usr/share/nginx/html/*
cp -r /root/tonka/frontend/dist/* /usr/share/nginx/html/

# 7. 复制 uploads 目录（如果有）
if [ -d "/root/tonka/uploads" ]; then
    echo "📁 复制上传文件..."
    cp -r /root/tonka/uploads /usr/share/nginx/html/
fi

# 8. 停止旧的后端服务
echo "🔄 停止旧的后端服务..."
pkill -f "node.*index.js" 2>/dev/null || true

# 9. 启动新的后端服务
echo "🚀 启动后端服务..."
cd /root/tonka/backend
PORT=8080 nohup node index.js > /root/tonka-backend.log 2>&1 &

# 10. 等待后端启动
echo "⏳ 等待后端启动..."
sleep 3

# 11. 检查后端日志
echo "📋 后端日志："
tail -20 /root/tonka-backend.log

echo ""
echo "✅ Tonka 部署完成！"
echo "🌐 前端访问地址：http://${SERVER_IP}:5173/"
echo "🔌 后端API地址：http://${SERVER_IP}:8080/"
echo ""
echo "💡 提示：如果端口5173无法访问，请检查nginx配置"
