<template>
  <div class="inventory-turnover">
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
            :picker-options="{ shortcuts: dateShortcuts }"
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
        <el-form-item label="周转状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="全部" value="" />
            <el-option label="良好" value="good" />
            <el-option label="正常" value="normal" />
            <el-option label="缓慢" value="slow" />
            <el-option label="积压" value="stagnant" />
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
            <i :class="[
              'el-icon-' + item.icon.toLowerCase(), 
              'icon',
              item.type
            ]"></i>
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
              <span>周转趋势</span>
              <el-radio-group v-model="trendType" size="small">
                <el-radio-button label="rate">周转率</el-radio-button>
                <el-radio-button label="days">周转天数</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div class="chart-container">
            <!-- 这里放折线图 -->
            <div class="chart-placeholder">周转趋势图表</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>分类分布</span>
              <el-radio-group v-model="categoryChartType" size="small">
                <el-radio-button label="rate">周转率</el-radio-button>
                <el-radio-button label="days">周转天数</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div class="chart-container">
            <!-- 这里放饼图 -->
            <div class="chart-placeholder">分类分布图表</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 数据明细 -->
    <el-card class="detail-card">
      <template #header>
        <div class="card-header">
          <span>周转明细</span>
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
              <el-descriptions-item label="期初库存">
                {{ row.beginStock }}
              </el-descriptions-item>
              <el-descriptions-item label="期末库存">
                {{ row.endStock }}
              </el-descriptions-item>
              <el-descriptions-item label="平均库存">
                {{ row.avgStock }}
              </el-descriptions-item>
              <el-descriptions-item label="销售数量">
                {{ row.salesCount }}
              </el-descriptions-item>
              <el-descriptions-item label="销售金额">
                ¥{{ row.salesAmount }}
              </el-descriptions-item>
              <el-descriptions-item label="库存金额">
                ¥{{ row.stockAmount }}
              </el-descriptions-item>
            </el-descriptions>

            <!-- 周转趋势 -->
            <div class="turnover-trend">
              <h4>周转趋势</h4>
              <div class="trend-chart">
                <!-- 这里放折线图 -->
                <div class="chart-placeholder">周转趋势图表</div>
              </div>
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
        <el-table-column prop="turnoverRate" label="周转率" width="120" sortable>
          <template #default="{ row }">
            {{ row.turnoverRate }}次
            <el-tag
              size="small"
              :type="row.trend === 'up' ? 'success' : 'danger'"
              class="trend-tag"
            >
              {{ row.trend === 'up' ? '↑' : '↓' }}{{ row.rate }}%
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="turnoverDays" label="周转天数" width="120" sortable>
          <template #default="{ row }">
            {{ row.turnoverDays }}天
          </template>
        </el-table-column>
        <el-table-column prop="status" label="周转状态" width="100">
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
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
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
      :title="'周转详情'"
      :size="'60%'"
    >
      <div class="detail-content" v-if="currentProduct">
        <el-descriptions title="基本信息" :column="2" border>
          <el-descriptions-item label="商品名称">{{ currentProduct.name }}</el-descriptions-item>
          <el-descriptions-item label="商品分类">{{ currentProduct.category }}</el-descriptions-item>
          <el-descriptions-item label="周转率">{{ currentProduct.turnoverRate }}次</el-descriptions-item>
          <el-descriptions-item label="周转天数">{{ currentProduct.turnoverDays }}天</el-descriptions-item>
        </el-descriptions>

        <el-divider>周转趋势</el-divider>
        <div class="trend-chart">
          <!-- 这里放趋势图表 -->
          <div class="chart-placeholder">周转趋势图表</div>
        </div>

        <el-divider>库存变动</el-divider>
        <div class="stock-chart">
          <!-- 这里放折线图 -->
          <div class="chart-placeholder">库存变动图表</div>
        </div>
      </div>
    </el-drawer>

    <!-- 分析对话框 -->
    <el-dialog
      :visible.sync="analysisDialogVisible"
      :title="'周转分析'"
      :width="'800px'"
    >
      <div class="analysis-content" v-if="currentProduct">
        <el-alert
          title="周转分析建议"
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
    turnoverRate: 3.5,
    turnoverDays: 30,
    status: 'good',
    trend: 'up',
    rate: 12.3,
    sku: 'SKU001',
    beginStock: 1000,
    endStock: 800,
    avgStock: 900,
    salesCount: 200,
    salesAmount: 19999.99,
    stockAmount: 89999.99,
    createTime: '2024-01-01'
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
    title: '平均周转率',
    value: '3.5次',
    trend: 'up',
    rate: 12.3,
    icon: 'data-line',
    type: 'primary'
  },
  {
    title: '平均周转天数',
    value: '30天',
    trend: 'down',
    rate: 8.5,
    icon: 'time',
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
    title: '��存总额',
    value: '��128,930',
    trend: 'up',
    rate: 5.6,
    icon: 'money',
    type: 'info'
  }
]

// 图表控制
const trendType = ref('rate')
const categoryChartType = ref('rate')
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
  '周转率环比增长12.3%，库存管理效率提升',
  '当前周转天数高于行业平均水平，建议优化库存',
  '部分商品存在积压风险，需要加强促销力度'
])

// 关键指标
const keyMetrics = ref([
  {
    title: '库存周转率',
    value: '3.5次',
    trend: 'up',
    rate: 0.5
  },
  {
    title: '库存积压率',
    value: '15%',
    trend: 'down',
    rate: 2.1
  },
  {
    title: '库存金额',
    value: '¥89,999',
    trend: 'down',
    rate: 1.5
  }
])

// 获取状态样式
const getStatusType = (status) => {
  const types = {
    good: 'success',
    normal: 'warning',
    slow: 'danger',
    stagnant: 'info'
  }
  return types[status] || 'info'
}

// 获取状态文本
const getStatusLabel = (status) => {
  const labels = {
    good: '良好',
    normal: '正常',
    slow: '缓慢',
    stagnant: '积压'
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
    await new Promise(resolve => setTimeout(resolve, 1000))
  } catch (error) {
    Message.error('获取数据失败')
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
</script>

<style scoped>
.inventory-turnover {
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

.turnover-trend {
  margin: 20px;

  h4 {
    margin: 0 0 10px 0;
    color: #303133;
  }

  .trend-chart {
    height: 200px;
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
  .stock-chart {
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