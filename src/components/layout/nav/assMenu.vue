<template>
  <div class="ass-menu">
    <el-menu
      :default-active="activeMenu"
      class="ass-menu-list"
      @select="handleSelect"
    >
      <!-- 系统管理 -->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item index="/assistant/system/config/erp">
          <i class="el-icon-connection"></i>
          ERP系统对接
        </el-menu-item>
        <el-menu-item index="/assistant/system/config/platform">
          <i class="el-icon-set-up"></i>
          平台参数
        </el-menu-item>
        <el-menu-item index="/assistant/system/config/logs">
          <i class="el-icon-document"></i>
          日志管理
        </el-menu-item>
      </el-submenu>

      <!-- 营销工具 -->
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-shopping-cart-full"></i>
          <span>营销工具</span>
        </template>
        <el-menu-item index="/assistant/marketing/coupon">
          <i class="el-icon-discount"></i>
          优惠券管理
        </el-menu-item>
        <el-menu-item index="/assistant/marketing/countdown">
          <i class="el-icon-timer"></i>
          活动倒计时
        </el-menu-item>
        <el-menu-item index="/assistant/marketing/recommend">
          <i class="el-icon-shopping-cart-2"></i>
          商品推荐
        </el-menu-item>
      </el-submenu>

      <!-- 商品管理 -->
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item index="/assistant/product/edit/create">
          <i class="el-icon-plus"></i>
          新建商品
        </el-menu-item>
        <el-menu-item index="/assistant/product/edit/modify">
          <i class="el-icon-edit"></i>
          商品信息修改
        </el-menu-item>
        <el-menu-item index="/assistant/product/edit/audit">
          <i class="el-icon-view"></i>
          商品审核
        </el-menu-item>
        <el-menu-item index="/assistant/product/data/import">
          <i class="el-icon-upload2"></i>
          商品数据导入
        </el-menu-item>
        <el-menu-item index="/assistant/product/data/maintain">
          <i class="el-icon-edit-outline"></i>
          商品数据维护
        </el-menu-item>
        <el-menu-item index="/assistant/product/data/mapping">
          <i class="el-icon-connection"></i>
          数据映射
        </el-menu-item>
      </el-submenu>

      <!-- 数据管理 -->
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-data-line"></i>
          <span>数据管理</span>
        </template>
        <el-menu-item index="/assistant/data/order/receive">
          <i class="el-icon-receiving"></i>
          订单接收
        </el-menu-item>
        <el-menu-item index="/assistant/data/order/process">
          <i class="el-icon-set-up"></i>
          订单处理
        </el-menu-item>
        <el-menu-item index="/assistant/data/order/analysis">
          <i class="el-icon-data-analysis"></i>
          订单查询与统计
        </el-menu-item>
        <el-menu-item index="/assistant/data/sync/erp">
          <i class="el-icon-refresh"></i>
          与ERP同步
        </el-menu-item>
        <el-menu-item index="/assistant/data/sync/shop">
          <i class="el-icon-refresh-right"></i>
          与店铺同步
        </el-menu-item>
      </el-submenu>

      <!-- 铺货管理 -->
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-sell"></i>
          <span>铺货管理</span>
        </template>
        <el-menu-item index="/assistant/distribution/shop/bind">
          <i class="el-icon-link"></i>
          店铺绑定
        </el-menu-item>
        <el-menu-item index="/assistant/distribution/shop/template">
          <i class="el-icon-files"></i>
          店铺模板设置
        </el-menu-item>
        <el-menu-item index="/assistant/distribution/shop/monitor">
          <i class="el-icon-monitor"></i>
          店铺状态监控
        </el-menu-item>
        <el-menu-item index="/assistant/distribution/product/single">
          <i class="el-icon-goods"></i>
          单商品铺货
        </el-menu-item>
        <el-menu-item index="/assistant/distribution/product/batch">
          <i class="el-icon-s-grid"></i>
          批量铺货
        </el-menu-item>
        <el-menu-item index="/assistant/distribution/product/task">
          <i class="el-icon-s-order"></i>
          铺货任务管理
        </el-menu-item>
      </el-submenu>

      <!-- 规则管理 -->
      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-set-up"></i>
          <span>规则管理</span>
        </template>
        <el-menu-item index="/assistant/distribution/rule/price">
          <i class="el-icon-price-tag"></i>
          价格规则
        </el-menu-item>
        <el-menu-item index="/assistant/distribution/rule/stock">
          <i class="el-icon-box"></i>
          库存规则
        </el-menu-item>
        <el-menu-item index="/assistant/distribution/rule/product">
          <i class="el-icon-goods"></i>
          商品信息规则
        </el-menu-item>
      </el-submenu>

      <!-- 报表管理 -->
      <el-submenu index="7">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>报表管理</span>
        </template>
        <el-menu-item index="/assistant/report/sales/shop">
          <i class="el-icon-shopping-bag-1"></i>
          店铺销售报表
        </el-menu-item>
        <el-menu-item index="/assistant/report/sales/product">
          <i class="el-icon-goods"></i>
          商品销售报表
        </el-menu-item>
        <el-menu-item index="/assistant/report/distribution/products">
          <i class="el-icon-s-data"></i>
          铺货商品报表
        </el-menu-item>
        <el-menu-item index="/assistant/report/distribution/tasks">
          <i class="el-icon-s-order"></i>
          铺货任务报表
        </el-menu-item>
        <el-menu-item index="/assistant/report/inventory/summary">
          <i class="el-icon-box"></i>
          库存汇总报表
        </el-menu-item>
        <el-menu-item index="/assistant/report/inventory/turnover">
          <i class="el-icon-refresh"></i>
          库存周转率报表
        </el-menu-item>
      </el-submenu>

      <!-- 数据分析 -->
      <el-submenu index="8">
        <template slot="title">
          <i class="el-icon-data-analysis"></i>
          <span>数据分析</span>
        </template>
        <el-menu-item index="/assistant/analysis/traffic">
          <i class="el-icon-data-line"></i>
          流量分析
        </el-menu-item>
        <el-menu-item index="/assistant/analysis/conversion">
          <i class="el-icon-data-board"></i>
          转化分析
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
      this.$router.push(index)
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