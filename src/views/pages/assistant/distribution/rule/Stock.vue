<template>
  <div class="stock-rule">
    <!-- 规则列表 -->
    <el-card class="rule-list">
      <template #header>
        <div class="card-header">
          <span>库存规则列表</span>
          <el-button type="primary" @click="handleAddRule">
            <i class="el-icon-plus"></i>新增规则
          </el-button>
        </div>
      </template>

      <el-table :data="ruleList" border v-loading="loading">
        <el-table-column type="expand">
          <template #default="{ row }">
            <el-form label-position="left" inline class="rule-detail">
              <el-form-item label="适用店铺">
                <el-tag
                  v-for="shop in row.shops"
                  :key="shop.id"
                  class="shop-tag"
                >
                  {{ shop.name }}
                </el-tag>
              </el-form-item>
              <el-form-item label="同步频率">
                {{ getSyncFrequency(row.frequency) }}
              </el-form-item>
              <el-form-item label="预警阈值">
                {{ row.warningThreshold ? `${row.warningThreshold}件` : '未设置' }}
              </el-form-item>
              <el-form-item label="安全库存">
                {{ row.safetyStock ? `${row.safetyStock}件` : '未设置' }}
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="规则名称" />
        <el-table-column prop="type" label="规则类型" width="120">
          <template #default="{ row }">
            <el-tag>{{ getRuleType(row.type) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="strategy" label="库存策略" width="120">
          <template #default="{ row }">
            <el-tag :type="getStrategyType(row.strategy)">
              {{ getStrategyLabel(row.strategy) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-switch
              v-model="row.status"
              :active-value="1"
              :inactive-value="0"
              @change="handleStatusChange(row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button type="success" link @click="handleCopy(row)">
              复制
            </el-button>
            <el-button type="danger" link @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 规则配置对话框 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogType === 'add' ? '新增库存规则' : '编辑库存规则'"
      :width="'800px'"
    >
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="规则名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入规则名称" />
        </el-form-item>
        <el-form-item label="规则类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择规则类型">
            <el-option label="实时同步" value="realtime" />
            <el-option label="定时同步" value="scheduled" />
            <el-option label="阈值同步" value="threshold" />
          </el-select>
        </el-form-item>

        <!-- 同步策略配置 -->
        <el-form-item label="库存策略" prop="strategy">
          <el-select v-model="ruleForm.strategy" placeholder="请选择库存策略">
            <el-option label="完全同步" value="full" />
            <el-option label="百分比同步" value="percent" />
            <el-option label="固定库存" value="fixed" />
            <el-option label="区间控制" value="range" />
          </el-select>
        </el-form-item>

        <!-- 策略配置 -->
        <template v-if="ruleForm.strategy === 'percent'">
          <el-form-item label="同步比例" prop="percentage">
            <el-input-number
              v-model="ruleForm.percentage"
              :min="0"
              :max="100"
              :step="1"
            />
            <span class="unit">%</span>
          </el-form-item>
        </template>

        <template v-if="ruleForm.strategy === 'fixed'">
          <el-form-item label="固定库存" prop="fixedStock">
            <el-input-number
              v-model="ruleForm.fixedStock"
              :min="0"
              :step="1"
            />
            <span class="unit">件</span>
          </el-form-item>
        </template>

        <template v-if="ruleForm.strategy === 'range'">
          <el-form-item label="库存区间" prop="stockRange">
            <el-input-number
              v-model="ruleForm.stockRange.min"
              :min="0"
              :step="1"
              placeholder="最小库存"
            />
            <span class="range-separator">-</span>
            <el-input-number
              v-model="ruleForm.stockRange.max"
              :min="0"
              :step="1"
              placeholder="最大库存"
            />
            <span class="unit">件</span>
          </el-form-item>
        </template>

        <!-- 同步设置 -->
        <template v-if="ruleForm.type === 'scheduled'">
          <el-form-item label="同步频率" prop="frequency">
            <el-select v-model="ruleForm.frequency" placeholder="请选择同步频率">
              <el-option label="每5分钟" value="5min" />
              <el-option label="每15分钟" value="15min" />
              <el-option label="每30分钟" value="30min" />
              <el-option label="每小时" value="1hour" />
              <el-option label="每天" value="1day" />
            </el-select>
          </el-form-item>
        </template>

        <template v-if="ruleForm.type === 'threshold'">
          <el-form-item label="预警阈值" prop="warningThreshold">
            <el-input-number
              v-model="ruleForm.warningThreshold"
              :min="0"
              :step="1"
            />
            <span class="unit">件</span>
          </el-form-item>
        </template>

        <el-form-item label="安全库存" prop="safetyStock">
          <el-input-number
            v-model="ruleForm.safetyStock"
            :min="0"
            :step="1"
          />
          <span class="unit">件</span>
          <div class="form-tip">低于安全库存时将触发预警</div>
        </el-form-item>

        <el-form-item label="适用店铺" prop="shops">
          <el-select
            v-model="ruleForm.shops"
            multiple
            placeholder="请选择适用店铺"
          >
            <el-option
              v-for="shop in shopList"
              :key="shop.id"
              :label="shop.name"
              :value="shop.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="库存不足时">
          <el-radio-group v-model="ruleForm.outOfStockAction">
            <el-radio label="warning">仅预警</el-radio>
            <el-radio label="offline">自动下架</el-radio>
            <el-radio label="stop">暂停铺货</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit" :loading="submitting">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Message } from 'element-ui'

// 规则列表数据
const loading = ref(false)
const ruleList = ref([
  {
    id: 1,
    name: '实时库存同步',
    type: 'realtime',
    strategy: 'full',
    status: 1,
    shops: [
      { id: 1, name: '店铺A' },
      { id: 2, name: '店铺B' }
    ],
    frequency: null,
    warningThreshold: 10,
    safetyStock: 20
  },
  {
    id: 2,
    name: '定时库存更新',
    type: 'scheduled',
    strategy: 'percent',
    status: 1,
    shops: [
      { id: 1, name: '店铺A' }
    ],
    frequency: '30min',
    percentage: 80,
    warningThreshold: null,
    safetyStock: 50
  }
])

// 店铺列表
const shopList = [
  { id: 1, name: '店铺A' },
  { id: 2, name: '店铺B' },
  { id: 3, name: '店铺C' }
]

// 对话框控制
const dialogVisible = ref(false)
const dialogType = ref('add')
const submitting = ref(false)
const ruleFormRef = ref()

// 表单数据
const ruleForm = reactive({
  name: '',
  type: '',
  strategy: '',
  percentage: 100,
  fixedStock: 0,
  stockRange: {
    min: 0,
    max: 0
  },
  frequency: '',
  warningThreshold: null,
  safetyStock: null,
  shops: [],
  outOfStockAction: 'warning'
})

// 表单验证规则
const rules = {
  name: [
    { required: true, message: '请输入规则名称', trigger: 'blur' },
    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  type: [
    { required: true, message: '请选择规则类型', trigger: 'change' }
  ],
  strategy: [
    { required: true, message: '请选择库存策略', trigger: 'change' }
  ],
  shops: [
    { required: true, message: '请选择适用店铺', trigger: 'change' }
  ]
}

// 获取规则类型文本
const getRuleType = (type) => {
  const types = {
    realtime: '实时同步',
    scheduled: '定时同步',
    threshold: '阈值同步'
  }
  return types[type] || type
}

// 获取同步频率文本
const getSyncFrequency = (frequency) => {
  const frequencies = {
    '5min': '每5分钟',
    '15min': '每15分钟',
    '30min': '每30分钟',
    '1hour': '每小时',
    '1day': '每天'
  }
  return frequencies[frequency] || '实时'
}

// 获取策略类型样式
const getStrategyType = (strategy) => {
  const types = {
    full: 'primary',
    percent: 'success',
    fixed: 'warning',
    range: 'info'
  }
  return types[strategy] || 'info'
}

// 获取策略文本
const getStrategyLabel = (strategy) => {
  const labels = {
    full: '完全同步',
    percent: '百分比同步',
    fixed: '固定库存',
    range: '区间控制'
  }
  return labels[strategy] || strategy
}

// 新增规则
const handleAddRule = () => {
  dialogType.value = 'add'
  Object.assign(ruleForm, {
    name: '',
    type: '',
    strategy: '',
    percentage: 100,
    fixedStock: 0,
    stockRange: {
      min: 0,
      max: 0
    },
    frequency: '',
    warningThreshold: null,
    safetyStock: null,
    shops: [],
    outOfStockAction: 'warning'
  })
  dialogVisible.value = true
}

// 编辑规则
const handleEdit = (row) => {
  dialogType.value = 'edit'
  Object.assign(ruleForm, row)
  dialogVisible.value = true
}

// 复制规则
const handleCopy = (row) => {
  dialogType.value = 'add'
  const copy = { ...row }
  copy.name = `${copy.name}_复制`
  Object.assign(ruleForm, copy)
  dialogVisible.value = true
}

// 删除规则
const handleDelete = async (row) => {
  try {
    await Message.confirm('确认删除该规则吗？', '警告', {
      type: 'warning'
    })
    Message.success('删除成功')
  } catch {
    // 取消删除
  }
}

// 状态变更
const handleStatusChange = async (row) => {
  try {
    // TODO: 调用状态更新接口
    ElMessage.success('状态更新成功')
  } catch (error) {
    row.status = !row.status // 恢复状态
    ElMessage.error('状态更新失败')
  }
}

// 提交表单
const handleSubmit = async () => {
  if (!ruleFormRef.value) return
  
  try {
    await ruleFormRef.value.validate()
    submitting.value = true
    // TODO: 调用保存接口
    await new Promise(resolve => setTimeout(resolve, 1000))
    ElMessage.success(dialogType.value === 'add' ? '规则添加成功' : '规则更新成功')
    dialogVisible.value = false
  } catch (error) {
    console.error(error)
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.stock-rule {
  padding: 20px;
}

.rule-list {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rule-detail {
  padding: 20px;
}

.shop-tag {
  margin-right: 5px;
  margin-bottom: 5px;
}

.range-separator {
  margin: 0 10px;
  color: #909399;
}

.unit {
  margin-left: 10px;
  color: #909399;
}

.form-tip {
  margin-top: 5px;
  color: #909399;
  font-size: 12px;
}
</style> 