<template>
  <div class="voice-container">
    <!-- 顶部锚点导航 -->
    <div class="anchor-nav">
      <div class="nav-content">
        <div class="nav-tabs">
          <div 
            v-for="tab in tabs" 
            :key="tab.key"
            :class="['nav-tab', { active: currentTab === tab.key }]"
            @click="currentTab = tab.key"
          >
            {{ tab.label }}
            <span class="count" v-if="tab.count">({{ tab.count }})</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-wrapper">
      <!-- 功能区 -->
      <div class="function-area">
        <div class="left-filters">
          <el-radio-group v-model="voiceType" size="medium">
            <el-radio-button label="all">全部声音</el-radio-button>
            <el-radio-button label="natural">自然声音</el-radio-button>
            <el-radio-button label="clone">克隆声音</el-radio-button>
          </el-radio-group>
        </div>
        <div class="right-actions">
          <el-input
            v-model="searchKey"
            placeholder="搜索声音"
            prefix-icon="el-icon-search"
            clearable
            class="search-input"
          />
          <el-button type="primary" @click="handleCreate">
            <i class="el-icon-plus"></i>添加声音
          </el-button>
        </div>
      </div>

      <!-- 我的声音内容 -->
      <div v-show="currentTab === 'my'">
        <!-- 声音卡片网格 -->
        <div class="voice-grid">
          <!-- 创建卡片 -->
          <div class="voice-card create-card" @click="handleCreate">
            <div class="create-content">
              <i class="el-icon-plus"></i>
              <div class="create-text">
                <p class="title">添加声音</p>
                <p class="desc">上传音频或在线录制</p>
              </div>
            </div>
          </div>

          <!-- 声音卡片 -->
          <div 
            v-for="voice in filteredVoices" 
            :key="voice.id"
            class="voice-card"
          >
            <!-- 声音波形区 -->
            <div class="wave-area" :class="{ playing: voice.isPlaying }">
              <waveform-visualizer
                :is-playing="voice.isPlaying"
                :audio-data="voice.waveform"
              />
              <div class="play-overlay" @click="togglePlay(voice)">
                <i :class="[voice.isPlaying ? 'el-icon-video-pause' : 'el-icon-video-play']"></i>
              </div>
            </div>

            <!-- 声音信息 -->
            <div class="voice-info">
              <div class="info-header">
                <div class="left">
                  <h3>{{ voice.name }}</h3>
                  <el-tag size="mini" :type="voice.type === 'natural' ? 'success' : 'warning'">
                    {{ voice.type === 'natural' ? '自然声音' : '克隆声音' }}
                  </el-tag>
                </div>
                <span class="duration">{{ voice.duration }}</span>
              </div>
              <p class="desc">{{ voice.description }}</p>
              
              <!-- 操作栏 -->
              <div class="action-bar">
                <div class="voice-quality">
                  <i class="el-icon-headset"></i>
                  <span>{{ voice.quality }}Hz</span>
                </div>
                <div class="action-buttons">
                  <el-tooltip content="编辑" placement="top">
                    <i class="el-icon-edit" @click.stop="handleEdit(voice)"></i>
                  </el-tooltip>
                  <el-tooltip content="下载" placement="top">
                    <i class="el-icon-download" @click.stop="handleDownload(voice)"></i>
                  </el-tooltip>
                  <el-tooltip content="删除" placement="top">
                    <i class="el-icon-delete" @click.stop="handleDelete(voice)"></i>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 分页器 -->
        <div class="pagination-wrapper">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="pageSize"
            @current-change="handlePageChange"
          >
          </el-pagination>
        </div>
      </div>

      <!-- 我的收藏内容 -->
      <div v-show="currentTab === 'favorite'">
        <el-empty 
          v-if="favorites.length === 0" 
          description="暂无收藏的声音"
          :image-size="200"
        >
          <el-button type="primary" @click="currentTab = 'public'">去收藏</el-button>
        </el-empty>
        <div v-else class="voice-grid">
          <!-- 使用相同的声音卡片组件展示收藏的声音 -->
          <div 
            v-for="voice in favorites" 
            :key="voice.id"
            class="voice-card"
          >
            <!-- 声音卡片内容与原有卡片相同 -->
          </div>
        </div>
      </div>

      <!-- 公共声音库内容 -->
      <div v-show="currentTab === 'public'">
        <!-- 原有的公共声音库内容 -->
      </div>
    </div>

    <!-- 添加音频播放器组件 -->
    <audio-player
      v-if="currentVoice"
      :src="currentVoice.url"
      @playStateChange="handlePlayStateChange"
      class="voice-player"
    />
  </div>
</template>

<script>
import WaveformVisualizer from '@/components/voice/WaveformVisualizer.vue'
import AudioPlayer from '@/components/voice/AudioPlayer.vue'

