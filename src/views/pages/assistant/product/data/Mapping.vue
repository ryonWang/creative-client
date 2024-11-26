<template>
  <div class="data-mapping">
    <!-- 映射配置卡片 -->
    <el-card class="mapping-config">
      <template #header>
        <div class="card-header">
          <span>数据映射配置</span>
          <div class="header-right">
            <el-button @click="loadTemplate">加载模板</el-button>
            <el-button type="primary" @click="saveMapping" :loading="saving">
              保存配置
            </el-button>
          </div>
        </div>
      </template>

      <!-- 数据源选择 -->
      <el-form :model="configForm" label-width="120px" class="source-select">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="源数据类型">
              <el-select v-model="configForm.sourceType" @change="handleSourceChange">
                <el-option label="ERP系统" value="erp" />
                <el-option label="Excel文件" value="excel" />
                <el-option label="API接口" value="api" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="目标数据类型">
              <el-select v-model="configForm.targetType" @change="handleTargetChange">
                <el-option label="平台商品" value="platform" />
                <el-option label="店铺商品" value="shop" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- 字段映射表格 -->
      <div class="mapping-table">
        <el-table :data="mappingList" border>
          <el-table-column label="源字段" width="200">
            <template #default="{ row }">
              <el-select v-model="row.sourceField" filterable placeholder="请选择源字段">
                <el-option
                  v-for="field in sourceFields"
                  :key="field.value"
                  :label="field.label"
                  :value="field.value"
                >
                  <span>{{ field.label }}</span>
                  <span class="field-type">{{ field.type }}</span>
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="目标字段" width="200">
            <template #default="{ row }">
              <el-select v-model="row.targetField" filterable placeholder="请选择目标字段">
                <el-option
                  v-for="field in targetFields"
                  :key="field.value"
                  :label="field.label"
                  :value="field.value"
                >
                  <span>{{ field.label }}</span>
                  <span class="field-type">{{ field.type }}</span>
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="转换规则" width="200">
            <template #default="{ row }">
              <el-select v-model="row.convertRule" placeholder="请选择转换规则">
                <el-option label="直接映射" value="direct" />
                <el-option label="数值转换" value="number" />
                <el-option label="日期转换" value="date" />
                <el-option label="枚举映射" value="enum" />
                <el-option label="自定义函数" value="custom" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="规则配置">
            <template #default="{ row }">
              <!-- 数值转换配置 -->
              <template v-if="row.convertRule === 'number'">
                <el-input-number
                  v-model="row.config.multiplier"
                  :precision="2"
                  :step="0.1"
                  placeholder="倍数"
                  style="width: 120px"
                />
                <span class="rule-text">×</span>
                <span class="rule-text">+</span>
                <el-input-number
                  v-model="row.config.addition"
                  :precision="2"
                  :step="1"
                  placeholder="加数"
                  style="width: 120px"
                />
              </template>
              <!-- 日期转换配置 -->
              <template v-if="row.convertRule === 'date'">
                <el-select v-model="row.config.sourceFormat" placeholder="源格式" style="width: 150px">
                  <el-option label="YYYY-MM-DD" value="YYYY-MM-DD" />
                  <el-option label="YYYY/MM/DD" value="YYYY/MM/DD" />
                  <el-option label="时间戳(秒)" value="timestamp_s" />
                  <el-option label="时间戳(毫秒)" value="timestamp_ms" />
                </el-select>
                <span class="rule-text">→</span>
                <el-select v-model="row.config.targetFormat" placeholder="目标格式" style="width: 150px">
                  <el-option label="YYYY-MM-DD" value="YYYY-MM-DD" />
                  <el-option label="YYYY/MM/DD" value="YYYY/MM/DD" />
                  <el-option label="时间戳(秒)" value="timestamp_s" />
                  <el-option label="时间戳(毫秒)" value="timestamp_ms" />
                </el-select>
              </template>
              <!-- 枚举映射配置 -->
              <template v-if="row.convertRule === 'enum'">
                <el-button @click="editEnumMapping(row)">配置枚举映射</el-button>
              </template>
              <!-- 自定义函数配置 -->
              <template v-if="row.convertRule === 'custom'">
                <el-button @click="editCustomFunction(row)">编辑转换函数</el-button>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="默认值" width="150">
            <template #default="{ row }">
              <el-input v-model="row.defaultValue" placeholder="请输入默认值" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template #default="{ $index }">
              <el-button type="danger" link @click="removeMapping($index)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="table-footer">
          <el-button type="primary" plain @click="addMapping">
            添加映射
          </el-button>
        </div>
      </div>
    </el-card>

    <!-- 枚举映射对话框 -->
    <el-dialog
      v-model="enumDialogVisible"
      title="枚举映射配置"
      width="600px"
    >
      <div class="enum-mapping">
        <div v-for="(item, index) in currentEnumMapping" :key="index" class="enum-item">
          <el-input v-model="item.source" placeholder="源值" style="width: 200px" />
          <span class="mapping-arrow">→</span>
          <el-input v-model="item.target" placeholder="目标值" style="width: 200px" />
          <el-button type="danger" link @click="removeEnumItem(index)">
            删除
          </el-button>
        </div>
        <el-button type="primary" plain @click="addEnumItem">
          添加映射项
        </el-button>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="enumDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveEnumMapping">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 自定义函数对话框 -->
    <el-dialog
      v-model="functionDialogVisible"
      title="自定义转换函数"
      width="800px"
    >
      <div class="function-editor">
        <el-input
          v-model="currentFunction"
          type="textarea"
          :rows="10"
          placeholder="请输入JavaScript转换函数，函数接收sourceValue作为参数，返回转换后的值"
        />
        <div class="function-tips">
          <p>示例函数：</p>
          <pre>
