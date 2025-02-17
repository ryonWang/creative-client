<template>
  <div class="shoes-page">
    <div class="page-header">
      <h2>鞋靴图制作</h2>
      <div class="tool-bar">
        <el-button-group>
          <el-button 
            :type="currentTool === 'eraser' ? 'primary' : 'default'"
            @click="selectTool('eraser')"
            icon="el-icon-delete"
          >
            消除笔
          </el-button>
          <el-button 
            :type="currentTool === 'magnifier' ? 'primary' : 'default'"
            @click="selectTool('magnifier')"
            icon="el-icon-zoom-in"
          >
            高清放大
          </el-button>
        </el-button-group>
      </div>
    </div>

    <div class="page-content">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="upload-area">
            <div class="upload-tips">
              <h4>上传说明：</h4>
              <ul>
                <li>通过AI快速生成合适的背景</li>
                <li>支持批量上传处理</li>
                <li>支持JPG、PNG格式图片</li>
                <li>单张图片大小不超过20MB</li>
              </ul>
            </div>
            <image-uploader @images-selected="handleImagesSelected" />
            
            <!-- 背景选择 -->
            <div class="background-selector" v-if="currentImages.length">
              <h4>选择背景风格：</h4>
              <el-radio-group v-model="selectedBackground" size="small">
                <el-radio-button label="pure">纯色背景</el-radio-button>
                <el-radio-button label="gradient">渐变背景</el-radio-button>
                <el-radio-button label="scene">场景背景</el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="preview-area">
            <template v-if="currentImages.length">
              <div class="preview-header">
                <span>处理结果</span>
                <div class="preview-actions">
                  <el-button 
                    type="text" 
                    icon="el-icon-refresh-right"
                    @click="regenerateBackground"
                    :disabled="processingStatus === 'processing'"
                  >
                    重新生成
                  </el-button>
                  <el-button 
                    type="text" 
                    icon="el-icon-download"
                    @click="handleDownload"
                  >
                    下载
                  </el-button>
                </div>
              </div>
              <div class="preview-content">
                <img :src="previewImage" v-if="previewImage" />
                <div v-else class="processing">
                  <el-progress type="circle" :percentage="processingProgress"></el-progress>
                  <p>正在处理中...</p>
                </div>
              </div>
            </template>
            <div v-else class="empty-preview">
              <i class="el-icon-picture"></i>
              <p>上传图片后在此处查看效果</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 批量处理预览 -->
    <div class="batch-preview" v-if="currentImages.length > 1">
      <div class="section-header">
        <h3>批量处理预览</h3>
      </div>
      <el-row :gutter="20">
        <el-col :span="6" v-for="(image, index) in currentImages" :key="index">
          <div class="batch-item">
            <div class="item-preview">
              <img :src="image.url" :alt="image.name">
            </div>
            <div class="item-status">
              <el-tag size="small" :type="getStatusType(index)">
                {{ getStatusText(index) }}
              </el-tag>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 历史记录 -->
    <div class="history-section">
      <div class="section-header">
        <h3>历史记录</h3>
      </div>
      <div class="history-list">
        <el-row :gutter="20">
          <el-col :span="6" v-for="(item, index) in historyList" :key="index">
            <div class="history-item">
              <div class="item-preview">
                <img :src="item.resultUrl" :alt="item.name">
              </div>
              <div class="item-info">
                <span class="time">{{ item.createTime }}</span>
                <el-button type="text" @click="downloadHistory(item)">
                  <i class="el-icon-download"></i>
                </el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ImageUploader from '../../components/ImageUploader.vue'

export default {
  name: 'ShoesPage',
  components: {
    ImageUploader
  },
  data() {
    return {
      processingProgress: 0,
      selectedBackground: 'pure',
      historyList: [
        {
          id: 1,
          name: '示例鞋子1',
          resultUrl: 'https://example.com/shoes1.jpg',
          createTime: '2024-03-21 10:00:00'
        },
        {
          id: 2,
          name: '示例鞋子2',
          resultUrl: 'https://example.com/shoes2.jpg',
          createTime: '2024-03-21 09:30:00'
        }
      ]
    }
  },
  computed: {
    ...mapState('aiDraw', [
      'currentTool',
      'currentImages',
      'processingStatus',
      'previewImage'
    ])
  },
  methods: {
    ...mapActions('aiDraw', [
      'setCurrentTool',
      'addImages',
      'processImages'
    ]),
    selectTool(tool) {
      this.setCurrentTool(tool)
    },
    async handleImagesSelected(images) {
      await this.addImages(images)
      this.startProcessing()
    },
    startProcessing() {
      this.processingProgress = 0
      const timer = setInterval(() => {
        this.processingProgress += 10
        if (this.processingProgress >= 100) {
          clearInterval(timer)
          this.processImages({
            type: 'shoes',
            images: this.currentImages,
            background: this.selectedBackground
          })
        }
      }, 500)
    },
    regenerateBackground() {
      this.startProcessing()
    },
    handleDownload() {
      if (this.previewImage) {
        window.open(this.previewImage)
      }
    },
    downloadHistory(item) {
      window.open(item.resultUrl)
    },
    getStatusType(index) {
      if (this.processingProgress === 100) return 'success'
      if (this.processingProgress > index * (100 / this.currentImages.length)) return 'warning'
      return 'info'
    },
    getStatusText(index) {
      if (this.processingProgress === 100) return '处理完成'
      if (this.processingProgress > index * (100 / this.currentImages.length)) return '处理中'
      return '等待处理'
    }
  },
  watch: {
    selectedBackground() {
      if (this.currentImages.length) {
        this.startProcessing()
      }
    }
  }
}
</script>

<style scoped>
.shoes-page {
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.upload-tips {
  margin-bottom: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 4px;
}

.upload-tips ul {
  padding-left: 20px;
  margin: 10px 0;
}

.upload-tips li {
  color: #606266;
  line-height: 1.8;
}

.background-selector {
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 4px;
}

.background-selector h4 {
  margin-bottom: 10px;
}

.page-content {
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

.preview-area {
  height: 400px;
  background: #f8f9fa;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
}

.preview-header {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.preview-actions {
  display: flex;
  gap: 10px;
}

.preview-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.preview-content img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.batch-preview {
  margin-top: 30px;
}

.batch-item {
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

.item-preview {
  height: 150px;
  overflow: hidden;
}

.item-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-status {
  padding: 10px;
  text-align: center;
  background: #f8f9fa;
}

/* 其他样式与之前相同 */
</style> 