export default {
  name: 'VoiceManagement',
  components: {
    WaveformVisualizer,
    AudioPlayer
  },
  data() {
    return {
      currentTab: 'my',
      voiceType: 'all',
      searchKey: '',
      pageSize: 12,
      total: 100,
      tabs: [
        { key: 'my', label: '我的声音', count: 8 },
        { key: 'favorite', label: '我的收藏' },
        { key: 'public', label: '公共声音库' }
      ],
      voices: [
        {
          id: 1,
          name: '标准女声',
          type: 'natural',
          description: '清晰自然的女声，适合各类场景',
          duration: '00:30',
          quality: '48k',
          waveform: [], // 波形数据
          isPlaying: false,
          url: 'https://example.com/audio1.mp3'
        },
        // 更多声音数据...
      ],
      currentVoice: null,
      favorites: [] // 添加收藏声音列表
    }
  },
  computed: {
    filteredVoices() {
      let result = this.voices;
      
      // 类型筛选
      if (this.voiceType !== 'all') {
        result = result.filter(v => v.type === this.voiceType);
      }
      
      // 搜索筛选
      if (this.searchKey) {
        const key = this.searchKey.toLowerCase();
        result = result.filter(v => 
          v.name.toLowerCase().includes(key) || 
          v.description.toLowerCase().includes(key)
        );
      }
      
      return result;
    }
  },
  methods: {
    // 添加声音
    handleCreate() {
      this.$router.push('/digitalHuman/voice/create');
    },

    // 编辑声音
    handleEdit(voice) {
      this.$router.push({
        path: '/digitalHuman/voice/edit',
        query: { id: voice.id }
      });
    },

    // 下载声音
    handleDownload(voice) {
      // 实现下载逻辑
      const a = document.createElement('a');
      a.href = voice.url;
      a.download = voice.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },

    // 删除声音
    handleDelete(voice) {
      this.$confirm('确认删除该声音?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 这里添加删除API调用
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        // 从列表中移除
        const index = this.voices.findIndex(v => v.id === voice.id);
        if (index > -1) {
          this.voices.splice(index, 1);
        }
      }).catch(() => {});
    },

    // 分页变化
    handlePageChange(page) {
      // 这里添加分页加载逻辑
      console.log('加载第', page, '页');
    },

    // 播放声音
    togglePlay(voice) {
      // 停止其他正在播放的声音
      this.voices.forEach(v => {
        if (v.id !== voice.id) {
          v.isPlaying = false;
        }
      });
      voice.isPlaying = !voice.isPlaying;
      this.currentVoice = voice.isPlaying ? voice : null;
    },

    // 播放状态改变
    handlePlayStateChange(isPlaying) {
      if (this.currentVoice) {
        this.currentVoice.isPlaying = isPlaying;
      }
    },

    // 组件销毁前清理
    beforeDestroy() {
      // 停止所有播放
      if (this.currentVoice) {
        this.currentVoice.isPlaying = false;
      }
      this.voices.forEach(voice => {
        voice.isPlaying = false;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.voice-container {
  height: 100%;
  background: #f5f7fa;

  .anchor-nav {
    position: sticky;
    top: 0;
    z-index: 10;
    background: #fff;
    border-bottom: 1px solid #ebeef5;
    
    .nav-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;

      .nav-tabs {
        display: flex;
        gap: 40px;

        .nav-tab {
          padding: 16px 0;
          font-size: 16px;
          color: #606266;
          cursor: pointer;
          position: relative;

          .count {
            font-size: 14px;
            color: #909399;
            margin-left: 4px;
          }

          &:hover {
            color: #409EFF;
          }

          &.active {
            color: #409EFF;
            font-weight: 500;

            &::after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 2px;
              background: #409EFF;
            }
          }
        }
      }
    }
  }

  .content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;

    .function-area {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;

      .left-filters {
        .el-radio-button__inner {
          border: none;
          padding: 8px 16px;
        }
      }

      .right-actions {
        display: flex;
        gap: 16px;

        .search-input {
          width: 240px;
        }
      }
    }

    .voice-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
      margin-bottom: 40px;

      .voice-card {
        background: #fff;
        border-radius: 8px;
        overflow: hidden;
        transition: all 0.3s;
        
        &:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        &.create-card {
          border: 2px dashed #dcdfe6;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          min-height: 200px;

          .create-content {
            text-align: center;
            color: #909399;

            i {
              font-size: 32px;
              margin-bottom: 12px;
            }

            .create-text {
              .title {
                font-size: 16px;
                margin-bottom: 4px;
              }

              .desc {
                font-size: 12px;
                opacity: 0.7;
              }
            }
          }

          &:hover {
            border-color: #409EFF;
            color: #409EFF;
          }
        }

        .wave-area {
          position: relative;
          height: 120px;
          background: linear-gradient(135deg, #e6f4ff, #cce6ff);
          
          .waveform-canvas {
            width: 100%;
            height: 100%;
          }

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
            opacity: 0;
            transition: opacity 0.3s;

            i {
              font-size: 36px;
              color: #fff;
              text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            }
          }

          &:hover .play-overlay {
            opacity: 1;
          }

          &.playing {
            .play-overlay {
              opacity: 1;
              background: rgba(0, 0, 0, 0.2);
            }
          }
        }

        .voice-info {
          padding: 16px;

          .info-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;

            .left {
              display: flex;
              align-items: center;
              gap: 8px;

              h3 {
                margin: 0;
                font-size: 16px;
                color: #303133;
              }
            }

            .duration {
              font-size: 12px;
              color: #909399;
            }
          }

          .desc {
            font-size: 14px;
            color: #606266;
            margin-bottom: 12px;
            line-height: 1.4;
          }

          .action-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            
            .voice-quality {
              display: flex;
              align-items: center;
              gap: 4px;
              color: #909399;
              font-size: 12px;
            }

            .action-buttons {
              display: flex;
              gap: 16px;

              i {
                font-size: 16px;
                color: #909399;
                cursor: pointer;

                &:hover {
                  color: #409EFF;
                  transform: scale(1.1);
                }
              }
            }
          }
        }
      }
    }
  }

  .voice-player {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    z-index: 1000;
  }
}
</style>