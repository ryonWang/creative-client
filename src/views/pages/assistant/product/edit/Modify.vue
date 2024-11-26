<template>
  <div class="product-modify">
    <!-- 搜索区域 -->
    <div class="search-bar">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="商品名称">
          <el-input v-model="searchForm.name" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="商品分类">
          <el-cascader
            v-model="searchForm.category"
            :options="categoryOptions"
            :props="{ checkStrictly: true }"
            placeholder="请选择商品分类"
          />
        </el-form-item>
        <el-form-item label="上架状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态">
            <el-option label="全部" value="" />
            <el-option label="上架" value="online" />
            <el-option label="下架" value="offline" />
            <el-option label="草稿" value="draft" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 商品列表 -->
    <div class="product-list">
      <el-table
        v-loading="loading"
        :data="productList"
        border
        style="width: 100%"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="商品ID" width="100" />
        <el-table-column label="商品图片" width="100">
          <template #default="{ row }">
            <el-image
              :src="row.image"
              :preview-src-list="[row.image]"
              fit="cover"
              class="product-image"
            />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" show-overflow-tooltip />
        <el-table-column prop="category" label="商品分类" width="150" />
        <el-table-column prop="brand" label="品牌" width="120" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusLabel(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button
              type="success"
              link
              v-if="row.status === 'offline'"
              @click="handleOnline(row)"
            >
              上架
            </el-button>
            <el-button
              type="warning"
              link
              v-if="row.status === 'online'"
              @click="handleOffline(row)"
            >
              下架
            </el-button>
            <el-button type="danger" link @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <!-- 编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="编辑商品"
      width="80%"
      :destroy-on-close="true"
    >
      <!-- 复用新建商品的表单组件 -->
      <product-form
        ref="productFormRef"
        :initial-data="currentProduct"
        @submit="handleSubmit"
        @cancel="dialogVisible = false"
      />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import ProductForm from './components/ProductForm.vue'

// 搜索表单
const searchForm = reactive({
  name: '',
  category: [],
  status: ''
})

// 表格数据
const loading = ref(false)
const productList = ref([
  {
    id: 1,
    image: 'https://via.placeholder.com/100',
    name: '测试商品1',
    category: '服装/上衣',
    brand: '品牌A',
    status: 'online'
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/100',
    name: '测试商品2',
    category: '鞋靴/运动鞋',
    brand: '品牌B',
    status: 'offline'
  }
])

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

// 编辑对话框
const dialogVisible = ref(false)
const currentProduct = ref(null)
const productFormRef = ref()

// 分类选项
const categoryOptions = [
  {
    value: 1,
    label: '服装',
    children: [
      { value: 11, label: '上衣' },
      { value: 12, label: '裤装' }
    ]
  },
  {
    value: 2,
    label: '鞋靴',
    children: [
      { value: 21, label: '运动鞋' },
      { value: 22, label: '皮鞋' }
    ]
  }
]

// 获取状态样式
const getStatusType = (status) => {
  const types = {
    online: 'success',
    offline: 'info',
    draft: 'warning'
  }
  return types[status] || 'info'
}

// 获取状态文本
const getStatusLabel = (status) => {
  const labels = {
    online: '上架',
    offline: '下架',
    draft: '草稿'
  }
  return labels[status] || status
}

// 搜索
const handleSearch = () => {
  // TODO: 调用搜索接口
  fetchProductList()
}

// 重置搜索
const resetSearch = () => {
  searchForm.name = ''
  searchForm.category = []
  searchForm.status = ''
  handleSearch()
}

// 获取商品列表
const fetchProductList = async () => {
  loading.value = true
  try {
    // TODO: 调用获取商品列表接口
    await new Promise(resolve => setTimeout(resolve, 1000))
  } catch (error) {
    ElMessage.error('获取商品列表失败')
  } finally {
    loading.value = false
  }
}

// 编辑商品
const handleEdit = (row) => {
  currentProduct.value = { ...row }
  dialogVisible.value = true
}

// 上架商品
const handleOnline = async (row) => {
  try {
    await ElMessageBox.confirm('确认上架该商品吗？')
    // TODO: 调用上架接口
    ElMessage.success('商品已上架')
    fetchProductList()
  } catch {
    // 取消操作
  }
}

// 下架商品
const handleOffline = async (row) => {
  try {
    await ElMessageBox.confirm('确认下架该商品吗？')
    // TODO: 调用下架接口
    ElMessage.success('商品已下架')
    fetchProductList()
  } catch {
    // 取消操作
  }
}

// 删除商品
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确认删除该商品吗？此操作不可恢复！', '警告', {
      type: 'warning'
    })
    // TODO: 调用删除接口
    ElMessage.success('商品已删除')
    fetchProductList()
  } catch {
    // 取消操作
  }
}

// 提交编辑
const handleSubmit = async (formData) => {
  try {
    // TODO: 调用更新接口
    ElMessage.success('商品信息已更新')
    dialogVisible.value = false
    fetchProductList()
  } catch (error) {
    ElMessage.error('更新失败')
  }
}

// 分页相关
const handleSizeChange = (val) => {
  pageSize.value = val
  fetchProductList()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchProductList()
}

// 初始化
fetchProductList()
</script>

<style scoped>
.product-modify {
  padding: 20px;
}

.search-bar {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.product-list {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
}

.product-image {
  width: 60px;
  height: 60px;
  border-radius: 4px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style> 