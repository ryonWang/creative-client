<template>
  <div class="ass-menu">
    <el-menu
      :default-active="NavigationDefaultActive"
      class="ass-menu-list"
      router
    >
      <template v-for="(item, index) in menuList">
        <template v-if="item.submenuLsit.length > 0">
          <el-submenu :index="index.toString()">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="(item2, index2) in item.submenuLsit">
              <template v-if="item2.submenuLsit.length > 0">
                <el-submenu :index="[index + '-' + index2].toString()">
                  <template slot="title">
                    <i :class="item2.icon"></i>
                    {{ item2.title }}
                  </template>
                  <el-menu-item
                    :index="item3.path"
                    v-for="(item3, index3) in item2.submenuLsit"
                  >
                    <i :class="item3.icon"></i>
                    {{ item3.title }}
                  </el-menu-item>
                </el-submenu>
              </template>
              <el-menu-item v-else :index="item2.path">
                <i :class="item2.icon"></i>
                {{ item2.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.path">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "LeftAsideNav",
  data() {
    return {
      NavigationDefaultActive: "",
      menuList: [
        {
          title: "自媒体",
          icon: "el-icon-s-promotion",
          path: "",
          submenuLsit: [
            {
              title: "短视频",
              icon: "el-icon-video-camera",
              path: "/weMedia",
              submenuLsit: [],
            },
            {
              title: "电商创意",
              icon: "el-icon-shopping-cart-full",
              path: "/sessionDraw",
              submenuLsit: [],
            },
            {
              title: "小红书",
              icon: "el-icon-notebook-2",
              path: "/sessionChat",
              submenuLsit: [],
            },
            {
              title: "逛逛",
              icon: "el-icon-guide",
              path: "sessionDomain",
              submenuLsit: [],
            },
            {
              title: "社交电商",
              icon: "el-icon-share",
              path: "",
              submenuLsit: [],
            },
            {
              title: "直播电商",
              icon: "el-icon-video-play",
              path: "",
              submenuLsit: [],
            },
          ],
        },
        {
          title: "影视编剧",
          icon: "el-icon-film",
          path: "",
          submenuLsit: [
            {
              title: "创意生成",
              icon: "el-icon-magic-stick",
              path: "tesss",
              submenuLsit: [],
            },
            {
              title: "情节生成",
              icon: "el-icon-edit-outline",
              path: "tesss",
              submenuLsit: [],
            },
            {
              title: "脚本生成",
              icon: "el-icon-document",
              path: "tesss",
              submenuLsit: [],
            },
            {
              title: "智能改稿",
              icon: "el-icon-refresh",
              path: "tesss",
              submenuLsit: [],
            },
            {
              title: "剧集功能",
              icon: "el-icon-video-camera-solid",
              path: "tesss",
              submenuLsit: [],
            },
            {
              title: "剧本评估",
              icon: "el-icon-reading",
              path: "tesss",
              submenuLsit: [],
            },
            {
              title: "系统推荐",
              icon: "el-icon-star-off",
              path: "tesss",
              submenuLsit: [],
            },
          ],
        },
      ],
    };
  },
  mounted() {
    this.getRouterParmes();
  },
  methods: {
    getRouterParmes: function () {
      let _that = this;
      setTimeout(function () {
        _that.NavigationDefaultActive =
          _that.$router.history.current.name ||
          _that.$router.history.current.path.split("/")[1];
      }, 100);
    },
  },
};
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

