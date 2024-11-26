<template>
  <div class="product-sales">
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
        <el-form-item label="商品分类">
          <el-cascader
            v-model="searchForm.category"
            :options="categoryOptions"
            :props="{ checkStrictly: true }"
            placeholder="请选择商品分类"
            clearable
          />
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="searchForm.name" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="销售状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="全部" value="" />
            <el-option label="热销" value="hot" />
            <el-option label="平稳" value="normal" />
            <el-option label="滞销" value="slow" />
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
      <el-col :span="16">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>销售趋势</span>
              <el-radio-group v-model="trendType" size="small">
                <el-radio-button label="amount">销售额</el-radio-button>
                <el-radio-button label="count">销量</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div class="chart-container">
            <!-- 这里放折线图 -->
            <div class="chart-placeholder">销售趋势图表</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>分类占比</span>
              <el-radio-group v-model="categoryChartType" size="small">
                <el-radio-button label="amount">销售额</el-radio-button>
                <el-radio-button label="count">销量</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div class="chart-container">
            <!-- 这里放饼图 -->
            <div class="chart-placeholder">分类占比图表</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 数据明细 -->
    <el-card class="detail-card">
      <template #header>
        <div class="card-header">
          <span>商品明细</span>
          <el-radio-group v-model="detailType" size="small">
            <el-radio-button label="daily">按日</el-radio-button>
            <el-radio-button label="weekly">按周</el-radio-button>
            <el-radio-button label="monthly">按月</el-radio-button>
          </el-radio-group>
        </div>
      </template>

      <el-table
        :data="productList"
        border
        v-loading="loading"
      >
        <el-table-column type="expand">
          <template #default="{ row }">
            <el-descriptions :column="3" border>
              <el-descriptions-item label="商品SKU">
                {{ row.sku }}
              </el-descriptions-item>
              <el-descriptions-item label="商品分类">
                {{ row.category }}
              </el-descriptions-item>
              <el-descriptions-item label="创建时间">
                {{ row.createTime }}
              </el-descriptions-item>
              <el-descriptions-item label="库存数量">
                {{ row.stockCount }}
              </el-descriptions-item>
              <el-descriptions-item label="销售店铺数">
                {{ row.shopCount }}
              </el-descriptions-item>
              <el-descriptions-item label="评价数量">
                {{ row.commentCount }}
              </el-descriptions-item>
            </el-descriptions>

            <!-- 店铺销售排行 -->
            <div class="shop-rank">
              <h4>店铺销售排行</h4>
              <el-table :data="row.shopRank" border size="small">
                <el-table-column prop="name" label="店铺名称" />
                <el-table-column prop="salesCount" label="销量" width="100" />
                <el-table-column prop="salesAmount" label="销售额" width="120">
                  <template #default="{ row }">
                    ¥{{ row.salesAmount }}
                  </template>
                </el-table-column>
                <el-table-column prop="proportion" label="占比" width="100">
                  <template #default="{ row }">
                    {{ row.proportion }}%
                  </template>
                </el-table-column>
              </el-table>
            </div>
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
        <el-table-column prop="salesCount" label="销量" width="100" sortable />
        <el-table-column prop="salesAmount" label="销售额" width="150" sortable>
          <template #default="{ row }">
            ¥{{ row.salesAmount }}
            <el-tag
              size="small"
              :type="row.trend === 'up' ? 'success' : 'danger'"
              class="trend-tag"
            >
              {{ row.trend === 'up' ? '↑' : '↓' }}{{ row.rate }}%
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="avgPrice" label="平均售价" width="120" sortable>
          <template #default="{ row }">
            ¥{{ row.avgPrice }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="销售状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusLabel(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleDetail(row)">
              详情
            </el-button>
            <el-button type="success" link @click="handleAnalysis(row)">
              分析
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          :current-page.sync="currentPage"
          :page-size.sync="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 详情抽屉 -->
    <el-drawer
      :visible.sync="drawerVisible"
      :title="'商品详情'"
      :size="'60%'"
    >
      <div class="detail-content" v-if="currentProduct">
        <el-descriptions title="基本信息" :column="2" border>
          <el-descriptions-item label="商品名称">{{ currentProduct.name }}</el-descriptions-item>
          <el-descriptions-item label="商品分类">{{ currentProduct.category }}</el-descriptions-item>
          <el-descriptions-item label="销售额">¥{{ currentProduct.salesAmount }}</el-descriptions-item>
          <el-descriptions-item label="销量">{{ currentProduct.salesCount }}</el-descriptions-item>
        </el-descriptions>

        <el-divider>销售趋势</el-divider>
        <div class="trend-chart">
          <!-- 这里放趋势图表 -->
          <div class="chart-placeholder">销售趋势图表</div>
        </div>

        <el-divider>店铺分布</el-divider>
        <div class="shop-chart">
          <!-- 这里放饼图 -->
          <div class="chart-placeholder">店铺分布图表</div>
        </div>
      </div>
    </el-drawer>

    <!-- 分析对话框 -->
    <el-dialog
      :visible.sync="analysisDialogVisible"
      :title="'销售分析'"
      :width="'800px'"
    >
      <div class="analysis-content" v-if="currentProduct">
        <el-alert
          title="销售分析建议"
          type="info"
          :closable="false"
          class="analysis-alert"
        >
          <p v-for="(item, index) in analysisResult" :key="index">
            {{ index + 1 }}. {{ item }}
          </p>
        </el-alert>

        <el-divider>关键指标</el-divider>
        <el-row :gutter="20">
          <el-col :span="8" v-for="(item, index) in keyMetrics" :key="index">
            <el-card shadow="hover" class="metric-card">
              <div class="metric-content">
                <div class="metric-title">{{ item.title }}</div>
                <div class="metric-value">{{ item.value }}</div>
                <div class="metric-trend" :class="item.trend">
                  {{ item.trend === 'up' ? '↑' : '↓' }} {{ item.rate }}%
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Message } from 'element-ui'

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

