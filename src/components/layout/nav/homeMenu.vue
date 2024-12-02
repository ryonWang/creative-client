<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    router
  >
    <el-menu-item index="/home">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-user"></i>
        <span>账号管理</span>
      </template>
      <el-menu-item index="/home/account/auth">
        <i class="el-icon-key"></i>
        账号授权
      </el-menu-item>
      <el-menu-item index="/home/account/permission">
        <i class="el-icon-connection"></i>
        权限管理
      </el-menu-item>
      <el-menu-item index="/home/account/profile">
        <i class="el-icon-user"></i>
        用户信息修改
      </el-menu-item>
      <el-menu-item index="/home/account/group">
        <i class="el-icon-user-solid"></i>
        账号分组
      </el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-s-grid"></i>
        <span>矩阵分发</span>
      </template>
      <el-menu-item index="/home/matrix/task">
        <i class="el-icon-s-order"></i>
        矩阵任务
      </el-menu-item>
      <el-menu-item index="/home/matrix/analysis">
        <i class="el-icon-data-analysis"></i>
        效果分析
      </el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-s-platform"></i>
        <span>AI内容生产</span>
      </template>
      <el-menu-item index="/home/contentProduction/aiMixing">
        <i class="el-icon-scissors"></i>
        智能混剪
      </el-menu-item>
      <el-menu-item index="/home/contentProduction/aiTemplate">
        <i class="el-icon-s-grid"></i>
        模板广场
      </el-menu-item>
      <el-menu-item index="/weMedia">
        <i class="el-icon-edit-outline"></i>
        文案创作
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="/workbench">
      <i class="el-icon-picture"></i>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-money"></i>
        <span>财务管理</span>
      </template>
      <el-menu-item index="/home/finance/recharge">
        <i class="el-icon-wallet"></i>
        充值
      </el-menu-item>
      <el-menu-item index="/home/finance/coins">
        <i class="el-icon-coin"></i>
        金币购买
      </el-menu-item>
      <el-menu-item index="/home/finance/digital-human">
        <i class="el-icon-user-solid"></i>
        数字人定制
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: this.$route.path
    };
  },
  watch: {
    $route: {
      handler(route) {
        this.activeIndex = route.path
      },
      immediate: true
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 400px;
  border: none;
}

.el-submenu .el-menu-item {
  height: 40px;
  line-height: 40px;
  padding: 0 45px !important;
}

.el-submenu__title {
  height: 50px !important;
  line-height: 50px !important;
}

/* 图标样式 */
.el-menu-item i,
.el-submenu__title i {
  margin-right: 8px;
  color: #909399;
}

.el-menu-item:hover i,
.el-submenu__title:hover i {
  color: #409EFF;
}

/* 添加hover效果 */
.el-menu-item:hover {
  background: linear-gradient(90deg, rgba(64, 158, 255, 0.1), transparent) !important;
}

/* 激活状态 */
.el-menu-item.is-active {
  background: linear-gradient(90deg, rgba(64, 158, 255, 0.15), transparent) !important;
}

.el-menu-item.is-active i {
  color: #409EFF;
}
</style>