<template>
  <div class="waveform-visualizer" :class="{ playing: isPlaying }">
    <canvas ref="canvas" class="waveform-canvas"></canvas>
    <div class="wave-bars">
      <div 
        v-for="i in 32" 
        :key="i" 
        class="wave-bar"
        :style="{ height: getBarHeight(i) + 'px' }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WaveformVisualizer',
  props: {
    isPlaying: {
      type: Boolean,
      default: false
    },
    audioData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      animationFrame: null,
      analyser: null,
      dataArray: null
    }
  },
  methods: {
    getBarHeight(index) {
      if (this.isPlaying) {
        // 动态计算高度，产生波动效果
        return 20 + Math.sin((Date.now() / 200) + index) * 15;
      }
      // 静态显示时的默认高度
      return 20;
    },
    initCanvas() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      
      gradient.addColorStop(0, 'rgba(64, 158, 255, 0.8)');
      gradient.addColorStop(1, 'rgba(64, 158, 255, 0.2)');
      
      ctx.fillStyle = gradient;
    },
    animate() {
      if (!this.isPlaying) return;
      
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 绘制动态波形
      this.drawWaveform(ctx);
      
      this.animationFrame = requestAnimationFrame(this.animate);
    },
    drawWaveform(ctx) {
      const width = ctx.canvas.width;
      const height = ctx.canvas.height;
      const sliceWidth = width / 32;
      
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      
      for (let i = 0; i < 32; i++) {
        const x = i * sliceWidth;
        const y = (height / 2) + Math.sin((Date.now() / 200) + i) * 30;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.lineTo(width, height / 2);
      ctx.stroke();
    }
  },
  watch: {
    isPlaying(newVal) {
      if (newVal) {
        this.animate();
      } else {
        cancelAnimationFrame(this.animationFrame);
      }
    }
  },
  mounted() {
    this.initCanvas();
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animationFrame);
  }
}
</script>

<style lang="scss" scoped>
.waveform-visualizer {
  position: relative;
  width: 100%;
  height: 100%;
  
  .waveform-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  
  .wave-bars {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
    padding: 0 20px;
    
    .wave-bar {
      flex: 1;
      background: #409EFF;
      border-radius: 2px;
      transition: height 0.2s ease;
      opacity: 0.7;
      
      @for $i from 1 through 32 {
        &:nth-child(#{$i}) {
          animation: waveAnimation 1s infinite;
          animation-delay: $i * 0.03s;
        }
      }
    }
  }
  
  &.playing {
    .wave-bar {
      animation-play-state: running;
    }
  }
}

@keyframes waveAnimation {
  0%, 100% {
    transform: scaleY(0.5);
  }
  50% {
    transform: scaleY(1);
  }
}
</style> 