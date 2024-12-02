<template>
  <div class="erp-sync">
    <!-- 同步状态卡片 -->
    <el-row :gutter="20" class="status-row">
      <el-col :span="6" v-for="item in statusData" :key="item.title">
        <el-card shadow="hover" class="status-card">
          <div class="card-content">
            <div class="info">
              <div class="title">{{ item.title }}</div>
              <div class="value">{{ item.value }}</div>
              <div class="status" :class="item.status">
                {{ getStatusLabel(item.status) }}
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

    <!-- 同步操作 -->
    <el-card class="sync-card">
      <template #header>
        <div class="card-header">
          <span>同步操作</span>
          <div class="header-right">
            <el-button type="primary" @click="handleSync" :loading="syncing">
              <el-icon><Refresh /></el-icon>开始同步
            </el-button>
            <el-button type="warning" @click="handleStop" :disabled="!syncing">
              <el-icon><CircleClose /></el-icon>停止同步
            </el-button>
          </div>
        </div>
      </template>

      <el-form :inline="true" :model="syncForm" class="sync-form">
        <el-form-item label="同步项目">
          <el-checkbox-group v-model="syncForm.items">
            <el-checkbox label="product">商品数据</el-checkbox>
            <el-checkbox label="inventory">库存数据</el-checkbox>
            <el-checkbox label="order">订单数据</el-checkbox>
            <el-checkbox label="price">价格数据</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="同步方式">
          <el-radio-group v-model="syncForm.mode">
            <el-radio label="increment">增量同步</el-radio>
            <el-radio label="full">全量同步</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="同步时间" v-if="syncForm.mode === 'increment'">
          <el-date-picker
            v-model="syncForm.dateRange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 同步进度 -->
    <el-card class="progress-card" v-if="syncing">
      <template #header>
        <div class="card-header">
          <span>同步进度</span>
          <el-tag :type="syncStatus.type">{{ syncStatus.label }}</el-tag>
        </div>
      </template>

      <div class="progress-list">
        <div
          v-for="(item, index) in progressList"
          :key="index"
          class="progress-item"
        >
          <div class="item-header">
            <span class="item-title">{{ item.title }}</span>
            <span class="item-count">{{ item.current }}/{{ item.total }}</span>
          </div>
          <el-progress
            :percentage="item.percentage"
            :status="item.status"
            :format="(val) => `${val}%`"
          />
          <div class="item-info">
            <span class="info-text">{{ item.info }}</span>
            <span class="time-text">预计剩余时间: {{ item.remainTime }}</span>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 同步日志 -->
    <el-card class="log-card">
      <template #header>
        <div class="card-header">
          <span>同步日志</span>
          <div class="header-right">
            <el-button @click="handleClearLog">清空日志</el-button>
            <el-button type="primary" @click="handleExportLog">导出日志</el-button>
          </div>
        </div>
      </template>

      <el-table
        :data="logList"
        border
        v-loading="loading"
        height="400"
      >
        <el-table-column prop="time" label="时间" width="180" />
        <el-table-column prop="type" label="类型" width="120">
          <template #default="{ row }">
            <el-tag :type="getLogType(row.type)">{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="内容" show-overflow-tooltip />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'success' ? 'success' : 'danger'">
              {{ row.status === 'success' ? '成功' : '失败' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="数量" width="100" />
        <el-table-column label="操作" width="120" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleRetry(row)">
              重试
            </el-button>
            <el-button type="danger" link @click="handleDeleteLog(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Message } from 'element-ui'

// 同步状态数据
const statusData = ref([
  {
    title: '商品同步',
    value: '1,234',
    status: 'success',
    type: 'primary',
    icon: 'shopping-cart'
  },
  {
    title: '库存同步',
    value: '5,678',
    status: 'running',
    type: 'warning',
    icon: 'Box'
  },
  {
    title: '订单同步',
    value: '9,012',
    status: 'error',
    type: 'danger',
    icon: 'Tickets'
  },
  {
    title: '价格同步',
    value: '3,456',
    status: 'pending',
    type: 'info',
    icon: 'DataLine'
  }
])

// 同步表单
const syncForm = reactive({
  items: ['product', 'inventory'],
  mode: 'increment',
  dateRange: []
})

// 同步状态
const syncing = ref(false)
const syncStatus = reactive({
  type: 'warning',
  label: '同步中'
})

// 进度列表
const progressList = ref([
  {
    title: '商品数据同步',
    current: 100,
    total: 1000,
    percentage: 10,
    status: 'success',
    info: '正在同步商品基本信息...',
    remainTime: '约2小时'
  },
  {
    title: '库存数据同步',
    current: 50,
    total: 500,
    percentage: 10,
    status: '',
    info: '等待同步...',
    remainTime: '-'
  }
])

// 日志列表
const loading = ref(false)
const logList = ref([])

// 获取状态标签
const getStatusLabel = (status) => {
  const labels = {
    success: '同步成功',
    running: '同步中',
    error: '同步失败',
    pending: '等待同步'
  }
  return labels[status] || status
}

// 获取日志类型样式
const getLogType = (type) => {
  const types = {
    product: 'primary',
    inventory: 'success',
    order: 'warning',
    price: 'info'
  }
  return types[type] || 'info'
}

// 开始同步
const handleSync = async () => {
  try {
    await Message.confirm('确认同步数据？', '提示', {
      type: 'warning'
    })
    Message.success('同步成功')
  } catch {
    // 取消操作
  }
}

// 停止同步
const handleStop = async () => {
  try {
    await Message.confirm('确认停止当前同步任务吗？', '警告', {
      type: 'warning'
    })
    Message.success('同步任务已停止')
  } catch {
    // 取消操作
  }
}

// 清空日志
const handleClearLog = async () => {
  try {
    await Message.confirm('确认清空所有同步日志吗？', '警告', {
      type: 'warning'
    })
    Message.success('日志已清空')
  } catch {
    // 取消操作
  }
}

// 导出日志
const handleExportLog = () => {
  // TODO: 调用导出接口
  Message.success('日志导出中...')
}

// 重试同步
const handleRetry = async (row) => {
  try {
    // TODO: 调用重试接口
    Message.success('重试任务已提交')
  } catch (error) {
    Message.error('重试失败')
  }
}

// 删除日志
const handleDeleteLog = async (row) => {
  try {
    await ElMessageBox.confirm('确认删除该条日志记录吗？', '警告', {
      type: 'warning'
    })
    // TODO: 调用删除接口
    Message.success('删除成功')
  } catch {
    // 取消删除
  }
}
</script>

<style scoped>
.erp-sync {
  padding: 20px;
}

.status-row {
  margin-bottom: 20px;
}

.status-card {
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
    .status {
      font-size: 12px;
      
      &.success {
        color: #67C23A;
      }
      &.running {
        color: #E6A23C;
      }
      &.error {
        color: #F56C6C;
      }
      &.pending {
        color: #909399;
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
    &.warning {
      color: #E6A23C;
      background-color: rgba(230, 162, 60, 0.1);
    }
    &.danger {
      color: #F56C6C;
      background-color: rgba(245, 108, 108, 0.1);
    }
    &.info {
      color: #909399;
      background-color: rgba(144, 147, 153, 0.1);
    }
  }
}

.sync-card,
.progress-card,
.log-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-right {
  display: flex;
  gap: 10px;
}

.sync-form {
  margin-top: 20px;
}

.progress-list {
  .progress-item {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }

    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      .item-title {
        font-weight: bold;
      }

      .item-count {
        color: #909399;
      }
    }

    .item-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 5px;
      font-size: 12px;
      color: #909399;
    }
  }
}
</style> 