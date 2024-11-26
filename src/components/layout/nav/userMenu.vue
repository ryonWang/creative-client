<template>
        <el-menu
          :default-active="NavigationDefaultActive"
          router
        >
          <template v-for="(item, index) in menuList">
            <!--判断是否有二级-->
            <template v-if="item.submenuLsit.length > 0">
              <el-submenu :index="index.toString()">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{ item.title }}</span>
                </template>
                <el-menu-item-group>
                  <template v-for="(item2, index2) in item.submenuLsit">
                    <!--判断是否有第三级-->
                    <template v-if="item2.submenuLsit.length > 0">
                      <el-submenu :index="[index + '-' + index2].toString()">
                        <template slot="title">{{ item2.title }}</template>
                        <el-menu-item
                          :index="item3.path"
                          v-for="(item3, index3) in item2.submenuLsit"
                          >{{ item3.title }}
                        </el-menu-item>
                      </el-submenu>
                    </template>
                    <el-menu-item v-else :index="item2.path">
                      {{ item2.title }}
                    </el-menu-item>
                  </template>
                </el-menu-item-group>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item :index="item.path">
                <i class="el-icon-menu"></i>
                <span slot="title">{{ item.title }}</span>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
</template>

<script>
export default {
  name: "LeftAsideNav",
  data() {
    return {
      NavigationDefaultActive: "/userHome", // 导航默认当前选择
      //  菜单列表
      menuList: [
        {
          title: "个人中心",
          icon: "el-icon-menu",
          path: "",
          submenuLsit: [
            {
              title: "基础信息",
              icon: "el-icon-menu",
              path: "/userHome",
              submenuLsit: [],
            },
            {
              title:"认证中心",
              icon: "el-icon-menu",
              path: "/userHome/Certification",
              submenuLsit: [],
            },
            {
              title:"推广邀请",
              icon: "el-icon-menu",
              path: "/userHome/Invite",
              submenuLsit: [],
            },
            
          ],
        },
      ],
    };
  },
  // 引入组件
  components: {},
  // 页面加载方法
  mounted() {
    this.getRouterParmes();
  },
  // 方法集合
  methods: {
    // 获取默认选项路由 vue-router 的
    getRouterParmes: function () {
      let _that = this;
      // 获取路由需要延时获取
      setTimeout(function () {
        _that.NavigationDefaultActive =
          _that.$router.history.current.name ||
          _that.$router.history.current.path.split("/")[1];
      }, 100);
    },
  },
};
</script>


