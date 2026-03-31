<template>
  <div class="config-page">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>系统设置</span>
        </div>
      </template>

      <el-form :model="configForm" label-width="120px" style="max-width: 600px;">
        <el-form-item label="公司名称">
          <el-input v-model="configForm.company_name" placeholder="请输入公司名称" />
        </el-form-item>

        <el-form-item label="联系电话">
          <el-input v-model="configForm.contact_phone" placeholder="请输入联系电话" />
        </el-form-item>

        <el-form-item label="联系邮箱">
          <el-input v-model="configForm.contact_email" placeholder="请输入联系邮箱" />
        </el-form-item>

        <el-form-item label="公司地址">
          <el-input v-model="configForm.address" placeholder="请输入公司地址" />
        </el-form-item>

        <el-form-item label="营业时间">
          <el-input v-model="configForm.business_hours" placeholder="请输入营业时间" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSave" :loading="loading">保存设置</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import request from '../../api/request'

const loading = ref(false)
const configForm = ref({
  company_name: '',
  contact_phone: '',
  contact_email: '',
  address: '',
  business_hours: ''
})

const loadConfig = async () => {
  try {
    const res = await request.get('/api/admin/config')
    if (res.data) {
      configForm.value = { ...configForm.value, ...res.data }
    }
  } catch (e) {
    console.error('加载配置失败:', e)
  }
}

const handleSave = async () => {
  loading.value = true
  try {
    await request.post('/api/admin/config', configForm.value)
    ElMessage.success('保存成功！')
  } catch (e) {
    ElMessage.error('保存失败')
  } finally {
    loading.value = false
  }
}

const handleReset = () => {
  loadConfig()
}

onMounted(() => {
  loadConfig()
})
</script>

<style scoped>
.config-page {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
