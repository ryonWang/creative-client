<template>
  <div class="mannequin-container">
    <!-- 左侧上传和预览区域 -->
    <div class="left-panel">
      <div class="panel-header">
        <div class="title">
          <i class="el-icon-picture-outline"></i>
          <span>人台图转换</span>
        </div>
      </div>
      <div class="upload-section">
        <div class="upload-header">
          <div class="header-icon">
            <i class="el-icon-upload"></i>
          </div>
          <div class="header-text">
            <h3>上传人台图片</h3>
            <p>支持JPG、PNG格式，单张大小不超过20MB</p>
          </div>
        </div>

        <div class="upload-content">
          <image-uploader @images-selected="handleImagesSelected">
            <template #default>
              <div class="upload-area" :class="{ 'has-image': currentImages.length }">
                <template v-if="!currentImages.length">
                  <div class="upload-placeholder">
                    <div class="upload-icon">
                      <i class="el-icon-picture-outline-round"></i>
                      <div class="upload-pulse"></div>
                    </div>
                    <div class="upload-text">
                      <p>点击或拖拽图片到此处</p>
                    </div>
                  </div>
                  
                  <div class="upload-features">
                    <div class="feature-item">
                      <i class="el-icon-picture"></i>
                      <span>智能抠图</span>
                    </div>
                    <div class="feature-item">
                      <i class="el-icon-magic-stick"></i>
                      <span>场景合成</span>
                    </div>
                    <div class="feature-item">
                      <i class="el-icon-refresh"></i>
                      <span>批量处理</span>
                    </div>
                  </div>
                </template>
                
                <template v-else>
                  <div class="preview-wrapper">
                    <img :src="currentImages[0]" alt="预览图">
                    <div class="preview-actions">
                      <el-button 
                        type="danger" 
                        icon="el-icon-delete" 
                        circle 
                        @click.stop="clearImages"
                      ></el-button>
                    </div>
                  </div>
                </template>
              </div>
            </template>
          </image-uploader>
        </div>

        <div class="upload-tips">
          <div class="tip-item">
            <i class="el-icon-info"></i>
            <span>图片清晰度越高，生成效果越好</span>
          </div>
          <div class="tip-item">
            <i class="el-icon-info"></i>
            <span>建议使用白色或纯色背景的图片</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧设置和生成区域 -->
    <div class="right-panel">
      <div class="panel-content">
        <!-- 风格设置 -->
        <div class="setting-section">
          <div class="section-title">
            <span class="line"></span>
            <h3>风格设置</h3>
          </div>
          <div class="style-options">
            <div 
              v-for="style in styleOptions" 
              :key="style.value"
              :class="['style-item', { active: selectedStyle === style.value }]"
              @click="selectStyle(style.value)"
            >
              <div class="style-icon">
                <i :class="style.icon"></i>
              </div>
              <span>{{ style.label }}</span>
            </div>
          </div>
        </div>

        <!-- 场景选择 -->
        <div class="setting-section">
          <div class="section-title">
            <span class="line"></span>
            <h3>场景选择</h3>
          </div>
          <div class="scene-grid">
            <div 
              v-for="scene in scenes" 
              :key="scene.id"
              :class="['scene-item', { active: selectedScene === scene.id }]"
              @click="selectScene(scene.id)"
            >
              <div class="scene-image">
                <img :src="scene.thumbnail" :alt="scene.name">
                <div class="scene-overlay">
                  <i class="el-icon-check"></i>
                </div>
              </div>
              <span class="scene-name">{{ scene.name }}</span>
            </div>
          </div>
        </div>

        <!-- AI提示词 -->
        <div class="setting-section">
          <div class="section-title">
            <span class="line"></span>
            <h3>AI提示词</h3>
          </div>
          <el-input
            type="textarea"
            v-model="prompt"
            :rows="3"
            placeholder="描述您想要的效果，例如：阳光明媚的街道场景，模特穿着这件衣服自然行走"
          >
          </el-input>
        </div>

        <!-- 生成按钮 -->
        <div class="action-section">
          <el-button 
            type="primary" 
            class="generate-btn"
            :loading="isGenerating"
            @click="startGenerate"
          >
            {{ isGenerating ? '生成中...' : '开始生成' }}
          </el-button>
        </div>
      </div>
    </div>

    <!-- 生成结果弹窗 -->
    <el-dialog
      title="生成结果"
      :visible.sync="showResult"
      width="80%"
      custom-class="result-dialog"
    >
      <div class="result-content">
        <div v-if="isGenerating" class="generating">
          <el-progress type="circle" :percentage="generateProgress"></el-progress>
          <div class="generate-status">
            <p class="status-text">AI正在生成中...</p>
            <p class="status-desc">{{ currentStatus }}</p>
          </div>
        </div>
        <div v-else class="result-grid">
          <div 
            v-for="(result, index) in resultImages" 
            :key="index"
            :class="['result-item', { active: selectedResult === index }]"
            @click="selectResult(index)"
          >
            <div class="result-image">
              <img :src="result" alt="生成结果">
              <div class="result-overlay">
                <i class="el-icon-check"></i>
              </div>
            </div>
            <div class="result-footer">
              <span class="result-label">方案 {{ index + 1 }}</span>
            </div>
          </div>
        </div>
        <div class="dialog-footer">
          <el-button @click="regenerate">重新生成</el-button>
          <el-button 
            type="primary" 
            @click="downloadResult" 
            :disabled="selectedResult === null"
          >
            下载选中结果
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ImageUploader from '../../components/ImageUploader.vue'

