<template>
  <div class="platform-config">
    <el-card class="config-card">
      <template #header>
        <div class="card-header">
          <span>平台参数设置</span>
          <el-button type="primary" @click="saveConfig" :loading="saving">
            保存配置
          </el-button>
        </div>
      </template>

      <el-form
        ref="configFormRef"
        :model="configForm"
        :rules="formRules"
        label-width="120px"
      >
        <!-- 基础设置 -->
        <el-divider>基础设置</el-divider>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="平台名称" prop="platformName">
              <el-input v-model="configForm.platformName" placeholder="请输入平台名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="系统版本" prop="version">
              <el-input v-model="configForm.version" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="configForm.phone" placeholder="请输入联系电话" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系邮箱" prop="email">
              <el-input v-model="configForm.email" placeholder="请输入联系邮箱" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 业务规则 -->
        <el-divider>业务规则</el-divider>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="商品审核" prop="productAudit">
              <el-switch
                v-model="configForm.productAudit"
                active-text="开启"
                inactive-text="关闭"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="价格审核" prop="priceAudit">
              <el-switch
                v-model="configForm.priceAudit"
                active-text="开启"
                inactive-text="关闭"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="库存预警" prop="stockWarning">
              <el-input-number
                v-model="configForm.stockWarning"
                :min="0"
                :step="10"
              />
              <span class="unit">件</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="价格浮动" prop="priceFloat">
              <el-input-number
                v-model="configForm.priceFloat"
                :min="0"
                :max="100"
                :step="1"
              />
              <span class="unit">%</span>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 数据设置 -->
        <el-divider>数据设置</el-divider>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="数据备份" prop="dataBackup">
              <el-select v-model="configForm.dataBackup" placeholder="请选择备份频率">
                <el-option label="每天" value="daily" />
                <el-option label="每周" value="weekly" />
                <el-option label="每月" value="monthly" />
                <el-option label="不备份" value="never" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数据保留" prop="dataRetention">
              <el-input-number
                v-model="configForm.dataRetention"
                :min="1"
                :max="36"
                :step="1"
              />
              <span class="unit">个月</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="备份内容">
              <el-checkbox-group v-model="configForm.backupItems">
                <el-checkbox label="product">商品数据</el-checkbox>
                <el-checkbox label="order">订单数据</el-checkbox>
                <el-checkbox label="customer">客户数据</el-checkbox>
                <el-checkbox label="log">系统日志</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 通知设置 -->
        <el-divider>通知设置</el-divider>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="系统通知" prop="systemNotice">
              <el-switch
                v-model="configForm.systemNotice"
                active-text="开启"
                inactive-text="关闭"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="通知方式" v-if="configForm.systemNotice">
              <el-checkbox-group v-model="configForm.notifyMethods">
                <el-checkbox label="email">邮件通知</el-checkbox>
                <el-checkbox label="sms">短信通知</el-checkbox>
                <el-checkbox label="wechat">微信通知</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="通知事件">
              <el-checkbox-group v-model="configForm.notifyEvents">
                <el-checkbox label="audit">审核结果</el-checkbox>
                <el-checkbox label="stock">库存预警</el-checkbox>
                <el-checkbox label="error">系统异常</el-checkbox>
                <el-checkbox label="backup">备份完成</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 其他设置 -->
        <el-divider>其他设置</el-divider>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="系统公告">
              <el-input
                v-model="configForm.announcement"
                type="textarea"
                :rows="3"
                placeholder="请输入系统公告"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Message } from 'element-ui'

// 表单数据
const configForm = reactive({
  platformName: '商品助理',
  version: 'v1.0.0',
  phone: '',
  email: '',
  productAudit: true,
  priceAudit: true,
  stockWarning: 100,
  priceFloat: 10,
  dataBackup: 'daily',
  dataRetention: 12,
  backupItems: ['product', 'order'],
  systemNotice: true,
  notifyMethods: ['email'],
  notifyEvents: ['audit', 'stock'],
  announcement: ''
})

// 表单规则
const formRules = {
  platformName: [
    { required: true, message: '请输入平台名称', trigger: 'blur' }
  ],
  phone: [
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  email: [
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  stockWarning: [
    { required: true, message: '请设置库存预警值', trigger: 'change' }
  ],
  priceFloat: [
    { required: true, message: '请设置价格浮动范围', trigger: 'change' }
  ],
  dataRetention: [
    { required: true, message: '请设置数据保留时间', trigger: 'change' }
  ]
}

// 表单引用
const configFormRef = ref()

// 保存状态
const saving = ref(false)

// 保存配置
const saveConfig = async () => {
  if (!configFormRef.value) return
  
  try {
    await configFormRef.value.validate()
    saving.value = true
    // TODO: 调用保存接口
    await new Promise(resolve => setTimeout(resolve, 1000))
    Message.success('配置保存成功')
  } catch (error) {
    console.error(error)
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.platform-config {
  padding: 20px;
}

.config-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:deep(.el-divider__text) {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
}

.unit {
  margin-left: 10px;
  color: #909399;
}
</style> 