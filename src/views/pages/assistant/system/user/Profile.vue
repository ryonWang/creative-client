<template>
  <div class="user-profile">
    <el-card class="profile-card">
      <template #header>
        <div class="card-header">
          <span>个人信息</span>
          <el-button type="primary" @click="handleEdit" v-if="!editing">
            编辑资料
          </el-button>
          <div v-else>
            <el-button @click="cancelEdit">取消</el-button>
            <el-button type="primary" @click="saveProfile" :loading="saving">
              保存
            </el-button>
          </div>
        </div>
      </template>

      <el-form
        ref="profileFormRef"
        :model="profileForm"
        :rules="formRules"
        label-width="100px"
        :disabled="!editing"
      >
        <!-- 基本信息 -->
        <el-divider>基本信息</el-divider>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="profileForm.username" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="profileForm.nickname" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="profileForm.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="profileForm.email" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 公司信息 -->
        <el-divider>公司信息</el-divider>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="公司名称" prop="company">
              <el-input v-model="profileForm.company" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职位" prop="position">
              <el-input v-model="profileForm.position" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所在地区" prop="region">
              <el-cascader
                v-model="profileForm.region"
                :options="regionOptions"
                placeholder="请选择所在地区"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="详细地址" prop="address">
              <el-input v-model="profileForm.address" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 账号安全 -->
        <el-divider>账号安全</el-divider>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="密码">
              <el-button type="primary" link @click="showPasswordDialog">
                修改密码
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="二次验证">
              <el-switch
                v-model="profileForm.twoFactorAuth"
                @change="handleTwoFactorChange"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 通知设置 -->
        <el-divider>通知设置</el-divider>
        <el-form-item label="通知方式">
          <el-checkbox-group v-model="profileForm.notifications">
            <el-checkbox label="email">邮件通知</el-checkbox>
            <el-checkbox label="sms">短信通知</el-checkbox>
            <el-checkbox label="wechat">微信通知</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 修改密码对话框 -->
    <el-dialog
      v-model="passwordDialogVisible"
      title="修改密码"
      width="500px"
    >
      <el-form
        ref="passwordFormRef"
        :model="passwordForm"
        :rules="passwordRules"
        label-width="100px"
      >
        <el-form-item label="当前密码" prop="currentPassword">
          <el-input
            v-model="passwordForm.currentPassword"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model="passwordForm.newPassword"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="passwordForm.confirmPassword"
            type="password"
            show-password
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="passwordDialogVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="changePassword"
            :loading="changingPassword"
          >
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 二次验证对话框 -->
    <el-dialog
      v-model="twoFactorDialogVisible"
      title="二次验证设置"
      width="400px"
    >
      <div class="qrcode-container" v-if="profileForm.twoFactorAuth">
        <img :src="qrcodeUrl" alt="二维码" class="qrcode" />
        <p class="qrcode-tip">请使用Google Authenticator扫描二维码</p>
      </div>
      <div v-else class="disable-2fa">
        <el-alert
          title="确定要关闭二次验证吗？"
          type="warning"
          :closable="false"
          show-icon
        >
          <p>关闭二次验证将降低账号安全性</p>
        </el-alert>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelTwoFactorChange">取消</el-button>
          <el-button
            type="primary"
            @click="confirmTwoFactorChange"
            :loading="changingTwoFactor"
          >
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

// 表单数据
const profileForm = reactive({
  username: 'admin',
  nickname: '管理员',
  phone: '13800138000',
  email: 'admin@example.com',
  company: '示例公司',
  position: '经理',
  region: ['110000', '110100', '110101'],
  address: '示例地址',
  twoFactorAuth: false,
  notifications: ['email', 'sms']
})

// 表单规则
const formRules = {
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  company: [
    { required: true, message: '请输入公司名称', trigger: 'blur' }
  ],
  region: [
    { required: true, message: '请选择所在地区', trigger: 'change' }
  ],
  address: [
    { required: true, message: '请输入详细地址', trigger: 'blur' }
  ]
}

// 密码表单
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 密码规则
const passwordRules = {
  currentPassword: [
    { required: true, message: '请输入当前密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== passwordForm.newPassword) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 编辑状态
const editing = ref(false)
const saving = ref(false)

// 密码对话框
const passwordDialogVisible = ref(false)
const changingPassword = ref(false)

// 二次验证对话框
const twoFactorDialogVisible = ref(false)
const changingTwoFactor = ref(false)
const qrcodeUrl = ref('data:image/png;base64,xxx') // 二维码图片

// 表单引用
const profileFormRef = ref()
const passwordFormRef = ref()

// 编辑资料
const handleEdit = () => {
  editing.value = true
}

// 取消编辑
const cancelEdit = () => {
  editing.value = false
  // TODO: 重置表单数据
}

// 保存资料
const saveProfile = async () => {
  if (!profileFormRef.value) return
  
  try {
    await profileFormRef.value.validate()
    saving.value = true
    // TODO: 调用保存接口
    await new Promise(resolve => setTimeout(resolve, 1000))
    Message.success('保存成功')
    editing.value = false
  } catch (error) {
    console.error(error)
  } finally {
    saving.value = false
  }
}

// 显示修改密码对话框
const showPasswordDialog = () => {
  passwordDialogVisible.value = true
  passwordForm.currentPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
}

// 修改密码
const changePassword = async () => {
  if (!passwordFormRef.value) return
  
  try {
    await passwordFormRef.value.validate()
    changingPassword.value = true
    // TODO: 调用修改密码接口
    await new Promise(resolve => setTimeout(resolve, 1000))
    Message.success('密码修改成功')
    passwordDialogVisible.value = false
  } catch (error) {
    console.error(error)
  } finally {
    changingPassword.value = false
  }
}

// 二次验证变更
const handleTwoFactorChange = (value) => {
  twoFactorDialogVisible.value = true
}

// 取消二次验证变更
const cancelTwoFactorChange = () => {
  profileForm.twoFactorAuth = !profileForm.twoFactorAuth
  twoFactorDialogVisible.value = false
}

// 确认二次验证变更
const confirmTwoFactorChange = async () => {
  try {
    changingTwoFactor.value = true
    // TODO: 调用二次验证设置接口
    await new Promise(resolve => setTimeout(resolve, 1000))
    Message.success(
      profileForm.twoFactorAuth ? '二次验证已开启' : '二次验证已关闭'
    )
    twoFactorDialogVisible.value = false
  } catch (error) {
    profileForm.twoFactorAuth = !profileForm.twoFactorAuth
    Message.error('设置失败')
  } finally {
    changingTwoFactor.value = false
  }
}

// 地区选项
const regionOptions = [
  {
    value: '110000',
    label: '北京市',
    children: [
      {
        value: '110100',
        label: '北京市',
        children: [
          { value: '110101', label: '东城区' },
          { value: '110102', label: '西城区' }
        ]
      }
    ]
  }
  // 其他省市区数据...
]
</script>

<style scoped>
.user-profile {
  padding: 20px;
}

.profile-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.qrcode-container {
  text-align: center;
  padding: 20px;

  .qrcode {
    width: 200px;
    height: 200px;
    margin-bottom: 10px;
  }

  .qrcode-tip {
    color: #909399;
    margin: 0;
  }
}

.disable-2fa {
  padding: 20px 0;
}

:deep(.el-divider__text) {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style> 