function convert(sourceValue) {
  // 在这里编写转换逻辑
  return sourceValue;
}
          </pre>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="functionDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveFunctionMapping">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

// 配置表单
const configForm = reactive({
  sourceType: 'erp',
  targetType: 'platform'
})

// 映射列表
const mappingList = ref([
  {
    sourceField: 'name',
    targetField: 'title',
    convertRule: 'direct',
    defaultValue: '',
    config: {}
  }
])

// 源字段列表
const sourceFields = ref([
  { label: '商品名称', value: 'name', type: 'string' },
  { label: '商品编码', value: 'code', type: 'string' },
  { label: '销售价格', value: 'price', type: 'number' },
  { label: '创建时间', value: 'createTime', type: 'date' }
])

// 目标字段列表
const targetFields = ref([
  { label: '商品标题', value: 'title', type: 'string' },
  { label: '商品货号', value: 'sku', type: 'string' },
  { label: '售价', value: 'price', type: 'number' },
  { label: '上架时间', value: 'onlineTime', type: 'date' }
])

// 对话框控制
const enumDialogVisible = ref(false)
const functionDialogVisible = ref(false)
const saving = ref(false)

// 当前编辑的枚举映射
const currentEnumMapping = ref([])
const currentMappingRow = ref(null)

// 当前编辑的自定义函数
const currentFunction = ref('')

// 处理数据源变更
const handleSourceChange = (value) => {
  // TODO: 加载对应数据源的字段列表
  ElMessage.success(`已切换到${value}数据源`)
}

// 处理目标源变更
const handleTargetChange = (value) => {
  // TODO: 加载对应目标的字段列表
  ElMessage.success(`已切换到${value}目标源`)
}

// 添加映射
const addMapping = () => {
  mappingList.value.push({
    sourceField: '',
    targetField: '',
    convertRule: 'direct',
    defaultValue: '',
    config: {}
  })
}

// 移除映射
const removeMapping = (index) => {
  mappingList.value.splice(index, 1)
}

// 编辑枚举映射
const editEnumMapping = (row) => {
  currentMappingRow.value = row
  currentEnumMapping.value = row.config.enumMapping || [{ source: '', target: '' }]
  enumDialogVisible.value = true
}

// 添加枚举映射项
const addEnumItem = () => {
  currentEnumMapping.value.push({ source: '', target: '' })
}

// 移除枚举映射项
const removeEnumItem = (index) => {
  currentEnumMapping.value.splice(index, 1)
}

// 保存枚举映射
const saveEnumMapping = () => {
  if (currentMappingRow.value) {
    currentMappingRow.value.config.enumMapping = currentEnumMapping.value
  }
  enumDialogVisible.value = false
}

// 编辑自定义函数
const editCustomFunction = (row) => {
  currentMappingRow.value = row
  currentFunction.value = row.config.function || ''
  functionDialogVisible.value = true
}

// 保存自定义函数
const saveFunctionMapping = () => {
  if (currentMappingRow.value) {
    currentMappingRow.value.config.function = currentFunction.value
  }
  functionDialogVisible.value = false
}

// 加载模板
const loadTemplate = () => {
  // TODO: 加载映射模板
  ElMessage.success('模板加载成功')
}

// 保存配置
const saveMapping = async () => {
  saving.value = true
  try {
    // TODO: 调用保存接口
    await new Promise(resolve => setTimeout(resolve, 1000))
    ElMessage.success('配置保存成功')
  } catch (error) {
    ElMessage.error('保存失败')
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.data-mapping {
  padding: 20px;
}

.mapping-config {
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

.source-select {
  margin-bottom: 20px;
}

.mapping-table {
  .field-type {
    margin-left: 10px;
    color: #909399;
    font-size: 12px;
  }

  .rule-text {
    margin: 0 10px;
    color: #909399;
  }
}

.table-footer {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.enum-mapping {
  .enum-item {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }

  .mapping-arrow {
    color: #909399;
  }
}

.function-editor {
  .function-tips {
    margin-top: 20px;
    padding: 10px;
    background: #f5f7fa;
    border-radius: 4px;

    p {
      margin: 0 0 10px 0;
      color: #909399;
    }

    pre {
      margin: 0;
      color: #606266;
    }
  }
}
</style> 