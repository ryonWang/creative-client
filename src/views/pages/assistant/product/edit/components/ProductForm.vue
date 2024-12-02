<template>
  <el-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    label-width="120px"
    class="product-form"
  >
    <!-- 基本信息 -->
    <el-card class="form-card">
      <template #header>
        <div class="card-header">基本信息</div>
      </template>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入商品名称" />
      </el-form-item>
      <el-form-item label="商品分类" prop="category">
        <el-cascader
          v-model="formData.category"
          :options="categoryOptions"
          placeholder="请选择商品分类"
        />
      </el-form-item>
      <el-form-item label="商品品牌" prop="brand">
        <el-select v-model="formData.brand" placeholder="请选择商品品牌">
          <el-option
            v-for="item in brandOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-card>

    <!-- 价格信息 -->
    <el-card class="form-card">
      <template #header>
        <div class="card-header">价格信息</div>
      </template>
      <el-form-item label="销售价" prop="price">
        <el-input-number
          v-model="formData.price"
          :precision="2"
          :step="0.1"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="市场价" prop="marketPrice">
        <el-input-number
          v-model="formData.marketPrice"
          :precision="2"
          :step="0.1"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="成本价" prop="costPrice">
        <el-input-number
          v-model="formData.costPrice"
          :precision="2"
          :step="0.1"
          :min="0"
        />
      </el-form-item>
    </el-card>

    <!-- 库存信息 -->
    <el-card class="form-card">
      <template #header>
        <div class="card-header">库存信息</div>
      </template>
      <el-form-item label="库存数量" prop="stock">
        <el-input-number
          v-model="formData.stock"
          :min="0"
          :step="1"
        />
      </el-form-item>
      <el-form-item label="库存预警值" prop="stockWarning">
        <el-input-number
          v-model="formData.stockWarning"
          :min="0"
          :step="1"
        />
      </el-form-item>
    </el-card>

    <!-- 商品属性 -->
    <el-card class="form-card">
      <template #header>
        <div class="card-header">商品属性</div>
      </template>
      <el-form-item label="商品状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio label="on_sale">上架</el-radio>
          <el-radio label="off_sale">下架</el-radio>
          <el-radio label="draft">草稿</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品标签" prop="tags">
        <el-select
          v-model="formData.tags"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择或输入标签"
        >
          <el-option
            v-for="item in tagOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-card>

    <!-- 表单操作 -->
    <div class="form-actions">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="submitting">
        保存
      </el-button>
    </div>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        category: [],
        brand: '',
        price: 0,
        marketPrice: 0,
        costPrice: 0,
        stock: 0,
        stockWarning: 0,
        status: 'draft',
        tags: []
      },
      rules: {
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
        price: [
          { required: true, message: '请输入销售价', trigger: 'blur' }
        ],
        stock: [
          { required: true, message: '请输入库存数量', trigger: 'blur' }
        ]
      },
      categoryOptions: [
        {
          value: 'clothing',
          label: '服装',
          children: [
            { value: 'tops', label: '上装' },
            { value: 'bottoms', label: '下装' }
          ]
        }
      ],
      brandOptions: [
        { value: 'brand1', label: '品牌1' },
        { value: 'brand2', label: '品牌2' }
      ],
      tagOptions: [
        { value: 'new', label: '新品' },
        { value: 'hot', label: '热销' }
      ],
      submitting: false
    }
  },
  methods: {
    async handleSubmit() {
      if (!this.$refs.formRef) return
      
      try {
        await this.$refs.formRef.validate()
        this.submitting = true
        // TODO: 调用保存接口
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.$message.success('保存成功')
        this.$emit('submit', this.formData)
      } catch (error) {
        console.error(error)
        this.$message.error('表单验证失败')
      } finally {
        this.submitting = false
      }
    },
    handleCancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
.product-form {
  padding: 20px;
}

.form-card {
  margin-bottom: 20px;
}

.card-header {
  font-size: 16px;
  font-weight: bold;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}
</style> 