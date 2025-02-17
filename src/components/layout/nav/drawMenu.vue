<template>
  <el-menu
    :default-active="activeMenu"
    class="el-menu-vertical-demo"
    @select="handleSelect"
  >
    <el-menu-item index="/aiDraw">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    
    <el-menu-item index="/aiDraw/mannequin">
      <i class="el-icon-user"></i>
      <span slot="title">人台图</span>
    </el-menu-item>
    
    <el-menu-item index="/aiDraw/human">
      <i class="el-icon-user-solid"></i>
      <span slot="title">真人图</span>
    </el-menu-item>
    
    <el-menu-item index="/aiDraw/shoes">
      <i class="el-icon-shopping-bag-1"></i>
      <span slot="title">鞋靴图</span>
    </el-menu-item>
    
    <el-menu-item index="/aiDraw/bags">
      <i class="el-icon-suitcase"></i>
      <span slot="title">箱包图</span>
    </el-menu-item>
    
    <el-menu-item index="/aiDraw/background">
      <i class="el-icon-picture"></i>
      <span slot="title">替换背景</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'DrawMenu',
  data() {
    return {
      activeMenu: '/aiDraw'
    }
  },
  methods: {
    handleSelect(index) {
      this.$router.push(index);
    }
  },
  created() {
    this.activeMenu = this.$route.path;
  },
  watch: {
    '$route'(to) {
      this.activeMenu = to.path;
    }
  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 400px;
  border: none;
}

.el-menu-item {
  height: 40px;
  line-height: 40px;
  padding: 0 45px !important;
}

/* 图标样式 */
.el-menu-item i {
  margin-right: 8px;
  color: #909399;
}

.el-menu-item:hover i {
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