<template>
  <div class="shop-sync">
    <!-- 店铺选择 -->
    <el-card class="shop-card">
      <template #header>
        <div class="card-header">
          <span>店铺选择</span>
          <el-button type="primary" @click="handleBatchSync" :loading="syncing">
            <i class="el-icon-refresh"></i>批量同步
          </el-button>
        </div>
      </template>

      <el-table
        :data="shopList"
        border
        v-loading="loading"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="name" label="店铺名称" />
        <el-table-column prop="platform" label="平台" width="120">
          <template #default="{ row }">
            <el-tag>{{ row.platform }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="lastSync" label="最后同步" width="180" />
        <el-table-column prop="status" label="同步状态" width="120">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusLabel(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button
              type="primary"
              link
              @click="handleSync(row)"
              :loading="row.syncing"
            >
              同步
            </el-button>
            <el-button type="success" link @click="handleConfig(row)">
              <i class="el-icon-setting"></i>配置
            </el-button>
            <el-button type="warning" link @click="handleLog(row)">
              日志
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 同步配置对话框 -->
    <el-dialog
      :visible.sync="configDialogVisible"
      :title="currentShop ? `${currentShop.name} - 同步配置` : '同步配置'"
      width="600px"
    >
      <el-form
        ref="configFormRef"
        :model="configForm"
        :rules="configRules"
        label-width="120px"
      >
        <el-form-item label="同步项目">
          <el-checkbox-group v-model="configForm.items">
            <el-checkbox label="product">商品数据</el-checkbox>
            <el-checkbox label="inventory">库存数据</el-checkbox>
            <el-checkbox label="order">订单数据</el-checkbox>
            <el-checkbox label="price">价格数据</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="同步频率" prop="interval">
          <el-select v-model="configForm.interval" placeholder="请选择同步频率">
            <el-option label="每5分钟" value="5min" />
            <el-option label="每15分钟" value="15min" />
            <el-option label="每30分钟" value="30min" />
            <el-option label="每小时" value="1hour" />
            <el-option label="每天" value="1day" />
          </el-select>
        </el-form-item>
        <el-form-item label="错误重试" prop="retry">
          <el-input-number
            v-model="configForm.retry"
            :min="0"
            :max="5"
            :step="1"
          />
          <span class="unit">次</span>
        </el-form-item>
        <el-form-item label="超时时间" prop="timeout">
          <el-input-number
            v-model="configForm.timeout"
            :min="1"
            :max="60"
            :step="1"
          />
          <span class="unit">秒</span>
        </el-form-item>
        <el-form-item label="错误通知">
          <el-checkbox-group v-model="configForm.notify">
            <el-checkbox label="email">邮件通知</el-checkbox>
            <el-checkbox label="sms">短信通知</el-checkbox>
            <el-checkbox label="wechat">微信通知</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="configDialogVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="saveConfig"
            :loading="saving"
          >
            保存
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 同步日志抽屉 -->
    <el-drawer
      :visible.sync="logDrawerVisible"
      :title="currentShop ? `${currentShop.name} - 同步日志` : '同步日志'"
      size="60%"
    >
      <div class="log-content">
        <!-- 日志筛选 -->
        <el-form :inline="true" :model="logForm" class="log-form">
          <el-form-item label="日志类型">
            <el-select v-model="logForm.type" placeholder="请选择类型" clearable>
              <el-option label="全部" value="" />
              <el-option label="商品同步" value="product" />
              <el-option label="库存同步" value="inventory" />
              <el-option label="订单同步" value="order" />
              <el-option label="价格同步" value="price" />
            </el-select>
          </el-form-item>
          <el-form-item label="同步状态">
            <el-select v-model="logForm.status" placeholder="请选择状态" clearable>
              <el-option label="全部" value="" />
              <el-option label="成功" value="success" />
              <el-option label="失败" value="error" />
            </el-select>
          </el-form-item>
          <el-form-item label="时间范围">
            <el-date-picker
              v-model="logForm.dateRange"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchLog">查询</el-button>
            <el-button @click="resetLog">重置</el-button>
          </el-form-item>
        </el-form>

        <!-- 日志列表 -->
        <el-table
          :data="logList"
          border
          v-loading="logLoading"
          style="width: 100%"
        >
          <el-table-column prop="time" label="时间" width="180" />
          <el-table-column prop="type" label="类型" width="120">
            <template #default="{ row }">
              <el-tag :type="getLogType(row.type)">
                {{ getLogTypeLabel(row.type) }}
              </el-tag>
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
              <el-button
                type="primary"
                link
                @click="handleRetry(row)"
                v-if="row.status === 'error'"
              >
                重试
              </el-button>
              <el-button type="danger" link @click="handleDeleteLog(row)">
                删除
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
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Message } from 'element-ui'

// 店铺列表
const loading = ref(false)
const shopList = ref([])
const selectedShops = ref([])

// 同步状态
const syncing = ref(false)

// 配置对话框
const configDialogVisible = ref(false)
const currentShop = ref(null)
const saving = ref(false)

// 配置表单
const configForm = reactive({
  items: ['product', 'inventory'],
  interval: '30min',
  retry: 3,
  timeout: 30,
  notify: ['email']
})

// 配置规则
const configRules = {
  interval: [
    { required: true, message: '请选择同步频率', trigger: 'change' }
  ],
  retry: [
    { required: true, message: '请设置重试次数', trigger: 'change' }
  ],
  timeout: [
    { required: true, message: '请设置超时时间', trigger: 'change' }
  ]
}

// 日志抽屉
const logDrawerVisible = ref(false)
const logLoading = ref(false)
const logList = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 日志筛选
const logForm = reactive({
  type: '',
  status: '',
  dateRange: []
})

// 获取状态样式
const getStatusType = (status) => {
  const types = {
    success: 'success',
    running: 'warning',
    error: 'danger',
    pending: 'info'
  }
  return types[status] || 'info'
}

// 获取状态文本
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

// 获取日志类型文本
const getLogTypeLabel = (type) => {
  const labels = {
    product: '商品同步',
    inventory: '库存同步',
    order: '订单同步',
    price: '价格同步'
  }
  return labels[type] || type
}

// 选择变更
const handleSelectionChange = (selection) => {
  selectedShops.value = selection
}

// 批量同步
const handleBatchSync = async () => {
  if (!selectedShops.value.length) {
    Message.warning('请选择要同步的店铺')
    return
  }

  try {
    syncing.value = true
    // TODO: 调用批量同步接口
    await new Promise(resolve => setTimeout(resolve, 1000))
    Message.success('同步任务已启动')
  } catch (error) {
    Message.error('同步启动失败')
  } finally {
    syncing.value = false
  }
}

// 单店铺同步
const handleSync = async (row) => {
  try {
    await Message.confirm('确认同步数据？', '提示', {
      type: 'warning'
    })
    Message.success('同步成功')
  } catch {
    // 取消操作
  }
}

// 配置同步
const handleConfig = (row) => {
  currentShop.value = row
  // TODO: 加载店铺配置
  configDialogVisible.value = true
}

// 保存配置
const saveConfig = async () => {
  if (!currentShop.value) return
  
  try {
    saving.value = true
    // TODO: 调用保存接口
    await new Promise(resolve => setTimeout(resolve, 1000))
    Message.success('配置保存成功')
    configDialogVisible.value = false
  } catch (error) {
    Message.error('保存失败')
  } finally {
    saving.value = false
  }
}

// 查看日志
const handleLog = (row) => {
  currentShop.value = row
  logDrawerVisible.value = true
  fetchLogList()
}

// 搜索日志
const searchLog = () => {
  currentPage.value = 1
  fetchLogList()
}

// 重置日志搜索
const resetLog = () => {
  logForm.type = ''
  logForm.status = ''
  logForm.dateRange = []
  searchLog()
}

// 获取日志列表
const fetchLogList = async () => {
  logLoading.value = true
  try {
    // TODO: 调用获取日志列表接口
    await new Promise(resolve => setTimeout(resolve, 1000))
  } catch (error) {
    Message.error('获取数据失败')
  } finally {
    logLoading.value = false
  }
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
    await Message.confirm('确认删除该条日志记录吗？', '警告', {
      type: 'warning'
    })
    // TODO: 调用删除接口
    Message.success('删除成功')
    fetchLogList()
  } catch {
    // 取消删除
  }
}

// 分页相关
const handleSizeChange = (val) => {
  pageSize.value = val
  fetchLogList()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchLogList()
}

// 初始化
const fetchShopList = async () => {
  loading.value = true
  try {
    // TODO: 调用获取店铺列表接口
    await new Promise(resolve => setTimeout(resolve, 1000))
  } catch (error) {
    Message.error('获取数据失败')
  } finally {
    loading.value = false
  }
}

fetchShopList()
</script>

<style scoped>
.shop-sync {
  padding: 20px;
}

.shop-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.unit {
  margin-left: 10px;
  color: #909399;
}

.log-content {
  padding: 20px;
}

.log-form {
  margin-bottom: 20px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style> 