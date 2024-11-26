<template>
  <div class="draw-menu">
    <router-link to="/" class="menu-item">
      <i class="el-icon-s-home"></i>
      <span>首页</span>
    </router-link>
    
    <div class="menu-group">
      <div class="menu-item" @click="handleNav('人台图')">
        <i class="el-icon-user"></i>
        <span>人台图</span>
      </div>

      <div class="menu-item" @click="handleNav('真人图')">
        <i class="el-icon-user-solid"></i>
        <span>真人图</span>
      </div>

      <div class="menu-item" @click="handleNav('鞋靴图')">
        <i class="el-icon-shopping-bag-1"></i>
        <span>鞋靴图</span>
      </div>

      <div class="menu-item" @click="handleNav('箱包图')">
        <i class="el-icon-suitcase"></i>
        <span>箱包图</span>
      </div>
    </div>

    <div class="menu-divider"></div>

    <div class="menu-title">工具</div>
    
    <div class="menu-group">
      <div class="menu-item" @click="handleNav('替换背景')">
        <i class="el-icon-picture-outline"></i>
        <span>替换背景</span>
        <span class="menu-desc">背景自由替换</span>
      </div>

      <div class="menu-item" @click="handleNav('消除笔')">
        <i class="el-icon-delete"></i>
        <span>消除笔</span>
        <span class="menu-desc">一键消除多余部分</span>
      </div>

      <div class="menu-item" @click="handleNav('高清放大')">
        <i class="el-icon-zoom-in"></i>
        <span>高清放大</span>
        <span class="menu-desc">画质更清晰</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DrawMenu',
  methods: {
    handleNav(type) {
      if(type === '人台图') {
        this.$router.push('/aiDraw/rentai')
      }
      // 这里可以处理导航逻辑
      console.log('导航到:', type)
    }
  }
}
</script>

<style scoped>
.draw-menu {
  width: 200px;
  background: #fff;
  height: 100vh;
  padding: 20px 0;
  border-right: 1px solid #ebeef5;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  top: 64px;
}

.menu-group {
  padding: 8px 0;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #606266;
  cursor: pointer;
  position: relative;
  font-size: 14px;
  transition: all 0.3s;
}

.menu-item:hover {
  background: #f5f7fa;
  color: #409EFF;
}

.menu-item i {
  font-size: 18px;
  margin-right: 12px;
  width: 24px;
  text-align: center;
}

.menu-item span {
  flex: 1;
}

.menu-desc {
  position: absolute;
  right: 20px;
  font-size: 12px;
  color: #909399;
  opacity: 0;
  transition: all 0.3s;
}

.menu-item:hover .menu-desc {
  opacity: 1;
}

.menu-divider {
  height: 1px;
  background: #dcdfe6;
  margin: 8px 0;
}

.menu-title {
  padding: 8px 20px;
  color: #909399;
  font-size: 12px;
  font-weight: 500;
}

/* 激活状态 */
.menu-item.active {
  background: #ecf5ff;
  color: #409EFF;
}

.menu-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: #409EFF;
}

/* 响应式处理 */
@media screen and (max-width: 768px) {
  .draw-menu {
    width: 64px;
  }

  .menu-item span:not(.el-icon),
  .menu-desc,
  .menu-title {
    display: none;
  }

  .menu-item {
    padding: 16px 0;
    justify-content: center;
  }

  .menu-item i {
    margin: 0;
    font-size: 20px;
  }
}
</style>
