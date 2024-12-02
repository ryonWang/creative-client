<template>
  <div class="product-create">
    <!-- 步骤条 -->
    <el-steps :active="currentStep" finish-status="success" class="steps">
      <el-step title="基本信息" />
      <el-step title="规格设置" />
      <el-step title="图片管理" />
      <el-step title="价格库存" />
      <el-step title="详情描述" />
    </el-steps>

    <!-- 表单区域 -->
    <div class="form-container">
      <el-form
        ref="productFormRef"
        :model="productForm"
        :rules="formRules"
        label-width="120px"
        class="product-form"
      >
        <!-- 基本信息 -->
        <div v-show="currentStep === 0">
          <div class="form-section">
            <h3>基本信息</h3>
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="productForm.name" placeholder="请输入商品名称" />
            </el-form-item>
            <el-form-item label="商品分类" prop="category">
              <el-cascader
                v-model="productForm.category"
                :options="categoryOptions"
                :props="{ checkStrictly: true }"
                placeholder="请选择商品分类"
              />
            </el-form-item>
            <el-form-item label="商品品牌" prop="brand">
              <el-select v-model="productForm.brand" placeholder="请选择品牌">
                <el-option
                  v-for="brand in brandOptions"
                  :key="brand.value"
                  :label="brand.label"
                  :value="brand.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="上架状态" prop="status">
              <el-radio-group v-model="productForm.status">
                <el-radio label="draft">草稿</el-radio>
                <el-radio label="online">上架</el-radio>
                <el-radio label="offline">下架</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>

        <!-- 规格设置 -->
        <div v-show="currentStep === 1">
          <div class="form-section">
            <h3>规格设置</h3>
            <div class="spec-list">
              <div v-for="(spec, index) in productForm.specs" :key="index" class="spec-item">
                <el-form-item
                  :label="'规格名称' + (index + 1)"
                  :prop="'specs.' + index + '.name'"
                  :rules="{ required: true, message: '请输入规格名称', trigger: 'blur' }"
                >
                  <el-input v-model="spec.name" placeholder="如：颜色、尺寸">
                    <template #append>
                      <el-button @click="removeSpec(index)" :disabled="productForm.specs.length <= 1">
                        删除
                      </el-button>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item
                  :label="'规格值'"
                  :prop="'specs.' + index + '.values'"
                  :rules="{ required: true, message: '请添加规格值', trigger: 'blur' }"
                >
                  <el-tag
                    v-for="(value, vIndex) in spec.values"
                    :key="vIndex"
                    closable
                    @close="removeSpecValue(index, vIndex)"
                    class="spec-tag"
                  >
                    {{ value }}
                  </el-tag>
                  <el-input
                    v-if="spec.inputVisible"
                    ref="specValueInput"
                    v-model="spec.inputValue"
                    class="spec-input"
                    size="small"
                    @keyup.enter="confirmSpecValue(index)"
                    @blur="confirmSpecValue(index)"
                  />
                  <el-button v-else class="button-new-tag" size="small" @click="showInput(index)">
                    + 添加规格值
                  </el-button>
                </el-form-item>
              </div>
              <el-button type="primary" plain @click="addSpec" :disabled="productForm.specs.length >= 3">
                添加规格项
              </el-button>
            </div>
          </div>
        </div>

        <!-- 图片管理 -->
        <div v-show="currentStep === 2">
          <div class="form-section">
            <h3>图片管理</h3>
            <el-form-item label="商品主图" prop="mainImages">
              <el-upload
                v-model:file-list="productForm.mainImages"
                action="#"
                list-type="picture-card"
                :auto-upload="false"
                :limit="5"
              >
                <i class="el-icon-plus"></i>
                <template #tip>
                  <div class="upload-tip">建议尺寸800x800px，最多5张</div>
                </template>
              </el-upload>
            </el-form-item>
          </div>
        </div>

        <!-- 价格库存 -->
        <div v-show="currentStep === 3">
          <div class="form-section">
            <h3>价格库存</h3>
            <el-table :data="skuList" border class="sku-table">
              <el-table-column label="规格组合">
                <template #default="{ row }">
                  {{ getSkuSpecText(row.specs) }}
                </template>
              </el-table-column>
              <el-table-column label="销售价" width="150">
                <template #default="{ row }">
                  <el-input-number
                    v-model="row.price"
                    :min="0"
                    :precision="2"
                    :step="0.1"
                    size="small"
                  />
                </template>
              </el-table-column>
              <el-table-column label="库存" width="150">
                <template #default="{ row }">
                  <el-input-number
                    v-model="row.stock"
                    :min="0"
                    :step="1"
                    size="small"
                  />
                </template>
              </el-table-column>
              <el-table-column label="货号" width="200">
                <template #default="{ row }">
                  <el-input v-model="row.skuCode" size="small" placeholder="请输入货号" />
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <!-- 详情描述 -->
        <div v-show="currentStep === 4">
          <div class="form-section">
            <h3>详情描述</h3>
            <el-form-item label="商品卖点" prop="sellingPoints">
              <el-input
                v-model="productForm.sellingPoints"
                type="textarea"
                :rows="3"
                placeholder="请输入商品卖点"
              />
            </el-form-item>
            <el-form-item label="详情描述" prop="description">
              <!-- 这里可以集成富文本编辑器 -->
              <el-input
                v-model="productForm.description"
                type="textarea"
                :rows="6"
                placeholder="请输入商品详情描述"
              />
            </el-form-item>
          </div>
        </div>

        <!-- 底部按钮 -->
        <div class="form-footer">
          <el-button @click="prevStep" :disabled="currentStep === 0">上一步</el-button>
          <el-button
            type="primary"
            @click="nextStep"
            v-if="currentStep < 4"
          >
            下一步
          </el-button>
          <el-button
            type="primary"
            @click="handleSubmit"
            :loading="submitting"
            v-else
          >
            提交
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, nextTick } from 'vue'
import { Message, MessageBox } from 'element-ui'

