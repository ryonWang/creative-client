<template>
  <div class="assistant-container">
    <!-- 右侧内容区 -->
    <div class="assistant-content">
      <!-- 内容区主体 -->
      <div class="content-main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Assistant',
  data() {
    return {
      currentTitle: '商品助理',
      currentModule: '智能生成',
      currentPage: '主图生成'
    }
  },
  watch: {
    $route: {
      handler(to) {
        // 根据路由更新面包屑
        this.updateBreadcrumb(to)
      },
      immediate: true
    }
  },
  methods: {
    updateBreadcrumb(route) {
      const pathMap = {
        'smart': '智能生成',
        'platform': '多平台管理',
        'design': '智能设计',
        'publish': '内容发布',
        'analysis': '数据分析',
        'marketing': '营销工具'
      }
      
      const paths = route.path.split('/')
      if (paths.length >= 3) {
        this.currentModule = pathMap[paths[2]] || '未知模块'
        this.currentPage = route.meta?.title || '未知页面'
      }
    }
  }
}
</script>

<style scoped>
.assistant-container {
  height: calc(100vh - 64px); /* 减去顶部导航的高度 */
  display: flex;
}

.assistant-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.content-header {
  padding: 16px 24px;
  background: #fff;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.header-left h2 {
  margin: 0;
  font-size: 20px;
  color: #303133;
}

.content-main {
  flex: 1;
  overflow-y: auto;
}

/* 面包屑样式优化 */
.el-breadcrumb {
  font-size: 13px;
}

/* 滚动条美化 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-thumb {
  background: #c0c4cc;
  border-radius: 4px;
}

::-webkit-scrollbar-track {
  background: #f5f7fa;
}
</style> 