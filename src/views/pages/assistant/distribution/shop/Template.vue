<template>
  <div class="template-container">
    <!-- 平台选择 -->
    <div class="platform-select">
      <el-radio-group v-model="currentPlatform" @change="handlePlatformChange">
        <el-radio-button label="douyin">抖店</el-radio-button>
        <el-radio-button label="taobao">淘宝</el-radio-button>
        <el-radio-button label="jd">京东</el-radio-button>
        <el-radio-button label="pdd">拼多多</el-radio-button>
      </el-radio-group>
    </div>

    <!-- 模板配置区域 -->
    <div class="template-content">
      <el-form ref="templateFormRef" :model="templateForm" label-width="120px">
        <!-- 基础信息配置 -->
        <div class="config-section">
          <h3>基础信息配置</h3>
          <el-form-item label="标题模板">
            <el-input
              v-model="templateForm.titleTemplate"
              type="textarea"
              :rows="2"
              placeholder="支持变量: {品牌} {商品名} {规格} {材质}"
            />
            <div class="template-tips">
              示例: {品牌}{商品名} {规格}cm 高品质{材质}材质
            </div>
          </el-form-item>

          <el-form-item label="价格策略">
            <el-radio-group v-model="templateForm.priceStrategy">
              <el-radio label="fixed">固定加价</el-radio>
              <el-radio label="percent">百分比加价</el-radio>
            </el-radio-group>
            <div class="price-input" v-if="templateForm.priceStrategy === 'fixed'">
              <el-input-number
                v-model="templateForm.priceValue"
                :min="0"
                :precision="2"
                :step="1"
              />
              <span class="unit">元</span>
            </div>
            <div class="price-input" v-else>
              <el-input-number
                v-model="templateForm.priceValue"
                :min="0"
                :max="100"
                :precision="0"
                :step="1"
              />
              <span class="unit">%</span>
            </div>
          </el-form-item>
        </div>

        <!-- 图片配置 -->
        <div class="config-section">
          <h3>图片配置</h3>
          <el-form-item label="主图尺寸">
            <el-select v-model="templateForm.mainImageSize">
              <el-option label="800x800" value="800x800" />
              <el-option label="1000x1000" value="1000x1000" />
              <el-option label="1200x1200" value="1200x1200" />
            </el-select>
          </el-form-item>

          <el-form-item label="主图水印">
            <el-switch v-model="templateForm.watermark" />
          </el-form-item>

          <el-form-item label="水印位置" v-if="templateForm.watermark">
            <el-select v-model="templateForm.watermarkPosition">
              <el-option label="左上角" value="top-left" />
              <el-option label="右上角" value="top-right" />
              <el-option label="左下角" value="bottom-left" />
              <el-option label="右下角" value="bottom-right" />
              <el-option label="居中" value="center" />
            </el-select>
          </el-form-item>
        </div>

        <!-- 详情页配置 -->
        <div class="config-section">
          <h3>详情页配置</h3>
          <el-form-item label="详情页模板">
            <el-select v-model="templateForm.detailTemplate">
              <el-option
                v-for="template in detailTemplates"
                :key="template.id"
                :label="template.name"
                :value="template.id"
              >
                <div class="template-option">
                  <img :src="template.preview" class="template-preview" />
                  <span>{{ template.name }}</span>
                </div>
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="规格展示">
            <el-checkbox-group v-model="templateForm.specDisplay">
              <el-checkbox label="size">尺寸</el-checkbox>
              <el-checkbox label="color">颜色</el-checkbox>
              <el-checkbox label="material">材质</el-checkbox>
              <el-checkbox label="style">款式</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>

        <!-- 保存按钮 -->
        <div class="form-footer">
          <el-button type="primary" @click="handleSave" :loading="saving">
            保存配置
          </el-button>
          <el-button @click="handleReset">重置</el-button>
        </div>
      </el-form>
    </div>

    <!-- 预览抽屉 -->
    <el-drawer
      v-model="previewVisible"
      title="模板预览"
      size="50%"
      :destroy-on-close="true"
    >
      <div class="preview-content">
        <div class="preview-item">
          <h4>商品标题预览</h4>
          <div class="preview-title">
            {{ generatePreviewTitle() }}
          </div>
        </div>
        <div class="preview-item">
          <h4>详情页预览</h4>
          <img :src="getCurrentTemplate?.preview" class="detail-preview" />
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { Message, MessageBox } from 'element-ui'

// 当前选中的平台
const currentPlatform = ref('douyin')

// 模板表单数据
const templateForm = reactive({
  titleTemplate: '{品牌}{商品名} {规格}cm 高品质{材质}材质',
  priceStrategy: 'percent',
  priceValue: 30,
  mainImageSize: '800x800',
  watermark: true,
  watermarkPosition: 'bottom-right',
  detailTemplate: 1,
  specDisplay: ['size', 'color']
})

// 详情页模板数据
const detailTemplates = [
  {
    id: 1,
    name: '简约风格',
    preview: 'https://via.placeholder.com/300x400?text=Template+1'
  },
  {
    id: 2,
    name: '时尚风格',
    preview: 'https://via.placeholder.com/300x400?text=Template+2'
  },
  {
    id: 3,
    name: '商务风格',
    preview: 'https://via.placeholder.com/300x400?text=Template+3'
  }
]

// 获取当前选中的模板
const getCurrentTemplate = computed(() => {
  return detailTemplates.find(t => t.id === templateForm.detailTemplate)
})

// 预览控制
const previewVisible = ref(false)
const saving = ref(false)

// 处理平台切换
const handlePlatformChange = (platform) => {
  // TODO: 加载对应平台的模板配置
  Message.success(`已切换到${platform}平台配置`)
}

// 生成预览标题
const generatePreviewTitle = () => {
  return templateForm.titleTemplate
    .replace('{品牌}', 'TestBrand')
    .replace('{商品名}', '测试商品')
    .replace('{规格}', '100')
    .replace('{材质}', '棉')
}

// 保存配置
const handleSave = async () => {
  saving.value = true
  try {
    // TODO: 调用保存接口
    await new Promise(resolve => setTimeout(resolve, 1000))
    Message.success('配置保存成功')
  } catch (error) {
    Message.error('保存失败')
  } finally {
    saving.value = false
  }
}

// 重置配置
const handleReset = () => {
  // TODO: 重置为默认配置
  Message.success('已重置为默认配置')
}
</script>

<style scoped>
.template-container {
  padding: 20px;
}

.platform-select {
  margin-bottom: 20px;
}

.template-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
}

.config-section {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ebeef5;
}

.config-section h3 {
  margin: 0 0 20px 0;
  font-size: 16px;
  color: #303133;
}

.template-tips {
  margin-top: 5px;
  color: #909399;
  font-size: 12px;
}

.price-input {
  display: inline-flex;
  align-items: center;
  margin-left: 20px;
}

.unit {
  margin-left: 10px;
  color: #606266;
}

.template-option {
  display: flex;
  align-items: center;
  gap: 10px;
}

.template-preview {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.form-footer {
  margin-top: 30px;
  text-align: center;
}

.preview-content {
  padding: 20px;
}

.preview-item {
  margin-bottom: 30px;
}

.preview-item h4 {
  margin: 0 0 10px 0;
  color: #303133;
}

.preview-title {
  padding: 10px;
  background: #f5f7fa;
  border-radius: 4px;
}

.detail-preview {
  width: 100%;
  max-width: 500px;
  border-radius: 8px;
}
</style> 