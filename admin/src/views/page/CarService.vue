<template>
  <div class="page">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>{{ pageTitle }}</span>
          <el-button type="primary" @click="handleAdd">+ 新增热点按钮</el-button>
        </div>
      </template>

      <el-table :data="pointList" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="position" label="位置" width="120" />
        <el-table-column prop="name" label="名称" width="150" />
        <el-table-column prop="label" label="标签" />
        <el-table-column prop="link" label="链接" width="200" />
        <el-table-column prop="sort_order" label="排序" width="80" />
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
      :title="isEdit ? '编辑热点按钮' : '新增热点按钮'"
      width="600px"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="位置">
          <el-select v-model="form.position" placeholder="请选择位置">
            <el-option label="车顶 (roof)" value="roof" />
            <el-option label="车头 (hood)" value="hood" />
            <el-option label="车侧 (side)" value="side" />
            <el-option label="车位 (rear)" value="rear" />
            <el-option label="车轮 (wheel)" value="wheel" />
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="form.label" placeholder="请输入标签" />
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="form.link" placeholder="请输入链接" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.sort_order" :min="0" />
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

const pointList = ref([])
const dialogVisible = ref(false)
const isEdit = ref(false)
const form = ref({
  id: null,
  position: '',
  name: '',
  label: '',
  link: '#',
  sort_order: 0
})

const fetchList = async () => {
  try {
    const res = await request.get('/api/admin/car-service-points')
    if (res.code === 200) {
      pointList.value = res.data || []
    }
  } catch (error) {
    ElMessage.error('获取列表失败')
  }
}

const handleAdd = () => {
  isEdit.value = false
  form.value = {
    id: null,
    position: '',
    name: '',
    label: '',
    link: '#',
    sort_order: 0
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
      await request.delete('/api/admin/car-service-points/' + row.id)
      ElMessage.success('删除成功')
      fetchList()
    } catch (error) {
      ElMessage.error('删除失败')
    }
  }).catch(() => {})
}

const handleSubmit = async () => {
  try {
    if (isEdit.value) {
      await request.put('/api/admin/car-service-points/' + form.value.id, form.value)
      ElMessage.success('更新成功')
    } else {
      await request.post('/api/admin/car-service-points', form.value)
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
</style>
