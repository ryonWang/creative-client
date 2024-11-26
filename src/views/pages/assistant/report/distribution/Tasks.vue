<template>
  <div class="tasks-report">
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
        <el-form-item label="任务类型">
          <el-select v-model="searchForm.type" placeholder="请选择类型" clearable>
            <el-option label="全部" value="" />
            <el-option label="单商品铺货" value="single" />
            <el-option label="批量铺货" value="batch" />
          </el-select>
        </el-form-item>
        <el-form-item label="任务状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="全部" value="" />
            <el-option label="待执行" value="pending" />
            <el-option label="执行中" value="running" />
            <el-option label="已完成" value="completed" />
            <el-option label="已失败" value="failed" />
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
      <el-col :span="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>任务执行趋势</span>
              <el-radio-group v-model="trendType" size="small">
                <el-radio-button label="count">数量</el-radio-button>
                <el-radio-button label="time">耗时</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div class="chart-container">
            <!-- 这里放折线图 -->
            <div class="chart-placeholder">任务趋势图表</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>任务状态分布</span>
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
    </el-row>

    <!-- 数据明细 -->
    <el-card class="detail-card">
      <template #header>
        <div class="card-header">
          <span>任务明细</span>
          <el-radio-group v-model="detailType" size="small">
            <el-radio-button label="daily">按日</el-radio-button>
            <el-radio-button label="weekly">按周</el-radio-button>
            <el-radio-button label="monthly">按月</el-radio-button>
          </el-radio-group>
        </div>
      </template>

      <el-table
        :data="taskList"
        border
        v-loading="loading"
      >
        <el-table-column type="expand">
          <template #default="{ row }">
            <el-descriptions :column="3" border>
              <el-descriptions-item label="目标店铺">
                <el-tag
                  v-for="shop in row.shops"
                  :key="shop.id"
                  class="shop-tag"
                >
                  {{ shop.name }}
                </el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="商品数量">
                {{ row.productCount }}
              </el-descriptions-item>
              <el-descriptions-item label="成功数量">
                {{ row.successCount }}
              </el-descriptions-item>
              <el-descriptions-item label="价格策略">
                {{ row.priceStrategy }}
              </el-descriptions-item>
              <el-descriptions-item label="库存策略">
                {{ row.stockStrategy }}
              </el-descriptions-item>
              <el-descriptions-item label="执行间隔">
                {{ row.interval }}秒
              </el-descriptions-item>
            </el-descriptions>

            <!-- 进度展示 -->
            <div class="progress-info" v-if="row.status === 'running'">
              <el-progress
                :percentage="row.progress"
                :status="row.progress === 100 ? 'success' : ''"
              />
              <div class="progress-detail">
                已处理: {{ row.processedCount }}/{{ row.productCount }}
              </div>
            </div>

            <!-- 错误信息 -->
            <div class="error-info" v-if="row.errors && row.errors.length">
              <el-alert
                title="执行过程中出现以下错误"
                type="error"
                :closable="false"
                show-icon
              >
                <p v-for="(error, index) in row.errors" :key="index">
                  {{ error }}
                </p>
              </el-alert>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="任务ID" width="100" />
        <el-table-column prop="name" label="任务名称" show-overflow-tooltip />
        <el-table-column prop="type" label="任务类型" width="120">
          <template #default="{ row }">
            <el-tag :type="row.type === 'single' ? 'success' : 'warning'">
              {{ row.type === 'single' ? '单商品' : '批量' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="任务状态" width="120">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusLabel(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="progress" label="进度" width="200">
          <template #default="{ row }">
            <el-progress
              v-if="row.status === 'running'"
              :percentage="row.progress"
              :status="row.progress === 100 ? 'success' : ''"
            />
            <span v-else>{{ row.progress }}%</span>
          </template>
        </el-table-column>
        <el-table-column prop="creator" label="创建人" width="120" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
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
      :title="'任务详情'"
      :size="'60%'"
    >
      <div class="detail-content" v-if="currentTask">
        <el-descriptions title="基本信息" :column="2" border>
          <el-descriptions-item label="任务名称">{{ currentTask.name }}</el-descriptions-item>
          <el-descriptions-item label="任务类型">
            <el-tag :type="currentTask.type === 'single' ? 'success' : 'warning'">
              {{ currentTask.type === 'single' ? '单商品' : '批量' }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="任务状态">
            <el-tag :type="getStatusType(currentTask.status)">
              {{ getStatusLabel(currentTask.status) }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="商品数量">{{ currentTask.productCount }}</el-descriptions-item>
        </el-descriptions>

        <el-divider>执行记录</el-divider>
        <el-timeline>
          <el-timeline-item
            v-for="log in currentTask.logs"
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

// 搜索表单
const searchForm = reactive({
  dateRange: [],
  type: '',
  status: ''
})

// 汇总数据
const summaryData = [
  {
    title: '任务总数',
    value: '1,234',
    trend: 'up',
    rate: 12.3,
    icon: 'document',
    type: 'primary'
  },
  {
    title: '执行中任务',
    value: '56',
    trend: 'up',
    rate: 8.5,
    icon: 'time',
    type: 'warning'
  },
  {
    title: '成功任务',
    value: '892',
    trend: 'up',
    rate: 15.2,
    icon: 'goods',
    type: 'success'
  },
  {
    title: '失败任务',
    value: '12',
    trend: 'down',
    rate: 6.7,
    icon: 'warning',
    type: 'danger'
  }
]

// 图表控制
const trendType = ref('count')
const statusChartType = ref('count')
const detailType = ref('daily')

// 表格数据
const loading = ref(false)
const taskList = ref([
  {
    id: 1,
    name: '测试任务1',
    type: 'batch',
    status: 'completed',
    progress: 100,
    creator: '张三',
    createTime: '2024-03-20 10:00:00',
    shops: [
      { id: 1, name: '店铺A' },
      { id: 2, name: '店铺B' }
    ],
    productCount: 100,
    successCount: 98,
    priceStrategy: '固定加价',
    stockStrategy: '同步库存',
    interval: 5,
    errors: [
      '商品编码不存在',
      '库存不足'
    ]
  }
])

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

// 详情抽屉
const drawerVisible = ref(false)
const currentTask = ref(null)

// 获取状态样式
const getStatusType = (status) => {
  const types = {
    pending: 'info',
    running: 'warning',
    completed: 'success',
    failed: 'danger'
  }
  return types[status] || 'info'
}

// 获取状态文本
const getStatusLabel = (status) => {
  const labels = {
    pending: '待执行',
    running: '执行中',
    completed: '已完成',
    failed: '已失败'
  }
  return labels[status] || status
}

// 搜索
const handleSearch = () => {
  fetchTaskList()
}

// 重置搜索
const resetSearch = () => {
  searchForm.dateRange = []
  searchForm.type = ''
  searchForm.status = ''
  handleSearch()
}

// 导出报表
const handleExport = () => {
  Message.success('报表导出中...')
}

// 获取任务列表
const fetchTaskList = async () => {
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
  currentTask.value = {
    ...row,
    logs: [
      {
        time: '2024-03-20 10:00:00',
        status: 'success',
        content: '开始执行任务'
      },
      {
        time: '2024-03-20 10:30:00',
        status: 'success',
        content: '任务执行完成'
      }
    ]
  }
  drawerVisible.value = true
}

// 重试任务
const handleRetry = async (row) => {
  try {
    // TODO: 调用重试接口
    Message.success('重试任务已提交')
  } catch (error) {
    Message.error('重试失败')
  }
}

// 分页相关
const handleSizeChange = (val) => {
  pageSize.value = val
  fetchTaskList()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchTaskList()
}

// 初始化
fetchTaskList()
</script>

<style scoped>
.tasks-report {
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

.shop-tag {
  margin-right: 5px;
  margin-bottom: 5px;
}

.progress-info {
  margin: 20px 0;
  padding: 0 20px;
}

.progress-detail {
  margin-top: 10px;
  color: #909399;
  font-size: 14px;
}

.error-info {
  margin: 20px;
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