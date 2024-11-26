<template>
  <div class="shop-bind-container">
    <!-- 顶部操作栏 -->
    <div class="operation-bar">
      <el-button type="primary" @click="handleAddShop">
        <el-icon><Plus /></el-icon>绑定新店铺
      </el-button>
    </div>

    <!-- 店铺列表 -->
    <div class="shop-list">
      <el-row :gutter="20">
        <el-col v-for="shop in shopList" :key="shop.id" :span="8">
          <el-card class="shop-card" :body-style="{ padding: '0px' }">
            <div class="shop-header">
              <img :src="shop.platformIcon" class="platform-icon" />
              <span class="shop-name">{{ shop.shopName }}</span>
              <el-tag :type="shop.status === 'active' ? 'success' : 'danger'" size="small">
                {{ shop.status === 'active' ? '已连接' : '未连接' }}
              </el-tag>
            </div>
            <div class="shop-content">
              <div class="info-item">
                <span class="label">店铺ID：</span>
                <span>{{ shop.shopId }}</span>
              </div>
              <div class="info-item">
                <span class="label">平台：</span>
                <span>{{ shop.platformName }}</span>
              </div>
              <div class="info-item">
                <span class="label">绑定时间：</span>
                <span>{{ shop.bindTime }}</span>
              </div>
            </div>
            <div class="shop-footer">
              <el-button type="primary" link @click="handleEdit(shop)">编辑</el-button>
              <el-button type="success" link @click="handleTest(shop)">测试连接</el-button>
              <el-button type="danger" link @click="handleUnbind(shop)">解绑</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 绑定店铺对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'add' ? '绑定新店铺' : '编辑店铺信息'"
      width="500px"
    >
      <el-form
        ref="shopFormRef"
        :model="shopForm"
        :rules="shopRules"
        label-width="100px"
      >
        <el-form-item label="电商平台" prop="platform">
          <el-select v-model="shopForm.platform" placeholder="请选择电商平台">
            <el-option label="抖店" value="douyin" />
            <el-option label="淘宝" value="taobao" />
            <el-option label="京东" value="jd" />
            <el-option label="拼多多" value="pdd" />
          </el-select>
        </el-form-item>
        <el-form-item label="店铺名称" prop="shopName">
          <el-input v-model="shopForm.shopName" placeholder="请输入店铺名称" />
        </el-form-item>
        <el-form-item label="店铺ID" prop="shopId">
          <el-input v-model="shopForm.shopId" placeholder="请输入店铺ID" />
        </el-form-item>
        <el-form-item label="AppKey" prop="appKey">
          <el-input v-model="shopForm.appKey" placeholder="请输入AppKey" />
        </el-form-item>
        <el-form-item label="AppSecret" prop="appSecret">
          <el-input
            v-model="shopForm.appSecret"
            type="password"
            placeholder="请输入AppSecret"
            show-password
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
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 店铺列表数据
const shopList = ref([
  {
    id: 1,
    shopName: '测试店铺1',
    shopId: 'shop_123456',
    platformName: '抖店',
    platformIcon: 'https://example.com/douyin.png',
    status: 'active',
    bindTime: '2024-03-20 10:00:00'
  }
])

// 对话框控制
const dialogVisible = ref(false)
const dialogType = ref('add')
const submitting = ref(false)
const shopFormRef = ref()

// 表单数据
const shopForm = reactive({
  platform: '',
  shopName: '',
  shopId: '',
  appKey: '',
  appSecret: ''
})

// 表单验证规则
const shopRules = {
  platform: [
    { required: true, message: '请选择电商平台', trigger: 'change' }
  ],
  shopName: [
    { required: true, message: '请输入店铺名称', trigger: 'blur' },
    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  shopId: [
    { required: true, message: '请输入店铺ID', trigger: 'blur' }
  ],
  appKey: [
    { required: true, message: '请输入AppKey', trigger: 'blur' }
  ],
  appSecret: [
    { required: true, message: '请输入AppSecret', trigger: 'blur' }
  ]
}

// 添加店铺
const handleAddShop = () => {
  dialogType.value = 'add'
  shopForm.platform = ''
  shopForm.shopName = ''
  shopForm.shopId = ''
  shopForm.appKey = ''
  shopForm.appSecret = ''
  dialogVisible.value = true
}

// 编辑店铺
const handleEdit = (shop) => {
  dialogType.value = 'edit'
  Object.assign(shopForm, {
    platform: shop.platformName.toLowerCase(),
    shopName: shop.shopName,
    shopId: shop.shopId
  })
  dialogVisible.value = true
}

// 测试连接
const handleTest = async (shop) => {
  try {
    // TODO: 调用测试连接接口
    ElMessage.success('连接测试成功')
  } catch (error) {
    ElMessage.error('连接测试失败')
  }
}

// 解绑店铺
const handleUnbind = async (shop) => {
  try {
    await ElMessageBox.confirm(
      `确认解绑店铺"${shop.shopName}"吗？解绑后需要重新授权。`,
      '提示',
      { type: 'warning' }
    )
    // TODO: 调用解绑接口
    ElMessage.success('店铺解绑成功')
  } catch {
    // 取消解绑
  }
}

// 提交表单
const handleSubmit = async () => {
  if (!shopFormRef.value) return
  await shopFormRef.value.validate(async (valid) => {
    if (valid) {
      submitting.value = true
      try {
        // TODO: 调用绑定/更新接口
        ElMessage.success(
          dialogType.value === 'add' ? '店铺绑定成功' : '店铺信息更新成功'
        )
        dialogVisible.value = false
      } catch (error) {
        ElMessage.error('操作失败')
      } finally {
        submitting.value = false
      }
    }
  })
}
</script>

<style scoped>
.shop-bind-container {
  padding: 20px;
}

.operation-bar {
  margin-bottom: 20px;
}

.shop-card {
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
}

.shop-header {
  background-color: #f5f7fa;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.platform-icon {
  width: 24px;
  height: 24px;
  border-radius: 4px;
}

.shop-name {
  flex: 1;
  font-weight: bold;
}

.shop-content {
  padding: 15px;
}

.info-item {
  margin-bottom: 8px;
  font-size: 14px;
}

.info-item .label {
  color: #909399;
}

.shop-footer {
  border-top: 1px solid #ebeef5;
  padding: 10px 15px;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
}
</style> 