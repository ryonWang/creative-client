<template>
  <div class="background-page">
    <div class="page-header">
      <h2>背景替换</h2>
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
                <li>支持自定义背景替换</li>
                <li>支持JPG、PNG格式图片</li>
                <li>单张图片大小不超过20MB</li>
              </ul>
            </div>
            <image-uploader @images-selected="handleImagesSelected" />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="preview-area">
            <template v-if="currentImages.length">
              <div class="preview-header">
                <span>处理结果</span>
                <el-button type="text" @click="handleDownload">
                  <i class="el-icon-download"></i> 下载
                </el-button>
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
  name: 'BackgroundPage',
  components: {
    ImageUploader
  },
  data() {
    return {
      processingProgress: 0,
      historyList: [
        {
          id: 1,
          name: '示例图片1',
          resultUrl: 'https://example.com/sample1.jpg',
          createTime: '2024-03-21 10:00:00'
        },
        {
          id: 2,
          name: '示例图片2',
          resultUrl: 'https://example.com/sample2.jpg',
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
            type: 'background',
            images: this.currentImages
          })
        }
      }, 500)
    },
    handleDownload() {
      if (this.previewImage) {
        window.open(this.previewImage)
      }
    },
    downloadHistory(item) {
      window.open(item.resultUrl)
    }
  }
}
</script>

<style scoped>
.background-page {
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

.empty-preview {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #909399;
}

.empty-preview i {
  font-size: 48px;
  margin-bottom: 10px;
}

.history-section {
  margin-top: 30px;
}

.section-header {
  margin-bottom: 20px;
}

.history-item {
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

.item-info {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
}

.time {
  font-size: 12px;
  color: #909399;
}

.processing {
  text-align: center;
}

.processing p {
  margin-top: 10px;
  color: #909399;
}
</style> 