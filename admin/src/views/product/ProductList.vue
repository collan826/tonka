<template>
  <div class="page">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ pageTitle }}</span>
          <el-button type="primary" @click="handleAdd">+ 新增产品</el-button>
        </div>
      </template>

      <el-table :data="productList" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column label="图片" width="120">
          <template #default="{ row }">
            <el-image
              v-if="row.image_url"
              :src="getFullUrl(row.image_url)"
              style="width: 100px; height: 60px"
              fit="cover"
              :preview-src-list="[getFullUrl(row.image_url)]"
            />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="产品名称" />
        <el-table-column prop="price" label="价格" width="120" />
        <el-table-column prop="button_text" label="按钮文字" />
        <el-table-column prop="sort_order" label="排序" width="80" />
        <el-table-column label="热门" width="80">
          <template #default="{ row }">
            <el-tag :type="row.is_hot ? 'success' : 'info'">
              {{ row.is_hot ? '是' : '否' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.is_active ? 'success' : 'info'">
              {{ row.is_active ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增/编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑产品' : '新增产品'"
      width="600px"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="上传图片">
          <el-upload
            class="upload-demo"
            :action="uploadUrl"
            :headers="uploadHeaders"
            :on-success="handleUploadSuccess"
            :before-upload="beforeUpload"
            :show-file-list="false"
          >
            <el-button type="primary">点击上传</el-button>
            <template #tip>
              <div class="el-upload__tip">
                只能上传 jpg/png 文件，且不超过 2MB
              </div>
            </template>
          </el-upload>
          <el-image
            v-if="form.image_url"
            :src="getFullUrl(form.image_url)"
            style="width: 200px; height: 120px"
            fit="cover"
            :preview-src-list="[getFullUrl(form.image_url)]"
          />
        </el-form-item>
        <el-form-item label="产品名称">
          <el-input v-model="form.name" placeholder="请输入产品名称" />
        </el-form-item>
        <el-form-item label="产品描述">
          <el-input v-model="form.description" type="textarea" :rows="3" placeholder="请输入产品描述" />
        </el-form-item>
        <el-form-item label="价格">
          <el-input-number v-model="form.price" :min="0" :precision="2" :step="0.01" />
        </el-form-item>
        <el-form-item label="原价">
          <el-input-number v-model="form.original_price" :min="0" :precision="2" :step="0.01" />
        </el-form-item>
        <el-form-item label="按钮文字">
          <el-input v-model="form.button_text" placeholder="请输入按钮文字" />
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="form.link" placeholder="请输入链接" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.sort_order" :min="0" />
        </el-form-item>
        <el-form-item label="是否热门">
          <el-switch v-model="form.is_hot" />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="form.is_active" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import request from '../../api/request'

const route = useRoute()
const pageTitle = computed(() => {
  const titles = {
    '/system/users': '用户设置',
    '/page/banner': '轮播管理',
    '/page/car-service': '汽车服务',
    '/page/professional-service': '专业服务',
    '/page/professional-accessory': '专业配件',
    '/product/hot-product': '热门产品',
    '/product/product-list': '产品列表',
    '/order/list': '订单列表'
  }
  return titles[route.path] || '页面'
})

const productList = ref([])
const dialogVisible = ref(false)
const isEdit = ref(false)
const form = ref({
  id: null,
  image_url: '',
  name: '',
  description: '',
  price: 0,
  original_price: null,
  button_text: '加入购物车',
  link: '#',
  sort_order: 0,
  is_hot: 0,
  is_active: 1
})

const getFullUrl = (url) => {
  if (!url) return ''
  if (url.startsWith('http')) return url
  const hostname = window.location.hostname
  const apiPort = hostname === '192.168.0.120' ? '8080' : '3000'
  const apiBase = 'http://' + hostname + ':' + apiPort
  return apiBase + url
}

const hostname = window.location.hostname
const apiPort = hostname === '192.168.0.120' ? '8080' : '3000'
const uploadUrl = 'http://' + hostname + ':' + apiPort + '/api/file/upload'
const uploadHeaders = {
  Authorization: localStorage.getItem('token') || ''
}

const fetchList = async () => {
  try {
    const res = await request.get('/api/admin/products')
    if (res.code === 200) {
      productList.value = res.data || []
    }
  } catch (error) {
    ElMessage.error('获取列表失败')
  }
}

const handleAdd = () => {
  isEdit.value = false
  form.value = {
    id: null,
    image_url: '',
    name: '',
    description: '',
    price: 0,
    original_price: null,
    button_text: '加入购物车',
    link: '#',
    sort_order: 0,
    is_hot: 0,
    is_active: 1
  }
  dialogVisible.value = true
}

const handleEdit = (row) => {
  isEdit.value = true
  form.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = (row) => {
  ElMessageBox.confirm('确定要删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      await request.delete('/api/admin/products/' + row.id)
      ElMessage.success('删除成功')
      fetchList()
    } catch (error) {
      ElMessage.error('删除失败')
    }
  }).catch(() => {})
}

const beforeUpload = (file) => {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG) {
    ElMessage.error('只能上传 JPG/PNG 文件!')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过 2MB!')
    return false
  }
  return true
}

const handleUploadSuccess = (response) => {
  if (response.code === 200 && response.data) {
    form.value.image_url = response.data.url
    ElMessage.success('上传成功')
  } else {
    ElMessage.error('上传失败')
  }
}

const handleSubmit = async () => {
  try {
    if (isEdit.value) {
      await request.put('/api/admin/products/' + form.value.id, form.value)
      ElMessage.success('更新成功')
    } else {
      await request.post('/api/admin/products', form.value)
      ElMessage.success('添加成功')
    }
    dialogVisible.value = false
    fetchList()
  } catch (error) {
    ElMessage.error('操作失败')
  }
}

onMounted(() => {
  fetchList()
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

.upload-demo {
  margin-bottom: 10px;
}
</style>
