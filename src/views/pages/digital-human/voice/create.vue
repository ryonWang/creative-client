<template>
  <div class="voice-create">
    <div class="content-wrapper">
      <!-- 左侧内容区域 -->
      <div class="left-section">
        <h2 class="section-title">声音克隆内容</h2>
        
        <!-- 声音名称 -->
        <div class="voice-name">
          <h3 class="sub-title">声音名称</h3>
          <el-input 
            v-model="form.name" 
            placeholder="请输入声音名称" 
            maxlength="15" 
            show-word-limit
          ></el-input>
        </div>

        <!-- 声音备注 -->
        <div class="voice-desc">
          <h3 class="sub-title">声音备注</h3>
          <el-input 
            v-model="form.description" 
            placeholder="请输入声音备注" 
            maxlength="15" 
            show-word-limit
          ></el-input>
        </div>

        <!-- 音频文件 -->
        <div class="voice-file">
          <h3 class="sub-title">音频文件</h3>
          <div class="upload-area">
            <div class="upload-box" @click="handleUpload">
              <i class="el-icon-plus"></i>
              <p>将文件拖到此处或点击上传</p>
            </div>
            <div class="upload-tip">
              <p>请参考右侧录制建议，查看录制文本本参考</p>
              <el-link type="primary" @click="showRecordingTips">查看录制文本参考 ></el-link>
            </div>
            <div class="file-requirements">
              <p>支持mp3,m4a,wav格式，音频要求不少于30秒，最长不超过5分钟，文件小于20M</p>
            </div>
          </div>
        </div>

        <!-- 底部按钮 -->
        <div class="bottom-actions">
          <el-checkbox v-model="agreeLicense">我确认我拥有上传音频的所有必要权利，我保证不会克隆声音创作违法内容，并且会严格遵守</el-checkbox>
          <el-link type="primary">《百度智能云隐私克隆协议》</el-link>
          <div class="buttons">
            <el-button>取消</el-button>
            <el-button type="primary" @click="startCreate">开始克隆</el-button>
          </div>
        </div>
      </div>

      <!-- 右侧录制建议 -->
      <div class="right-section">
        <h2 class="section-title">录制建议</h2>
        
        <!-- 录制文本 -->
        <div class="recording-text">
          <h3 class="sub-title">录制文本</h3>
          <div class="text-content">
            <p>1.空降声音合保障上传传音风格，为避免语气连贯，需准备站近最终使用场景的文本，如用于电商直播的声音使用电商带货文本进行录制</p>
            <p>2.上传时限制30秒-5分钟，推荐时长为1分钟左右，文致制作150-200字</p>
          </div>
        </div>

        <!-- 录制环境 -->
        <div class="recording-environment">
          <h3 class="sub-title">录制环境</h3>
          <div class="text-content">
            <p>1.保障无环境背景噪声，无明显回声和混响，信噪比大于30dB</p>
            <p>2.录制时话筒距离嘴部10cm-50cm之间，保持位置距离稳定</p>
            <p>3.录制过程中保持姿态稳定，深入人物声，如肢体碰撞声，服装摩擦声，桌椅移动声，保持语音声音</p>
          </div>
        </div>

        <!-- 录制格式 -->
        <div class="recording-format">
          <h3 class="sub-title">录制格式</h3>
          <div class="text-content">
            <p>1.音频格式支持mp3,m4a,wav，推荐无压缩wav格式</p>
            <p>2.推荐使用单声道，采样率24kHz以上，位深度16bit以上</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VoiceCreate',
  data() {
    return {
      form: {
        name: '',
        description: ''
      },
      agreeLicense: false
    }
  },
  methods: {
    handleUpload() {
      // 处理文件上传
    },
    showRecordingTips() {
      // 显示录制文本参考
    },
    startCreate() {
      if (!this.agreeLicense) {
        this.$message.warning('请先同意协议')
        return
      }
      // 开始克隆处理
    }
  }
}
</script>

<style lang="scss" scoped>
.voice-create {
  padding: 24px;
  background: #f5f7fa;
  min-height: 100vh;

  .content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    gap: 24px;

    .left-section {
      flex: 1;
      background: #fff;
      padding: 24px;
      border-radius: 8px;

      .section-title {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 24px;
      }

      .sub-title {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 16px;
      }

      .voice-name,
      .voice-desc {
        margin-bottom: 24px;
      }

      .upload-area {
        .upload-box {
          border: 2px dashed #dcdfe6;
          border-radius: 8px;
          padding: 40px;
          text-align: center;
          cursor: pointer;
          margin-bottom: 16px;

          &:hover {
            border-color: #409EFF;
            color: #409EFF;
          }

          i {
            font-size: 32px;
            margin-bottom: 8px;
          }
        }

        .upload-tip {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          color: #606266;
        }

        .file-requirements {
          color: #909399;
          font-size: 12px;
        }
      }

      .bottom-actions {
        margin-top: 40px;
        
        .buttons {
          margin-top: 16px;
          display: flex;
          justify-content: center;
          gap: 16px;
        }
      }
    }

    .right-section {
      width: 360px;
      background: #fff;
      padding: 24px;
      border-radius: 8px;

      .section-title {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 24px;
      }

      .sub-title {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 16px;
        color: #303133;
      }

      .text-content {
        color: #606266;
        line-height: 1.6;
        margin-bottom: 24px;

        p {
          margin-bottom: 8px;
        }
      }
    }
  }
}
</style>