<template>
  <div class="log-manage">
    <!-- 搜索区域 -->
    <el-card class="search-card">
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="日志类型">
          <el-select v-model="searchForm.type" placeholder="请选择日志类型" clearable>
            <el-option label="全部" value="" />
            <el-option label="操作日志" value="operation" />
            <el-option label="系统日志" value="system" />
            <el-option label="错误日志" value="error" />
            <el-option label="安全日志" value="security" />
          </el-select>
        </el-form-item>
        <el-form-item label="操作人">
          <el-input v-model="searchForm.operator" placeholder="请输入操作人" />
        </el-form-item>
        <el-form-item label="操作时间">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :shortcuts="dateShortcuts"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
          <el-button type="success" @click="handleExport">导出日志</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 日志列表 -->
    <el-card class="log-list">
      <template #header>
        <div class="card-header">
          <span>日志列表</span>
          <div class="header-right">
            <el-button type="danger" @click="handleClear">清空日志</el-button>
          </div>
        </div>
      </template>

      <el-table
        :data="logList"
        border
        v-loading="loading"
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template #default="{ row }">
            <el-form label-position="left" inline class="log-detail">
              <el-form-item label="请求URL">
                {{ row.requestUrl }}
              </el-form-item>
              <el-form-item label="请求方法">
                {{ row.requestMethod }}
              </el-form-item>
              <el-form-item label="请求参数">
                <el-tag
                  v-for="(value, key) in row.requestParams"
                  :key="key"
                  class="param-tag"
                >
                  {{ key }}: {{ value }}
                </el-tag>
              </el-form-item>
              <el-form-item label="响应结果" v-if="row.response">
                <pre class="response-content">{{ row.response }}</pre>
              </el-form-item>
              <el-form-item label="错误信息" v-if="row.error">
                <pre class="error-content">{{ row.error }}</pre>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="日志ID" width="100" />
        <el-table-column prop="type" label="日志类型" width="120">
          <template #default="{ row }">
            <el-tag :type="getLogType(row.type)">
              {{ getLogTypeLabel(row.type) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="module" label="操作模块" width="150" />
        <el-table-column prop="action" label="操作内容" show-overflow-tooltip />
        <el-table-column prop="operator" label="操作人" width="120" />
        <el-table-column prop="ip" label="IP地址" width="140" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'success' ? 'success' : 'danger'">
              {{ row.status === 'success' ? '成功' : '失败' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="操作时间" width="180" sortable />
        <el-table-column label="操作" width="120" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleDetail(row)">
              详情
            </el-button>
            <el-button type="danger" link @click="handleDelete(row)">
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
    </el-card>

    <!-- 日志详情抽屉 -->
    <el-drawer
      v-model="drawerVisible"
      title="日志详情"
      size="60%"
    >
      <div class="detail-content" v-if="currentLog">
        <el-descriptions title="基本信息" :column="2" border>
          <el-descriptions-item label="日志ID">{{ currentLog.id }}</el-descriptions-item>
          <el-descriptions-item label="日志类型">
            <el-tag :type="getLogType(currentLog.type)">
              {{ getLogTypeLabel(currentLog.type) }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="操作模块">{{ currentLog.module }}</el-descriptions-item>
          <el-descriptions-item label="操作内容">{{ currentLog.action }}</el-descriptions-item>
          <el-descriptions-item label="操作人">{{ currentLog.operator }}</el-descriptions-item>
          <el-descriptions-item label="IP地址">{{ currentLog.ip }}</el-descriptions-item>
          <el-descriptions-item label="操作时间">{{ currentLog.createTime }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag :type="currentLog.status === 'success' ? 'success' : 'danger'">
              {{ currentLog.status === 'success' ? '成功' : '失败' }}
            </el-tag>
          </el-descriptions-item>
        </el-descriptions>

        <el-divider>请求信息</el-divider>
        <el-descriptions :column="1" border>
          <el-descriptions-item label="请求URL">{{ currentLog.requestUrl }}</el-descriptions-item>
          <el-descriptions-item label="请求方法">{{ currentLog.requestMethod }}</el-descriptions-item>
          <el-descriptions-item label="请求参数">
            <el-tag
              v-for="(value, key) in currentLog.requestParams"
              :key="key"
              class="param-tag"
            >
              {{ key }}: {{ value }}
            </el-tag>
          </el-descriptions-item>
        </el-descriptions>

        <el-divider>响应信息</el-divider>
        <div class="response-info">
          <pre class="response-content">{{ currentLog.response }}</pre>
        </div>

        <el-divider v-if="currentLog.error">错误信息</el-divider>
        <div class="error-info" v-if="currentLog.error">
          <pre class="error-content">{{ currentLog.error }}</pre>
        </div>
      </div>
    </el-drawer>

    <!-- 清空确认对话框 -->
    <el-dialog
      v-model="clearDialogVisible"
      title="清空日志"
      width="400px"
    >
      <div class="clear-content">
        <el-alert
          title="确定要清空所有日志吗？"
          type="warning"
          :closable="false"
          show-icon
        >
          <p>此操作将永久删除所有日志记录，是否继续？</p>
        </el-alert>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="clearDialogVisible = false">取消</el-button>
          <el-button
            type="danger"
            @click="confirmClear"
            :loading="clearing"
          >
            确定清空
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Message } from 'element-ui'

// 搜索表单
const searchForm = reactive({
  type: '',
  operator: '',
  dateRange: []
})

// 日期快捷选项
const dateShortcuts = [
  {
    text: '最近一天',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24)
      return [start, end]
    }
  },
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
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    }
  }
]

// 列表数据
const loading = ref(false)
const logList = ref([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)

// 抽屉状态
const drawerVisible = ref(false)
const currentLog = ref(null)

// 清空对话框
const clearDialogVisible = ref(false)
const clearing = ref(false)

// 获取日志类型样式
const getLogType = (type) => {
  const types = {
    operation: 'primary',
    system: 'info',
    error: 'danger',
    security: 'warning'
  }
  return types[type] || 'info'
}

// 获取日志类型文本
const getLogTypeLabel = (type) => {
  const labels = {
    operation: '操作日志',
    system: '系统日志',
    error: '错误日志',
    security: '安全日志'
  }
  return labels[type] || type
}

// 搜索
const handleSearch = () => {
  fetchLogList()
}

// 重置搜索
const resetSearch = () => {
  searchForm.type = ''
  searchForm.operator = ''
  searchForm.dateRange = []
  handleSearch()
}

// 导出���志
const handleExport = () => {
  // TODO: 调用导出接口
  Message.success('日志导出中...')
}

// 获取日志列表
const fetchLogList = async () => {
  loading.value = true
  try {
    // TODO: 调用获取日志列表接口
    await new Promise(resolve => setTimeout(resolve, 1000))
  } catch (error) {
    Message.error('获取数据失败')
  } finally {
    loading.value = false
  }
}

// 查看详情
const handleDetail = (row) => {
  currentLog.value = row
  drawerVisible.value = true
}

// 删除日志
const handleDelete = async (row) => {
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

// 清空日志
const handleClear = async () => {
  try {
    await Message.confirm('确认清空所有日志吗？', '警告', {
      type: 'warning'
    })
    Message.success('日志已清空')
  } catch {
    // 取消操作
  }
}

// 确认清空
const confirmClear = async () => {
  try {
    clearing.value = true
    // TODO: 调用清空接口
    await new Promise(resolve => setTimeout(resolve, 1000))
    Message.success('日志清空成功')
    clearDialogVisible.value = false
    fetchLogList()
  } catch (error) {
    Message.error('清空失败')
  } finally {
    clearing.value = false
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
fetchLogList()
</script>

<style scoped>
.log-manage {
  padding: 20px;
}

.search-card {
  margin-bottom: 20px;
}

.log-list {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.log-detail {
  padding: 20px;
}

.param-tag {
  margin-right: 5px;
  margin-bottom: 5px;
}

.response-content,
.error-content {
  margin: 0;
  padding: 10px;
  background: #f5f7fa;
  border-radius: 4px;
  font-family: monospace;
  white-space: pre-wrap;
  word-break: break-all;
}

.error-content {
  color: #f56c6c;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.detail-content {
  padding: 20px;
}

.response-info,
.error-info {
  margin: 20px 0;
}

.clear-content {
  padding: 20px 0;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style> 