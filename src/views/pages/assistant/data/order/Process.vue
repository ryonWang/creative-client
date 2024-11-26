<template>
  <div class="order-process">
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

    <!-- 搜索区域 -->
    <div class="search-bar">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="订单号">
          <el-input v-model="searchForm.orderId" placeholder="请输入订单号" />
        </el-form-item>
        <el-form-item label="处理状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态">
            <el-option label="全部" value="" />
            <el-option label="待处理" value="pending" />
            <el-option label="处理中" value="processing" />
            <el-option label="已完成" value="completed" />
            <el-option label="已取消" value="cancelled" />
          </el-select>
        </el-form-item>
        <el-form-item label="下单时间">
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

    <!-- 操作按钮 -->
    <div class="operation-bar">
      <el-button type="primary" @click="handleBatchProcess">
        <el-icon><Check /></el-icon>批量处理
      </el-button>
      <el-button type="warning" @click="handleBatchCancel">
        <el-icon><Close /></el-icon>批量取消
      </el-button>
      <el-button type="success" @click="handleExport">
        <el-icon><Download /></el-icon>导出数据
      </el-button>
    </div>

    <!-- 订单列表 -->
    <el-card class="order-list">
      <el-table
        v-loading="loading"
        :data="orderList"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="orderId" label="订单号" width="180" />
        <el-table-column prop="source" label="订单来源" width="120">
          <template #default="{ row }">
            <el-tag>{{ getSourceLabel(row.source) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="处理状态" width="120">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusLabel(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="订单金额" width="120">
          <template #default="{ row }">
            ¥{{ row.amount }}
          </template>
        </el-table-column>
        <el-table-column prop="orderTime" label="下单时间" width="180" />
        <el-table-column prop="processTime" label="处理时间" width="180" />
        <el-table-column prop="remark" label="备注" show-overflow-tooltip />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleDetail(row)">
              详情
            </el-button>
            <el-button
              type="success"
              link
              @click="handleProcess(row)"
              v-if="row.status === 'pending'"
            >
              处理
            </el-button>
            <el-button
              type="warning"
              link
              @click="handleCancel(row)"
              v-if="['pending', 'processing'].includes(row.status)"
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
    </el-card>

    <!-- 处理对话框 -->
    <el-dialog
      :visible.sync="processDialogVisible"
      :title="currentOrder ? `处理订单: ${currentOrder.orderId}` : '处理订单'"
      :width="'600px'"
    >
      <el-form
        ref="processFormRef"
        :model="processForm"
        :rules="processRules"
        label-width="100px"
      >
        <el-form-item label="处理方式" prop="type">
          <el-radio-group v-model="processForm.type">
            <el-radio label="auto">自动处理</el-radio>
            <el-radio label="manual">手动处理</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="处理备注" prop="remark">
          <el-input
            v-model="processForm.remark"
            type="textarea"
            :rows="3"
            placeholder="请输入处理备注"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="processDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitProcess" :loading="submitting">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 订单详情抽屉 -->
    <el-drawer
      :visible.sync="drawerVisible"
      :title="'订单处理'"
      :size="'60%'"
    >
      <div class="order-detail" v-if="currentOrder">
        <el-descriptions title="基本信息" :column="2" border>
          <el-descriptions-item label="订单号">{{ currentOrder.orderId }}</el-descriptions-item>
          <el-descriptions-item label="订单来源">{{ getSourceLabel(currentOrder.source) }}</el-descriptions-item>
          <el-descriptions-item label="订单金额">¥{{ currentOrder.amount }}</el-descriptions-item>
          <el-descriptions-item label="下单时间">{{ currentOrder.orderTime }}</el-descriptions-item>
          <el-descriptions-item label="买家信息">{{ currentOrder.buyer }}</el-descriptions-item>
          <el-descriptions-item label="收货地址">{{ currentOrder.address }}</el-descriptions-item>
        </el-descriptions>

        <el-divider>商品信息</el-divider>
        <el-table :data="currentOrder.items" border>
          <el-table-column prop="name" label="商品名称" />
          <el-table-column prop="sku" label="规格" width="150" />
          <el-table-column prop="price" label="单价" width="100">
            <template #default="{ row }">
              ¥{{ row.price }}
            </template>
          </el-table-column>
          <el-table-column prop="quantity" label="数量" width="100" />
          <el-table-column prop="amount" label="小计" width="100">
            <template #default="{ row }">
              ¥{{ row.amount }}
            </template>
          </el-table-column>
        </el-table>

        <el-divider>处理记录</el-divider>
        <el-timeline>
          <el-timeline-item
            v-for="log in currentOrder.processLogs"
            :key="log.time"
            :timestamp="log.time"
            :type="log.type"
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

// 数据概览
const overviewData = [
  {
    title: '今日订单',
    value: 128,
    icon: 'ShoppingCart',
    type: 'primary'
  },
  {
    title: '待处理',
    value: 25,
    icon: 'Document',
    type: 'warning'
  },
  {
    title: '处理中',
    value: 3,
    icon: 'Timer',
    type: 'info'
  },
  {
    title: '已取消',
    value: 5,
    icon: 'Warning',
    type: 'danger'
  }
]

// 搜索表单
const searchForm = reactive({
  orderId: '',
  status: '',
  dateRange: []
})

// 表格数据
const loading = ref(false)
const orderList = ref([
  {
    orderId: 'DD2024032001',
    source: 'douyin',
    status: 'pending',
    amount: 199.00,
    orderTime: '2024-03-20 10:00:00',
    processTime: null,
    remark: null
  },
  {
    orderId: 'DD2024032002',
    source: 'taobao',
    status: 'completed',
    amount: 299.00,
    orderTime: '2024-03-20 09:00:00',
    processTime: '2024-03-20 09:30:00',
    remark: '自动处理完成'
  }
])

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

// 选中的订单
const selectedOrders = ref([])

// 处理对话框
const processDialogVisible = ref(false)
const submitting = ref(false)
const currentOrder = ref(null)
const processForm = reactive({
  type: 'auto',
  remark: ''
})

// 处理表单验证规则
const processRules = {
  type: [
    { required: true, message: '请选择处理方式', trigger: 'change' }
  ]
}

// 详情抽屉
const drawerVisible = ref(false)

// 获取来源标签
const getSourceLabel = (source) => {
  const sources = {
    douyin: '抖店',
    taobao: '淘宝',
    jd: '京东'
  }
  return sources[source] || source
}

// 获取状态样式
const getStatusType = (status) => {
  const types = {
    pending: 'info',
    processing: 'warning',
    completed: 'success',
    cancelled: 'danger'
  }
  return types[status] || 'info'
}

// 获取状态文本
const getStatusLabel = (status) => {
  const labels = {
    pending: '待处理',
    processing: '处理中',
    completed: '已完成',
    cancelled: '已取消'
  }
  return labels[status] || status
}

// 搜索
const handleSearch = () => {
  fetchOrderList()
}

// 重置搜索
const resetSearch = () => {
  searchForm.orderId = ''
  searchForm.status = ''
  searchForm.dateRange = []
  handleSearch()
}

// 获取订单列表
const fetchOrderList = async () => {
  loading.value = true
  try {
    // TODO: 调用获取订单列表接口
    await new Promise(resolve => setTimeout(resolve, 1000))
  } catch (error) {
    Message.error('获取订单列表失败')
  } finally {
    loading.value = false
  }
}

// 表格选择
const handleSelectionChange = (selection) => {
  selectedOrders.value = selection
}

// 批量处理
const handleBatchProcess = async () => {
  try {
    await Message.confirm('确认批量处理选中的订单吗？', '提示', {
      type: 'warning'
    })
    Message.success('批量处理任务已提交')
  } catch {
    // 取消操作
  }
}

// 批量取消
const handleBatchCancel = async () => {
  if (!selectedOrders.value.length) {
    Message.warning('请选择要取消的订单')
    return
  }
  try {
    await Message.confirm('确认批量取消选中的订单吗？此操作不可恢复！', '警告', {
      type: 'warning'
    })
    // TODO: 调用批量取消接口
    Message.success('批量取消成功')
  } catch {
    // 取消操作
  }
}

// 导出数据
const handleExport = () => {
  // TODO: 调用导出接口
  Message.success('数据导出中...')
}

// 查看详情
const handleDetail = (row) => {
  currentOrder.value = {
    ...row,
    buyer: '张三',
    address: '北京市朝阳区xxx街道xxx号',
    items: [
      {
        name: '测试商品1',
        sku: '红色,M码',
        price: 99.00,
        quantity: 1,
        amount: 99.00
      },
      {
        name: '测试商品2',
        sku: '蓝色,L码',
        price: 100.00,
        quantity: 1,
        amount: 100.00
      }
    ],
    processLogs: [
      {
        time: '2024-03-20 09:30:00',
        type: 'success',
        content: '订单处理完成'
      }
    ]
  }
  drawerVisible.value = true
}

// 处理订单
const handleProcess = (row) => {
  currentOrder.value = row
  processForm.type = 'auto'
  processForm.remark = ''
  processDialogVisible.value = true
}

// 提交处理
const submitProcess = async () => {
  if (!currentOrder.value) return
  
  submitting.value = true
  try {
    // TODO: 调用处理接口
    await new Promise(resolve => setTimeout(resolve, 1000))
    Message.success('订单处理成功')
    processDialogVisible.value = false
    fetchOrderList()
  } catch (error) {
    Message.error('处理失败')
  } finally {
    submitting.value = false
  }
}

// 取消订单
const handleCancel = async (row) => {
  try {
    await Message.confirm('确认取消该订单吗？此操作不可恢复！', '警告', {
      type: 'warning'
    })
    Message.success('订单已取消')
  } catch {
    // 取消操作
  }
}

// 分页相关
const handleSizeChange = (val) => {
  pageSize.value = val
  fetchOrderList()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchOrderList()
}

// 初始化
fetchOrderList()
</script>

<style scoped>
.order-process {
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
    &.warning {
      background-color: rgba(230, 162, 60, 0.1);
      color: #E6A23C;
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

.search-bar {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.operation-bar {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.order-list {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.order-detail {
  padding: 20px;
}
</style> 