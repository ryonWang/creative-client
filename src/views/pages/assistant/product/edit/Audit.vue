<template>
  <div class="audit-container">
    <!-- 搜索区域 -->
    <div class="search-bar">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="商品名称">
          <el-input v-model="searchForm.name" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态">
            <el-option label="全部" value="" />
            <el-option label="待审核" value="pending" />
            <el-option label="审核通过" value="approved" />
            <el-option label="审核拒绝" value="rejected" />
          </el-select>
        </el-form-item>
        <el-form-item label="提交时间">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 审核列表 -->
    <div class="audit-list">
      <el-table
        v-loading="loading"
        :data="auditList"
        border
      >
        <el-table-column type="expand">
          <template #default="{ row }">
            <el-descriptions :column="2" border>
              <el-descriptions-item label="商品分类">
                {{ row.category }}
              </el-descriptions-item>
              <el-descriptions-item label="品牌">
                {{ row.brand }}
              </el-descriptions-item>
              <el-descriptions-item label="规格信息">
                {{ row.specs.join('、') }}
              </el-descriptions-item>
              <el-descriptions-item label="价格区间">
                ¥{{ row.minPrice }} - ¥{{ row.maxPrice }}
              </el-descriptions-item>
              <el-descriptions-item label="提交人">
                {{ row.submitter }}
              </el-descriptions-item>
              <el-descriptions-item label="提交时间">
                {{ row.submitTime }}
              </el-descriptions-item>
              <el-descriptions-item label="修改内容" :span="2">
                <el-tag
                  v-for="change in row.changes"
                  :key="change"
                  size="small"
                  class="change-tag"
                >
                  {{ change }}
                </el-tag>
              </el-descriptions-item>
            </el-descriptions>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="商品ID" width="100" />
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
        <el-table-column prop="type" label="审核类型" width="100">
          <template #default="{ row }">
            <el-tag :type="row.type === 'new' ? 'success' : 'warning'">
              {{ row.type === 'new' ? '新建' : '修改' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="审核状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusLabel(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button
              type="primary"
              link
              @click="handleView(row)"
              v-if="row.status !== 'pending'"
            >
              查看
            </el-button>
            <template v-else>
              <el-button type="success" link @click="handleApprove(row)">
                通过
              </el-button>
              <el-button type="danger" link @click="handleReject(row)">
                拒绝
              </el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
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

    <!-- 审核对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'approve' ? '审核通过' : '审核拒绝'"
      width="500px"
    >
      <el-form ref="auditFormRef" :model="auditForm" :rules="auditRules">
        <el-form-item
          label="审核意见"
          prop="comment"
          :rules="[
            { required: true, message: '请输入审核意见', trigger: 'blur' }
          ]"
        >
          <el-input
            v-model="auditForm.comment"
            type="textarea"
            :rows="4"
            placeholder="请输入审核意见"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="submitAudit"
            :loading="submitting"
          >
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 查看详情抽屉 -->
    <el-drawer
      v-model="drawerVisible"
      title="审核详情"
      size="50%"
      :destroy-on-close="true"
    >
      <div class="audit-detail">
        <el-timeline>
          <el-timeline-item
            v-for="record in currentAuditRecords"
            :key="record.time"
            :timestamp="record.time"
            :type="record.status === 'approved' ? 'success' : 'danger'"
          >
            <h4>{{ getStatusLabel(record.status) }}</h4>
            <p>审核人：{{ record.auditor }}</p>
            <p>审核意见：{{ record.comment }}</p>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Message, MessageBox } from 'element-ui'

// 搜索表单
const searchForm = reactive({
  name: '',
  status: '',
  dateRange: []
})

// 表格数据
const loading = ref(false)
const auditList = ref([
  {
    id: 1,
    image: 'https://via.placeholder.com/100',
    name: '测试商品1',
    type: 'new',
    status: 'pending',
    category: '服装/上衣',
    brand: '品牌A',
    specs: ['颜色：红色', '尺寸：M'],
    minPrice: 99,
    maxPrice: 199,
    submitter: '张三',
    submitTime: '2024-03-20 10:00:00',
    changes: ['基本信息', '价格调整']
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/100',
    name: '测试商品2',
    type: 'modify',
    status: 'approved',
    category: '鞋靴/运动鞋',
    brand: '品牌B',
    specs: ['颜色：黑色', '尺码：42'],
    minPrice: 299,
    maxPrice: 399,
    submitter: '李四',
    submitTime: '2024-03-20 09:00:00',
    changes: ['规格信息']
  }
])

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

// 审核对话框
const dialogVisible = ref(false)
const dialogType = ref('approve')
const submitting = ref(false)
const auditForm = reactive({
  comment: ''
})
const auditFormRef = ref()

// 详情抽屉
const drawerVisible = ref(false)
const currentAuditRecords = ref([
  {
    time: '2024-03-20 10:30:00',
    status: 'approved',
    auditor: '王五',
    comment: '商品信息符合要求，审核通过'
  }
])

// 获取状态样式
const getStatusType = (status) => {
  const types = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger'
  }
  return types[status] || 'info'
}

// 获取状态文本
const getStatusLabel = (status) => {
  const labels = {
    pending: '待审核',
    approved: '已通过',
    rejected: '已拒绝'
  }
  return labels[status] || status
}

// 搜索
const handleSearch = () => {
  // TODO: 调用搜索接口
  fetchAuditList()
}

// 重置搜索
const resetSearch = () => {
  searchForm.name = ''
  searchForm.status = ''
  searchForm.dateRange = []
  handleSearch()
}

// 获取审核列表
const fetchAuditList = async () => {
  loading.value = true
  try {
    // TODO: 调用获取审核列表接口
    await new Promise(resolve => setTimeout(resolve, 1000))
  } catch (error) {
    Message.error('获取审核列表失败')
  } finally {
    loading.value = false
  }
}

// 查看详情
const handleView = (row) => {
  // TODO: 加载审核记录
  drawerVisible.value = true
}

// 审核通过
const handleApprove = (row) => {
  dialogType.value = 'approve'
  auditForm.comment = ''
  dialogVisible.value = true
}

// 审核拒绝
const handleReject = (row) => {
  dialogType.value = 'reject'
  auditForm.comment = ''
  dialogVisible.value = true
}

// 提交审核
const submitAudit = async () => {
  if (!auditFormRef.value) return
  
  try {
    await auditFormRef.value.validate()
    submitting.value = true
    // TODO: 调用审核接口
    await new Promise(resolve => setTimeout(resolve, 1000))
    Message.success(
      dialogType.value === 'approve' ? '审核已通过' : '审核已拒绝'
    )
    dialogVisible.value = false
    fetchAuditList()
  } catch (error) {
    console.error(error)
  } finally {
    submitting.value = false
  }
}

// 分页相关
const handleSizeChange = (val) => {
  pageSize.value = val
  fetchAuditList()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchAuditList()
}

// 初始化
fetchAuditList()
</script>

<style scoped>
.audit-container {
  padding: 20px;
}

.search-bar {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.audit-list {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
}

.product-image {
  width: 60px;
  height: 60px;
  border-radius: 4px;
}

.change-tag {
  margin-right: 8px;
  margin-bottom: 8px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.audit-detail {
  padding: 20px;
}
</style> 