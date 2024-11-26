<template>
  <div class="shop-sales">
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
                <el-radio-button label="count">订单量</el-radio-button>
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
              <span>店铺分布</span>
              <el-radio-group v-model="shopChartType" size="small">
                <el-radio-button label="amount">销售额</el-radio-button>
                <el-radio-button label="count">订单量</el-radio-button>
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
          <span>店铺明细</span>
          <el-radio-group v-model="detailType" size="small">
            <el-radio-button label="daily">按日</el-radio-button>
            <el-radio-button label="weekly">按周</el-radio-button>
            <el-radio-button label="monthly">按月</el-radio-button>
          </el-radio-group>
        </div>
      </template>

      <el-table
        :data="shopList"
        border
        v-loading="loading"
      >
        <el-table-column type="expand">
          <template #default="{ row }">
            <el-descriptions :column="3" border>
              <el-descriptions-item label="商品数量">
                {{ row.productCount }}
              </el-descriptions-item>
              <el-descriptions-item label="客户数量">
                {{ row.customerCount }}
              </el-descriptions-item>
              <el-descriptions-item label="平均客单价">
                ¥{{ row.avgOrderAmount }}
              </el-descriptions-item>
              <el-descriptions-item label="退款金额">
                ¥{{ row.refundAmount }}
              </el-descriptions-item>
              <el-descriptions-item label="退款率">
                {{ row.refundRate }}%
              </el-descriptions-item>
              <el-descriptions-item label="转化率">
                {{ row.conversionRate }}%
              </el-descriptions-item>
            </el-descriptions>

            <!-- 商品销售排行 -->
            <div class="product-rank">
              <h4>商品销售排行</h4>
              <el-table :data="row.productRank" border size="small">
                <el-table-column prop="name" label="商品名称" show-overflow-tooltip />
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
        <el-table-column prop="name" label="店铺名称" />
        <el-table-column prop="platform" label="平台" width="120">
          <template #default="{ row }">
            <el-tag>{{ row.platform }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="orderCount" label="订单数" width="120" sortable />
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
        <el-table-column prop="avgOrderAmount" label="平均客单价" width="120" sortable>
          <template #default="{ row }">
            ¥{{ row.avgOrderAmount }}
          </template>
        </el-table-column>
        <el-table-column prop="conversionRate" label="转化率" width="100" sortable>
          <template #default="{ row }">
            {{ row.conversionRate }}%
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
      :title="'店铺详情'"
      :size="'60%'"
    >
      <div class="detail-content" v-if="currentShop">
        <el-descriptions title="基本信息" :column="2" border>
          <el-descriptions-item label="店铺名称">{{ currentShop.name }}</el-descriptions-item>
          <el-descriptions-item label="所属平台">{{ currentShop.platform }}</el-descriptions-item>
          <el-descriptions-item label="销售额">¥{{ currentShop.salesAmount }}</el-descriptions-item>
          <el-descriptions-item label="���单数">{{ currentShop.orderCount }}</el-descriptions-item>
        </el-descriptions>

        <el-divider>销售趋势</el-divider>
        <div class="trend-chart">
          <!-- 这里放趋势图表 -->
          <div class="chart-placeholder">销售趋势图表</div>
        </div>

        <el-divider>商品分类占比</el-divider>
        <div class="category-chart">
          <!-- 这里放饼图 -->
          <div class="chart-placeholder">分类占比图表</div>
        </div>
      </div>
    </el-drawer>

    <!-- 分析对话框 -->
    <el-dialog
      :visible.sync="analysisDialogVisible"
      :title="'销售分析'"
      :width="'800px'"
    >
      <div class="analysis-content" v-if="currentShop">
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

// 店铺列表
const shopList = ref([
  {
    id: 1,
    name: '店铺A',
    platform: '抖店',
    orderCount: 1234,
    salesAmount: 123456.78,
    avgOrderAmount: 100.05,
    conversionRate: 3.5,
    trend: 'up',
    rate: 12.3,
    productCount: 567,
    customerCount: 890,
    refundAmount: 1234.56,
    refundRate: 1.2,
    productRank: [
      {
        name: '测试商品1',
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
  shop: '',
  category: []
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
    title: '订单总数',
    value: '1,234',
    trend: 'up',
    rate: 8.5,
    icon: 'shopping-cart',
    type: 'success'
  },
  {
    title: '客户总数',
    value: '892',
    trend: 'up',
    rate: 6.7,
    icon: 'user',
    type: 'warning'
  },
  {
    title: '商品总数',
    value: '3,456',
    trend: 'down',
    rate: 3.2,
    icon: 'goods',
    type: 'info'
  }
]

// 图表控制
const trendType = ref('amount')
const shopChartType = ref('amount')
const detailType = ref('daily')

// 表格数据
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

// 详情抽屉
const drawerVisible = ref(false)
const currentShop = ref(null)

// 分析对话框
const analysisDialogVisible = ref(false)
const analysisResult = ref([
  '销售额环比增长12.3%，主要来自新品类的增长',
  '客单价有下降趋势，建议优化商品结构',
  '转化率低于平台平均水平，需要改善商品展示'
])

// 关键指标
const keyMetrics = ref([
  {
    title: '访客转化率',
    value: '3.5%',
    trend: 'up',
    rate: 0.5
  },
  {
    title: '平均停留时长',
    value: '2.3分钟',
    trend: 'down',
    rate: 1.2
  },
  {
    title: '复购率',
    value: '35%',
    trend: 'up',
    rate: 5.6
  }
])

// 搜索
const handleSearch = () => {
  fetchShopList()
}

// 重置搜索
const resetSearch = () => {
  searchForm.dateRange = []
  searchForm.shop = ''
  searchForm.category = []
  handleSearch()
}

// 导出报表
const handleExport = () => {
  Message.success('报表导出中...')
}

// 获取店铺列表
const fetchShopList = async () => {
  loading.value = true
  try {
    // TODO: 调用获取店铺列表接口
    await new Promise(resolve => setTimeout(resolve, 1000))
  } catch (error) {
    handleError(error)
  } finally {
    loading.value = false
  }
}

// 查看详情
const handleDetail = (row) => {
  currentShop.value = row
  drawerVisible.value = true
}

// 查看分析
const handleAnalysis = (row) => {
  currentShop.value = row
  analysisDialogVisible.value = true
}

// 分页相关
const handleSizeChange = (val) => {
  pageSize.value = val
  fetchShopList()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchShopList()
}

// 初始化
fetchShopList()
</script>

<style scoped>
.shop-sales {
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

.trend-tag {
  margin-left: 5px;
}

.product-rank {
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
  .category-chart {
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