// 商品列表
const productList = ref([
  {
    id: 1,
    name: '测试商品1',
    image: 'https://example.com/image.jpg',
    category: '服装/上衣',
    salesCount: 1234,
    salesAmount: 123456.78,
    avgPrice: 100.05,
    status: 'hot',
    trend: 'up',
    rate: 12.3,
    sku: 'SKU001',
    stockCount: 567,
    shopCount: 10,
    commentCount: 890,
    createTime: '2024-01-01',
    shopRank: [
      {
        name: '店铺A',
        salesCount: 100,
        salesAmount: 9999.99,
        proportion: 12.5
      }
    ]
  }
])

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
  category: [],
  name: '',
  status: ''
})

// 汇总数据
const summaryData = [
  {
    title: '销售总额',
    value: '¥128,930',
    trend: 'up',
    rate: 12.3,
    icon: 'money',
    type: 'primary'
  },
  {
    title: '销售数量',
    value: '1,234',
    trend: 'up',
    rate: 8.5,
    icon: 'shopping-cart',
    type: 'success'
  },
  {
    title: '商品总数',
    value: '3,456',
    trend: 'down',
    rate: 3.2,
    icon: 'goods',
    type: 'warning'
  },
  {
    title: '平均售价',
    value: '¥99.9',
    trend: 'up',
    rate: 5.6,
    icon: 'data-line',
    type: 'info'
  }
]

// 图表控制
const trendType = ref('amount')
const categoryChartType = ref('amount')
const detailType = ref('daily')

// 表格数据
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

// 详情抽屉
const drawerVisible = ref(false)
const currentProduct = ref(null)

// 分析对话框
const analysisDialogVisible = ref(false)
const analysisResult = ref([
  '销售额环比增长12.3%，主要来自新店铺的增长',
  '平均售价有下降趋势，建议优化定价策略',
  '库存周转率低于同类商品，需要加强促销力度'
])

// 关键指标
const keyMetrics = ref([
  {
    title: '毛利率',
    value: '35%',
    trend: 'up',
    rate: 2.5
  },
  {
    title: '库存周转率',
    value: '3.2次',
    trend: 'down',
    rate: 1.2
  },
  {
    title: '好评率',
    value: '98%',
    trend: 'up',
    rate: 0.6
  }
])

// 获取状态样式
const getStatusType = (status) => {
  const types = {
    hot: 'success',
    normal: 'warning',
    slow: 'danger'
  }
  return types[status] || 'info'
}

// 获取状态文本
const getStatusLabel = (status) => {
  const labels = {
    hot: '热销',
    normal: '平稳',
    slow: '滞销'
  }
  return labels[status] || status
}

// 搜索
const handleSearch = () => {
  fetchProductList()
}

// 重置搜索
const resetSearch = () => {
  searchForm.dateRange = []
  searchForm.category = []
  searchForm.name = ''
  searchForm.status = ''
  handleSearch()
}

// 导出报表
const handleExport = () => {
  Message.success('报表导出中...')
}

// 获取商品列表
const fetchProductList = async () => {
  loading.value = true
  try {
    // TODO: 调用获取商品列表接口
    await new Promise(resolve => setTimeout(resolve, 1000))
  } catch (error) {
    handleError(error)
  } finally {
    loading.value = false
  }
}

// 查看详情
const handleDetail = (row) => {
  currentProduct.value = row
  drawerVisible.value = true
}

// 查看分析
const handleAnalysis = (row) => {
  currentProduct.value = row
  analysisDialogVisible.value = true
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

// 错误处理
const handleError = (error) => {
  Message.error(error || '获取数据失败')
}
</script>

<style scoped>
.product-sales {
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
    &.info {
      color: #909399;
      background-color: rgba(144, 147, 153, 0.1);
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

.trend-tag {
  margin-left: 5px;
}

.shop-rank {
  margin: 20px;

  h4 {
    margin: 0 0 10px 0;
    color: #303133;
  }
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.detail-content {
  padding: 20px;

  .trend-chart,
  .shop-chart {
    height: 300px;
    margin: 20px 0;
  }
}

.analysis-content {
  .analysis-alert {
    margin-bottom: 20px;
  }

  .metric-card {
    .metric-content {
      text-align: center;

      .metric-title {
        font-size: 14px;
        color: #909399;
      }

      .metric-value {
        font-size: 24px;
        font-weight: bold;
        color: #303133;
        margin: 8px 0;
      }

      .metric-trend {
        font-size: 12px;

        &.up {
          color: #67C23A;
        }
        &.down {
          color: #F56C6C;
        }
      }
    }
  }
}
</style> 