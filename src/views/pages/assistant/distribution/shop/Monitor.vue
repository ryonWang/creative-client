<template>
  <div class="monitor-container">
    <!-- 数据概览 -->
    <el-row :gutter="20" class="data-overview">
      <el-col :span="6" v-for="item in overviewData" :key="item.title">
        <el-card shadow="hover" class="overview-card">
          <div class="card-content">
            <el-icon class="icon" :class="item.type">
              <component :is="item.icon" />
            </el-icon>
            <div class="info">
              <div class="title">{{ item.title }}</div>
              <div class="value">{{ item.value }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 店铺状态列表 -->
    <div class="shop-status">
      <div class="status-header">
        <h3>店铺状态监控</h3>
        <div class="header-right">
          <el-button type="primary" @click="refreshData">
            <el-icon><Refresh /></el-icon>刷新数据
          </el-button>
          <el-radio-group v-model="autoRefresh" size="small">
            <el-radio-button :label="0">手动刷新</el-radio-button>
            <el-radio-button :label="30">30秒</el-radio-button>
            <el-radio-button :label="60">1分钟</el-radio-button>
          </el-radio-group>
        </div>
      </div>

      <el-table :data="shopList" v-loading="loading" border>
        <el-table-column type="expand">
          <template #default="{ row }">
            <div class="detail-info">
              <el-descriptions :column="3" border>
                <el-descriptions-item label="API状态">
                  <el-tag :type="row.apiStatus ? 'success' : 'danger'">
                    {{ row.apiStatus ? '正常' : '异常' }}
                  </el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="最后同步时间">
                  {{ row.lastSyncTime }}
                </el-descriptions-item>
                <el-descriptions-item label="今日同步次数">
                  {{ row.syncCount }}
                </el-descriptions-item>
                <el-descriptions-item label="商品数量">
                  {{ row.productCount }}
                </el-descriptions-item>
                <el-descriptions-item label="待处理订单">
                  {{ row.pendingOrders }}
                </el-descriptions-item>
                <el-descriptions-item label="错误日志">
                  <el-button type="primary" link @click="viewErrorLog(row)">
                    查看日志
                  </el-button>
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="shopName" label="店铺名称" />
        <el-table-column prop="platform" label="平台" width="120">
          <template #default="{ row }">
            <el-tag>{{ row.platform }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="连接状态" width="120">
          <template #default="{ row }">
            <el-tag :type="row.status === 'online' ? 'success' : 'danger'">
              {{ row.status === 'online' ? '在线' : '离线' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="syncStatus" label="同步状态" width="120">
          <template #default="{ row }">
            <el-tag :type="getSyncStatusType(row.syncStatus)">
              {{ row.syncStatus }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleTest(row)">
              测试连接
            </el-button>
            <el-button type="success" link @click="handleSync(row)">
              立即同步
            </el-button>
            <el-button type="warning" link @click="handleConfig(row)">
              配置
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 错误日志对话框 -->
    <el-dialog
      v-model="logDialogVisible"
      title="错误日志"
      width="60%"
    >
      <div class="log-content">
        <el-timeline>
          <el-timeline-item
            v-for="log in errorLogs"
            :key="log.time"
            :timestamp="log.time"
            :type="log.type"
          >
            {{ log.content }}
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import {
  Shop,
  Connection,
  Warning,
  Refresh,
  DataLine
} from '@element-plus/icons-vue'

// 数据概览
const overviewData = [
  {
    title: '店铺总数',
    value: 12,
    icon: 'Shop',
    type: 'primary'
  },
  {
    title: '在线店铺',
    value: 10,
    icon: 'Connection',
    type: 'success'
  },
  {
    title: '异常店铺',
    value: 2,
    icon: 'Warning',
    type: 'danger'
  },
  {
    title: '今日同步次数',
    value: 128,
    icon: 'DataLine',
    type: 'info'
  }
]

// 店铺列表数据
const loading = ref(false)
const shopList = ref([
  {
    id: 1,
    shopName: '测试店铺1',
    platform: '抖店',
    status: 'online',
    syncStatus: '同步成功',
    apiStatus: true,
    lastSyncTime: '2024-03-20 15:30:00',
    syncCount: 24,
    productCount: 1200,
    pendingOrders: 5
  },
  {
    id: 2,
    shopName: '测试店铺2',
    platform: '淘宝',
    status: 'offline',
    syncStatus: '同步失败',
    apiStatus: false,
    lastSyncTime: '2024-03-20 15:00:00',
    syncCount: 20,
    productCount: 800,
    pendingOrders: 3
  }
])

// 自动刷新控制
const autoRefresh = ref(0)
let refreshTimer = null

// 错误日志相关
const logDialogVisible = ref(false)
const errorLogs = ref([
  {
    time: '2024-03-20 15:30:00',
    type: 'warning',
    content: 'API调用超时，请检查网络连接'
  },
  {
    time: '2024-03-20 15:00:00',
    type: 'error',
    content: '商品数据同步失败，错误码: E1001'
  }
])

// 获取同步状态样式
const getSyncStatusType = (status) => {
  const types = {
    '同步成功': 'success',
    '同步中': 'warning',
    '同步失败': 'danger',
    '未同步': 'info'
  }
  return types[status] || 'info'
}

// 查看错误日志
const viewErrorLog = (shop) => {
  // TODO: 加载对应店铺的错误日志
  logDialogVisible.value = true
}

// 测试连接
const handleTest = async (shop) => {
  try {
    // TODO: 调用测试接口
    ElMessage.success('连接测试成功')
  } catch (error) {
    ElMessage.error('连接测试失败')
  }
}

// 立即同步
const handleSync = async (shop) => {
  try {
    // TODO: 调用同步接口
    ElMessage.success('已开始同步')
  } catch (error) {
    ElMessage.error('同步失败')
  }
}

// 配置
const handleConfig = (shop) => {
  // TODO: 跳转到配置页面
}

// 刷新数据
const refreshData = async () => {
  loading.value = true
  try {
    // TODO: 调用刷新接口
    await new Promise(resolve => setTimeout(resolve, 1000))
    ElMessage.success('数据已更新')
  } catch (error) {
    ElMessage.error('刷新失败')
  } finally {
    loading.value = false
  }
}

// 监听自动刷新设置
watch(autoRefresh, (newVal) => {
  if (refreshTimer) {
    clearInterval(refreshTimer)
  }
  if (newVal > 0) {
    refreshTimer = setInterval(refreshData, newVal * 1000)
  }
})

onMounted(() => {
  refreshData()
})

onUnmounted(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer)
  }
})
</script>

<style scoped>
.monitor-container {
  padding: 20px;
}

.data-overview {
  margin-bottom: 20px;
}

.overview-card {
  .card-content {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .icon {
    font-size: 24px;
    padding: 15px;
    border-radius: 8px;
    
    &.primary {
      background-color: rgba(64, 158, 255, 0.1);
      color: #409EFF;
    }
    &.success {
      background-color: rgba(103, 194, 58, 0.1);
      color: #67C23A;
    }
    &.danger {
      background-color: rgba(245, 108, 108, 0.1);
      color: #F56C6C;
    }
    &.info {
      background-color: rgba(144, 147, 153, 0.1);
      color: #909399;
    }
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
      margin-top: 5px;
    }
  }
}

.shop-status {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
}

.status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    margin: 0;
    font-size: 16px;
  }

  .header-right {
    display: flex;
    gap: 15px;
    align-items: center;
  }
}

.detail-info {
  padding: 20px;
}

.log-content {
  max-height: 400px;
  overflow-y: auto;
}
</style> 