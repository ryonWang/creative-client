<template>
  <div class="digital-human-menu">
    <el-menu
      :default-active="activeMenu"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#fff"
      text-color="#333"
      active-text-color="#409EFF"
      @select="handleSelect"
    >
      <el-menu-item index="/digitalHuman/digital-avatar">
        <i class="el-icon-user"></i>
        <span slot="title">数字人</span>
      </el-menu-item>

      <el-menu-item index="/digitalHuman/voice">
        <i class="el-icon-microphone"></i>
        <span slot="title">声音</span>
      </el-menu-item>

      <el-menu-item index="/digitalHuman/live-workspace">
        <i class="el-icon-video-camera"></i>
        <span slot="title">直播工作台</span>
      </el-menu-item>

      <el-menu-item index="/digitalHuman/video-workspace">
        <i class="el-icon-film"></i>
        <span slot="title">视频工作台</span>
      </el-menu-item>

      <el-menu-item index="/digitalHuman/my-works">
        <i class="el-icon-folder"></i>
        <span slot="title">我的作品</span>
      </el-menu-item>

      <el-menu-item index="/digitalHuman/drafts">
        <i class="el-icon-document"></i>
        <span slot="title">草稿箱</span>
      </el-menu-item>

      <el-menu-item index="/digitalHuman/chat-workspace">
        <i class="el-icon-chat-dot-round"></i>
        <span slot="title">对话工作台</span>
      </el-menu-item>

      <el-menu-item index="/digitalHuman/knowledge-base">
        <i class="el-icon-collection"></i>
        <span slot="title">知识库</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'DigitalHumanMenu',
  computed: {
    activeMenu() {
      return this.$route.path;
    },
    isCollapse() {
      return this.$store.state.settings.hiddenStatusLeft;
    }
  },
  methods: {
    handleSelect(index) {
      if (this.$route.path === index) {
        this.$router.push({
          path: index,
          query: { _t: Date.now() }
        }).catch(() => {});
      } else {
        this.$router.push(index).catch(() => {});
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.digital-human-menu {
  height: 100%;
  background: #fff;
  border-right: 1px solid #e6e6e6;

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    min-height: 400px;
    border: none;
  }

  .el-menu-item {
    height: 40px;
    line-height: 40px;
    padding: 0 45px !important;

    i {
      margin-right: 8px;
      color: #909399;
    }

    &:hover {
      background: linear-gradient(90deg, rgba(64, 158, 255, 0.1), transparent) !important;
      
      i {
        color: #409EFF;
      }
    }

    &.is-active {
      background: linear-gradient(90deg, rgba(64, 158, 255, 0.15), transparent) !important;

      i {
        color: #409EFF;
      }
    }
  }
}
</style>