<template>
  <div class="ass-menu">
    <el-menu
      :default-active="activeMenu"
      class="ass-menu-list"
      @select="handleSelect"
    >
      <!-- 智能生成 -->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-magic-stick"></i>
          <span>智能生成</span>
        </template>
        <el-menu-item index="/assistant/smart/shangpintu">
          <i class="el-icon-picture-outline"></i>
          商品图生成
        </el-menu-item>
        <el-menu-item index="/assistant/smart/huanbeijing">
          <i class="el-icon-refresh"></i>
          模特换背景
        </el-menu-item>
        <el-menu-item index="/assistant/smart/huanfu">
          <i class="el-icon-scissors"></i>
          模特换装
        </el-menu-item>
        <el-menu-item index="/assistant/smart/rentai">
          <i class="el-icon-user"></i>
          人台图生成
        </el-menu-item>
        <el-menu-item index="/assistant/smart/shiyi">
          <i class="el-icon-s-custom"></i>
          模特试衣
        </el-menu-item>
        <el-menu-item index="/assistant/smart/sjpb">
          <i class="el-icon-s-grid"></i>
          设计排版
        </el-menu-item>
        <el-menu-item index="/assistant/smart/tpbj">
          <i class="el-icon-picture"></i>
          图片编辑
        </el-menu-item>
      </el-submenu>

      <!-- 多平台管理 -->
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-share"></i>
          <span>多平台管理</span>
        </template>
        <el-menu-item index="2-1">
          <i class="el-icon-key"></i>
          平台授权
        </el-menu-item>
        <el-menu-item index="2-2">
          <i class="el-icon-goods"></i>
          商品管理
        </el-menu-item>
        <el-menu-item index="2-3">
          <i class="el-icon-refresh"></i>
          数据同步
        </el-menu-item>
      </el-submenu>

      <!-- 保持其他菜单不变 -->
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-brush"></i>
          <span>智能设计</span>
        </template>
        <el-menu-item index="3-1">
          <i class="el-icon-picture"></i>
          图片编辑
        </el-menu-item>
        <el-menu-item index="3-2">
          <i class="el-icon-s-grid"></i>
          布局设计
        </el-menu-item>
        <el-menu-item index="3-3">
          <i class="el-icon-edit-outline"></i>
          文案优化
        </el-menu-item>
      </el-submenu>

      <!-- 内容发布 -->
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-upload2"></i>
          <span>内容发布</span>
        </template>
        <el-menu-item index="4-1">
          <i class="el-icon-s-promotion"></i>
          发布管理
        </el-menu-item>
        <el-menu-item index="4-2">
          <i class="el-icon-timer"></i>
          定时任务
        </el-menu-item>
        <el-menu-item index="4-3">
          <i class="el-icon-notebook-2"></i>
          发布日志
        </el-menu-item>
      </el-submenu>

      <!-- 数据分析 -->
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-data-line"></i>
          <span>数据分析</span>
        </template>
        <el-menu-item index="5-1">
          <i class="el-icon-data-analysis"></i>
          效果分析
        </el-menu-item>
        <el-menu-item index="5-2">
          <i class="el-icon-discover"></i>
          竞品分析
        </el-menu-item>
        <el-menu-item index="5-3">
          <i class="el-icon-warning-outline"></i>
          优化建议
        </el-menu-item>
      </el-submenu>

      <!-- 营销工具 -->
      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-shopping-cart-full"></i>
          <span>营销工具</span>
        </template>
        <el-menu-item index="6-1">
          <i class="el-icon-ticket"></i>
          优惠券管理
        </el-menu-item>
        <el-menu-item index="6-2">
          <i class="el-icon-timer"></i>
          活动倒计时
        </el-menu-item>
        <el-menu-item index="6-3">
          <i class="el-icon-shopping-cart-2"></i>
          商品推荐
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'AssMenu',
  data() {
    return {
      activeMenu: ''
    }
  },
  methods: {
    handleSelect(index) {
      // 如果是智能生成的子菜单，直接使用路由路径
      if (index.startsWith('/assistant/smart/')) {
        this.$router.push(index)
      } else {
        // 其他菜单保持原有的路由映射逻辑
        const routeMap = {
          '2-1': '/assistant/platform/auth',
          '2-2': '/assistant/platform/goods',
          '2-3': '/assistant/platform/sync',
          '3-1': '/assistant/design/image',
          '3-2': '/assistant/design/layout',
          '3-3': '/assistant/design/copywriting',
          '4-1': '/assistant/publish/manage',
          '4-2': '/assistant/publish/schedule',
          '4-3': '/assistant/publish/log',
          '5-1': '/assistant/analysis/effect',
          '5-2': '/assistant/analysis/competitor',
          '5-3': '/assistant/analysis/suggestion',
          '6-1': '/assistant/marketing/coupon',
          '6-2': '/assistant/marketing/countdown',
          '6-3': '/assistant/marketing/recommend'
        }
        if (routeMap[index]) {
          this.$router.push(routeMap[index])
        }
      }
    }
  },
  created() {
    // 根据当前路由设置激活菜单
    this.activeMenu = this.$route.path
  }
}
</script>

<style scoped>
.ass-menu {
  height: 100%;
  border-right: 1px solid #e6e6e6;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.ass-menu-list {
  flex: 1;
  border: none;
}

/* 菜单样式优化 */
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