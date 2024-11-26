<template>
  <div class="app-container">
    <!-- 左侧表单区域 -->
    <div class="form-section">
      <div class="back-container">
        <el-page-header @back="goBack" content="素材混剪">
        </el-page-header>
      </div>

      <el-card class="box-card">
        <el-form :model="form" label-width="135px" class="form-box">
          <!-- 视频时长 -->
          <el-form-item label="视频时长">
            <el-radio-group v-model="form.videoDuration">
              <el-radio :label="1">随镜头组设置</el-radio>
              <el-radio :label="2">全局字幕配音</el-radio>
              <el-radio :label="3">固定时长</el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 生成任务标题 -->
          <el-form-item label="生成任务标题" required>
            <el-input v-model="form.title" placeholder="请输入任务标题" />
          </el-form-item>

          <!-- 全局内容标题 -->
          <el-form-item label="全局内容标题">
            <el-input 
              v-model="form.globalTitle"
              placeholder="请输入全局内容标题"
              readonly
              style="width: 300px"
            >
              <el-button slot="append" type="primary" @click="handleAddGlobalTitle">
                <i class="el-icon-plus"></i>添加
              </el-button>
            </el-input>
          </el-form-item>

          <!-- 镜头组 -->
          <el-form-item label="镜头组" required>
            <el-button type="primary" plain @click="handleAddGroup">
              <i class="el-icon-plus"></i>添加
            </el-button>
            <div class="material-list">
              <el-card v-for="(item, index) in form.groups" :key="index" shadow="hover" class="material-item">
                <!-- 镜头组内容 -->
              </el-card>
            </div>
          </el-form-item>

          <!-- AI配音 -->
          <el-form-item label="AI配音">
            <el-button @click="handleSelectVoice">选择</el-button>
          </el-form-item>

          <!-- 背景音乐 -->
          <el-form-item label="背景音乐">
            <el-button @click="handleSelectMusic">选择</el-button>
          </el-form-item>

          <!-- 生成数量 -->
          <el-form-item label="生成数量" required>
            <el-input-number 
              v-model="form.count"
              :min="1"
              :max="1000"
            />
            <span class="el-form-item__description">单次最多可生成1000条</span>
          </el-form-item>

          <!-- 画面比例 -->
          <el-form-item label="画面比例" required>
            <el-radio-group v-model="form.ratio">
              <el-radio-button label="9:16">竖屏9:16</el-radio-button>
              <el-radio-button label="16:9">横屏16:9</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-card>

      <!-- 底部操作栏 -->
      <div class="bottom-btn">
        <el-button @click="goBack">返回列表</el-button>
        <el-button type="primary" @click="handleSubmit">确定生成</el-button>
      </div>
    </div>

    <!-- 右侧预览区域 -->
    <div class="preview-section">
      <el-card class="preview-card">
        <div slot="header" class="preview-header">
          <el-button type="text">预览效果</el-button>
        </div>
        <!-- iPhone 预览框 -->
        <div class="iphone-container">
          <div class="iphone-frame">
            <div class="iphone-screen">
              <!-- 抖音样式界面 -->
              <div class="douyin-container">
                <!-- 顶部状态栏 -->
                <div class="status-bar">
                  <span>9:41</span>
                  <div class="status-icons">
                    <i class="el-icon-connection"></i>
                    <i class="el-icon-battery-full"></i>
                  </div>
                </div>

                <!-- 主内容区域 -->
                <div class="content-area">
                  <!-- 视频预览区 -->
                  <div class="video-preview">
                    <div class="empty-preview" v-if="!previewContent">
                      <i class="el-icon-video-camera"></i>
                      <p>视频预览区域</p>
                    </div>
                    <!-- 所见即所得的标题预览 -->
                    <div class="title-preview" v-if="form.globalTitle">
                      <div class="title-text" :style="titleStyle">
                        {{ form.globalTitle }}
                      </div>
                    </div>
                  </div>

                  <!-- 右侧互动按钮 -->
                  <div class="interaction-buttons">
                    <div class="interaction-item">
                      <i class="el-icon-star-off"></i>
                      <span>点赞</span>
                    </div>
                    <div class="interaction-item">
                      <i class="el-icon-chat-dot-round"></i>
                      <span>评论</span>
                    </div>
                    <div class="interaction-item">
                      <i class="el-icon-share"></i>
                      <span>分享</span>
                    </div>
                  </div>
                </div>

                <!-- 底部信息 -->
                <div class="bottom-info">
                  <div class="user-info">
                    <span class="username">@用户名</span>
                    <p class="description">视频描述文本</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 预览信息 -->
        <div class="preview-info">
          <div class="info-item">
            <label>预计可混剪视频数量</label>
            <span><em>--</em> 条</span>
          </div>
          <div class="info-item">
            <label>预计单条视频时长</label>
            <span><em>--</em> 秒</span>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 添加标题抽屉 -->
    <el-drawer
      title="添加标题"
      :visible.sync="titleDrawerVisible"
      direction="rtl"
      size="800px"
      :before-close="handleTitleDrawerClose"
    >
      <div class="title-drawer">
        <!-- 预览区域 -->
        <div class="title-preview">
          <div class="preview-text" :style="titleStyle">
            {{ titleForm.text || '预览文本' }}
          </div>
        </div>

        <!-- 编辑区域 -->
        <div class="title-edit">
          <el-form :model="titleForm" label-width="80px">
            <el-form-item label="标题文本">
              <el-input 
                type="textarea"
                v-model="titleForm.text"
                placeholder="请输入标题文本"
              />
            </el-form-item>
            
            <!-- 字体设置 -->
            <el-form-item label="字体">
              <el-select v-model="titleForm.fontFamily">
                <el-option label="普惠体" value="Alibaba PuHuiTi" />
                <el-option label="楷体" value="KaiTi" />
                <!-- 其他字体选项 -->
              </el-select>
            </el-form-item>

            <!-- 字号设置 -->
            <el-form-item label="字号">
              <el-select v-model="titleForm.fontSize">
                <el-option 
                  v-for="size in [14,16,18,20,22,24,26,28,30,32]"
                  :key="size"
                  :label="`${size}px`"
                  :value="size"
                />
              </el-select>
            </el-form-item>

            <!-- 其他样式设置 -->
            <!-- ... -->
          </el-form>
        </div>

        <!-- 底部按钮 -->
        <div class="drawer-footer">
          <el-button @click="handleTitleDrawerClose">取 消</el-button>
          <el-button type="primary" @click="handleTitleConfirm">确 定</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'AiMixingCreate',
  data() {
    return {
      form: {
        videoDuration: 1,
        title: '',
        globalTitle: '',
        groups: [],
        count: 1,
        ratio: '9:16'
      },
      titleDrawerVisible: false,
      titleForm: {
        text: '',
        fontFamily: 'Alibaba PuHuiTi',
        fontSize: 24,
        color: '#000000',
        bold: true,
        // 其他样式属性
      }
    }
  },
  computed: {
    titleStyle() {
      return {
        fontFamily: this.titleForm.fontFamily,
        fontSize: `${this.titleForm.fontSize}px`,
        color: this.titleForm.color,
        fontWeight: this.titleForm.bold ? 'bold' : 'normal'
        // 其他样式
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push('/home/contentProduction/aiMixing')
    },
    handleAddGlobalTitle() {
      this.titleDrawerVisible = true
    },
    handleAddGroup() {
      // 添加镜头组
    },
    handleSelectVoice() {
      // 选择AI配音
    },
    handleSelectMusic() {
      // 选择背景音乐
    },
    handleSubmit() {
      // 提交表单
    },
    handleTitleDrawerClose() {
      this.titleDrawerVisible = false
    },
    handleTitleConfirm() {
      this.form.globalTitle = this.titleForm.text
      this.titleDrawerVisible = false
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 20px;
  display: flex;
  gap: 20px;
}

.form-section {
  flex: 1;
}

.preview-section {
  width: 400px;
  position: sticky;
  top: 20px;
  align-self: flex-start;
}

.preview-card {
  margin-bottom: 20px;
}

.preview-header {
  text-align: center;
}

.iphone-container {
  padding: 10px;
  display: flex;
  justify-content: center;
}

.iphone-frame {
  width: 280px;
  height: 500px;
  background: #f5f7fa;
  border-radius: 40px;
  padding: 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  position: relative;
}

.iphone-screen {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 35px;
  overflow: hidden;
  position: relative;
}

.empty-preview {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #909399;
}

.empty-preview i {
  font-size: 48px;
  margin-bottom: 10px;
}

.empty-preview p {
  font-size: 14px;
}

.preview-info {
  padding: 15px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: #606266;
}

.info-item em {
  font-style: normal;
  color: #409EFF;
}

/* 保持原有样式 */
.back-container {
  margin-bottom: 20px;
}

.material-list {
  margin-top: 20px;
}

.material-item {
  margin-bottom: 10px;
}

.bottom-btn {
  margin-top: 20px;
  text-align: center;
}

.el-form-item__description {
  margin-left: 10px;
  color: #909399;
}

.douyin-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  color: #fff;
  position: relative;
}

.status-bar {
  height: 20px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0,0,0,0.3);
}

.content-area {
  flex: 1;
  position: relative;
  display: flex;
}

.video-preview {
  flex: 1;
  position: relative;
}

.title-preview {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 2;
}

.interaction-buttons {
  position: absolute;
  right: 10px;
  bottom: 100px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.interaction-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
}

.interaction-item i {
  font-size: 24px;
  margin-bottom: 5px;
}

.bottom-info {
  padding: 10px;
  background: linear-gradient(transparent, rgba(0,0,0,0.5));
}

.title-drawer {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.title-preview {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f7fa;
  margin-bottom: 20px;
  border-radius: 4px;
}

.drawer-footer {
  margin-top: auto;
  text-align: right;
  padding-top: 20px;
}
</style> 