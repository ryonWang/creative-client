<template>
  <div class="auth-container" @click="$emit('close')">
    <div class="auth-dialog" @click.stop>
      <div class="dialog-close" @click="$emit('close')">
        <i class="el-icon-close"></i>
      </div>
      
      <div class="auth-content">
        <div class="auth-header">
          <div class="logo-area">
            <div class="logo-circle"></div>
            <h2>创意宝</h2>
          </div>
          <p class="slogan">创新科技 · 智慧未来</p>
        </div>
        
        <el-tabs v-model="activeTab">
          <el-tab-pane label="登录" name="login">
            <Login v-if="activeTab === 'login'" />
          </el-tab-pane>
          <el-tab-pane label="注册" name="register">
            <Register v-if="activeTab === 'register'" />
          </el-tab-pane>
        </el-tabs>
      </div>

      <div class="auth-banner">
        <div class="tech-circles">
          <div class="circle c1"></div>
          <div class="circle c2"></div>
          <div class="circle c3"></div>
        </div>
        <div class="banner-content">
          <div class="tech-illustration">
            <div class="tech-line"></div>
            <div class="tech-dot"></div>
          </div>
          <h3>智慧创新</h3>
          <p>让创意激发无限可能</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Login from './Login.vue'
import Register from './Register.vue'

export default {
  name: 'LoginAndRegister',
  components: {
    Login,
    Register
  },
  data() {
    return {
      activeTab: 'login'
    }
  },
  methods: {
    handleTabClick(tab) {
      this.activeTab = tab.paneName
    },
    closeDialog() {
      this.$emit('close')
    },
    handleClose(e) {
      if (e.target.classList.contains('auth-container')) {
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.auth-container {
  position: fixed;
  inset: 0;
  background: rgba(17, 23, 41, 0.6);
  backdrop-filter: blur(10px);
  display: grid;
  place-items: center;
  z-index: 2000;
}

.auth-dialog {
  width: 1000px;
  height: 600px;
  display: flex;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 
    0 0 0 1px rgba(255, 255, 255, 0.1),
    0 20px 40px rgba(0, 0, 0, 0.2),
    0 0 100px rgba(0, 0, 255, 0.1);
  position: relative;
  animation: dialogShow 0.4s ease-out;
}

.dialog-close {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s;
  
  i {
    font-size: 20px;
    color: #fff;
  }
  
  &:hover {
    background: rgba(0, 0, 0, 0.3);
    transform: rotate(90deg);
  }
}

.auth-content {
  flex: 1;
  padding: 40px;
  background: #fff;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200px;
    background: linear-gradient(180deg, 
      rgba(66, 133, 244, 0.05),
      transparent
    );
  }
}

.auth-header {
  text-align: center;
  margin-bottom: 40px;
  position: relative;
}

.logo-area {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 8px;
  
  .logo-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4285f4, #34a853);
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      inset: 2px;
      border-radius: 50%;
      background: #fff;
      border: 2px solid transparent;
      background-clip: padding-box;
    }
  }
  
  h2 {
    font-size: 28px;
    background: linear-gradient(135deg, #4285f4, #34a853);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 600;
  }
}

.slogan {
  color: #666;
  font-size: 16px;
}

:deep(.el-tabs__nav-wrap) {
  &::after {
    display: none;
  }
}

:deep(.el-tabs__nav) {
  border: none;
  padding: 0;
  min-width: 240px;
  display: flex;
  justify-content: center;
  background: transparent;
}

:deep(.el-tabs__item) {
  flex: none;
  text-align: center;
  height: 40px;
  line-height: 40px;
  padding: 0 40px;
  font-size: 16px;
  color: #666;
  transition: all 0.3s;
  
  &.is-active {
    color: #4285f4;
    font-weight: 500;
  }
}

:deep(.el-tabs__active-bar) {
  height: 3px;
  border-radius: 3px;
  padding: 0;
  background: linear-gradient(90deg, #4285f4, #34a853);
  width: 120px !important; // 固定活动条宽度
}

.auth-banner {
  width: 400px;
  background: linear-gradient(135deg, #4285f4, #34a853);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 40px;
}

.tech-circles {
  position: absolute;
  inset: 0;
  
  .circle {
    position: absolute;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.1);
    
    &.c1 {
      width: 300px;
      height: 300px;
      top: -100px;
      right: -100px;
      animation: rotate 20s linear infinite;
    }
    
    &.c2 {
      width: 200px;
      height: 200px;
      bottom: 50px;
      left: -50px;
      animation: rotate 15s linear infinite reverse;
    }
    
    &.c3 {
      width: 100px;
      height: 100px;
      bottom: 100px;
      right: 50px;
      animation: rotate 10s linear infinite;
    }
  }
}

.banner-content {
  position: relative;
  z-index: 1;
  text-align: center;
  
  .tech-illustration {
    margin-bottom: 30px;
    position: relative;
    width: 200px;
    height: 200px;
    margin: 0 auto 30px;
    
    .tech-line {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 150px;
      height: 2px;
      background: rgba(255, 255, 255, 0.2);
      transform-origin: left center;
      animation: lineRotate 4s ease-in-out infinite;
      
      &::after {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        width: 40px;
        height: 2px;
        background: #fff;
        transform: translateY(-50%);
        animation: linePulse 4s ease-in-out infinite;
      }
    }
    
    .tech-dot {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 12px;
      height: 12px;
      background: #fff;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    }
  }
  
  h3 {
    font-size: 28px;
    margin-bottom: 12px;
    font-weight: 500;
  }
  
  p {
    opacity: 0.8;
    font-size: 16px;
  }
}

@keyframes dialogShow {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes lineRotate {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(180deg); }
}

@keyframes linePulse {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
}
</style>
