<template>
  <div class="header" data-v-xxx>
    <div class="header-container">
      <!-- Logo区域 -->
      <div class="header-logo">
        <div class="logo-container">
          <a href="" target="_blank">
            <img :src="require('/src/assets/imgs/logo/logo2.png')" alt=""/>
          </a>
        </div>
      </div>

      <!-- 导航菜单 -->
      <nav class="header-nav">
        <div class="nav-item hover-effect" :class="{ active: currentPath === '/home' }" @click="goIndex">
          <i class="nav-icon icon-home"></i>
          <span class="nav-text gradient-text-blue">首页</span>
        </div>
        <div class="nav-item hover-effect" :class="{ active: currentPath === '/workbench' }" @click="goWorkbench">
          <i class="nav-icon icon-material"></i>
          <span class="nav-text gradient-text-purple">素材管理</span>
        </div>
        <div class="nav-item hover-effect" :class="{ active: currentPath === '/appTool' }" @click="goAppTool">
          <i class="nav-icon icon-write"></i>
          <span class="nav-text gradient-text-orange">文案创作</span>
        </div>
        <div class="nav-item hover-effect" :class="{ active: currentPath === '/assistant' }" @click="assistantClick">
          <i class="nav-icon icon-ai"></i>
          <span class="nav-text .gradient-text-blue">
            商品助理
            <el-tag size="mini" type="danger" effect="dark" class="hot-tag">HOT</el-tag>
          </span>
        </div>
        <div class="nav-item hover-effect" :class="{ active: currentPath === '/aiDraw' }" @click="aiDrawClick">
          <i class="nav-icon icon-ai"></i>
          <span class="nav-text gradient-text-green">
            货不错
          </span>
        </div>
        <div class="nav-item">
          <i class="nav-icon icon-order"></i>
          <span class="nav-text gradient-text-red">订单广场</span>
        </div>
      </nav>

      <!-- 右侧功能区 -->
      <div class="header-right">
        <button class="vip-btn">
          <i class="icon-vip"></i>
          会员卡兑换
        </button>

        <div class="icon-group">
          <div class="icon-item">
            <span class="icon icon-tuxiaocao"></span>
          </div>
          <div class="icon-item">
            <span class="icon icon-news"></span>
          </div>
          <div class="icon-item">
            <span class="icon icon-tips"></span>
          </div>
        </div>

        <div class="points-display">
          <div class="points-icon">
            <img :src="require('/src/assets/imgs/other/icon-sidebar-left.png')" alt=""/>
          </div>
          <div class="points-content">
            <div class="points-value">
              <span class="highlight">{{ isLogin ? '300' : '0' }}</span>
              积分
            </div>
            <div class="points-tip">
              今日还有
              <span class="highlight">{{ isLogin ? '300' : '0' }}</span>
              积分待领取
              <i class="arrow-icon"></i>
            </div>
          </div>
        </div>

        <div class="user-section">
          <div v-if="!isLogin" class="login-register-btn" @click="openLoginDialog">
            登录/注册
          </div>

          <div v-if="isLogin" class="user-info hover-effect">
            <el-dropdown @command="handleCommand" trigger="hover">
              <div class="user-dropdown">
                <span v-show="!hiddenStatus">{{nickName}}</span>
                <el-image 
                  :src="imgHeader" 
                  v-if="imgHeader" 
                  fit="cover"
                  class="user-avatar"
                >
                  <div slot="error">
                    <img 
                      :src="require('/src/assets/imgs/user_img_default1.png')"
                      class="default-avatar"
                      v-if="!$store.getters.sex || $store.getters.sex === '1'"
                    />
                    <img 
                      :src="require('/src/assets/imgs/user_img_default2.png')"
                      class="default-avatar"
                      v-if="$store.getters.sex === '0'"
                    />
                  </div>
                </el-image>
              </div>
              <el-dropdown-menu slot="dropdown" class="custom-dropdown">
                <el-dropdown-item command="team">
                  <i class="menu-icon icon-team"></i>
                  <span>创建团队</span>
                </el-dropdown-item>
                <el-dropdown-item command="package">
                  <i class="menu-icon icon-package"></i>
                  <span>购买套餐</span>
                </el-dropdown-item>
                <el-dropdown-item command="userHome">
                  <i class="menu-icon icon-user"></i>
                  <span>个人中心</span>
                </el-dropdown-item>
                <el-dropdown-item command="logout">
                  <i class="menu-icon icon-logout"></i>
                  <span>退出登录</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getToken } from "@/utils/auth";

