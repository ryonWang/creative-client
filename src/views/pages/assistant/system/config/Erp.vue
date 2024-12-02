<template>
  <div class="erp-config">
    <el-card class="config-card">
      <template #header>
        <div class="card-header">
          <span>ERP系统对接配置</span>
          <div class="header-right">
            <el-button @click="testConnection" :loading="testing">
              测试连接
            </el-button>
            <el-button type="primary" @click="saveConfig" :loading="saving">
              保存配置
            </el-button>
          </div>
        </div>
      </template>

      <el-form
        ref="configFormRef"
        :model="configForm"
        :rules="formRules"
        label-width="120px"
      >
        <!-- 基础配置 -->
        <el-divider>基础配置</el-divider>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="ERP类型" prop="type">
              <el-select v-model="configForm.type" placeholder="请选择ERP类型">
                <el-option label="金蝶ERP" value="kingdee" />
                <el-option label="用友ERP" value="yonyou" />
                <el-option label="SAP" value="sap" />
                <el-option label="自定义" value="custom" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="接口版本" prop="version">
              <el-input v-model="configForm.version" placeholder="请输入接口版本" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 连接配置 -->
        <el-divider>连接配置</el-divider>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="服务地址" prop="serverUrl">
              <el-input v-model="configForm.serverUrl" placeholder="请输入服务地址">
                <template #prepend>
                  <el-select v-model="configForm.protocol" style="width: 100px">
                    <el-option label="HTTP" value="http" />
                    <el-option label="HTTPS" value="https" />
                  </el-select>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="端口号" prop="port">
              <el-input-number
                v-model="configForm.port"
                :min="1"
                :max="65535"
                placeholder="请输入端口号"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="应用ID" prop="appId">
              <el-input v-model="configForm.appId" placeholder="请输入应用ID" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="应用密钥" prop="appSecret">
              <el-input
                v-model="configForm.appSecret"
                type="password"
                show-password
                placeholder="请输入应用密钥"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 同步配置 -->
        <el-divider>同步配置</el-divider>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="数据同步" prop="syncEnabled">
              <el-switch v-model="configForm.syncEnabled" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="同步频率" prop="syncInterval" v-if="configForm.syncEnabled">
              <el-select v-model="configForm.syncInterval" placeholder="请选择同步频率">
                <el-option label="每5分钟" value="5min" />
                <el-option label="每15分钟" value="15min" />
                <el-option label="每30分钟" value="30min" />
                <el-option label="每小时" value="1hour" />
                <el-option label="每天" value="1day" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="同步项目">
              <el-checkbox-group v-model="configForm.syncItems">
                <el-checkbox label="product">商品数据</el-checkbox>
                <el-checkbox label="inventory">库存数据</el-checkbox>
                <el-checkbox label="order">订单数据</el-checkbox>
                <el-checkbox label="price">价格数据</el-checkbox>
                <el-checkbox label="customer">客户数据</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 高级配置 -->
        <el-divider>高级配置</el-divider>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="超时时间" prop="timeout">
              <el-input-number
                v-model="configForm.timeout"
                :min="1"
                :max="60"
                :step="1"
              />
              <span class="unit">秒</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="重试次数" prop="retryTimes">
              <el-input-number
                v-model="configForm.retryTimes"
                :min="0"
                :max="5"
                :step="1"
              />
              <span class="unit">次</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="错误通知">
              <el-checkbox-group v-model="configForm.errorNotify">
                <el-checkbox label="email">邮件通知</el-checkbox>
                <el-checkbox label="sms">短信通知</el-checkbox>
                <el-checkbox label="wechat">微信通知</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <!-- 连接测试结果对话框 -->
    <el-dialog
      v-model="testResultVisible"
      :title="testSuccess ? '连接测试成功' : '连接测试失败'"
      width="500px"
    >
      <div class="test-result">
        <el-result
          :icon="testSuccess ? 'success' : 'error'"
          :status="testSuccess ? 'success' : 'error'"
          :title="testSuccess ? '连接成功' : '连接失败'"
          :sub-title="testMessage"
        >
          <template #extra>
            <el-button @click="testResultVisible = false">关闭</el-button>
            <el-button
              v-if="!testSuccess"
              type="primary"
              @click="testConnection"
              :loading="testing"
            >
              重试
            </el-button>
          </template>
        </el-result>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 删除 setup 语法，改用 Vue 2 的选项式 API
// 删除 element-plus 的导入
import { Message } from 'element-ui'

export default {
  data() {
    return {
      // 表单数据
      configForm: {
        type: 'kingdee',
        version: '1.0.0',
        protocol: 'https',
        serverUrl: '',
        port: 443,
        appId: '',
        appSecret: '',
        syncEnabled: false,
        syncInterval: '30min',
        syncItems: ['product', 'inventory'],
        timeout: 30,
        retryTimes: 3,
        errorNotify: ['email']
      },
      // 表单规则
      formRules: {
        type: [
          { required: true, message: '请选择ERP类型', trigger: 'change' }
        ],
        version: [
          { required: true, message: '请输入接口版本', trigger: 'blur' }
        ],
        serverUrl: [
          { required: true, message: '请输入服务地址', trigger: 'blur' }
        ],
        port: [
          { required: true, message: '请输入端口号', trigger: 'change' }
        ],
        appId: [
          { required: true, message: '请输入应用ID', trigger: 'blur' }
        ],
        appSecret: [
          { required: true, message: '请输入应用密钥', trigger: 'blur' }
        ],
        syncInterval: [
          { required: true, message: '请选择同步频率', trigger: 'change' }
        ]
      },
      saving: false,
      testing: false,
      testResultVisible: false,
      testSuccess: false,
      testMessage: ''
    }
  },
  methods: {
    // 测试连接
    async testConnection() {
      if (!this.$refs.configFormRef) return
      
      try {
        await this.$refs.configFormRef.validate(['serverUrl', 'port', 'appId', 'appSecret'])
        this.testing = true
        // TODO: 调用测试接口
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.testSuccess = true
        this.testMessage = '成功连接到ERP系统'
      } catch (error) {
        this.testSuccess = false
        this.testMessage = error.message || '连接失败，请检查配置'
      } finally {
        this.testing = false
        this.testResultVisible = true
      }
    },

    // 保存配置
    async saveConfig() {
      if (!this.$refs.configFormRef) return
      
      try {
        await this.$refs.configFormRef.validate()
        this.saving = true
        // TODO: 调用保存接口
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.$message.success('配置保存成功')
      } catch (error) {
        console.error(error)
      } finally {
        this.saving = false
      }
    }
  }
}
</script>

<style scoped>
.erp-config {
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

.header-right {
  display: flex;
  gap: 10px;
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

.test-result {
  padding: 20px 0;
}
</style> 