export default {
  name: 'MannequinPage',
  components: {
    ImageUploader
  },
  data() {
    return {
      selectedStyle: 'casual',
      selectedScene: null,
      prompt: '',
      isGenerating: false,
      generateProgress: 0,
      showResult: false,
      resultImages: [],
      selectedResult: null,
      currentStatus: '',
      currentImages: [],
      styleOptions: [
        { label: '休闲风格', value: 'casual', icon: 'el-icon-sunny' },
        { label: '商务风格', value: 'business', icon: 'el-icon-office-building' },
        { label: '时尚风格', value: 'fashion', icon: 'el-icon-star-off' }
      ],
      scenes: [
        {
          id: 1,
          name: '街道场景',
          thumbnail: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg'
        },
        {
          id: 2,
          name: '咖啡馆',
          thumbnail: 'https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg'
        },
        {
          id: 3,
          name: '办公室',
          thumbnail: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg'
        }
      ],
      statusMessages: [
        '正在分析人台图片...',
        '提取服装轮廓...',
        '生成场景融合...',
        '优化图像细节...'
      ],
      mockResults: [
        'https://images.pexels.com/photos/2887766/pexels-photo-2887766.jpeg',
        'https://images.pexels.com/photos/2887767/pexels-photo-2887767.jpeg',
        'https://images.pexels.com/photos/2887768/pexels-photo-2887768.jpeg',
        'https://images.pexels.com/photos/2887769/pexels-photo-2887769.jpeg'
      ]
    }
  },
  methods: {
    handleImagesSelected(images) {
      this.currentImages = images
    },
    clearImages() {
      this.currentImages = []
    },
    selectStyle(style) {
      this.selectedStyle = style
    },
    selectScene(sceneId) {
      this.selectedScene = sceneId
    },
    startGenerate() {
      this.showResult = true
      this.isGenerating = true
      this.generateProgress = 0
      this.simulateGeneration()
    },
    simulateGeneration() {
      let currentStep = 0
      const timer = setInterval(() => {
        this.generateProgress += 5
        if (this.generateProgress % 25 === 0) {
          this.currentStatus = this.statusMessages[currentStep]
          currentStep++
        }
        if (this.generateProgress >= 100) {
          clearInterval(timer)
          this.generationComplete()
        }
      }, 200)
    },
    generationComplete() {
      this.isGenerating = false
      this.resultImages = this.mockResults
      this.selectedResult = null
    },
    selectResult(index) {
      this.selectedResult = index
    },
    downloadResult() {
      if (this.selectedResult !== null) {
        window.open(this.resultImages[this.selectedResult])
      }
    },
    regenerate() {
      this.selectedResult = null
      this.startGenerate()
    }
  },
  mounted() {
    console.log('Mannequin page mounted')
    console.log('Current style:', this.selectedStyle)
    console.log('Current scene:', this.selectedScene)
  }
}
</script>

<style lang="scss" scoped>
.mannequin-container {
  display: flex;
  gap: 20px;
  padding: 20px;
  height: 100%;
  background: #f5f7fa;
  color: #333;

  .left-panel, .right-panel {
    background: #fff;
    border-radius: 12px;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  }

  .panel-header {
    padding: 20px;
    border-bottom: 1px solid #eee;
    background: linear-gradient(to right, #f8f9fa, #fff);

    .title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 18px;
      
      i {
        color: #409EFF;
      }
    }
  }

  .panel-content {
    padding: 20px;
    flex: 1;
    overflow-y: auto;
  }

  .setting-section {
    margin-bottom: 30px;
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.03);

    .section-title {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      .line {
        width: 4px;
        height: 20px;
        background: #409EFF;
        margin-right: 10px;
        border-radius: 2px;
      }

      h3 {
        font-size: 16px;
        font-weight: 500;
        margin: 0;
        color: #333;
      }
    }
  }

  .style-options {
    display: flex;
    gap: 15px;

    .style-item {
      flex: 1;
      background: #f8f9fa;
      border-radius: 8px;
      padding: 15px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s;
      border: 1px solid #eee;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      }

      &.active {
        background: #ecf5ff;
        border-color: #409EFF;
        
        .style-icon {
          background: #409EFF;
          color: #fff;
        }
      }

      .style-icon {
        width: 40px;
        height: 40px;
        background: #f0f2f5;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 10px;
        transition: all 0.3s;

        i {
          font-size: 20px;
          color: #666;
        }
      }
    }
  }

  .scene-grid {
    display: flex;
    gap: 15px;
    overflow-x: auto;
    padding: 5px;

    .scene-item {
      flex: 0 0 200px;
      cursor: pointer;

      .scene-image {
        position: relative;
        border-radius: 8px;
        overflow: hidden;
        aspect-ratio: 16/9;
        border: 2px solid transparent;
        transition: all 0.3s;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .scene-overlay {
          position: absolute;
          inset: 0;
          background: rgba(64,158,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.3s;

          i {
            font-size: 24px;
            color: #fff;
          }
        }
      }

      &.active .scene-image {
        border-color: #409EFF;
        
        .scene-overlay {
          opacity: 1;
        }
      }

      .scene-name {
        display: block;
        text-align: center;
        margin-top: 8px;
        font-size: 14px;
        color: #666;
      }
    }
  }

  .generate-btn {
    width: 100%;
    height: 50px;
    font-size: 16px;
    background: linear-gradient(45deg, #409EFF, #36D1DC);
    border: none;
    border-radius: 25px;
    transition: all 0.3s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(64,158,255,0.3);
    }
  }
}

