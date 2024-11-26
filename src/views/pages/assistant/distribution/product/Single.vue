<template>
  <div class="single-distribution">
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
        <el-form-item label="铺货状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态">
            <el-option label="全部" value="" />
            <el-option label="未铺货" value="pending" />
            <el-option label="已铺货" value="distributed" />
            <el-option label="铺货失败" value="failed" />
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
      >
        <el-table-column type="selection" width="55" />
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
        <el-table-column prop="price" label="售价" width="100">
          <template #default="{ row }">
            ¥{{ row.price }}
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="库存" width="100" />
        <el-table-column label="铺货状态" width="120">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusLabel(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="铺货店铺" width="200">
          <template #default="{ row }">
            <el-tag
              v-for="shop in row.shops"
              :key="shop.id"
              :type="shop.status === 'success' ? 'success' : 'danger'"
              class="shop-tag"
            >
              {{ shop.name }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button
              type="primary"
              link
              @click="handleDistribute(row)"
              v-if="row.status !== 'distributed'"
            >
              铺货
            </el-button>
            <el-button
              type="warning"
              link
              @click="handleUpdate(row)"
              v-if="row.status === 'distributed'"
            >
              更新
            </el-button>
            <el-button type="info" link @click="handleLog(row)">
              日志
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

    <!-- 铺货对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="商品铺货"
      width="600px"
    >
      <el-form
        ref="distributeFormRef"
        :model="distributeForm"
        label-width="100px"
      >
        <el-form-item label="选择店铺" prop="shops">
          <el-checkbox-group v-model="distributeForm.shops">
            <el-checkbox
              v-for="shop in shopList"
              :key="shop.id"
              :label="shop.id"
            >
              {{ shop.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="价格策略">
          <el-radio-group v-model="distributeForm.priceStrategy">
            <el-radio label="sync">同步原价</el-radio>
            <el-radio label="custom">自定义加价</el-radio>
          </el-radio-group>
          <div v-if="distributeForm.priceStrategy === 'custom'" class="price-input">
            <el-input-number
              v-model="distributeForm.priceIncrease"
              :min="0"
              :precision="2"
              :step="0.1"
            />
            <span class="unit">元</span>
          </div>
        </el-form-item>
        <el-form-item label="库存策略">
          <el-radio-group v-model="distributeForm.stockStrategy">
            <el-radio label="sync">同步库存</el-radio>
            <el-radio label="fixed">固定库存</el-radio>
          </el-radio-group>
          <div v-if="distributeForm.stockStrategy === 'fixed'" class="stock-input">
            <el-input-number
              v-model="distributeForm.fixedStock"
              :min="1"
              :step="1"
            />
            <span class="unit">件</span>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="submitDistribute"
            :loading="submitting"
          >
            确定铺货
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 日志抽屉 -->
    <el-drawer
      v-model="drawerVisible"
      title="铺货日志"
      size="50%"
    >
      <div class="log-content">
        <el-timeline>
          <el-timeline-item
            v-for="log in distributeLogs"
            :key="log.time"
            :timestamp="log.time"
            :type="log.status === 'success' ? 'success' : 'danger'"
          >
            <h4>{{ log.shop }}</h4>
            <p>{{ log.message }}</p>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

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
    price: 99.00,
    stock: 100,
    status: 'pending',
    shops: []
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/100',
    name: '测试商品2',
    category: '鞋靴/运动鞋',
    price: 299.00,
    stock: 50,
    status: 'distributed',
    shops: [
      { id: 1, name: '店铺A', status: 'success' },
      { id: 2, name: '店铺B', status: 'failed' }
    ]
  }
])

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

// 铺货对话框
const dialogVisible = ref(false)
const submitting = ref(false)
const distributeForm = reactive({
  shops: [],
  priceStrategy: 'sync',
  priceIncrease: 0,
  stockStrategy: 'sync',
  fixedStock: 1
})

// 日志抽屉
const drawerVisible = ref(false)
const distributeLogs = ref([
  {
    time: '2024-03-20 10:00:00',
    shop: '店铺A',
    status: 'success',
    message: '铺货成功'
  },
  {
    time: '2024-03-20 09:50:00',
    shop: '店铺B',
    status: 'error',
    message: '库存同步失败'
  }
])

// 店铺列表
const shopList = [
  { id: 1, name: '店铺A' },
  { id: 2, name: '店铺B' },
  { id: 3, name: '店铺C' }
]

// 获取状态样式
const getStatusType = (status) => {
  const types = {
    pending: 'info',
    distributed: 'success',
    failed: 'danger'
  }
  return types[status] || 'info'
}

// 获取状态文本
const getStatusLabel = (status) => {
  const labels = {
    pending: '未铺货',
    distributed: '已铺货',
    failed: '铺货失败'
  }
  return labels[status] || status
}

// 搜索
const handleSearch = () => {
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

// 铺货操作
const handleDistribute = (row) => {
  distributeForm.shops = []
  dialogVisible.value = true
}

// 更新操作
const handleUpdate = async (row) => {
  try {
    // TODO: 调用更新接口
    ElMessage.success('商品信息已更新')
  } catch (error) {
    ElMessage.error('更新失败')
  }
}

// 查看日志
const handleLog = (row) => {
  // TODO: 加载日志数据
  drawerVisible.value = true
}

// 提交铺货
const submitDistribute = async () => {
  if (!distributeForm.shops.length) {
    ElMessage.warning('请选择要铺货的店铺')
    return
  }

  submitting.value = true
  try {
    // TODO: 调用铺货接口
    await new Promise(resolve => setTimeout(resolve, 1000))
    ElMessage.success('铺货任务已提交')
    dialogVisible.value = false
    fetchProductList()
  } catch (error) {
    ElMessage.error('铺货失败')
  } finally {
    submitting.value = false
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
.single-distribution {
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

.shop-tag {
  margin-right: 5px;
  margin-bottom: 5px;
}

.price-input,
.stock-input {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.unit {
  color: #909399;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.log-content {
  padding: 20px;
}
</style> 