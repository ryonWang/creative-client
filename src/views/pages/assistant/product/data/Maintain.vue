<template>
  <div class="data-maintain">
    <!-- 搜索区域 -->
    <div class="search-bar">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="商品名称">
          <el-input v-model="searchForm.name" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="商品分类">
          <el-cascader
            v-model="searchForm.category"
            :options="categoryOptions"
            :props="{ checkStrictly: true }"
            placeholder="请选择商品分类"
          />
        </el-form-item>
        <el-form-item label="数据来源">
          <el-select v-model="searchForm.source" placeholder="请选择来源">
            <el-option label="全部" value="" />
            <el-option label="Excel导入" value="excel" />
            <el-option label="ERP同步" value="erp" />
            <el-option label="手动创建" value="manual" />
          </el-select>
        </el-form-item>
        <el-form-item label="数据状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态">
            <el-option label="全部" value="" />
            <el-option label="正常" value="normal" />
            <el-option label="异常" value="error" />
            <el-option label="待完善" value="incomplete" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 操作按钮 -->
    <div class="operation-bar">
      <el-button type="primary" @click="handleBatchEdit">
        <i class="el-icon-edit"></i>批量编辑
      </el-button>
      <el-button type="success" @click="handleBatchVerify">
        <i class="el-icon-check"></i>批量验证
      </el-button>
      <el-button type="warning" @click="handleBatchComplete">
        <i class="el-icon-setting"></i>批量完善
      </el-button>
      <el-button type="danger" @click="handleBatchDelete">
        <i class="el-icon-delete"></i>批量删除
      </el-button>
      <el-button @click="handleExport">
        <i class="el-icon-download"></i>导出数据
      </el-button>
    </div>

    <!-- 数据列表 -->
    <div class="data-list">
      <el-table
        v-loading="loading"
        :data="dataList"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="商品图片" width="100">
          <template #default="{ row }">
            <el-image
              :src="row.image"
              :preview-src-list="[row.image]"
              fit="cover"
              class="product-image"
            />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" show-overflow-tooltip />
        <el-table-column prop="category" label="商品分类" width="150" />
        <el-table-column prop="source" label="数据来源" width="120">
          <template #default="{ row }">
            <el-tag>{{ getSourceLabel(row.source) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="数据状态" width="120">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusLabel(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="verifyResult" label="验证结果" width="200">
          <template #default="{ row }">
            <div v-if="row.verifyResult?.length" class="verify-result">
              <el-tooltip
                v-for="(error, index) in row.verifyResult"
                :key="index"
                :content="error"
                placement="top"
              >
                <i class="el-icon-warning error-icon"></i>
              </el-tooltip>
            </div>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="180" />
        <el-table-column label="操作" width="250" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button type="success" link @click="handleVerify(row)">
              验证
            </el-button>
            <el-button type="warning" link @click="handleComplete(row)">
              完善
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
          :current-page.sync="currentPage"
          :page-size.sync="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <!-- 批量编辑对话框 -->
    <el-dialog
      v-model="batchEditVisible"
      title="批量编辑"
      width="600px"
    >
      <el-form :model="batchEditForm" label-width="100px">
        <el-form-item label="商品分类">
          <el-cascader
            v-model="batchEditForm.category"
            :options="categoryOptions"
            :props="{ checkStrictly: true }"
            placeholder="请选择商品分类"
          />
        </el-form-item>
        <el-form-item label="品牌">
          <el-select v-model="batchEditForm.brand" placeholder="请选择品牌">
            <el-option
              v-for="brand in brandOptions"
              :key="brand.value"
              :label="brand.label"
              :value="brand.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="数据状态">
          <el-select v-model="batchEditForm.status" placeholder="请选择状态">
            <el-option label="正常" value="normal" />
            <el-option label="异常" value="error" />
            <el-option label="待完善" value="incomplete" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="batchEditVisible = false">取消</el-button>
          <el-button type="primary" @click="submitBatchEdit" :loading="submitting">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 完善信息抽屉 -->
    <el-drawer
      :visible.sync="completeDrawerVisible"
      title="完善商品信息"
      size="60%"
      :destroy-on-close="true"
    >
      <div class="complete-form">
        <el-alert
          v-if="currentProduct?.incompleteFields?.length"
          title="以下字段信息不完整，请补充完善："
          type="warning"
          :closable="false"
          style="margin-bottom: 20px;"
        >
          <div v-for="field in currentProduct.incompleteFields" :key="field">
            <el-tag size="small" class="incomplete-tag">{{ field }}</el-tag>
          </div>
        </el-alert>

        <el-form
          ref="completeFormRef"
          :model="completeForm"
          label-width="100px"
        >
          <!-- 根据不完整字段动态生成表单项 -->
          <div v-for="field in currentProduct?.incompleteFields" :key="field">
            <el-form-item :label="field" :prop="field">
              <component
                :is="getFieldComponent(field)"
                v-model="completeForm[field]"
                v-bind="getFieldProps(field)"
              />
            </el-form-item>
          </div>
        </el-form>

        <div class="drawer-footer">
          <el-button @click="completeDrawerVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="submitComplete"
            :loading="submitting"
          >
            保存
          </el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Message } from 'element-ui'

// 搜索表单
const searchForm = reactive({
  name: '',
  category: [],
  source: '',
  status: ''
})

// 表格数据
const loading = ref(false)
const dataList = ref([
  {
    id: 1,
    image: 'https://via.placeholder.com/100',
    name: '测试商品1',
    category: '服装/上衣',
    source: 'excel',
    status: 'normal',
    verifyResult: [],
    updateTime: '2024-03-20 10:00:00'
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/100',
    name: '测试商品2',
    category: '鞋靴/运动鞋',
    source: 'erp',
    status: 'error',
    verifyResult: ['价格格式不正确', '库存数据缺失'],
    updateTime: '2024-03-20 09:00:00',
    incompleteFields: ['规格', '品牌', '详情描述']
  }
])

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

// 选中的数据
const selectedData = ref([])

// 批量编辑相关
const batchEditVisible = ref(false)
const batchEditForm = reactive({
  category: [],
  brand: '',
  status: ''
})

// 完善信息相关
const completeDrawerVisible = ref(false)
const currentProduct = ref(null)
const completeForm = reactive({})
const completeFormRef = ref()

// 状态控制
const submitting = ref(false)

// 获取来源标签
const getSourceLabel = (source) => {
  const labels = {
    excel: 'Excel导入',
    erp: 'ERP同步',
    manual: '手动创建'
  }
  return labels[source] || source
}

// 获取状态样式
const getStatusType = (status) => {
  const types = {
    normal: 'success',
    error: 'danger',
    incomplete: 'warning'
  }
  return types[status] || 'info'
}

// 获取状态文本
const getStatusLabel = (status) => {
  const labels = {
    normal: '正常',
    error: '异常',
    incomplete: '待完善'
  }
  return labels[status] || status
}

// 获取表单组件
const getFieldComponent = (field) => {
  const components = {
    '规格': 'el-input',
    '品牌': 'el-select',
    '详情描述': 'el-input'
  }
  return components[field] || 'el-input'
}

// 获取表单属性
const getFieldProps = (field) => {
  const props = {
    '规格': { placeholder: '请输入规格信息' },
    '品牌': { placeholder: '请选择品牌' },
    '详情描述': { type: 'textarea', rows: 4, placeholder: '请输入详情描述' }
  }
  return props[field] || {}
}

// 搜索
const handleSearch = () => {
  fetchDataList()
}

// 重置搜索
const resetSearch = () => {
  searchForm.name = ''
  searchForm.category = []
  searchForm.source = ''
  searchForm.status = ''
  handleSearch()
}

// 获取数据列表
const fetchDataList = async () => {
  loading.value = true
  try {
    // TODO: 调用获取数据列表接口
    await new Promise(resolve => setTimeout(resolve, 1000))
  } catch (error) {
    console.error('获取数据列表失败')
  } finally {
    loading.value = false
  }
}

// 表格选择
const handleSelectionChange = (selection) => {
  selectedData.value = selection
}

// 批量编辑
const handleBatchEdit = () => {
  if (!selectedData.value.length) {
    console.warn('请选择要编辑的数据')
    return
  }
  batchEditVisible.value = true
}

// 提交批量编辑
const submitBatchEdit = async () => {
  submitting.value = true
  try {
    // TODO: 调用批量编辑接口
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('批量编辑成功')
    batchEditVisible.value = false
    fetchDataList()
  } catch (error) {
    console.error('批量编辑失败')
  } finally {
    submitting.value = false
  }
}

// 批量验证
const handleBatchVerify = async () => {
  if (!selectedData.value.length) {
    console.warn('请选择要验证的数据')
    return
  }
  try {
    // TODO: 调用批量验证接口
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('批量验证完成')
    fetchDataList()
  } catch (error) {
    console.error('批量验证失败')
  }
}

// 批量完善
const handleBatchComplete = () => {
  if (!selectedData.value.length) {
    console.warn('请选择要完善的数据')
    return
  }
  console.info('请逐个完善商品信息')
}

// 批量删除
const handleBatchDelete = async () => {
  if (!selectedData.value.length) {
    console.warn('请选择要删除的数据')
    return
  }
  try {
    await Message.confirm('确认删除选中的数据吗？此操作不可恢复！', '警告', {
      type: 'warning'
    })
    // TODO: 调用批量删除接口
    Message.success('批量删除成功')
    fetchDataList()
  } catch {
    // 取消删除
  }
}

// 导出数据
const handleExport = () => {
  // TODO: 调用导出接口
  console.info('数据导出中...')
}

// 编辑
const handleEdit = (row) => {
  // TODO: 跳转到编辑页面
  console.log('Edit:', row)
}

// 验证
const handleVerify = async (row) => {
  try {
    // TODO: 调用验证接口
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('验证完成')
    fetchDataList()
  } catch (error) {
    console.error('验证失败')
  }
}

// 完善信息
const handleComplete = (row) => {
  currentProduct.value = row
  completeForm.value = {}
  completeDrawerVisible.value = true
}

// 提交完善
const submitComplete = async () => {
  if (!completeFormRef.value) return
  
  try {
    await completeFormRef.value.validate()
    submitting.value = true
    // TODO: 调用完善接口
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('信息完善成功')
    completeDrawerVisible.value = false
    fetchDataList()
  } catch (error) {
    console.error(error)
  } finally {
    submitting.value = false
  }
}

// 删除
const handleDelete = async (row) => {
  try {
    await Message.confirm('确认删除该数据吗？此操作不可恢复！', '警告', {
      type: 'warning'
    })
    // TODO: 调用删除接口
    console.log('删除成功')
    fetchDataList()
  } catch {
    // 取消删除
  }
}

// 分页相关
const handleSizeChange = (val) => {
  pageSize.value = val
  fetchDataList()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchDataList()
}

// 初始化
fetchDataList()

// 消息提示
const handleSuccess = () => {
  Message.success('操作成功')
}

const handleError = (error) => {
  Message.error(error || '操作失败')
}
</script>

<style scoped>
.data-maintain {
  padding: 20px;
}

.search-bar {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.operation-bar {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.data-list {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
}

.product-image {
  width: 60px;
  height: 60px;
  border-radius: 4px;
}

.verify-result {
  display: flex;
  gap: 5px;
}

.error-icon {
  color: #F56C6C;
  cursor: pointer;
}

.incomplete-tag {
  margin-right: 5px;
  margin-bottom: 5px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.complete-form {
  padding: 20px;
}

.drawer-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: #fff;
  border-top: 1px solid #e6e6e6;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style> 