export default {
  name: "Top",
  data() {
    return {
      isLogin: !!getToken(),
      imgHeader: undefined,
      userName: "",
      noticeData: {},
      noticeOpen: false,
      nickName: "",
      hiddenStatus: this.$store.state.settings.hiddenStatusLeft,
      currentPath: this.$route.path,
    };
  },
  watch: {
    '$store.state.settings.hiddenStatusLeft': {
      handler: function(val) {
        this.hiddenStatus = val;
      }
    },
    '$route': {
      handler: function(to) {
        this.currentPath = to.path;
      },
      immediate: true
    }
  },
  mounted() {
    this.flushImgUrl();
    this.userName = this.$store.getters.username;
    this.getNoticeData();
    this.nickName = (this.$store.state.user.userDetail || {}).nickName;
  },
  methods: {
    flushImgUrl() {
      let imgHeader = this.$store.state.user.imgHeader;
      if (imgHeader == null && imgHeader != "") {
        this.imgHeader = require("/src/assets/imgs/user_img_default1.png");
      } else {
        this.imgHeader = this.$store.getters.resourceMain.staticWebsite + imgHeader;
      }
    },
    openLoginDialog() {
      this.$store.commit("SET_AUTH_DIALOG", !this.$store.getters.authDialog);
      this.$store.commit("SET_LOGIN_DIALOG", !this.$store.getters.loginDialog);
      this.$store.commit("SET_REGISTER_DIALOG", false);
    },
    getNoticeData() {
      this.$api.get("/module/business/noticeclient/getLastNotice").then((res) => {
        if (res.status) {
          this.noticeData = res.data;
          this.noticeOpen = true;
        }
      });
    },
    handleCommand(command) {
      if (command === "logout") {
        this.$store.dispatch("LogOut");
      } else if (command === "userHome") {
        this.$router.push("/userHome");
      }
    },
    goUserHome() {
      this.$router.push("/userHome"); 
    },
    goWorkbench() {
      this.$router.push("/workbench");
    },
    aiDrawClick() {
      this.$router.push("/aiDraw");
    },
    goAppTool() {
      this.$router.push("/appTool");
    },
    assistantClick() {
      this.$router.push("/assistant");
    },
    goIndex() {
      this.$router.push("/home");
    }
  }
};
</script>
<style scoped>
.header[data-v-xxx] {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.header .header-container {
  width: 100%;
  max-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-sizing: border-box;
}

.header-logo {
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  overflow: visible;
  margin-right: 24px;
}

.logo-container {
  display: flex;
  gap: 12px;
  height: 100%;
  align-items: center;
}

.logo-container a {
  height: 100%;
  display: flex;
  align-items: center;
}

.logo-container img {
  height: 100%;
  width: 120px;
  object-fit: contain;
  transform: scale(1.2);
  max-width: none;
}

.header-nav {
  display: flex;
  height: 100%;
  flex: 1;
}

.nav-item {
  height: 100%;
  padding: 0 20px;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  color: #333;
  position: relative;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-item:hover {
  color: #0099ff;
}

.nav-item.active {
  color: #0099ff;
}

.nav-item.active:after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 3px;
  background: linear-gradient(90deg, 
    rgba(255, 107, 0, 0.8),
    rgba(255, 0, 98, 0.8)
  );
  border-radius: 1px;
  box-shadow: 0 2px 4px rgba(255, 107, 0, 0.2);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.vip-btn {
  padding: 4px 16px;
  border-radius: 16px;
  background: linear-gradient(45deg, #ff6b00, #ff0062);
  border: none;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  height: 32px;
  line-height: 32px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 16px;
  box-shadow: 0 4px 15px rgba(255, 107, 0, 0.3);
  transition: all 0.3s ease;
}

.vip-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 0, 0.4);
}

.icon-group {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 0 8px;
}

.icon-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  cursor: pointer;
  border-radius: 4px;
}

.icon-item:hover {
  background: linear-gradient(135deg,
    rgba(26, 115, 232, 0.1) 0%,
    rgba(0, 229, 255, 0.1) 100%
  );
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

.icon-item .icon {
  width: 24px;
  height: 24px;
}

.icon-item .icon-text {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #666;
  white-space: nowrap;
  opacity: 0;
  transition: all 0.3s;
}

.icon-item:hover .icon-text {
  opacity: 1;
  bottom: -16px;
}

.icon-tuxiaocao {
  background: url('@/assets/imgs/icons/tuxiaocao.png') no-repeat center;
  background-size: contain;
}

.icon-news {
  background: url('@/assets/imgs/icons/news.png') no-repeat center;
  background-size: contain;
}

.icon-tips {
  background: url('@/assets/imgs/icons/tips.png') no-repeat center;
  background-size: contain;
}

.points-display {
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 12px;
  background: linear-gradient(135deg, 
    rgba(255, 107, 0, 0.1) 0%,
    rgba(255, 0, 98, 0.1) 100%
  );
  border: 1px solid rgba(255, 107, 0, 0.2);
  border-radius: 18px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-sizing: border-box;
  box-shadow: 0 4px 15px rgba(255, 107, 0, 0.1);
}

.points-display::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, 
    rgba(255, 255, 255, 0) 0%, 
    rgba(255, 255, 255, 0.3) 50%, 
    rgba(255, 255, 255, 0) 100%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.points-display:hover::before {
  transform: translateX(100%);
}

.points-display:hover {
  background: linear-gradient(135deg, 
    rgba(255, 107, 0, 0.15) 0%,
    rgba(255, 0, 98, 0.15) 100%
  );
  box-shadow: 0 6px 20px rgba(255, 107, 0, 0.2);
}

.points-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
}

