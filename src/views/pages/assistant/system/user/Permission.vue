<template>
  <div class="permission-container">
    <div class="search-bar">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="用户名">
          <el-input v-model="searchForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="searchForm.role" placeholder="请选择角色">
            <el-option label="管理员" value="admin" />
            <el-option label="运营人员" value="operator" />
            <el-option label="商家" value="merchant" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="table-container">
      <div class="table-header">
        <el-button type="primary" @click="handleAdd">新增用户</el-button>
        <el-button type="danger" :disabled="!selectedUsers.length" @click="handleBatchDelete">
          批量删除
        </el-button>
      </div>

      <el-table
        v-loading="loading"
        :data="userList"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="role" label="角色">
          <template #default="{ row }">
            <el-tag :type="getRoleType(row.role)">{{ getRoleLabel(row.role) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="permissions" label="权限">
          <template #default="{ row }">
            <el-tag
              v-for="perm in row.permissions"
              :key="perm"
              class="permission-tag"
              size="small"
            >
              {{ getPermissionLabel(perm) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

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
    </div>

    <!-- 用户编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'add' ? '新增用户' : '编辑用户'"
      width="500px"
    >
      <el-form
        ref="userFormRef"
        :model="userForm"
        :rules="userRules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="userForm.role" placeholder="请选择角色">
            <el-option label="管理员" value="admin" />
            <el-option label="运营人员" value="operator" />
            <el-option label="商家" value="merchant" />
          </el-select>
        </el-form-item>
        <el-form-item label="权限" prop="permissions">
          <el-checkbox-group v-model="userForm.permissions">
            <el-checkbox label="product_edit">商品编辑权限</el-checkbox>
            <el-checkbox label="order_manage">订单管理权限</el-checkbox>
            <el-checkbox label="data_view">数据查看权限</el-checkbox>
            <el-checkbox label="shop_manage">店铺管理权限</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
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
  username: '',
  role: ''
})

// 表格数据
const loading = ref(false)
const userList = ref([])
const selectedUsers = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 对话框相关
const dialogVisible = ref(false)
const dialogType = ref('add')
const userFormRef = ref()
const userForm = reactive({
  username: '',
  role: '',
  permissions: []
})

// 表单验证规则
const userRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  role: [
    { required: true, message: '请选择角色', trigger: 'change' }
  ],
  permissions: [
    { required: true, message: '请选择权限', trigger: 'change' }
  ]
}

// 获取角色标签类型
const getRoleType = (role) => {
  const types = {
    admin: 'danger',
    operator: 'warning',
    merchant: 'success'
  }
  return types[role] || 'info'
}

// 获取角色标签文本
const getRoleLabel = (role) => {
  const labels = {
    admin: '管理员',
    operator: '运营人员',
    merchant: '商家'
  }
  return labels[role] || role
}

// 获取权限标签文本
const getPermissionLabel = (permission) => {
  const labels = {
    product_edit: '商品编辑',
    order_manage: '订单管理',
    data_view: '数据查看',
    shop_manage: '店铺管理'
  }
  return labels[permission] || permission
}

// 处理搜索
const handleSearch = () => {
  // TODO: 实现搜索逻辑
  fetchUserList()
}

// 重置搜索
const resetSearch = () => {
  searchForm.username = ''
  searchForm.role = ''
  handleSearch()
}

// 获取用户列表
const fetchUserList = async () => {
  loading.value = true
  try {
    // TODO: 调用获取用户列表接口
    // 模拟数据
    userList.value = [
      {
        username: 'admin',
        role: 'admin',
        permissions: ['product_edit', 'order_manage', 'data_view', 'shop_manage'],
        createTime: '2024-03-20 10:00:00'
      }
    ]
    total.value = 1
  } catch (error) {
    Message.error('获取用户列表失败')
  } finally {
    loading.value = false
  }
}

// 处理表格选择
const handleSelectionChange = (selection) => {
  selectedUsers.value = selection
}

// 处理新增
const handleAdd = () => {
  dialogType.value = 'add'
  userForm.username = ''
  userForm.role = ''
  userForm.permissions = []
  dialogVisible.value = true
}

// 处理编辑
const handleEdit = (row) => {
  dialogType.value = 'edit'
  Object.assign(userForm, row)
  dialogVisible.value = true
}

// 处理删除
const handleDelete = async (row) => {
  try {
    await Message.confirm('确认删除该用户吗？', '警告', {
      type: 'warning'
    })
    Message.success('删除成功')
  } catch {
    // 取消删除
  }
}

// 处理批量删除
const handleBatchDelete = async () => {
  if (!selectedUsers.value.length) return
  try {
    await Message.confirm(
      `确认删除选中的 ${selectedUsers.value.length} 个用户吗？`,
      '提示',
      { type: 'warning' }
    )
    // TODO: 调用批量删除接口
    Message.success('批量删除成功')
    fetchUserList()
  } catch {
    // 取消删除
  }
}

// 处理表单提交
const handleSubmit = async () => {
  if (!userFormRef.value) return
  await userFormRef.value.validate(async (valid) => {
    if (valid) {
      // TODO: 调用新增/编辑接口
      Message.success(dialogType.value === 'add' ? '新增成功' : '编辑成功')
      dialogVisible.value = false
      fetchUserList()
    }
  })
}

// 分页相关
const handleSizeChange = (val) => {
  pageSize.value = val
  fetchUserList()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchUserList()
}

// 初始化
fetchUserList()
</script>

<style scoped>
.permission-container {
  padding: 20px;
}

.search-bar {
  margin-bottom: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 4px;
}

.table-container {
  background: #fff;
  padding: 20px;
  border-radius: 4px;
}

.table-header {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.permission-tag {
  margin-right: 5px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style> 