.result-dialog {
  background: #fff;
  border-radius: 12px;

  .generating {
    text-align: center;
    padding: 40px;

    .generate-status {
      margin-top: 20px;

      .status-text {
        font-size: 18px;
        margin-bottom: 10px;
        color: #333;
      }

      .status-desc {
        color: #666;
      }
    }
  }

  .result-grid {
    display: flex;
    gap: 20px;
    padding: 20px;
    overflow-x: auto;

    .result-item {
      flex: 0 0 300px;
      cursor: pointer;
      border-radius: 8px;
      overflow: hidden;
      background: #fff;
      transition: all 0.3s;
      border: 1px solid #eee;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 16px rgba(0,0,0,0.1);
      }

      &.active {
        border: 2px solid #409EFF;
        
        .result-overlay {
          opacity: 1;
        }
      }

      .result-image {
        position: relative;
        aspect-ratio: 3/4;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .result-overlay {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 30px;
          height: 30px;
          background: #409EFF;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s;

          i {
            color: #fff;
            font-size: 16px;
          }
        }
      }

      .result-footer {
        padding: 10px;
        text-align: center;
        
        .result-label {
          color: #999;
          font-size: 14px;
        }
      }
    }
  }

  .dialog-footer {
    text-align: center;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #eee;
  }
}

.upload-section {
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  height: 100%;
  display: flex;
  flex-direction: column;

  .upload-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #f0f2f5;

    .header-icon {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #e6f3ff 0%, #f0f7ff 100%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        font-size: 24px;
        color: #409EFF;
      }
    }

    .header-text {
      h3 {
        margin: 0 0 4px;
        font-size: 18px;
        color: #333;
      }

      p {
        margin: 0;
        font-size: 14px;
        color: #909399;
      }
    }
  }

  .upload-content {
    flex: 1;
    min-height: 0;

    .upload-area {
      height: 100%;
      border: 2px dashed #e4e7ed;
      border-radius: 12px;
      background: linear-gradient(135deg, #f8f9fa 0%, #fff 100%);
      transition: all 0.3s;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 30px;

      &:hover {
        border-color: #409EFF;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(64,158,255,0.1);

        .upload-pulse {
          animation: pulse 1.5s infinite;
        }
      }

      &.has-image {
        border-style: solid;
        padding: 0;
      }
    }

    .upload-placeholder {
      text-align: center;
      margin-bottom: 30px;
    }

    .upload-icon {
      position: relative;
      display: inline-block;
      margin-bottom: 20px;

      i {
        font-size: 48px;
        color: #409EFF;
        position: relative;
        z-index: 1;
      }

      .upload-pulse {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 70px;
        height: 70px;
        background: rgba(64,158,255,0.1);
        border-radius: 50%;
      }
    }

    .upload-text {
      p {
        margin: 0;
        font-size: 16px;
        color: #606266;
      }
    }

    .upload-features {
      display: flex;
      justify-content: center;
      gap: 40px;
      margin-top: 30px;
      padding-top: 30px;
      border-top: 1px dashed #e4e7ed;

      .feature-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;

        i {
          font-size: 24px;
          color: #409EFF;
          background: rgba(64,158,255,0.1);
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }

        span {
          font-size: 14px;
          color: #606266;
        }

        &:hover i {
          transform: translateY(-2px);
          background: #409EFF;
          color: #fff;
        }
      }
    }

    .preview-wrapper {
      width: 100%;
      height: 100%;
      position: relative;
      border-radius: 12px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      .preview-actions {
        position: absolute;
        top: 10px;
        right: 10px;
        opacity: 0;
        transition: opacity 0.3s;
      }

      &:hover .preview-actions {
        opacity: 1;
      }
    }
  }

  .upload-tips {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #f0f2f5;

    .tip-item {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      
      i {
        color: #909399;
        font-size: 14px;
      }

      span {
        color: #909399;
        font-size: 14px;
      }
    }
  }
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.9);
    opacity: 0.5;
  }
  50% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.3;
  }
  100% {
    transform: translate(-50%, -50%) scale(0.9);
    opacity: 0.5;
  }
}
</style> 