<template>
  <div class="price-rule">
    <!-- 规则列表 -->
    <el-card class="rule-list">
      <template #header>
        <div class="card-header">
          <span>价格规则列表</span>
          <el-button type="primary" @click="handleAddRule">
            <el-icon><Plus /></el-icon>新增规则
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
              <el-form-item label="适用商品">
                {{ getRuleScope(row.scope) }}
              </el-form-item>
              <el-form-item label="生效时间">
                {{ row.effectiveTime ? row.effectiveTime : '立即生效' }}
              </el-form-item>
              <el-form-item label="失效时间">
                {{ row.expireTime ? row.expireTime : '永久有效' }}
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
        <el-table-column prop="priority" label="优先级" width="100">
          <template #default="{ row }">
            <el-tag :type="getPriorityType(row.priority)">
              {{ row.priority }}
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
      :title="dialogType === 'add' ? '新增价格规则' : '编辑价格规则'"
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
            <el-option label="固定加价" value="fixed" />
            <el-option label="百分比加价" value="percent" />
            <el-option label="固定价格" value="set" />
            <el-option label="区间加价" value="range" />
          </el-select>
        </el-form-item>

        <!-- 规则配置 -->
        <template v-if="ruleForm.type === 'fixed'">
          <el-form-item label="加价金额" prop="fixedAmount">
            <el-input-number
              v-model="ruleForm.fixedAmount"
              :precision="2"
              :step="0.1"
              :min="0"
            />
            <span class="unit">元</span>
          </el-form-item>
        </template>

        <template v-if="ruleForm.type === 'percent'">
          <el-form-item label="加价比例" prop="percentage">
            <el-input-number
              v-model="ruleForm.percentage"
              :precision="0"
              :step="1"
              :min="0"
              :max="100"
            />
            <span class="unit">%</span>
          </el-form-item>
        </template>

        <template v-if="ruleForm.type === 'set'">
          <el-form-item label="固定价格" prop="setPrice">
            <el-input-number
              v-model="ruleForm.setPrice"
              :precision="2"
              :step="0.1"
              :min="0"
            />
            <span class="unit">元</span>
          </el-form-item>
        </template>

        <template v-if="ruleForm.type === 'range'">
          <el-form-item label="价格区间" prop="ranges">
            <div v-for="(range, index) in ruleForm.ranges" :key="index" class="range-item">
              <el-input-number
                v-model="range.min"
                :precision="2"
                :step="0.1"
                :min="0"
                placeholder="最小值"
              />
              <span class="range-separator">-</span>
              <el-input-number
                v-model="range.max"
                :precision="2"
                :step="0.1"
                :min="0"
                placeholder="最大值"
              />
              <span class="range-separator">加价</span>
              <el-input-number
                v-model="range.amount"
                :precision="2"
                :step="0.1"
                :min="0"
                placeholder="加价金额"
              />
              <el-button type="danger" link @click="removeRange(index)">
                删除
              </el-button>
            </div>
            <el-button type="primary" plain @click="addRange">
              添加区间
            </el-button>
          </el-form-item>
        </template>

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

        <el-form-item label="适用范围" prop="scope">
          <el-radio-group v-model="ruleForm.scope">
            <el-radio label="all">全部商品</el-radio>
            <el-radio label="category">按分类</el-radio>
            <el-radio label="brand">按品牌</el-radio>
            <el-radio label="custom">自定义</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="优先级" prop="priority">
          <el-input-number
            v-model="ruleForm.priority"
            :min="1"
            :max="100"
            :step="1"
          />
          <div class="form-tip">数值越大优先级越高</div>
        </el-form-item>

        <el-form-item label="生效时间">
          <el-date-picker
            v-model="ruleForm.effectiveTime"
            type="datetime"
            placeholder="选择生效时间"
          />
        </el-form-item>

        <el-form-item label="失效时间">
          <el-date-picker
            v-model="ruleForm.expireTime"
            type="datetime"
            placeholder="选择失效时间"
          />
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
import { Plus } from '@element-plus/icons-vue'

// 规则列表数据
const loading = ref(false)
const ruleList = ref([
  {
    id: 1,
    name: '新品固定加价',
    type: 'fixed',
    priority: 90,
    status: 1,
    shops: [
      { id: 1, name: '店铺A' },
      { id: 2, name: '店铺B' }
    ],
    scope: 'category',
    effectiveTime: '2024-03-20 00:00:00',
    expireTime: '2024-12-31 23:59:59'
  },
  {
    id: 2,
    name: '促销商品特价',
    type: 'set',
    priority: 100,
    status: 1,
    shops: [
      { id: 1, name: '店铺A' }
    ],
    scope: 'custom',
    effectiveTime: null,
    expireTime: null
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
  fixedAmount: 0,
  percentage: 0,
  setPrice: 0,
  ranges: [],
  shops: [],
  scope: 'all',
  priority: 1,
  effectiveTime: null,
  expireTime: null
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
  shops: [
    { required: true, message: '请选择适用店铺', trigger: 'change' }
  ]
}

// 获取规则类型文本
const getRuleType = (type) => {
  const types = {
    fixed: '固定加价',
    percent: '百分比加价',
    set: '固定价格',
    range: '区间加价'
  }
  return types[type] || type
}

// 获取规则范围文本
const getRuleScope = (scope) => {
  const scopes = {
    all: '全部商品',
    category: '按分类',
    brand: '按品牌',
    custom: '自定义'
  }
  return scopes[scope] || scope
}

// 获取优先级样式
const getPriorityType = (priority) => {
  if (priority >= 90) return 'danger'
  if (priority >= 70) return 'warning'
  if (priority >= 50) return 'success'
  return 'info'
}

// 添加区间
const addRange = () => {
  ruleForm.ranges.push({
    min: 0,
    max: 0,
    amount: 0
  })
}

// 移除区间
const removeRange = (index) => {
  ruleForm.ranges.splice(index, 1)
}

// 新增规则
const handleAddRule = () => {
  dialogType.value = 'add'
  Object.assign(ruleForm, {
    name: '',
    type: '',
    fixedAmount: 0,
    percentage: 0,
    setPrice: 0,
    ranges: [],
    shops: [],
    scope: 'all',
    priority: 1,
    effectiveTime: null,
    expireTime: null
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
    await Message.confirm('确认删除该规则吗？此操作不可恢复！', '警告', {
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
    Message.success('状态更新成功')
  } catch (error) {
    row.status = !row.status // 恢复状态
    Message.error('状态更新失败')
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
    Message.success(dialogType.value === 'add' ? '规则添加成功' : '规则更新成功')
    dialogVisible.value = false
  } catch (error) {
    console.error(error)
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.price-rule {
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

.range-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.range-separator {
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