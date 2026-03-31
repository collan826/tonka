<template>
  <el-container class="layout-container">
    <el-aside width="200px" class="layout-aside">
      <div class="logo">
        <h3>Tonka 管理</h3>
      </div>
      <el-menu
        :default-active="activeMenu"
        :router="true"
        class="layout-menu"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
        <el-menu-item index="/dashboard">
          <el-icon><HomeFilled /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-sub-menu index="system">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="/system/config">系统设置</el-menu-item>
          <el-menu-item index="/system/users">用户管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="page">
          <template #title>
            <el-icon><Document /></el-icon>
            <span>页面管理</span>
          </template>
          <el-menu-item index="/page/banner">轮播管理</el-menu-item>
          <el-menu-item index="/page/car-service">汽车服务</el-menu-item>
          <el-menu-item index="/page/professional-service">专业服务</el-menu-item>
          <el-menu-item index="/page/professional-accessory">专业配件</el-menu-item>
          <el-menu-item index="/page/hot-product">热门产品</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>

    <el-container class="layout-main">
      <el-header class="layout-header">
        <div class="header-left">
          <span>Tonka 后台管理系统</span>
        </div>
        <div class="header-right">
          <el-dropdown @command="handleCommand">
            <span class="user-info">
              <el-icon><User /></el-icon>
              <span>{{ userStore.userInfo?.nickname || userStore.userInfo?.username || '管理员' }}</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-main class="layout-content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../../store/user'
import { ElMessageBox, ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const activeMenu = computed(() => route.path)

const handleCommand = async (command) => {
  if (command === 'logout') {
    try {
      await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await userStore.logout()
      ElMessage.success('退出成功')
      router.push('/login')
    } catch (error) {
    }
  }
}
</script>

<style scoped>
.layout-container {
  height: 100vh;
}

.layout-aside {
  background-color: #304156;
  overflow-x: hidden;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid #1f2d3d;
}

.layout-menu {
  border: none;
}

.layout-main {
  display: flex;
  flex-direction: column;
}

.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #e6e6e6;
  padding: 0 20px;
}

.header-left {
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.header-right {
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
}

.layout-content {
  background: #f0f2f5;
  padding: 20px;
  overflow-y: auto;
}
</style>
