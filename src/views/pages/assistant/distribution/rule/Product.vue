<template>
  <div class="product-rule">
    <!-- 规则列表 -->
    <el-card class="rule-card">
      <template #header>
        <div class="card-header">
          <span>规则列表</span>
          <el-button type="primary" @click="handleAdd">
            新增规则
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
              <el-form-item label="处理字段">
                <el-tag
                  v-for="field in row.fields"
                  :key="field"
                  class="field-tag"
                >
                  {{ getFieldLabel(field) }}
                </el-tag>
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
      v-model="dialogVisible"
      :title="dialogType === 'add' ? '新增商品信息规则' : '编辑商品信息规则'"
      width="800px"
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
          <el-select v-model="ruleForm.type" placeholder="请选择规则���型">
            <el-option label="标题优化" value="title" />
            <el-option label="描述生成" value="description" />
            <el-option label="关键词提取" value="keywords" />
            <el-option label="分类映射" value="category" />
            <el-option label="属性转换" value="attribute" />
          </el-select>
        </el-form-item>

        <el-form-item label="处理字段" prop="fields">
          <el-select
            v-model="ruleForm.fields"
            multiple
            placeholder="请选择需要处理的字段"
          >
            <el-option
              v-for="field in availableFields"
              :key="field.value"
              :label="field.label"
              :value="field.value"
            />
          </el-select>
        </el-form-item>

        <!-- 规则配置 -->
        <template v-if="ruleForm.type === 'title'">
          <el-form-item label="标题模板" prop="titleTemplate">
            <el-input
              v-model="ruleForm.titleTemplate"
              type="textarea"
              :rows="3"
              placeholder="支持变量: {品牌} {商品名} {规格} {材质}"
            />
            <div class="form-tip">示例: {品牌}{商品名} {规格}cm 高品质{材质}材质</div>
          </el-form-item>
          <el-form-item label="标题长度">
            <el-input-number
              v-model="ruleForm.titleLength"
              :min="10"
              :max="100"
              :step="1"
            />
            <span class="unit">字</span>
          </el-form-item>
        </template>

        <template v-if="ruleForm.type === 'description'">
          <el-form-item label="描述模板" prop="descTemplate">
            <el-input
              v-model="ruleForm.descTemplate"
              type="textarea"
              :rows="5"
              placeholder="支持变量和Markdown格式"
            />
          </el-form-item>
          <el-form-item label="AI优化">
            <el-switch v-model="ruleForm.aiOptimize" />
            <div class="form-tip">开启后将使用AI对描述进行优化</div>
          </el-form-item>
        </template>

        <template v-if="ruleForm.type === 'keywords'">
          <el-form-item label="关键词数量">
            <el-input-number
              v-model="ruleForm.keywordCount"
              :min="1"
              :max="10"
              :step="1"
            />
            <span class="unit">个</span>
          </el-form-item>
          <el-form-item label="提取来源">
            <el-checkbox-group v-model="ruleForm.keywordSources">
              <el-checkbox label="title">商品标题</el-checkbox>
              <el-checkbox label="description">商品描述</el-checkbox>
              <el-checkbox label="category">商品分类</el-checkbox>
              <el-checkbox label="attributes">商品属性</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </template>

        <template v-if="ruleForm.type === 'category'">
          <el-form-item label="分类映射" prop="categoryMappings">
            <div v-for="(mapping, index) in ruleForm.categoryMappings" :key="index" class="mapping-item">
              <el-cascader
                v-model="mapping.source"
                :options="sourceCategoryOptions"
                placeholder="源分类"
                style="width: 200px"
              />
              <span class="mapping-arrow">→</span>
              <el-cascader
                v-model="mapping.target"
                :options="targetCategoryOptions"
                placeholder="目标分类"
                style="width: 200px"
              />
              <el-button type="danger" link @click="removeMapping(index)">
                删除
              </el-button>
            </div>
            <el-button type="primary" plain @click="addMapping">
              添加映射
            </el-button>
          </el-form-item>
        </template>

        <template v-if="ruleForm.type === 'attribute'">
          <el-form-item label="属性转换" prop="attributeRules">
            <div v-for="(rule, index) in ruleForm.attributeRules" :key="index" class="attribute-rule">
              <el-select v-model="rule.attribute" placeholder="选择属性" style="width: 150px">
                <el-option
                  v-for="attr in attributeOptions"
                  :key="attr.value"
                  :label="attr.label"
                  :value="attr.value"
                />
              </el-select>
              <el-select v-model="rule.operation" placeholder="转换方式" style="width: 150px">
                <el-option label="替换" value="replace" />
                <el-option label="追加" value="append" />
                <el-option label="删除" value="remove" />
                <el-option label="格式化" value="format" />
              </el-select>
              <el-input
                v-if="rule.operation !== 'remove'"
                v-model="rule.value"
                placeholder="转换值/格式"
                style="width: 200px"
              />
              <el-button type="danger" link @click="removeAttributeRule(index)">
                删除
              </el-button>
            </div>
            <el-button type="primary" plain @click="addAttributeRule">
              添加规则
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
import { Message, MessageBox } from 'element-ui'

