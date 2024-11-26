<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-width="120px"
  >
    <!-- 基本信息 -->
    <el-divider>基本信息</el-divider>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入商品名称" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="商品分类" prop="category">
          <el-cascader
            v-model="form.category"
            :options="categoryOptions"
            :props="{ checkStrictly: true }"
            placeholder="请选择商品分类"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="商品品牌" prop="brand">
          <el-select v-model="form.brand" placeholder="请选择品牌">
            <el-option
              v-for="item in brandOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="商品编码" prop="code">
          <el-input v-model="form.code" placeholder="请输入商品编码" />
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 价格库存 -->
    <el-divider>价格库存</el-divider>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="销售价" prop="price">
          <el-input-number
            v-model="form.price"
            :precision="2"
            :step="0.1"
            :min="0"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="市场价" prop="marketPrice">
          <el-input-number
            v-model="form.marketPrice"
            :precision="2"
            :step="0.1"
            :min="0"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="成本价" prop="costPrice">
          <el-input-number
            v-model="form.costPrice"
            :precision="2"
            :step="0.1"
            :min="0"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="库存数量" prop="stock">
          <el-input-number
            v-model="form.stock"
            :min="0"
            :step="1"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="库存预警值" prop="stockWarning">
          <el-input-number
            v-model="form.stockWarning"
            :min="0"
            :step="1"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 商品属性 -->
    <el-divider>商品属性</el-divider>
    <el-form-item label="商品规格" prop="specs">
      <el-table :data="form.specs" border>
        <el-table-column label="规格名称" min-width="120">
          <template #default="{ row }">
            <el-input v-model="row.name" placeholder="请输入规格名称" />
          </template>
        </el-table-column>
        <el-table-column label="规格值" min-width="200">
          <template #default="{ row }">
            <el-select
              v-model="row.values"
              multiple
              filterable
              allow-create
              placeholder="请输入规格值"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="{ $index }">
            <el-button type="danger" link @click="removeSpec($index)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="form-actions">
        <el-button type="primary" @click="addSpec">添加规格</el-button>
      </div>
    </el-form-item>

    <!-- 商品图片 -->
    <el-divider>商品图片</el-divider>
    <el-form-item label="主图" prop="mainImage">
      <el-upload
        action="#"
        list-type="picture-card"
        :auto-upload="false"
        :limit="1"
        :on-change="handleMainImageChange"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="图片列表" prop="images">
      <el-upload
        action="#"
        list-type="picture-card"
        :auto-upload="false"
        :limit="5"
        :on-change="handleImagesChange"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
    </el-form-item>

    <!-- 商品描述 -->
    <el-divider>商品描述</el-divider>
    <el-form-item label="商品描述" prop="description">
      <el-input
        v-model="form.description"
        type="textarea"
        :rows="4"
        placeholder="请输入商品描述"
      />
    </el-form-item>

    <!-- 表单操作 -->
    <el-form-item>
      <el-button type="primary" @click="submitForm" :loading="loading">
        保存
      </el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['submit'])

// 表单引用
const formRef = ref()

// 加载状态
const loading = ref(false)

// 表单数据
const form = reactive({
  name: '',
  category: [],
  brand: '',
  code: '',
  price: 0,
  marketPrice: 0,
  costPrice: 0,
  stock: 0,
  stockWarning: 0,
  specs: [],
  mainImage: '',
  images: [],
  description: '',
  ...props.initialData
})

// 表单验证规则
const rules = {
  name: [
    { required: true, message: '请输入商品名称', trigger: 'blur' },
    { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
  ],
  category: [
    { required: true, message: '请选择商品分类', trigger: 'change' }
  ],
  brand: [
    { required: true, message: '请选择商品品牌', trigger: 'change' }
  ],
  code: [
    { required: true, message: '请输入商品编码', trigger: 'blur' }
  ],
  price: [
    { required: true, message: '请输入销售价', trigger: 'blur' }
  ],
  stock: [
    { required: true, message: '请输入库存数量', trigger: 'blur' }
  ],
  mainImage: [
    { required: true, message: '请上传商品主图', trigger: 'change' }
  ],
  description: [
    { required: true, message: '请输入商品描述', trigger: 'blur' }
  ]
}

// 分类选项
const categoryOptions = [
  {
    value: 1,
    label: '服装',
    children: [
      { value: 11, label: '上衣' },
      { value: 12, label: '裤装' }
    ]
  }
]

// 品牌选项
const brandOptions = [
  { value: 1, label: '品牌A' },
  { value: 2, label: '品牌B' }
]

// 添加规格
const addSpec = () => {
  form.specs.push({
    name: '',
    values: []
  })
}

// 删除规格
const removeSpec = (index) => {
  form.specs.splice(index, 1)
}

// 处理主图上传
const handleMainImageChange = (file) => {
  form.mainImage = file.url
}

// 处理图片列表上传
const handleImagesChange = (file) => {
  form.images.push(file.url)
}

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    loading.value = true
    emit('submit', form)
  } catch (error) {
    ElMessage.error('请检查表单填写是否正确')
  } finally {
    loading.value = false
  }
}

// 重置表单
const resetForm = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
}
</script>

<style scoped>
.form-actions {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

:deep(.el-upload--picture-card) {
  width: 120px;
  height: 120px;
  line-height: 120px;
}

:deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: 120px;
  height: 120px;
}
</style> 