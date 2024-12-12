<template>
  <div class="voice-create">
    <div class="page-header">
      <div class="header-left">
        <el-page-header @back="goBack" content="添加声音"></el-page-header>
      </div>
    </div>

    <div class="create-content">
      <el-tabs v-model="activeTab">
        <!-- 上传音频 -->
        <el-tab-pane label="上传音频" name="upload">
          <el-upload
            class="upload-area"
            drag
            action="/api/upload"
            accept=".mp3,.wav"
            :before-upload="beforeUpload"
            :on-success="handleUploadSuccess"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              支持 mp3、wav 格式音频文件，单个文件不超过 50MB
            </div>
          </el-upload>
        </el-tab-pane>

        <!-- 在线录制 -->
        <el-tab-pane label="在线录制" name="record">
          <div class="record-area">
            <div class="record-controls">
              <el-button 
                type="primary" 
                :icon="isRecording ? 'el-icon-video-pause' : 'el-icon-video-play'"
                @click="toggleRecording"
              >
                {{ isRecording ? '停止录制' : '开始录制' }}
              </el-button>
              <span class="record-time" v-if="recordTime">{{ recordTime }}</span>
            </div>
            <div class="record-wave">
              <!-- 这里可以添加录音波形可视化 -->
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>

      <!-- 声音信息表单 -->
      <div class="voice-form">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
          <el-form-item label="声音名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入声音名称"></el-input>
          </el-form-item>
          
          <el-form-item label="声音类型" prop="type">
            <el-radio-group v-model="form.type">
              <el-radio label="natural">自然声音</el-radio>
              <el-radio label="clone">克隆声音</el-radio>
            </el-radio-group>
          </el-form-item>
          
          <el-form-item label="描述" prop="description">
            <el-input 
              type="textarea" 
              v-model="form.description" 
              placeholder="请输入声音描述"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <!-- 操作按钮 -->
      <div class="form-actions">
        <el-button @click="goBack">取消</el-button>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VoiceCreate',
  data() {
    return {
      activeTab: 'upload',
      isRecording: false,
      recordTime: '',
      form: {
        name: '',
        type: 'natural',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入声音名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择声音类型', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push('/digitalHuman/voice');
    },
    beforeUpload(file) {
      const isAudio = file.type.startsWith('audio/');
      const isLt50M = file.size / 1024 / 1024 < 50;

      if (!isAudio) {
        this.$message.error('只能上传音频文件!');
        return false;
      }
      if (!isLt50M) {
        this.$message.error('音频文件大小不能超过 50MB!');
        return false;
      }
      return true;
    },
    handleUploadSuccess(response) {
      this.$message.success('上传成功');
      // 处理上传成功后的逻辑
    },
    toggleRecording() {
      this.isRecording = !this.isRecording;
      // 处理录音逻辑
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 提交表单
          console.log('submit form', this.form);
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.voice-create {
  padding: 24px;
  background: #fff;
  min-height: calc(100vh - 48px);

  .page-header {
    margin-bottom: 24px;
  }

  .create-content {
    max-width: 800px;
    margin: 0 auto;

    .upload-area {
      margin: 20px 0;
    }

    .record-area {
      padding: 20px;
      text-align: center;

      .record-controls {
        margin-bottom: 20px;

        .record-time {
          margin-left: 12px;
          color: #606266;
        }
      }

      .record-wave {
        height: 120px;
        background: #f5f7fa;
        border-radius: 4px;
      }
    }

    .voice-form {
      margin-top: 40px;
      padding-top: 24px;
      border-top: 1px solid #ebeef5;
    }

    .form-actions {
      margin-top: 40px;
      text-align: center;
    }
  }
}
</style> 