<template>
  <div class="audio-player" :class="{ 'is-playing': isPlaying }">
    <div class="player-controls">
      <div class="play-button" @click="togglePlay">
        <i :class="isPlaying ? 'el-icon-video-pause' : 'el-icon-video-play'"></i>
      </div>
      
      <div class="progress-bar">
        <div class="time current">{{ formatTime(currentTime) }}</div>
        <el-slider
          v-model="progress"
          :max="100"
          @change="handleProgressChange"
        ></el-slider>
        <div class="time duration">{{ formatTime(duration) }}</div>
      </div>
      
      <div class="volume-control">
        <i :class="volumeIcon" @click="toggleMute"></i>
        <el-slider
          v-model="volume"
          :max="100"
          vertical
          height="80px"
          class="volume-slider"
        ></el-slider>
      </div>
    </div>
    
    <audio
      ref="audio"
      :src="src"
      @timeupdate="handleTimeUpdate"
      @loadedmetadata="handleLoadedMetadata"
      @ended="handleEnded"
    ></audio>
  </div>
</template>

<script>
export default {
  name: 'AudioPlayer',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      volume: 100,
      isMuted: false,
      progress: 0
    }
  },
  computed: {
    volumeIcon() {
      if (this.isMuted || this.volume === 0) return 'el-icon-turn-off';
      if (this.volume > 50) return 'el-icon-volume-high';
      return 'el-icon-volume-low';
    }
  },
  methods: {
    togglePlay() {
      if (this.isPlaying) {
        this.$refs.audio.pause();
      } else {
        this.$refs.audio.play();
      }
      this.isPlaying = !this.isPlaying;
      this.$emit('playStateChange', this.isPlaying);
    },
    handleTimeUpdate() {
      this.currentTime = this.$refs.audio.currentTime;
      this.progress = (this.currentTime / this.duration) * 100;
    },
    handleLoadedMetadata() {
      this.duration = this.$refs.audio.duration;
    },
    handleEnded() {
      this.isPlaying = false;
      this.$emit('playStateChange', false);
    },
    handleProgressChange(value) {
      const time = (value / 100) * this.duration;
      this.$refs.audio.currentTime = time;
    },
    toggleMute() {
      this.isMuted = !this.isMuted;
      this.$refs.audio.muted = this.isMuted;
    },
    formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
  },
  watch: {
    volume(val) {
      this.$refs.audio.volume = val / 100;
    }
  }
}
</script>

<style lang="scss" scoped>
.audio-player {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  
  .player-controls {
    display: flex;
    align-items: center;
    gap: 16px;
    
    .play-button {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #409EFF;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s;
      
      i {
        color: #fff;
        font-size: 20px;
      }
      
      &:hover {
        transform: scale(1.05);
        background: #66b1ff;
      }
    }
    
    .progress-bar {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 8px;
      
      .time {
        font-size: 12px;
        color: #909399;
        width: 45px;
        text-align: center;
      }
      
      .el-slider {
        flex: 1;
      }
    }
    
    .volume-control {
      position: relative;
      width: 24px;
      
      i {
        cursor: pointer;
        color: #606266;
        
        &:hover {
          color: #409EFF;
        }
      }
      
      .volume-slider {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        padding: 8px 0;
        background: #fff;
        border-radius: 4px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        display: none;
      }
      
      &:hover .volume-slider {
        display: block;
      }
    }
  }
}
</style> 