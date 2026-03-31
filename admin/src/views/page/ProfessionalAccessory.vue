<template>
  <div class="page">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ pageTitle }}</span>
        </div>
      </template>
      <el-alert title="功能开发中..." type="info" :closable="false" style="margin-bottom: 20px;" />
      <el-empty description="页面待开发" />
    </el-card>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageTitle = computed(() => {
  const titles = {
    '/system/users': '用户设置',
    '/page/banner': '轮播管理',
    '/page/car-service': '汽车服务',
    '/page/professional-service': '专业服务',
    '/page/professional-accessory': '专业配件',
    '/page/hot-product': '热门产品'
  }
  return titles[route.path] || '页面'
})
</script>

<style scoped>
.page {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