// 当前步骤
const currentStep = ref(0)
const productFormRef = ref()
const submitting = ref(false)

// 商品表单数据
const productForm = reactive({
  name: '',
  category: [],
  brand: '',
  status: 'draft',
  specs: [
    {
      name: '',
      values: [],
      inputVisible: false,
      inputValue: ''
    }
  ],
  mainImages: [],
  sellingPoints: '',
  description: ''
})

// 分类选项
const categoryOptions = [
  {
    value: 1,
    label: '服装',
    children: [
      { value: 11, label: '上衣' },
      { value: 12, label: '裤装' }
    ]
  },
  {
    value: 2,
    label: '鞋靴',
    children: [
      { value: 21, label: '运动鞋' },
      { value: 22, label: '皮鞋' }
    ]
  }
]

// 品牌选项
const brandOptions = [
  { value: 1, label: '品牌A' },
  { value: 2, label: '品牌B' }
]

// 表单验证规则
const formRules = {
  name: [
    { required: true, message: '请输入商品名称', trigger: 'blur' },
    { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
  ],
  category: [
    { required: true, message: '请选择商品分类', trigger: 'change' }
  ],
  brand: [
    { required: true, message: '请选择商品品牌', trigger: 'change' }
  ]
}

// 规格相关方法
const addSpec = () => {
  productForm.specs.push({
    name: '',
    values: [],
    inputVisible: false,
    inputValue: ''
  })
}

const removeSpec = (index) => {
  productForm.specs.splice(index, 1)
}

const showInput = (index) => {
  productForm.specs[index].inputVisible = true
  // 等待DOM更新后聚焦
  nextTick(() => {
    document.querySelector('.spec-input input')?.focus()
  })
}

const confirmSpecValue = (index) => {
  const spec = productForm.specs[index]
  if (spec.inputValue) {
    spec.values.push(spec.inputValue)
    spec.inputValue = ''
  }
  spec.inputVisible = false
}

const removeSpecValue = (specIndex, valueIndex) => {
  productForm.specs[specIndex].values.splice(valueIndex, 1)
}

// 生成SKU列表
const skuList = computed(() => {
  // 根据规格组合生成SKU列表
  const specs = productForm.specs.filter(spec => spec.name && spec.values.length)
  if (!specs.length) return []

  const combinations = getCombinations(specs)
  return combinations.map((combo, index) => ({
    id: index + 1,
    specs: combo,
    price: 0,
    stock: 0,
    skuCode: ''
  }))
})

// 获取规格组合
const getCombinations = (specs) => {
  const results = []
  const combine = (current, specIndex) => {
    if (specIndex === specs.length) {
      results.push([...current])
      return
    }
    const currentSpec = specs[specIndex]
    currentSpec.values.forEach(value => {
      current.push({
        name: currentSpec.name,
        value
      })
      combine(current, specIndex + 1)
      current.pop()
    })
  }
  combine([], 0)
  return results
}

// 获取SKU规格文本
const getSkuSpecText = (specs) => {
  return specs.map(spec => `${spec.name}:${spec.value}`).join('，')
}

// 步骤控制
const nextStep = async () => {
  if (currentStep.value < 4) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

// 提交表单
const handleSubmit = async () => {
  if (!productFormRef.value) return
  
  try {
    await productFormRef.value.validate()
    submitting.value = true
    // TODO: 调用创建商品接口
    await new Promise(resolve => setTimeout(resolve, 1000))
    Message.success('商品创建成功')
  } catch (error) {
    console.error(error)
    Message.error('表单验证失败')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.product-create {
  padding: 20px;
}

.steps {
  margin-bottom: 30px;
}

.form-container {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
}

.form-section {
  margin-bottom: 30px;

  h3 {
    margin: 0 0 20px 0;
    font-size: 16px;
    color: #303133;
  }
}

.spec-list {
  .spec-item {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px dashed #ebeef5;
  }

  .spec-tag {
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .spec-input {
    width: 100px;
    margin-right: 10px;
    vertical-align: bottom;
  }
}

.upload-tip {
  font-size: 12px;
  color: #909399;
  margin-top: 5px;
}

.sku-table {
  margin-top: 20px;
}

.form-footer {
  margin-top: 30px;
  text-align: center;
}
</style> 