<template>
  <div class="dashboard">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>欢迎使用 Tonka 后台管理系统</span>
        </div>
      </template>
      <el-empty description="欢迎登录！左侧菜单选择功能进行管理" />
    </el-card>
  </div>
</template>

<script setup>
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
