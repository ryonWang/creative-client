<template>
  <div class="voice-edit">
    <div class="page-header">
      <div class="header-left">
        <el-page-header @back="goBack" content="编辑声音"></el-page-header>
      </div>
    </div>

    <div class="edit-content">
      <!-- 声音预览 -->
      <div class="voice-preview">
        <div class="wave-area">
          <waveform-visualizer
            :is-playing="isPlaying"
            :audio-data="audioData"
          />
          <div class="play-overlay" @click="togglePlay">
            <i :class="[isPlaying ? 'el-icon-video-pause' : 'el-icon-video-play']"></i>
          </div>
        </div>
      </div>

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
import WaveformVisualizer from '@/components/voice/WaveformVisualizer.vue'

export default {
  name: 'VoiceEdit',
  components: {
    WaveformVisualizer
  },
  data() {
    return {
      isPlaying: false,
      audioData: [],
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
  created() {
    // 获取声音详情
    const id = this.$route.query.id;
    if (id) {
      this.fetchVoiceDetail(id);
    }
  },
  methods: {
    goBack() {
      this.$router.push('/digitalHuman/voice');
    },
    togglePlay() {
      this.isPlaying = !this.isPlaying;
    },
    fetchVoiceDetail(id) {
      // 获取声音详情的API调用
      console.log('获取声音详情', id);
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
.voice-edit {
  padding: 24px;
  background: #fff;
  min-height: calc(100vh - 48px);

  .page-header {
    margin-bottom: 24px;
  }

  .edit-content {
    max-width: 800px;
    margin: 0 auto;

    .voice-preview {
      margin-bottom: 40px;

      .wave-area {
        position: relative;
        height: 120px;
        background: linear-gradient(135deg, #e6f4ff, #cce6ff);
        border-radius: 8px;
        overflow: hidden;

        .play-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: rgba(0, 0, 0, 0.1);
          transition: background-color 0.3s;

          i {
            font-size: 36px;
            color: #fff;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }

          &:hover {
            background: rgba(0, 0, 0, 0.2);
          }
        }
      }
    }

    .voice-form {
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