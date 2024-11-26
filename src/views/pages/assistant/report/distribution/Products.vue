<template>
  <div class="products-report">
    <!-- 搜索条件 -->
    <el-card class="search-card">
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :shortcuts="dateShortcuts"
          />
        </el-form-item>
        <el-form-item label="店铺">
          <el-select v-model="searchForm.shop" placeholder="请选择店铺" clearable>
            <el-option label="全部" value="" />
            <el-option
              v-for="shop in shopList"
              :key="shop.id"
              :label="shop.name"
              :value="shop.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-cascader
            v-model="searchForm.category"
            :options="categoryOptions"
            :props="{ checkStrictly: true }"
            placeholder="请选择商品分类"
            clearable
          />
        </el-form-item>
        <el-form-item label="铺货状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="全部" value="" />
            <el-option label="待铺货" value="pending" />
            <el-option label="铺货中" value="processing" />
            <el-option label="已铺货" value="completed" />
            <el-option label="铺货失败" value="failed" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
          <el-button type="success" @click="handleExport">导出报表</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 数据汇总 -->
    <el-row :gutter="20" class="summary-row">
      <el-col :span="6" v-for="item in summaryData" :key="item.title">
        <el-card shadow="hover" class="summary-card">
          <div class="card-content">
            <div class="info">
              <div class="title">{{ item.title }}</div>
              <div class="value">{{ item.value }}</div>
              <div class="trend" :class="item.trend">
                {{ item.trend === 'up' ? '↑' : '↓' }} {{ item.rate }}%
                <span class="compare">较上期</span>
              </div>
            </div>
            <el-icon class="icon" :class="item.type">
              <component :is="item.icon" />
            </el-icon>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表区域 -->
    <el-row :gutter="20" class="chart-row">
      <el-col :span="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>铺货状态分布</span>
              <el-radio-group v-model="statusChartType" size="small">
                <el-radio-button label="count">数量</el-radio-button>
                <el-radio-button label="percent">占比</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div class="chart-container">
            <!-- 这里放饼图 -->
            <div class="chart-placeholder">状态分布图表</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>店铺分布</span>
              <el-radio-group v-model="shopChartType" size="small">
                <el-radio-button label="count">数量</el-radio-button>
                <el-radio-button label="percent">占比</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div class="chart-container">
            <!-- 这里放饼图 -->
            <div class="chart-placeholder">店铺分布图表</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 数据明细 -->
    <el-card class="detail-card">
      <template #header>
        <div class="card-header">
          <span>商品明细</span>
          <el-button-group>
            <el-button
              :type="viewType === 'table' ? 'primary' : ''"
              @click="viewType = 'table'"
            >
              <el-icon><List /></el-icon>
            </el-button>
            <el-button
              :type="viewType === 'card' ? 'primary' : ''"
              @click="viewType = 'card'"
            >
              <el-icon><Grid /></el-icon>
            </el-button>
          </el-button-group>
        </div>
      </template>

      <!-- 表格视图 -->
      <el-table
        v-if="viewType === 'table'"
        :data="productList"
        border
        v-loading="loading"
      >
        <el-table-column type="expand">
          <template #default="{ row }">
            <el-descriptions :column="3" border>
              <el-descriptions-item label="铺货店铺">
                <el-tag
                  v-for="shop in row.shops"
                  :key="shop.id"
                  class="shop-tag"
                >
                  {{ shop.name }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="铺货时间">
                {{ row.distributionTime }}
              </el-descriptions-item>
              <el-descriptions-item label="更新时间">
                {{ row.updateTime }}
              </el-descriptions-item>
              <el-descriptions-item label="价格规则">
                {{ row.priceRule }}
              </el-descriptions-item>
              <el-descriptions-item label="库存规则">
                {{ row.stockRule }}
              </el-descriptions-item>
              <el-descriptions-item label="商品规则">
                {{ row.productRule }}
              </el-descriptions-item>
            </el-descriptions>
          </template>
        </el-table-column>
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
        <el-table-column prop="status" label="铺货状态" width="120">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusLabel(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="shopCount" label="铺货店铺数" width="120" />
        <el-table-column prop="successRate" label="成功率" width="120">
          <template #default="{ row }">
            <el-progress
              :percentage="row.successRate"
              :status="getProgressStatus(row.successRate)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleDetail(row)">
              详情
            </el-button>
            <el-button type="warning" link @click="handleRetry(row)">
              重试
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 卡片视图 -->
      <div v-else class="card-view">
        <el-row :gutter="20">
          <el-col
            :span="6"
            v-for="product in productList"
            :key="product.id"
            class="card-col"
          >
            <el-card :body-style="{ padding: '0px' }" class="product-card">
              <el-image :src="product.image" class="card-image" />
              <div class="card-content">
                <h3 class="product-name">{{ product.name }}</h3>
                <div class="product-category">{{ product.category }}</div>
                <div class="product-status">
                  <el-tag :type="getStatusType(product.status)" size="small">
                    {{ getStatusLabel(product.status) }}
                  </el-tag>
                  <span class="shop-count">{{ product.shopCount }}个店铺</span>
                </div>
                <el-progress
                  :percentage="product.successRate"
                  :status="getProgressStatus(product.successRate)"
                />
                <div class="card-footer">
                  <el-button type="primary" link @click="handleDetail(product)">
                    详情
                  </el-button>
                  <el-button type="warning" link @click="handleRetry(product)">
                    重试
                  </el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[12, 24, 36, 48]"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 详情抽屉 -->
    <el-drawer
      v-model="drawerVisible"
      title="铺货详情"
      size="60%"
    >
      <div class="detail-content" v-if="currentProduct">
        <el-descriptions title="基本信息" :column="2" border>
          <el-descriptions-item label="商品名称">{{ currentProduct.name }}</el-descriptions-item>
          <el-descriptions-item label="商品分类">{{ currentProduct.category }}</el-descriptions-item>
          <el-descriptions-item label="铺货状态">
            <el-tag :type="getStatusType(currentProduct.status)">
              {{ getStatusLabel(currentProduct.status) }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="铺货店铺数">{{ currentProduct.shopCount }}</el-descriptions-item>
        </el-descriptions>

        <el-divider>店铺明细</el-divider>
        <el-table :data="currentProduct.shopDetails" border>
          <el-table-column prop="shopName" label="店铺名称" />
          <el-table-column prop="status" label="状态" width="120">
            <template #default="{ row }">
              <el-tag :type="getStatusType(row.status)">
                {{ getStatusLabel(row.status) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="售价" width="120">
            <template #default="{ row }">
              ¥{{ row.price }}
            </template>
          </el-table-column>
          <el-table-column prop="stock" label="库存" width="100" />
          <el-table-column prop="updateTime" label="更新时间" width="180" />
        </el-table>

        <el-divider>铺货记录</el-divider>
        <el-timeline>
          <el-timeline-item
            v-for="log in currentProduct.logs"
            :key="log.time"
            :timestamp="log.time"
            :type="log.status === 'success' ? 'success' : 'danger'"
          >
            {{ log.content }}
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import {
  List,
  Grid,
  Goods,
  Shop,
  ShoppingCart,
  Warning
} from '@element-plus/icons-vue'

// 日期快捷选项
const dateShortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    }
  },
  {
    text: '最近一月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    }
  },
  {
    text: '最近三月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    }
  }
]

// 店铺列表
const shopList = [
  { id: 1, name: '店铺A' },
  { id: 2, name: '店铺B' },
  { id: 3, name: '店铺C' }
]

// 分类选项
const categoryOptions = [
  {
    value: 1,
    label: '服装',
    children: [
      { value: 11, label: '上衣' },
      { value: 12, label: '裤装' }
    ]
  }
]

// 搜索表单
const searchForm = reactive({
  dateRange: [],
  shop: '',
  category: [],
  status: ''
})

// 汇总数据
const summaryData = [
  {
    title: '铺货商品总数',
    value: '1,234',
    trend: 'up',
    rate: 12.3,
    icon: 'Goods',
    type: 'primary'
  },
  {
    title: '铺货店铺总数',
    value: '56',
    trend: 'up',
    rate: 8.5,
    icon: 'Shop',
    type: 'success'
  },
  {
    title: '待铺货商品数',
    value: '89',
    trend: 'down',
    rate: 3.2,
    icon: 'ShoppingCart',
    type: 'warning'
  },
  {
    title: '铺货失败数',
    value: '12',
    trend: 'up',
    rate: 6.7,
    icon: 'Warning',
    type: 'danger'
  }
]

// 图表控制
const statusChartType = ref('count')
const shopChartType = ref('count')

// 视图控制
const viewType = ref('table')
const loading = ref(false)
const drawerVisible = ref(false)
const currentProduct = ref(null)

// 表格数据
const productList = ref([
  {
    id: 1,
    image: 'https://via.placeholder.com/100',
    name: '测试商品1',
    category: '服装/上衣',
    status: 'completed',
    shopCount: 3,
    successRate: 100,
    shops: [
      { id: 1, name: '店铺A' },
      { id: 2, name: '店铺B' }
    ],
    distributionTime: '2024-03-20 10:00:00',
    updateTime: '2024-03-20 10:30:00',
    priceRule: '固定加价',
    stockRule: '同步库存',
    productRule: '标题优化'
  }
])

// 分页相关
const currentPage = ref(1)
const pageSize = ref(12)
const total = ref(100)

// 获取状态样式
const getStatusType = (status) => {
  const types = {
    pending: 'info',
    processing: 'warning',
    completed: 'success',
    failed: 'danger'
  }
  return types[status] || 'info'
}

// 获取状态文本
const getStatusLabel = (status) => {
  const labels = {
    pending: '待铺货',
    processing: '铺货中',
    completed: '已铺货',
    failed: '铺货失败'
  }
  return labels[status] || status
}

// 获取进度条状态
const getProgressStatus = (rate) => {
  if (rate >= 90) return 'success'
  if (rate >= 60) return 'warning'
  return 'exception'
}

// 搜索
const handleSearch = () => {
  fetchProductList()
}

// 重置搜索
const resetSearch = () => {
  searchForm.dateRange = []
  searchForm.shop = ''
  searchForm.category = []
  searchForm.status = ''
  handleSearch()
}

// 导出报表
const handleExport = () => {
  // TODO: 调���导出接口
  ElMessage.success('报表导出中...')
}

// 获取商品列表
const fetchProductList = async () => {
  loading.value = true
  try {
    // TODO: 调用获取商品列表接口
    await new Promise(resolve => setTimeout(resolve, 1000))
  } catch (error) {
    ElMessage.error('获取数据失败')
  } finally {
    loading.value = false
  }
}

// 查看详情
const handleDetail = (row) => {
  currentProduct.value = {
    ...row,
    shopDetails: [
      {
        shopName: '店铺A',
        status: 'completed',
        price: 199.00,
        stock: 100,
        updateTime: '2024-03-20 10:30:00'
      }
    ],
    logs: [
      {
        time: '2024-03-20 10:00:00',
        status: 'success',
        content: '开始铺货'
      },
      {
        time: '2024-03-20 10:30:00',
        status: 'success',
        content: '铺货完成'
      }
    ]
  }
  drawerVisible.value = true
}

// 重试铺货
const handleRetry = async (row) => {
  try {
    // TODO: 调用重试接口
    ElMessage.success('重试任务已提交')
  } catch (error) {
    ElMessage.error('重试失败')
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
.products-report {
  padding: 20px;
}

.search-card {
  margin-bottom: 20px;
}

.summary-row {
  margin-bottom: 20px;
}

.summary-card {
  .card-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .info {
    .title {
      font-size: 14px;
      color: #909399;
    }
    .value {
      font-size: 24px;
      font-weight: bold;
      color: #303133;
      margin: 8px 0;
    }
    .trend {
      font-size: 12px;
      
      &.up {
        color: #67C23A;
      }
      &.down {
        color: #F56C6C;
      }

      .compare {
        color: #909399;
        margin-left: 4px;
      }
    }
  }

  .icon {
    font-size: 48px;
    padding: 10px;
    border-radius: 8px;
    opacity: 0.8;
    
    &.primary {
      color: #409EFF;
      background-color: rgba(64, 158, 255, 0.1);
    }
    &.success {
      color: #67C23A;
      background-color: rgba(103, 194, 58, 0.1);
    }
    &.warning {
      color: #E6A23C;
      background-color: rgba(230, 162, 60, 0.1);
    }
    &.danger {
      color: #F56C6C;
      background-color: rgba(245, 108, 108, 0.1);
    }
  }
}

.chart-row {
  margin-bottom: 20px;
}

.chart-card {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .chart-container {
    height: 300px;
  }

  .chart-placeholder {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f7fa;
    color: #909399;
    border-radius: 4px;
  }
}

.detail-card {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
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

.card-view {
  .card-col {
    margin-bottom: 20px;
  }

  .product-card {
    .card-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .card-content {
      padding: 15px;

      .product-name {
        margin: 0;
        font-size: 16px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .product-category {
        font-size: 14px;
        color: #909399;
        margin: 8px 0;
      }

      .product-status {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        .shop-count {
          font-size: 12px;
          color: #909399;
        }
      }

      .card-footer {
        margin-top: 10px;
        display: flex;
        justify-content: flex-end;
        gap: 10px;
      }
    }
  }
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.detail-content {
  padding: 20px;
}
</style> 