.points-icon img {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 1px 2px rgba(255, 136, 0, 0.2));
}

.points-content {
  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;
  z-index: 1;
}

.points-value {
  font-size: 13px;
  color: #ff3d00;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 2px;
}

.points-tip {
  font-size: 12px;
  color: #ff3d00;
  display: flex;
  align-items: center;
  gap: 2px;
  opacity: 0.8;
}

.highlight {
  color: #ff3d00;
  font-weight: bold;
  font-size: 1.1em;
  text-shadow: 0 2px 4px rgba(255, 61, 0, 0.2);
}

.arrow-icon {
  width: 12px;
  height: 12px;
  background: url('@/assets/imgs/icons/arrow-right.png') no-repeat center/contain;
  margin-left: 2px;
  transition: transform 0.3s ease;
  filter: brightness(0) saturate(100%) invert(55%) sepia(95%) 
          saturate(1631%) hue-rotate(360deg) brightness(100%) contrast(106%);
}

.points-display:hover .arrow-icon {
  transform: translateX(3px);
}

.user-section {
  display: flex;
  align-items: center;
  min-width: 120px;
  margin-left: 16px;
  flex-shrink: 0;
}

.user-info {
  display: flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 4px;
  margin-left: 16px;
}

.user-info:hover {
  background: linear-gradient(135deg,
    rgba(26, 115, 232, 0.1) 0%,
    rgba(0, 229, 255, 0.1) 100%
  );
}

