<template>
  <div class="data-import">
    <!-- 导入配置 -->
    <el-card class="import-config">
      <template #header>
        <div class="card-header">
          <span>数据导入配置</span>
          <el-button type="primary" @click="startImport" :loading="importing">
            开始导入
          </el-button>
        </div>
      </template>

      <el-form :model="configForm" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="数据来源">
              <el-select v-model="configForm.source" placeholder="请选择数据来源">
                <el-option label="Excel文件" value="excel" />
                <el-option label="ERP系统" value="erp" />
                <el-option label="API接口" value="api" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="导入模式">
              <el-select v-model="configForm.mode" placeholder="请选择导入模式">
                <el-option label="新增" value="create" />
                <el-option label="更新" value="update" />
                <el-option label="新增或更新" value="upsert" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- Excel导入配置 -->
        <template v-if="configForm.source === 'excel'">
          <el-form-item label="文件上传">
            <el-upload
              class="upload-excel"
              action="#"
              :auto-upload="false"
              :on-change="handleFileChange"
              :limit="1"
              accept=".xlsx,.xls"
            >
              <template #trigger>
                <el-button type="primary">选择文件</el-button>
              </template>
              <template #tip>
                <div class="el-upload__tip">
                  只能上传xlsx/xls文件，且不超过10MB
                  <el-link type="primary" @click="downloadTemplate">
                    下载模板
                  </el-link>
                </div>
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item label="字段映射">
            <el-table :data="fieldMappings" border>
              <el-table-column label="Excel字段" prop="excelField" />
              <el-table-column label="系统字段" prop="systemField">
                <template #default="{ row }">
                  <el-select v-model="row.systemField" placeholder="请选择">
                    <el-option
                      v-for="field in systemFields"
                      :key="field.value"
                      :label="field.label"
                      :value="field.value"
                    />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="是否必填" width="100">
                <template #default="{ row }">
                  <el-switch v-model="row.required" />
                </template>
              </el-table-column>
              <el-table-column label="默认值">
                <template #default="{ row }">
                  <el-input v-model="row.defaultValue" placeholder="请输入默认值" />
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </template>

        <!-- ERP导入配置 -->
        <template v-if="configForm.source === 'erp'">
          <el-form-item label="数据范围">
            <el-radio-group v-model="configForm.scope">
              <el-radio label="all">全部商品</el-radio>
              <el-radio label="incremental">增量同步</el-radio>
              <el-radio label="custom">自定义条件</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="同步时间" v-if="configForm.scope === 'incremental'">
            <el-date-picker
              v-model="configForm.syncTime"
              type="datetime"
              placeholder="选择同步起始时间"
            />
          </el-form-item>
        </template>

        <!-- API导入配置 -->
        <template v-if="configForm.source === 'api'">
          <el-form-item label="API地址">
            <el-input v-model="configForm.apiUrl" placeholder="请输入API地址" />
          </el-form-item>
          <el-form-item label="认证信息">
            <el-input v-model="configForm.apiToken" placeholder="请输入认证Token" />
          </el-form-item>
        </template>

        <!-- 通用配置 -->
        <el-divider>导入选项</el-divider>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="导入数量">
              <el-input-number
                v-model="configForm.limit"
                :min="0"
                placeholder="0表示不限制"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="失败处理">
              <el-select v-model="configForm.errorHandle" placeholder="请选择">
                <el-option label="继续执行" value="continue" />
                <el-option label="终止导入" value="stop" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="导入后状态">
              <el-select v-model="configForm.initialStatus" placeholder="请选择">
                <el-option label="待审核" value="pending" />
                <el-option label="直接上架" value="online" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <!-- 导入历史 -->
    <el-card class="import-history">
      <template #header>
        <div class="card-header">
          <span>导入历史</span>
          <el-button @click="refreshHistory">
            <i class="el-icon-refresh"></i>
            刷新
          </el-button>
        </div>
      </template>

      <el-table :data="importHistory" border>
        <el-table-column prop="id" label="任务ID" width="100" />
        <el-table-column prop="source" label="数据来源" width="120">
          <template #default="{ row }">
            <el-tag>{{ getSourceLabel(row.source) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusLabel(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="total" label="总数量" width="100" />
        <el-table-column prop="success" label="成功数" width="100" />
        <el-table-column prop="failed" label="失败数" width="100" />
        <el-table-column prop="creator" label="创建人" width="120" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="viewDetail(row)">
              详情
            </el-button>
            <el-button
              type="success"
              link
              @click="downloadResult(row)"
              v-if="row.status === 'completed'"
            >
              导出结果
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 详情抽屉 -->
    <el-drawer
      v-model="drawerVisible"
      title="导入详情"
      size="60%"
    >
      <div class="import-detail">
        <!-- 导入进度 -->
        <div class="progress-info" v-if="currentTask?.status === 'processing'">
          <el-progress
            :percentage="currentTask.progress"
            :status="currentTask.progress === 100 ? 'success' : ''"
          />
          <div class="progress-detail">
            已处理: {{ currentTask.processed }}/{{ currentTask.total }}
          </div>
        </div>

        <!-- 错误记录 -->
        <div class="error-list" v-if="currentTask?.errors?.length">
          <h3>错误记录</h3>
          <el-table :data="currentTask.errors" border>
            <el-table-column prop="row" label="行号" width="80" />
            <el-table-column prop="field" label="字段" width="120" />
            <el-table-column prop="value" label="值" width="150" />
            <el-table-column prop="message" label="错误信息" />
          </el-table>
        </div>

        <!-- 导入日志 -->
        <div class="import-log">
          <h3>导入日志</h3>
          <el-timeline>
            <el-timeline-item
              v-for="log in importLogs"
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

// 导入配置
const configForm = reactive({
  source: 'excel',
  mode: 'create',
  scope: 'all',
  syncTime: '',
  apiUrl: '',
  apiToken: '',
  limit: 0,
  errorHandle: 'continue',
  initialStatus: 'pending'
})

// 字段映射
const fieldMappings = ref([
  { excelField: '商品名称', systemField: 'name', required: true, defaultValue: '' },
  { excelField: '商品分类', systemField: 'category', required: true, defaultValue: '' },
  { excelField: '品牌', systemField: 'brand', required: false, defaultValue: '' }
])

// 系统字段
const systemFields = [
  { label: '商品名称', value: 'name' },
  { label: '商品分类', value: 'category' },
  { label: '品牌', value: 'brand' },
  { label: '售价', value: 'price' },
  { label: '库存', value: 'stock' }
]

// 导入历史
const importHistory = ref([
  {
    id: 1,
    source: 'excel',
    status: 'completed',
    total: 100,
    success: 98,
    failed: 2,
    creator: '张三',
    createTime: '2024-03-20 10:00:00',
    errors: [
      { row: 2, field: 'price', value: 'abc', message: '价格格式不正确' },
      { row: 5, field: 'category', value: '', message: '分类不能为空' }
    ]
  },
  {
    id: 2,
    source: 'erp',
    status: 'processing',
    total: 500,
    success: 200,
    failed: 0,
    creator: '李四',
    createTime: '2024-03-20 09:00:00',
    progress: 40,
    processed: 200
  }
])

// 详情抽屉
const drawerVisible = ref(false)
const currentTask = ref(null)
const importLogs = ref([
  {
    time: '2024-03-20 10:00:00',
    type: 'primary',
    content: '开始导入数据'
  },
  {
    time: '2024-03-20 10:01:00',
    type: 'success',
    content: '成功导入98条数据'
  },
  {
    time: '2024-03-20 10:01:30',
    type: 'warning',
    content: '发现2条错误数据'
  }
])

// 状态控制
const importing = ref(false)

// 获取来源标签
const getSourceLabel = (source) => {
  const labels = {
    excel: 'Excel文件',
    erp: 'ERP系统',
    api: 'API接口'
  }
  return labels[source] || source
}

// 获取状态样式
const getStatusType = (status) => {
  const types = {
    pending: 'info',
    processing: 'primary',
    completed: 'success',
    failed: 'danger'
  }
  return types[status] || 'info'
}

// 获取状态文本
const getStatusLabel = (status) => {
  const labels = {
    pending: '待执行',
    processing: '进行中',
    completed: '已完成',
    failed: '已失败'
  }
  return labels[status] || status
}

// 文件变更
const handleFileChange = (file) => {
  // TODO: 处理文件上传
  console.log('Selected file:', file)
}

// 下载模板
const downloadTemplate = () => {
  // TODO: 下载导入模板
  Message.success('模板下载中...')
}

// 开始导入
const startImport = async () => {
  importing.value = true
  try {
    // TODO: 调用导入接口
    await new Promise(resolve => setTimeout(resolve, 2000))
    Message.success('导入任务已提交')
  } catch (error) {
    Message.error('导入失败')
  } finally {
    importing.value = false
  }
}

// 刷新历史
const refreshHistory = () => {
  // TODO: 刷新导入历史
  Message.success('刷新成功')
}

// 查看详情
const viewDetail = (row) => {
  currentTask.value = row
  drawerVisible.value = true
}

// 导出结果
const downloadResult = (row) => {
  // TODO: 导出导入结果
  Message.success('导出中...')
}
</script>

<style scoped>
.data-import {
  padding: 20px;
}

.import-config,
.import-history {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.upload-excel {
  :deep(.el-upload-list) {
    margin-top: 10px;
  }
}

.el-upload__tip {
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress-info {
  margin-bottom: 30px;
}

.progress-detail {
  margin-top: 10px;
  color: #909399;
  font-size: 14px;
}

.error-list,
.import-log {
  margin-top: 30px;

  h3 {
    margin: 0 0 20px 0;
    font-size: 16px;
    color: #303133;
  }
}
</style> 