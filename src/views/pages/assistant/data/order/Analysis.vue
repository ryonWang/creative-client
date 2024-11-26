<template>
  <div class="order-analysis">
    <!-- 统计卡片 -->
    <el-row :gutter="20" class="stat-cards">
      <el-col :span="6" v-for="item in statData" :key="item.title">
        <el-card shadow="hover" class="stat-card">
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
        <el-form-item label="订单来源">
          <el-select v-model="searchForm.source" placeholder="请选择来源" clearable>
            <el-option label="全部" value="" />
            <el-option label="抖店" value="douyin" />
            <el-option label="淘宝" value="taobao" />
            <el-option label="京东" value="jd" />
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="全部" value="" />
            <el-option label="待付款" value="unpaid" />
            <el-option label="待发货" value="unshipped" />
            <el-option label="已发货" value="shipped" />
            <el-option label="已完成" value="completed" />
            <el-option label="已取消" value="cancelled" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
          <el-button type="success" @click="handleExport">导出数据</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 图表区域 -->
    <el-row :gutter="20" class="chart-row">
      <el-col :span="16">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>订单趋势</span>
              <el-radio-group v-model="trendType" size="small">
                <el-radio-button label="amount">金额</el-radio-button>
                <el-radio-button label="count">数量</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div class="chart-container">
            <!-- 这里放趋势图表 -->
            <div class="chart-placeholder">订单趋势图表</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>来源分布</span>
              <el-select v-model="sourceChartType" size="small" style="width: 100px">
                <el-option label="订单数量" value="count" />
                <el-option label="订单金额" value="amount" />
              </el-select>
            </div>
          </template>
          <div class="chart-container">
            <!-- 这里放饼图 -->
            <div class="chart-placeholder">来源分布图表</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 数据明细 -->
    <el-card class="detail-card">
      <template #header>
        <div class="card-header">
          <span>数据明细</span>
          <el-radio-group v-model="detailType" size="small">
            <el-radio-button label="daily">按日</el-radio-button>
            <el-radio-button label="weekly">按周</el-radio-button>
            <el-radio-button label="monthly">按月</el-radio-button>
          </el-radio-group>
        </div>
      </template>
      
      <el-table
        :data="detailList"
        border
        v-loading="loading"
        style="width: 100%"
      >
        <el-table-column prop="date" label="日期" width="120" />
        <el-table-column prop="orderCount" label="订单数" width="100">
          <template #default="{ row }">
            {{ row.orderCount }}
            <el-tag
              size="small"
              :type="row.countTrend === 'up' ? 'success' : 'danger'"
              class="trend-tag"
            >
              {{ row.countTrend === 'up' ? '↑' : '↓' }}{{ row.countRate }}%
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="orderAmount" label="订单金额" width="150">
          <template #default="{ row }">
            ¥{{ row.orderAmount }}
            <el-tag
              size="small"
              :type="row.amountTrend === 'up' ? 'success' : 'danger'"
              class="trend-tag"
            >
              {{ row.amountTrend === 'up' ? '↑' : '↓' }}{{ row.amountRate }}%
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="avgAmount" label="平均客单价" width="120">
          <template #default="{ row }">
            ¥{{ row.avgAmount }}
          </template>
        </el-table-column>
        <el-table-column label="来源分布">
          <template #default="{ row }">
            <el-tooltip
              v-for="source in row.sources"
              :key="source.name"
              :content="`${source.name}: ${source.value}个`"
              placement="top"
            >
              <el-tag size="small" class="source-tag">
                {{ source.name }}({{ source.value }})
              </el-tag>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="状态分布">
          <template #default="{ row }">
            <el-tooltip
              v-for="status in row.status"
              :key="status.name"
              :content="`${status.name}: ${status.value}个`"
              placement="top"
            >
              <el-tag
                size="small"
                :type="getStatusType(status.type)"
                class="status-tag"
              >
                {{ status.name }}({{ status.value }})
              </el-tag>
            </el-tooltip>
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
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Message } from 'element-ui'

// 统计数据
const statData = [
  {
    title: '单总额',
    value: '¥128,930',
    trend: 'up',
    rate: 12.3,
    icon: 'Money',
    type: 'primary'
  },
  {
    title: '订单数量',
    value: '1,234',
    trend: 'up',
    rate: 8.5,
    icon: 'ShoppingCart',
    type: 'success'
  },
  {
    title: '商品数量',
    value: '3,456',
    trend: 'down',
    rate: 3.2,
    icon: 'Goods',
    type: 'warning'
  },
  {
    title: '客户数量',
    value: '892',
    trend: 'up',
    rate: 6.7,
    icon: 'User',
    type: 'info'
  }
]

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

// 搜索表单
const searchForm = reactive({
  dateRange: [],
  source: '',
  status: ''
})

// 图表控制
const trendType = ref('amount')
const sourceChartType = ref('count')
const detailType = ref('daily')

// 表格数据
const loading = ref(false)
const detailList = ref([
  {
    date: '2024-03-20',
    orderCount: 128,
    countTrend: 'up',
    countRate: 12.5,
    orderAmount: 12930.00,
    amountTrend: 'up',
    amountRate: 15.8,
    avgAmount: 101.02,
    sources: [
      { name: '抖店', value: 50 },
      { name: '淘宝', value: 45 },
      { name: '京东', value: 33 }
    ],
    status: [
      { name: '待付款', value: 20, type: 'warning' },
      { name: '待发货', value: 50, type: 'primary' },
      { name: '已完成', value: 58, type: 'success' }
    ]
  }
])

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

// 获取状态样式
const getStatusType = (type) => {
  const types = {
    warning: 'warning',
    primary: 'primary',
    success: 'success',
    danger: 'danger'
  }
  return types[type] || 'info'
}

// 搜索
const handleSearch = () => {
  fetchDetailList()
}

// 重置搜索
const resetSearch = () => {
  searchForm.dateRange = []
  searchForm.source = ''
  searchForm.status = ''
  handleSearch()
}

// 导出数据
const handleExport = () => {
  Message.success('数据导出中...')
}

// 获取数据列表
const fetchDetailList = async () => {
  loading.value = true
  try {
    // TODO: 调用获取数据列表接口
    await new Promise(resolve => setTimeout(resolve, 1000))
  } catch (error) {
    handleError(error)
  } finally {
    loading.value = false
  }
}

// 分页相关
const handleSizeChange = (val) => {
  pageSize.value = val
  fetchDetailList()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchDetailList()
}

// 初始化
fetchDetailList()
</script>

<style scoped>
.order-analysis {
  padding: 20px;
}

.stat-cards {
  margin-bottom: 20px;
}

.stat-card {
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

.search-card {
  margin-bottom: 20px;
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

.source-tag,
.status-tag {
  margin-right: 5px;
  margin-bottom: 5px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style> 