.user-dropdown {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-dropdown span {
  font-size: 14px;
  color: #333;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-dropdown .el-image {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 20px;
  height: 20px;
  display: inline-block;
}

.icon-tuxiaocao {
  background: url('/src/assets/imgs/icons/tuxiaocao.png') no-repeat center;
  background-size: contain;
}

.icon-news {
  background: url('/src/assets/imgs/icons/news.png') no-repeat center;
  background-size: contain;
}

.icon-tips {
  background: url('/src/assets/imgs/icons/tips.png') no-repeat center;
  background-size: contain;
}

@media screen and (max-width: 1440px) {
  .header-container {
    padding: 0 16px;
  }
  
  .nav-item {
    padding: 0 16px;
  }
  
  .icon-group {
    gap: 12px;
  }
}

@media screen and (max-width: 1280px) {
  .points-display {
    display: none;
  }
}

.header .el-dropdown {
  color: inherit;
}

.header .el-image {
  display: inline-flex;
}

.gradient-text-blue {
  background: linear-gradient(45deg, #1a73e8, #00e5ff);
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 600;
}

.gradient-text-purple {
  background: linear-gradient(45deg, #d600f9, #ff0099);
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 600;
}

.gradient-text-orange {
  background: linear-gradient(45deg, #ff6b00, #ff2b67);
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 600;
}

.gradient-text-green {
  background: linear-gradient(45deg, #00c853, #00e676);
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 600;
}

.gradient-text-red {
  background: linear-gradient(45deg, #ff3d00, #ff9100);
  -webkit-background-clip: text;
  color: transparent;
  font-weight: 600;
}

.custom-dropdown {
  min-width: 160px;
  padding: 8px 0;
}

.custom-dropdown .el-dropdown-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  gap: 8px;
}

.menu-icon {
  width: 20px;
  height: 20px;
  display: inline-block;
}

.icon-home { background: url('@/assets/imgs/icons/home.png') no-repeat center/contain; }
.icon-material { background: url('@/assets/imgs/icons/material.png') no-repeat center/contain; }
.icon-write { background: url('@/assets/imgs/icons/write.png') no-repeat center/contain; }
.icon-ai { background: url('@/assets/imgs/icons/ai.png') no-repeat center/contain; }
.icon-order { background: url('@/assets/imgs/icons/order.png') no-repeat center/contain; }
.icon-team { background: url('@/assets/imgs/icons/team.png') no-repeat center/contain; }
.icon-package { background: url('@/assets/imgs/icons/package.png') no-repeat center/contain; }
.icon-user { background: url('@/assets/imgs/icons/user.png') no-repeat center/contain; }
.icon-logout { background: url('@/assets/imgs/icons/logout.png') no-repeat center/contain; }
.icon-vip { background: url('@/assets/imgs/icons/vip.png') no-repeat center/contain; }

/* 添加默认头像样式 */
.default-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 确保 el-image 内部的图片完全填充容器 */
:deep(.el-image__inner) {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}

/* 导航菜单悬停效果 */
.hover-effect {
  cursor: pointer;
  transition: all 0.3s ease;
}

.hover-effect:hover {
  transform: translateY(-2px);
}

/* 用户信息悬停效果 */
.user-info.hover-effect:hover {
  background: rgba(64, 158, 255, 0.1);
  transform: translateY(-2px);
}

.user-dropdown {
  cursor: pointer;
}

/* 下拉菜单项悬停效果 */
.custom-dropdown .el-dropdown-item {
  transition: all 0.3s ease;
}

.custom-dropdown .el-dropdown-item:hover {
  background: linear-gradient(135deg,
    rgba(26, 115, 232, 0.1) 0%,
    rgba(0, 229, 255, 0.1) 100%
  );
}

/* 添加科技感动画效果 */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.01); }
  100% { transform: scale(1); }
}

.points-display {
  animation: pulse 3s infinite ease-in-out;
}

/* 添加霓虹灯效果 */
@keyframes glow {
  0% { box-shadow: 0 0 5px rgba(255, 107, 0, 0.2); }
  50% { box-shadow: 0 0 20px rgba(255, 107, 0, 0.4); }
  100% { box-shadow: 0 0 5px rgba(255, 107, 0, 0.2); }
}

.vip-btn {
  animation: glow 2s infinite;
}

/* 导航菜单图标放大效果 */
.nav-icon {
  transition: transform 0.3s ease;
}

.nav-item:hover .nav-icon {
  transform: scale(1.1);
}

/* 整体阴影效果增强 */
.header[data-v-xxx] {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

/* 新的登录按钮样式 */
.login-register-btn {
  height: 36px;
  padding: 0 20px;
  background: #ffffff;
  border: 1px solid #1a73e8;
  border-radius: 18px;
  color: #1a73e8;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-register-btn:hover {
  background: #1a73e8;
  color: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(26, 115, 232, 0.2);
}

.nav-text {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.hot-tag {
  position: absolute;
  top: 18px;
  right: -28px;
  transform: scale(0.65);
  padding: 0 4px;
  height: 14px;
  line-height: 14px;
  border-radius: 7px;
  font-size: 10px !important;
  font-weight: bold;
  background: linear-gradient(45deg, #ff4d4d, #ff1a1a);
  border: none;
  z-index: 1;
}

@keyframes hot-pulse {
  0% { transform: scale(0.65); }
  50% { transform: scale(0.7); }
  100% { transform: scale(0.65); }
}

/* 添加多彩标签样式 */
.module-tags:nth-child(5n+1) {
  border: 1px solid transparent;
  background: linear-gradient(#fff, #fff) padding-box,
              linear-gradient(45deg, #FF6B6B, #FF8E53) border-box;
  color: #FF6B6B;
}

.module-tags:nth-child(5n+2) {
  border: 1px solid transparent;
  background: linear-gradient(#fff, #fff) padding-box,
              linear-gradient(45deg, #4ECDC4, #45B7AF) border-box;
  color: #45B7AF;
}

.module-tags:nth-child(5n+3) {
  border: 1px solid transparent;
  background: linear-gradient(#fff, #fff) padding-box,
              linear-gradient(45deg, #A177FF, #7C5CFF) border-box;
  color: #7C5CFF;
}

.module-tags:nth-child(5n+4) {
  border: 1px solid transparent;
  background: linear-gradient(#fff, #fff) padding-box,
              linear-gradient(45deg, #FFB347, #FFCC33) border-box;
  color: #FFB347;
}

.module-tags:nth-child(5n) {
  border: 1px solid transparent;
  background: linear-gradient(#fff, #fff) padding-box,
              linear-gradient(45deg, #FF61D2, #FE2EC8) border-box;
  color: #FF61D2;
}

/* 添加悬停效果 */
.module-tags {
  transition: all 0.3s ease;
  cursor: pointer;
}

.module-tags:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 确保背景色为白色 */
.module-tags {
  background-color: #fff;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 13px;
  margin: 4px;
  display: inline-block;
}
</style>
