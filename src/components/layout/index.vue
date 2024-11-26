<template>
  <el-container class="ant-layout">
    <header class="ant-layout-header header-wrap"><Top></Top></header>
    <el-container class="ant-layout ant-layout-has-sider manage-layout container-layout__wrapper" style="padding-top:10px">
      <NavIndex></NavIndex>
    <main class="ant-layout-content site-layout-background ease-in-out">
      <AppMain></AppMain>
    </main>
  </el-container>

    <!-- 登录框 --> 
    <transition name="box-down">
      <Auth v-show="loginDialog"></Auth>
    </transition>
  </el-container>

</template>

<script>
  import Auth from "@/views/auth/Auth";
  import AppMain from "@/components/layout/AppMain";
  import NavIndex from "./nav/nav";
  import Top from "@/components/layout/top"

  export default {
    name: "LayoutIndex",
    components: {AppMain, NavIndex, Auth,Top},
    data() {
      return {
        loginDialog: false,
        settingDialog: false,
        hiddenStatus: this.$store.state.settings.hiddenStatusLeft,
      }
    },
    watch: {
      '$store.getters.authDialog': {
        handler: function (val) {
          this.loginDialog = val
        },
      },
      '$store.state.settings.hiddenStatusLeft': {
        handler: function (val) {
          this.hiddenStatus = val
        },
      },
      '$store.getters.settingDialog': {
        handler: function (val) {
          this.settingDialog = val
        },
      },
    },
    created() {
    },
  }
</script>
