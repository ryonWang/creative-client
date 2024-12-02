<template>
  <div class="task-management">
    <!-- 搜索区域 -->
    <div class="search-bar">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="任务类型">
          <el-select v-model="searchForm.type" placeholder="请选择任务类型">
            <el-option label="全部" value="" />
            <el-option label="单商品铺货" value="single" />
            <el-option label="批量铺货" value="batch" />
          </el-select>
        </el-form-item>
        <el-form-item label="任务状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态">
            <el-option label="全部" value="" />
            <el-option label="待执行" value="pending" />
            <el-option label="执行中" value="running" />
            <el-option label="已完成" value="completed" />
            <el-option label="已失败" value="failed" />
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 任务列表 -->
    <div class="task-list">
      <el-table
        v-loading="loading"
        :data="taskList"
        border
      >
        <el-table-column type="expand">
          <template #default="{ row }">
            <el-descriptions :column="3" border>
              <el-descriptions-item label="目标店铺">
                {{ row.targetShops.join('、') }}
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
              <el-descriptions-item label="创建人">
                {{ row.creator }}
              </el-descriptions-item>
              <el-descriptions-item label="创建时间">
                {{ row.createTime }}
              </el-descriptions-item>
              <el-descriptions-item label="开始时间">
                {{ row.startTime || '-' }}
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
                <div v-for="(error, index) in row.errors" :key="index">
                  <p>{{ error }}</p>
                </div>
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
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button
              type="primary"
              link
              @click="handleDetail(row)"
            >
              详情
            </el-button>
            <el-button
              type="warning"
              link
              @click="handlePause(row)"
              v-if="row.status === 'running'"
            >
              暂停
            </el-button>
            <el-button
              type="success"
              link
              @click="handleResume(row)"
              v-if="row.status === 'paused'"
            >
              继续
            </el-button>
            <el-button
              type="danger"
              link
              @click="handleCancel(row)"
              v-if="['pending', 'running', 'paused'].includes(row.status)"
            >
              取消
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

    <!-- 详情抽屉 -->
    <el-drawer
      :visible.sync="drawerVisible"
      :title="'任务详情'"
      :size="'60%'"
    >
      <div class="task-detail">
        <!-- 任务进度图表 -->
        <div class="chart-container" v-if="currentTask">
          <div class="chart-header">
            <h3>执行进度趋势</h3>
            <el-radio-group v-model="chartTimeRange" size="small">
              <el-radio-button label="1h">1小时</el-radio-button>
              <el-radio-button label="6h">6小时</el-radio-button>
              <el-radio-button label="24h">24小时</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 这里可以集成图表组件 -->
          <div class="chart-placeholder">
            进度趋势图表
          </div>
        </div>

        <!-- 执行日志 -->
        <div class="log-container">
          <h3>执行日志</h3>
          <el-timeline>
            <el-timeline-item
              v-for="log in taskLogs"
              :key="log.time"
              :timestamp="log.time"
              :type="log.type"
            >
              {{ log.content }}
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Message } from 'element-ui'

// 搜索表单
const searchForm = reactive({
  type: '',
  status: '',
  dateRange: []
})

// 表格数据
const loading = ref(false)
const taskList = ref([
  {
    id: 1,
    name: '单品铺货任务',
    type: 'single',
    status: 'running',
    progress: 45,
    targetShops: ['店铺A', '店铺B'],
    productCount: 1,
    successCount: 0,
    priceStrategy: '固定加价 5元',
    stockStrategy: '同步库存',
    interval: 5,
    creator: '张三',
    createTime: '2024-03-20 10:00:00',
    startTime: '2024-03-20 10:01:00',
    processedCount: 0,
    errors: []
  },
  {
    id: 2,
    name: '批量铺货任务',
    type: 'batch',
    status: 'completed',
    progress: 100,
    targetShops: ['店铺A', '店铺C'],
    productCount: 100,
    successCount: 98,
    priceStrategy: '百分比加价 10%',
    stockStrategy: '固定库存 100',
    interval: 10,
    creator: '李四',
    createTime: '2024-03-20 09:00:00',
    startTime: '2024-03-20 09:01:00',
    processedCount: 100,
    errors: ['商品ID:123 铺货失败：库存不足']
  }
])

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

// 详情抽屉
const drawerVisible = ref(false)
const currentTask = ref(null)
const chartTimeRange = ref('1h')
const taskLogs = ref([
  {
    time: '2024-03-20 10:00:00',
    type: 'primary',
    content: '任务开始执行'
  },
  {
    time: '2024-03-20 10:01:00',
    type: 'success',
    content: '商品A铺货成功'
  },
  {
    time: '2024-03-20 10:02:00',
    type: 'warning',
    content: '商品B同步超时，准备重试'
  }
])

// 获取状态样式
const getStatusType = (status) => {
  const types = {
    pending: 'info',
    running: 'primary',
    completed: 'success',
    failed: 'danger',
    paused: 'warning'
  }
  return types[status] || 'info'
}

// 获取状态文本
const getStatusLabel = (status) => {
  const labels = {
    pending: '待执行',
    running: '执行中',
    completed: '已完成',
    failed: '已失败',
    paused: '已暂停'
  }
  return labels[status] || status
}

// 搜索
const handleSearch = async () => {
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
  } catch (error) {
    Message.error('获取任务列表失败')
  } finally {
    loading.value = false
  }
}

// 重置搜索
const resetSearch = () => {
  searchForm.type = ''
  searchForm.status = ''
  searchForm.dateRange = []
  handleSearch()
}

// 获取任务列表
const fetchTaskList = async () => {
  loading.value = true
  try {
    // TODO: 调用获取任务列表接口
    await new Promise(resolve => setTimeout(resolve, 1000))
  } catch (error) {
    Message.error('获取任务列表失败')
  } finally {
    loading.value = false
  }
}

// 查看详情
const handleDetail = (row) => {
  currentTask.value = row
  drawerVisible.value = true
}

// 暂停任务
const handlePause = async (row) => {
  try {
    await Message.confirm('确认暂停该任务吗？')
    // TODO: 调用暂停接口
    Message.success('任务已暂停')
  } catch {
    // 取消操作
  }
}

// 继续任务
const handleResume = async (row) => {
  try {
    await Message.confirm('确认继续执行该任务？')
    // TODO: 调用继续接口
    Message.success('任务已继续执行')
  } catch {
    // 取消操作
  }
}

// 取消任务
const handleCancel = async (row) => {
  try {
    await Message.confirm('确认取消该任务吗？此操作不可恢复！', '警告', {
      type: 'warning'
    })
    // TODO: 调用取消接口
    Message.success('任务已取消')
  } catch {
    // 取消操作
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
.task-management {
  padding: 20px;
}

.search-bar {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.task-list {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
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

.task-detail {
  padding: 20px;
}

.chart-container {
  margin-bottom: 30px;
  
  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h3 {
      margin: 0;
    }
  }

  .chart-placeholder {
    height: 300px;
    background: #f5f7fa;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #909399;
    border-radius: 4px;
  }
}

.log-container {
  h3 {
    margin: 0 0 20px 0;
  }
}
</style> 