// 规则列表数据
const loading = ref(false)
const ruleList = ref([
  {
    id: 1,
    name: '标题优化规则',
    type: 'title',
    priority: 90,
    status: 1,
    shops: [
      { id: 1, name: '店铺A' },
      { id: 2, name: '店铺B' }
    ],
    fields: ['title', 'subtitle'],
    effectiveTime: '2024-03-20 00:00:00',
    expireTime: '2024-12-31 23:59:59'
  },
  {
    id: 2,
    name: '分类映射规则',
    type: 'category',
    priority: 100,
    status: 1,
    shops: [
      { id: 1, name: '店铺A' }
    ],
    fields: ['category'],
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

// 可用字段
const availableFields = [
  { label: '商品标题', value: 'title' },
  { label: '副标题', value: 'subtitle' },
  { label: '商品描述', value: 'description' },
  { label: '商品分类', value: 'category' },
  { label: '商品属性', value: 'attributes' }
]

// 属性选项
const attributeOptions = [
  { label: '颜色', value: 'color' },
  { label: '尺寸', value: 'size' },
  { label: '材质', value: 'material' },
  { label: '重量', value: 'weight' }
]

// 分类选项
const sourceCategoryOptions = [
  {
    value: 1,
    label: '服装',
    children: [
      { value: 11, label: '上衣' },
      { value: 12, label: '裤装' }
    ]
  }
]

const targetCategoryOptions = [
  {
    value: 1,
    label: '服饰',
    children: [
      { value: 11, label: '上装' },
      { value: 12, label: '下装' }
    ]
  }
]

// 对话框控制
const dialogVisible = ref(false)
const dialogType = ref('add')
const submitting = ref(false)
const ruleFormRef = ref()

// 表单数
const ruleForm = reactive({
  name: '',
  type: '',
  fields: [],
  titleTemplate: '',
  titleLength: 50,
  descTemplate: '',
  aiOptimize: false,
  keywordCount: 3,
  keywordSources: ['title', 'description'],
  categoryMappings: [],
  attributeRules: [],
  shops: [],
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
  fields: [
    { required: true, message: '请选择处理字段', trigger: 'change' }
  ],
  shops: [
    { required: true, message: '请选择适用店铺', trigger: 'change' }
  ]
}

// 修复字段标签获取函数
const getFieldLabel = (fieldValue) => {
  const field = availableFields.find(f => f.value === fieldValue)
  return field ? field.label : fieldValue
}

// 获取规则类型文本
const getRuleType = (type) => {
  const types = {
    title: '标题优化',
    description: '描述生成',
    keywords: '关键词提取',
    category: '分类映射',
    attribute: '属性转换'
  }
  return types[type] || type
}

// 获取优先级样式
const getPriorityType = (priority) => {
  if (priority >= 90) return 'danger'
  if (priority >= 70) return 'warning'
  if (priority >= 50) return 'success'
  return 'info'
}

// 添加分类映射
const addMapping = () => {
  ruleForm.categoryMappings.push({
    source: [],
    target: []
  })
}

// 移除分类映射
const removeMapping = (index) => {
  ruleForm.categoryMappings.splice(index, 1)
}

// 添加属性规则
const addAttributeRule = () => {
  ruleForm.attributeRules.push({
    attribute: '',
    operation: '',
    value: ''
  })
}

// 移除属性规则
const removeAttributeRule = (index) => {
  ruleForm.attributeRules.splice(index, 1)
}

// 新增规则
const handleAddRule = () => {
  dialogType.value = 'add'
  Object.assign(ruleForm, {
    name: '',
    type: '',
    fields: [],
    titleTemplate: '',
    titleLength: 50,
    descTemplate: '',
    aiOptimize: false,
    keywordCount: 3,
    keywordSources: ['title', 'description'],
    categoryMappings: [],
    attributeRules: [],
    shops: [],
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
    await MessageBox.confirm('确认删除该规则吗？此操作不可恢复！', '警告', {
      type: 'warning'
    })
    // TODO: 调用删除接口
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
.product-rule {
  padding: 20px;
}

.rule-card {
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

.shop-tag,
.field-tag {
  margin-right: 5px;
  margin-bottom: 5px;
}

.mapping-item,
.attribute-rule {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.mapping-arrow {
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