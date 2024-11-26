<template>
  <div class="ant-layout-header header-wrap">
    <div class="logo">
      <div
        class="ant-space ant-space-horizontal ant-space-align-center"
        style="gap: 7px"
      >
        <div class="ant-space-item" style="">
          <a href="" target="_blank">
            <img
              :src="require('/src/assets/imgs/logo/xingji-logo1.png')"
              alt=""
          /></a>
        </div>
        <div class="ant-space-item" style="">
          <a href="" target="_blank">
            <img
              :src="require('/src/assets/imgs/logo/xingji-logo2.png')"
              alt=""
          /></a>
        </div>
      </div>
    </div>
    <div class="header-nav__list">
      <div class="header-nav__list-item"><span @click="goIndex()">首页</span></div>
      <div class="header-nav__list-item"><span @click="goWorkbench()">素材管理</span></div>
      <div class="header-nav__list-item"><span @click="goAppTool()">文案创作</span></div>
      <div class="header-nav__list-item"><span @click="aiDrawClick()">AI绘图</span></div>
      <div class="header-nav__list-item"><span>订单广场</span></div>
    </div>
    <div
      class="ant-space ant-space-horizontal ant-space-align-center right___pbXGl"
      style="gap: 16px"
    >
      <div class="ant-space-item" style="">
        <div style="margin-right: 16px">
          <div class="wechat-group">
            <button
              type="button"
              class="ant-btn ant-btn-round ant-btn-primary ant-btn-sm wechat-group__button"
            >
              <span>会员卡兑换</span>
            </button>
          </div>
        </div>
      </div>
      <div class="ant-space-item" style="">
        <div class="ant-dropdown-trigger tipWrapper___ofYxl">
          <span
            ><div class="header-icon__wrapper">
              <span role="img" class="anticon"
                ><svg
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  focusable="false"
                  class=""
                >
                  <use xlink:href="#icon-vam-dingbu-tuxiaocao"></use></svg
              ></span></div
          ></span>
        </div>
      </div>
      <div class="ant-space-item" style="">
        <div style="display: flex; align-items: center">
          <span class="ant-dropdown-trigger notify-wrapper"
            ><span class="ant-badge"
              ><span
                ><div class="header-icon__wrapper">
                  <span role="img" class="anticon">
                    <svg
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      aria-hidden="true"
                      focusable="false"
                      class=""
                    >
                      <use xlink:href="#icon-vam-header-news"></use>
                    </svg>
                  </span></div></span></span
          ></span>
        </div>
      </div>
      <div class="ant-space-item" style="">
        <div class="ant-dropdown-trigger tipWrapper___ofYxl">
          <span
            ><div class="header-icon__wrapper">
              <span role="img" class="anticon"
                ><svg
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  focusable="false"
                  class=""
                >
                  <use xlink:href="#icon-vam-header-tips"></use></svg
              ></span></div
          ></span>
        </div>
      </div>
      <div class="ant-space-item" style="">
        <div class="header-ai-coin">
          <span role="img" class="anticon header-ai-coin__icon"
            ><img
              :src="require('/src/assets/imgs/other/icon-sidebar-left.png')"
              alt=""
              style="width: 14px; height: 14px" /></span
          ><span v-if="!isLogin">0积分 | 今日还有0积分待领取</span><span v-if="isLogin">300积分 | 今日还有300积分待领取</span>
        </div>
      </div>
      <div class="ant-space-item">
        <div class="team-select-wrapper">
          <div class="team-name">
            <div v-if="!isLogin">
              <span @click="openLoginDialog" style="font-size: 16px">{{"登录/注册"}}
                </span>

              <!-- <div class="">
                <span  @click="openRegisterDialog">注册</span>
              <!-- </div> -->
            </div> 
            <div v-if="isLogin">
              <el-dropdown
                @command="handleCommand"
                size="medium"
                style="font-size: 20px"
              >
                <!-- 内容 -->
                <div style="display: flex" class="">
                  <div class="item">
                    <span @click="goUserHome" v-show="!hiddenStatus">{{nickName}}</span>
                  </div>
                  <div style="display: flex">
                    <el-image lazy :src="imgHeader" fit="fill" v-if="imgHeader">
                      <div slot="error" class="">
                        <img
                          :src="
                            require('/src/assets/imgs/user_img_default1.png')
                          "
                          alt=""
                          v-if="
                            $store.getters.sex == null ||
                            $store.getters.sex == ''
                          "
                          style="width: 30px; height: 30px"
                        />
                        <img
                          :src="
                            require('/src/assets/imgs/user_img_default1.png')
                          "
                          alt=""
                          v-if="$store.getters.sex == '1'"
                          style="width: 30px; height: 30px"
                        />
                        <img
                          :src="
                            require('/src/assets/imgs/user_img_default2.png')
                          "
                          alt=""
                          v-if="$store.getters.sex == '0'"
                          style="width: 30px; height: 30px"
                        />
                      </div>
                    </el-image>
                  </div>
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="userHome"
                    >创建团队</el-dropdown-item
                  >
                  <el-dropdown-item command="userHome"
                    >购买套餐</el-dropdown-item
                  >
                  <el-dropdown-item command="userHome"
                    >个人中心</el-dropdown-item
                  >
                  <el-dropdown-item command="logout"
                    >退出登录</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";

export default {
  name: "Top",
  data() {
    return {
      isLogin: !!getToken(),
      imgHeader: undefined,
      userName: "",
      noticeData: {},
      noticeOpen: false,
      nickName:'',
      hiddenStatus: this.$store.state.settings.hiddenStatusLeft,
    };
    
  },
  watch:{
      '$store.state.settings.hiddenStatusLeft':{
        handler: function(val) {
          this.hiddenStatus = val
        },
      }
    },
  mounted() {
    this.flushImgUrl();
    this.userName = this.$store.getters.username;
    this.getNoticeData();
    this.nickName = (this.$store.state.user.userDetail || {}).nickName;
  },
  methods: {
    flushImgUrl() {
      let imgHeader = this.$store.state.user.imgHeader;
      if (imgHeader == null && imgHeader != "") {
        this.imgHeader = require("/src/assets/imgs/user_img_default1.png");
      } else {
        this.imgHeader =
          this.$store.getters.resourceMain.staticWebsite + imgHeader;
      }
    },
    openLoginDialog() {
      this.$store.commit("SET_AUTH_DIALOG", !this.$store.getters.authDialog);
      this.$store.commit("SET_LOGIN_DIALOG", !this.$store.getters.loginDialog);
      this.$store.commit("SET_REGISTER_DIALOG", false);
    },
    openRegisterDialog() {
      this.$store.commit("SET_AUTH_DIALOG", !this.$store.getters.authDialog);
      this.$store.commit(
        "SET_REGISTER_DIALOG",
        !this.$store.getters.registerDialog
      );
      this.$store.commit("SET_LOGIN_DIALOG", false);
    },
    getNoticeData() {
      this.$api
        .get("/module/business/noticeclient/getLastNotice")
        .then((res) => {
          if (res.status) {
            this.noticeData = res.data;
            this.noticeOpen = true;
          }
        });
    },
    goHome() {
      this.$router.push("/home");
    },
    handleCommand(command) {
      if (command === "logout") {
        this.$store.dispatch("LogOut");
      } else if (command === "userHome") {
        this.$router.push("/userHome");
      }
    },
    goUserHome() {
      this.$router.push("/userHome");
    },
    goWorkbench() {
      this.$router.push("/workbench");
    },
    
    aiDrawClick(){
      this.$router.push("/aiDraw/textToImg");
    },
    goAppTool(){
      this.$router.push("/appTool");
    },
    goIndex(){
      this.$router.push("/home");
    }
  },
};
</script>

<style scoped>
.modal-component___T_6N5 .ant-modal-header {
  border-bottom: none;
}

.modal-component___T_6N5 .ant-modal-body::-webkit-scrollbar {
  display: none;
}

.modal-component___T_6N5 .ant-modal-footer {
  border-top: none;
  padding: 0.2rem 0.24rem;
}

.userportrait-modal-wrapper
  .ant-modal-wrap
  .ant-modal-content
  .ant-modal-body
  .steps-wrapper
  .steps-desc {
  font-size: 0.14rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #00000040;
  line-height: 0.22rem;
  padding: 0.16rem 0;
}

.userportrait-modal-wrapper
  .ant-modal-wrap
  .ant-modal-content
  .ant-modal-body
  .steps-wrapper
  .steps-content {
  height: 2rem;
  overflow: auto;
  margin-bottom: 0.2rem;
}

.userportrait-modal-wrapper
  .ant-modal-wrap
  .ant-modal-content
  .ant-modal-body
  .steps-wrapper
  .steps-content
  .steps-identity-title,
.userportrait-modal-wrapper
  .ant-modal-wrap
  .ant-modal-content
  .ant-modal-body
  .steps-wrapper
  .steps-content
  .steps-industry-title,
.userportrait-modal-wrapper
  .ant-modal-wrap
  .ant-modal-content
  .ant-modal-body
  .steps-wrapper
  .steps-content
  .steps-occupation-title {
  font-size: 0.14rem;
  font-family: PingFang-SC-Regular, PingFang-SC;
  font-weight: 400;
  color: #000000a6;
  line-height: 0.22rem;
}

.userportrait-modal-wrapper
  .ant-modal-wrap
  .ant-modal-content
  .ant-modal-body
  .steps-wrapper
  .steps-content
  .steps-identity-list-item,
.userportrait-modal-wrapper
  .ant-modal-wrap
  .ant-modal-content
  .ant-modal-body
  .steps-wrapper
  .steps-content
  .steps-industry-list-item,
.userportrait-modal-wrapper
  .ant-modal-wrap
  .ant-modal-content
  .ant-modal-body
  .steps-wrapper
  .steps-content
  .steps-occupation-list-item {
  border-radius: 0.2rem;
  border: 0.01rem solid rgba(0, 0, 0, 0.15);
  margin-bottom: 0.12rem;
  transition: all 0.3s;
  user-select: none;
  cursor: pointer;
}

.userportrait-modal-wrapper
  .ant-modal-wrap
  .ant-modal-content
  .ant-modal-body
  .steps-wrapper
  .steps-content
  .steps-identity-list-item.active,
.userportrait-modal-wrapper
  .ant-modal-wrap
  .ant-modal-content
  .ant-modal-body
  .steps-wrapper
  .steps-content
  .steps-industry-list-item.active,
.userportrait-modal-wrapper
  .ant-modal-wrap
  .ant-modal-content
  .ant-modal-body
  .steps-wrapper
  .steps-content
  .steps-occupation-list-item.active {
  background: rgba(0, 153, 255, 0.1);
  border-radius: 0.2rem;
  border: 0.01rem solid #0099ff;
}

.userportrait-modal-wrapper
  .ant-modal-wrap
  .ant-modal-content
  .ant-modal-body
  .steps-wrapper
  .steps-content
  .steps-identity-list {
  display: flex;
  justify-content: space-between;
  margin-top: 0.05rem;
}

.userportrait-modal-wrapper
  .ant-modal-wrap
  .ant-modal-content
  .ant-modal-body
  .steps-wrapper
  .steps-content
  .steps-identity-list-item:nth-child(1) {
  padding: 0.05rem 0.16rem;
}

.userportrait-modal-wrapper
  .ant-modal-wrap
  .ant-modal-content
  .ant-modal-body
  .steps-wrapper
  .steps-content
  .steps-identity-list-item:nth-child(2) {
  padding: 0.05rem 0.16rem;
}

.userportrait-modal-wrapper
  .ant-modal-wrap
  .ant-modal-content
  .ant-modal-body
  .steps-wrapper
  .steps-content
  .steps-identity-list-item:nth-child(3) {
  padding: 0.05rem 0.36rem;
}

.userportrait-modal-wrapper
  .ant-modal-wrap
  .ant-modal-content
  .ant-modal-body
  .steps-wrapper
  .steps-content
  .steps-industry-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.08rem;
}

.userportrait-modal-wrapper
  .ant-modal-wrap
  .ant-modal-content
  .ant-modal-body
  .steps-wrapper
  .steps-content
  .steps-industry-list-item {
  padding: 0.05rem 0.16rem;
  margin-right: 0.05rem;
}

.userportrait-modal-wrapper
  .ant-modal-wrap
  .ant-modal-content
  .ant-modal-body
  .steps-wrapper
  .steps-content
  .steps-occupation-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.08rem;
}

.userportrait-modal-wrapper
  .ant-modal-wrap
  .ant-modal-content
  .ant-modal-body
  .steps-wrapper
  .steps-content
  .steps-occupation-list-item {
  padding: 0.05rem 0.16rem;
  margin-right: 0.05rem;
}

.logo {
  display: flex;
  width: 1.36rem;
  height: 0.24rem;
  cursor: pointer;
}

.logo .ant-spin-nested-loading {
  width: 100%;
  height: 100%;
}

.logo .ant-spin-container {
  display: flex;
  width: 100%;
  height: 100%;
}

.logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.logo .ant-space {
  position: relative;
  top: -0.02rem;
}

.logo .ant-space-item {
  line-height: 0.56rem;
}

.m-home-header__container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 0.44rem;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.12rem;
}

.m-home-header__logo {
  width: 1.2rem;
}

.m-home-header__logo-img {
  width: 100%;
  height: 100%;
}

.m-home-header__menu-icon {
  font-size: 0.2rem;
}

.m-header-nav__container .ant-drawer-body {
  padding: 0;
}

.m-header-nav__close-icon {
  font-size: 0.2rem;
}

.header-nav__list {
  display: flex;
  margin-left: 0.4rem;
  height: 0.56rem;
  line-height: 0.56rem;
}

.header-nav__list-item {
  cursor: pointer;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  font-size: 0.16rem;
}

.header-nav__list-item.active {
  color: #09f;
}

.header-nav__list-item:not(:last-child) {
  margin-right: 0.56rem;
}

.header-ai-coin {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 0.24rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  font-size: 0.12rem;
  color: #f2a200;
  background: #ffc80733;
  border-radius: 0.12rem;
  cursor: pointer;
}

.header-ai-coin-tip__icon {
  color: #805500;
  font-size: 0.14rem;
  margin-left: 0.03rem;
  cursor: pointer;
}

.header-ai-coin__icon {
  margin-right: 0.03rem;
  font-size: 0.14rem;
}

.coin-popover__title {
  display: flex;
  align-items: center;
}

.coin-popover__title--icon {
  color: #09f;
  font-size: 0.18rem;
}

.coin-popover__title--text {
  padding-left: 0.1rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  font-size: 0.16rem;
  color: #000000e6;
}

.coin-popover__content {
  width: 3.52rem;
  margin-top: 0.08rem;
  margin-bottom: 0.16rem;
  padding: 0 0.16rem;
}

.coin-popover__content-item {
  font-size: 0.14rem;
  font-family: PingFangSC;
  color: #0009;
  line-height: 0.2rem;
  font-weight: 400;
}

.coin-popover__content-item strong {
  color: #000000e6;
  font-weight: 500;
}

.coin-popover__content-item:not(:last-child) {
  margin-bottom: 0.08rem;
}

.coin-popover__content-btn {
  display: flex;
  margin: 0.18rem auto 0;
}

.coin-popover__content .ant-popover-title {
  border-bottom: none;
}

.container___VlNiw > * {
  background-color: #fff;
  border-radius: 0.04rem;
  box-shadow: 0 0.06rem 0.16rem -0.08rem #00000014, 0 0.09rem 0.28rem #0000000d,
    0 0.12rem 0.48rem 0.16rem #00000008;
}

@media screen and (max-width: 480px) {
  .container___VlNiw {
    width: 100% !important;
  }

  .container___VlNiw > * {
    border-radius: 0 !important;
  }
}

.menu___Gqa4i .anticon {
  margin-right: 0.08rem;
}

.menu___Gqa4i .ant-dropdown-menu-item {
  min-width: 1.6rem;
}

.menu___Gqa4i .ant-dropdown-menu-item:hover {
  color: #0088fe;
  background: #e8f4ff;
}

.menu___Gqa4i .ant-dropdown-menu-title-content {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.menu___Gqa4i .ant-dropdown-menu-item {
  font-size: 0.14rem;
  font-weight: 400;
  color: #000000a6;
}

.accounts___Y6d0l {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.accountsInfo___CJHsu {
  font-weight: 400;
  color: #000000a6;
  line-height: 0.18rem;
  padding-bottom: 0.1rem;
  font-size: 0.12rem;
}

.tipWrapper___ofYxl {
  height: 0.4rem;
  display: flex;
  align-items: center;
}

.version___eRq3a {
  width: 100%;
  text-align: center;
  font-weight: 400;
  color: #00000073;
  font-size: 0.12rem;
}

.right___pbXGl {
  display: flex;
  float: right;
  height: 0.56rem;
  margin-left: auto;
  overflow: hidden;
}

.right___pbXGl .action___tcVfW {
  display: flex;
  align-items: center;
  height: 0.56rem;
  padding: 0 0.16rem;
  cursor: pointer;
  transition: all 0.3s;
}

.right___pbXGl .action___tcVfW > span {
  vertical-align: middle;
}

.right___pbXGl .action___tcVfW.opened {
  background: rgba(0, 0, 0, 0.025);
}

.right___pbXGl .search___yxkjs {
  padding: 0 0.12rem;
}

.right___pbXGl .search___yxkjs:hover {
  background: transparent;
}

.right___pbXGl .account___Wi4c0 .avatar___MS13f {
  color: #09f;
  vertical-align: top;
  background: rgba(255, 255, 255, 0.85);
}

.dark___fMXQZ .action___tcVfW:hover,
.dark___fMXQZ .action___tcVfW.opened {
  background: #252a3d;
}

.ant-dropdown-menu-title-content___MOuYU {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.menuIcon___CmQgt {
  width: 0.2rem !important;
  height: 0.2rem !important;
  background-repeat: no-repeat;
  background-size: 100% auto;
  display: inline-block;
  margin-right: 0.07rem;
}

.menuIcon___CmQgt.personalIcon___gq8MR {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA1VJREFUWEftmFmoT1EUxn/XkEKKMjwoU4aIKFOixIOSKOTBWCiXCA+mkESZyhCRQplLUjKUB1IkU5EpQ0hRhqKEyNhX62jf45z/2WeidFedl3PWXt931t577W/tKoqx5kBfoKWFewVcBd7kDV+VM0APYD4wICbOJWATcCsrTh6CM4xcUoyfRnJnFpJJweNizgbmOB+/A/eBu/auG9AFqOv4bAW2pSWZhWA/YJ8DJFJLgAch8M7AGkBkA5sMXElDMgvBYw7oTWAC8C0GtB5wEOhp3+8AY8ok2BE4aQCfgZHAswTANsAJoIH5jQAe+ZJMm0FN0VILfgGY7gm0CxhkvquB/Z7jSEtwITDNgm8HtngCzQVmme9uYL3nuNQEFzhZ2wFs9gSaB8w0X2Vzg+e41AQnAcss+EUnm0l4ytrAvzHFHYDTBvQFGAU8TWDXDjjubJLhwOOkPwq+p12DGncU6G4BdISNB77GANYHDjv+t4GxvuTkl4VgH+CAA6ICvRi4FwLuCqwFVLADmwhcK5ug4lfbORxg/bDa5h51qpl1HDIbgdTncZYMBphTAe1ql0RUckReu3ZPmszlWYMujqZRcks7NExUxLTTJbfC0+/NNU8GXZBmQG+glb18CVwH3noziXEsimBeHrHjiyKoOA2Bxob0AfgESKzmsiwEJUJ72brrBOhpHVGytAZfAA/t0Xq8AUjcelsagiobU4BhQBNvhJqO74EzwF5fyeVDUNlZDgxOIPUR0CNrZE+lIeeBVcDzSk5JBMeZnNf6cu21lZDLNn1PAJ3Nrkmg6hzWSdLflkSLkI/WqdqCI3EkKxFUIV4UGnjWJLzaybQbQFhqT9UiDA3FXRdXyOMIDgGk9wJThjTNqm1FmGqmpre9E0x68Vw4eBRBNTqngLbmrC5Malilo0hTSZIqV5cok2xTv1KjAYsiqL9TJyZ7B0i/5T4RYv5MJ5D0ZVP7rumvMUtRBKXvVtgAtZjqecs0bZLRBrASOOSCRRHUjYFuDmS6CdCNQJlWEa+WoEfqazPokaSKLv93BnWHIuVRpkkh6UIgsmok7eIyiUXF/qOsRRFU76pz91+Yzme3545s3CWtdEWm24OklrKon5D61q2D7n0kwX5bkh4sikDmOL8Ab7alKed1n2wAAAAASUVORK5CYII=);
}

.menuIcon___CmQgt.quitIcon___N_5pB {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABB1JREFUWEftmGeIVVcQx39rb4hYsIAfogELWFAxRASDiJgYRYIFE3tBURFsWGPDFjQGUsSQBBUbqIgoFiSIQlCsWEASUPwgWLAgYkmMMfJf5srZs/ftOfe9t+IHBx67774zc/53Zs5/zkwJxZORwAgztw3YWgzTJcUwYjbeAyzUme+cB2sA/wL/B0KsNKoOvMjHA/nkYEvgM6AP8DXwZwBgO2A58DtwCLiZBWgWgPWAMcDnQKK3E9gcADgOGGZrXgEHTedJDNBYgN2BOUB9z+hZYFEA4Eqgm6f3GFgLnAmBjAE4CJgEVHGMnQP2Ahcic7AL8IUHVN78GdhXEcgQwK+AUY6Be8AG4GSK0ZhT3AOYAjRx9LcAO3KBrAhgb2Cuo3gVWAY8ymEsBqBUGwBLgPaOnW+AY2l2cwFsBfwAVDOl88DSAFXEApRJUZTsdTX7L4FpwA0fZBpAPVvvvKGUZgFPAwmdBaBM1QW+BT4wu4rQTCenSx+nAewHzHDebHIkd2UFqC3EqRudSH0HHHEd4QPU919MUeuy3EryAag9XD2R+ETXiz5A0cFqewOF9Evg7xBXBXgwpF7LTrFCLplv9JUaYp1anV6JeE48FSv5elD2xbPiSYlOs051KkDxUSP7bSpwLRadF6osqaEtPgR+sr0eWOTKAWzu1FWFdzAgto+VQjyoKrXHTrb2U82/rX/cHPzYuEnPVcoWxiKzdYUAlIlVDi+KI0/5AF16OWoclRFjQcvFtX3Nwhu6cT04FBhvC3YDvxa0XXblCcAQU/sN2OV7UDknDpJkPcHZ4ZTXcE+yuFg5WSYHPzEO0vMTlhPF2DjWxgKgly0WFx/3AXa0S6SeXwFmx1ou0rp1QAezpcvxZR9gM0B3M8lzywc1RW9D1FQp72vbZqOBOz5Afd8EtLBFZUpOJaN0S+wtYGyyn1+L3UQ9APxYycAS87oLDrAvZQ6oD9DNw3+M0R9WMsiGVsFq+vmXFmIBltdUGyVvw4uu91T79T0ZBqReWHUNV9mR/Ge33KQ5L7Yz29rtvWquvM/Vk+i609mUdLvQWxU71AqtopXcni56TVrp9rkANjXlpFH/yxp0NdzFENldAbQxY7IrJ9z1jVfUdnYC1jgNu47/4sj+pKKXUB+iWU1CZ7rSzQMupSmFGncNiaY7ntY8RbOYw4BaxSyiFvZTYwbNeSQ6DN/bUCnVVgiglDQNUCug3iERNTfbgdPAswDKOsBHgKYU8l4i6nWU62lTijeLYgBqcWsLr8qhKyqFms+op9Vh0keixNdH0wNVCZUyV1TGFObroRDEApQdTQMGAsOBJEQh+/7vShGN7PbHDjSzAEw20wnsD/R0CD0EVAT8h80GMzFBPgBdMKIjzf70t7HDaQr1faMN9Tfl6CP0RsnvrwH3b9wpsRLgVAAAAABJRU5ErkJggg==)
    no-repeat;
  background-size: 100% auto;
}

.menuIcon___CmQgt.teamBgIcon___ADMpT {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAARRJREFUWEftmLENAjEMRd8VrEBHCzswABItDUvAChSsAEvQ0CIxADtAS8cKNCjSRQrRCSdygICc6k52/n09J9E5DZWPpnJ/mEFthboIDoAx0NeKZ86/ASfgGs6LDc6ANdDLFC+VfgdWwN4LhgYducMXzXlPzuTUkwwNzlt6LvECHEthSdSZAMM211HcuefQ4BJYtAlbYJMoXCqt8/tmMAOvEcyA1ZlqBI2gdA6eI0Sj6F0bV69BrQFpvhmUCElxNUHtLpXmm0GJkBQ3ghIhKW4EJUJS/PcJVt80Vd92ujVSdePuF3HVVx/STvt4/C+u39z59M7x8gYjhWD8H1fabNw6POn/hcHqS1y6pFl6KSXOEiyd/AC8Y3opk3bYfQAAAABJRU5ErkJggg==);
}

.menuIcon___CmQgt.docIcon___TfjsH {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAY1JREFUWEftmb9KBDEQh78DfQXBQrhKWytBH0AQBEELn0FQsBcsBEFr7QW7K7QVfABBfQG1EuzsrC2UgT2Ic5ndLJuNy14C19xOku9+8yebuQH2WADWgLkSmxiPPoEH4MO32MDYYRs4AWZjEASs8Q0cA7fa1gcoyt0lhBszCeSGVtIHuFuoJxPfgPsABZqYrAOLxQKi4shdzAd4AOwXRpfARZPdA+aW7pcBs4I5BiF6ksiCTYauCtEBX5vQAUtq/vQBdt7FDT08MT26izNg718W6iZJ1dtQ9BisWwd13dMxPH2AnXdxLjO9LzO9cvEysArMlPyqFUA+MiZukW3e6gTuzx03QPqkgHvAYQCUa5IU0D0hnoFHA3YTGBbPToHrVFlc1aGQ8BKgHQdoC3jpAqAP7go40yq3mSSWgj64G+AI+PlvwFpwAptSQclQHXOmcmMlUwLOq4SohLMUjNXAdE+Id6eUyL5BcBZg2y3gYDgLUL5vq4kupeTcl63WiWN1+cU+5t8QX8CTLsIhx+AvpCK1KVuAxdMAAAAASUVORK5CYII=);
}

@media only screen and (max-width: 768px) {
  .ant-divider-vertical {
    vertical-align: unset;
  }

  .name___LSGXC {
    display: none;
  }

  .right___pbXGl {
    position: absolute;
    top: 0;
    right: 0.12rem;
  }

  .right___pbXGl .account___Wi4c0 .avatar___MS13f {
    margin-right: 0;
  }

  .right___pbXGl .search___yxkjs {
    display: none;
  }
}

.uploadWraper___TLNw2 {
  padding-right: 0.08rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.uploadWraper___TLNw2 > div {
  height: 0.22rem;
  width: 0.01rem;
  background: rgba(0, 0, 0, 0.06);
  margin-right: 0.16rem;
}

.header-icon__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 0.2rem;
  width: 0.24rem;
  height: 0.24rem;
  border-radius: 0.06rem;
}

.header-icon__wrapper:hover {
  background: #f1f1f8;
}

.header-icon__active {
  color: #399ffa;
}

.notify-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  height: 0.4rem;
  cursor: pointer;
  transition: all 0.3s;
}

.notify-wrapper > span {
  vertical-align: middle;
}

.notify-wrapper .notify-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0.2rem;
  height: 0.2rem;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAKKADAAQAAAABAAAAKAAAAABZLkSWAAADjklEQVRYCe2YS2gTQRjH3aQRUSRF9GBR6qPxcRJR0XqRYkXxICI1oD0UTZsEBHtQexIPehF8IRU1fdiLgkQRoTlJS6QXEVqkB08Gaq1U8CAJgoQ8/U2aieO622bZlVwyMPke8z3+O9/MZme0ZQ61oaGhlnw+/1TTtAZCdgWDwY9OhHY5EUTEKBaLAch+6B5oSOicaE4CXOcEIH0MTa+oVo5EIh7K2U4Xs7Ybv3boSuGP7hdkDPoB3Xv6WCgUyooxq80yQIB5SXLB5XKFC4XCxmoSYjuHbQTbBwBNVeMjbaoGyCxog4ODp5mVOyTbIANYoQD9SpxLPT09L4hTrMa3KoDxeLwhkUj0AyysD0qi1yQdh36ifxPjyOvpPuTD0JMGPg99Pl9vW1tbTj+ml5cEGI1GlyeTyTiJDirOIvBtt9t9q7u7+4ei/4fl9bOG188VBi7TxSuo1AD/srGxsdPv92ekzoguChBQ2sDAwGMcg9KZMk3C+ynTjNRVQ1kem7GLUoW90h6QMeKcgJqW2y2NjWhTU1MX+hvK2JtsNns8HA5/V3RVsaOjo8mOjo5XzOYuHFrKTtumpqZmYrHYtFkQ0xks79ZZHMWuFW2Skh5dqqQLpua/w8PDq3O53DgW+8pWYlc3m+1u0xc1096LowRXANwZu+AEoEAg8JNYZ2ELQqZ5y7kWJN2vIcCRkZEV2PVJWwLcBVxCynapiCViKnH6yjkV1QJrCDCTybSyQVZJa574nuSdompMkYuyHzCKbQgQw3bFeIKyzCuyI2w55oQMxu4+InmVmgHcIY0ohVjQ/6WpseG3GyUxAyjeWaXGk1l+pUjfpagamzJvMbI3BMjT7JTG8HOSd5rqYldyqnkMAfI0YheXGnxe8k5TAKr/xZWcah5DgKpBrfk6QLsVqM9gfQbtzoBd//oarM+g3Rmw619fg3ZnsHKq46tF48S1FbqW77R3MjDn4Gv0qJSdpOTx06/LmORpRZ7nbnGOL53SWbkCkGPmMwzFaavmDXD9gLwogKhr8FDNkf0BcEqyKsCbIE/LgVpRgYFl9kjmr5RYKLgoElchi16HSEdJU6lUJ+vmiZRVypo67/V6xdKx0vJcKFW+4v8CaCWKtOX2qpn7ls9SViln300c0mdVnVVeLbFV35I959svlOWt3hndczGm11uVbQMESDGdTh8j8VW6uKWaRnff4/GcE2NWAentfwObxjZJMo0uJQAAAABJRU5ErkJggg==)
    no-repeat;
  background-size: 100% auto;
  margin-right: 0.16rem;
  display: inline-block;
}

.notify-wrapper .notify-icon.active {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAKKADAAQAAAABAAAAKAAAAABZLkSWAAADf0lEQVRYCe1YzWsTQRR3k+YDUymIOQhK06ioR8lXkxyMWLEHEREiaEFRQQuCPfhx8g8Q1IpU/Lh4UhDjwYMXpcEgtMU2RTx4UkhqpYIHoaSI+fb3St4wppN2t7uSSwaG9+bte7/32zczuzurbbCoRaPRneVy+Wm9Xu+y2WxnZmZmPlsBbbMChDAqlcp5kItADUBetArXMoIg5bWKlIyjyQMjeiAQcGiaNoAYqto+9AGQ3EgYsP+GGEf/iP4B9vHZ2dkydMPNMEEQ6wGBS8g0jMTb9WSE/zz8HsP/Pogu6olhH90EAa6Fw+Ek5B30bQxgRILod/Qr09PTKci6nlhdBBOJRNfS0tIYiA03gyLRK9jS2LlfoP+g6/DbWqvVdkE9CP0Y2eQG3wcej2ckk8lUZLtKX5NgMpl05nK5d0gUYwAQqWB82+l03pqamvrFdpXE42dzqVS6hpiriOmSfF76/f6hVCpVkmwr1FUJAlALhUKPIC9wJBJlUYETmKYc2/RILI8+VPUFsIKS/+tsNnsUmC2ne9XHTDAYPN1E7m13d/cBo+SIEMXgxgbR30gEj1AOabxCbVnBxm6dA8EeiqLKORyOw2tN6YoMTYZ4PL6pWCymgRtq4C5C7221u1tWEHc6wuQAVAO5k2bJEaGJiYkCsE4RJo0pB+UiXdWUBLFr3Qi8LgWMgtxXaWxKJSyQGmUQykU5eSxLJcFCoRBFkIcd3W73XdatkngCCEzKhcdYvwpbSRDrjV5hyw3B7zEtCzy2ShImYUt4hyRdqEqCuLqHPex2e5p1q2UT9m4VfiuCfeyMZ9dP1q2WTdh+Fb6SIKZ4r+RML/r/1QR2U06RT0kQdyZ2FHZbVXhbrGCKxbtYzimnURKUHdqtdwianYFOBTsVNFsBs/GdNdipoNkKmI3vrEGzFRQHaXzdarFYbAe+KrbgV5rAxTiEo6GhM7AIXkOpVqth2SUSifQj9wLOyvP4/Fo+K4tjJ46Zz+BMp622N5AbA8nLREReg/vbzqxBALN5nLkIgmB9Ex+nf/hCuyRxAJeHnF9MMRnwo8gOQV13y+fzQ1inT1QBSHbO5/PR0jHSqvihJL7i/yFoBIV9sbF68Ssjz2NZulwu3+Tk5JxsM6qLKTYayP44337DlGR4zBK253SNx+uVpgmCSN3r9Q5C3gCJT41+D3/BztK19RLjuL+z5lEQAdhL+AAAAABJRU5ErkJggg==)
    no-repeat;
  background-size: 100% auto;
}

.notify-wrapper .notify-icon:hover {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAKKADAAQAAAABAAAAKAAAAABZLkSWAAADf0lEQVRYCe1YzWsTQRR3k+YDUymIOQhK06ioR8lXkxyMWLEHEREiaEFRQQuCPfhx8g8Q1IpU/Lh4UhDjwYMXpcEgtMU2RTx4UkhqpYIHoaSI+fb3St4wppN2t7uSSwaG9+bte7/32zczuzurbbCoRaPRneVy+Wm9Xu+y2WxnZmZmPlsBbbMChDAqlcp5kItADUBetArXMoIg5bWKlIyjyQMjeiAQcGiaNoAYqto+9AGQ3EgYsP+GGEf/iP4B9vHZ2dkydMPNMEEQ6wGBS8g0jMTb9WSE/zz8HsP/Pogu6olhH90EAa6Fw+Ek5B30bQxgRILod/Qr09PTKci6nlhdBBOJRNfS0tIYiA03gyLRK9jS2LlfoP+g6/DbWqvVdkE9CP0Y2eQG3wcej2ckk8lUZLtKX5NgMpl05nK5d0gUYwAQqWB82+l03pqamvrFdpXE42dzqVS6hpiriOmSfF76/f6hVCpVkmwr1FUJAlALhUKPIC9wJBJlUYETmKYc2/RILI8+VPUFsIKS/+tsNnsUmC2ne9XHTDAYPN1E7m13d/cBo+SIEMXgxgbR30gEj1AOabxCbVnBxm6dA8EeiqLKORyOw2tN6YoMTYZ4PL6pWCymgRtq4C5C7221u1tWEHc6wuQAVAO5k2bJEaGJiYkCsE4RJo0pB+UiXdWUBLFr3Qi8LgWMgtxXaWxKJSyQGmUQykU5eSxLJcFCoRBFkIcd3W73XdatkngCCEzKhcdYvwpbSRDrjV5hyw3B7zEtCzy2ShImYUt4hyRdqEqCuLqHPex2e5p1q2UT9m4VfiuCfeyMZ9dP1q2WTdh+Fb6SIKZ4r+RML/r/1QR2U06RT0kQdyZ2FHZbVXhbrGCKxbtYzimnURKUHdqtdwianYFOBTsVNFsBs/GdNdipoNkKmI3vrEGzFRQHaXzdarFYbAe+KrbgV5rAxTiEo6GhM7AIXkOpVqth2SUSifQj9wLOyvP4/Fo+K4tjJ46Zz+BMp622N5AbA8nLREReg/vbzqxBALN5nLkIgmB9Ex+nf/hCuyRxAJeHnF9MMRnwo8gOQV13y+fzQ1inT1QBSHbO5/PR0jHSqvihJL7i/yFoBIV9sbF68Ssjz2NZulwu3+Tk5JxsM6qLKTYayP44337DlGR4zBK253SNx+uVpgmCSN3r9Q5C3gCJT41+D3/BztK19RLjuL+z5lEQAdhL+AAAAABJRU5ErkJggg==)
    no-repeat;
  background-size: 100% auto;
}

.notify-wrapper .ant-badge-multiple-words {
  padding: 0 0.03rem;
}

.notify-wrapper .ant-badge-multiple-words.ant-badge-count {
  box-shadow: none;
}

.notify-content {
  position: relative;
  right: 0.09rem;
  width: 4rem;
  height: 6.2rem;
  background: #ffffff;
  box-shadow: 0 0.01rem 0.1rem #0000001a;
  border-radius: 0.04rem;
  border: 0.01rem solid #ebebeb;
}

.notify-content .notify-tabs {
  position: relative;
}

.notify-content .notify-tabs .ant-tabs-nav {
  margin: 0;
}

.notify-content .notify-tabs .ant-tabs-nav:before {
  border-bottom: none;
}

.notify-content .notify-tabs .ant-tabs-nav-wrap .ant-tabs-nav-list {
  width: 100%;
  margin-left: 0.24rem;
  margin-bottom: 0.16rem;
}

.notify-content
  .notify-tabs
  .ant-tabs-nav-wrap
  .ant-tabs-nav-list
  .ant-tabs-tab {
  font-size: 0.14rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  padding: 0.24rem 0 0.05rem;
}

.notify-content
  .notify-tabs
  .ant-tabs-nav-wrap
  .ant-tabs-nav-list
  .ant-tabs-tab
  .ant-tabs-tab-btn,
.notify-content
  .notify-tabs
  .ant-tabs-nav-wrap
  .ant-tabs-nav-list
  .ant-tabs-tab:hover {
  color: #999;
}

.notify-content
  .notify-tabs
  .ant-tabs-nav-wrap
  .ant-tabs-nav-list
  .ant-tabs-tab-active
  .ant-tabs-tab-btn,
.notify-content
  .notify-tabs
  .ant-tabs-nav-wrap
  .ant-tabs-nav-list
  .ant-tabs-tab-active:hover {
  color: #333;
}

.notify-content .notify-tabs .notify-close-btn {
  width: 0.12rem;
  height: 0.12rem;
  font-size: 0.2rem;
  position: absolute;
  top: 0.28rem;
  right: 0.24rem;
  cursor: pointer;
}

.notify-content .notify-list-wrapper {
  display: flex;
  flex-direction: column;
}

.notify-content .notify-list-wrapper .notify-virtual-list {
  height: 5rem;
  overflow: auto;
}

.notify-content .notify-list-wrapper .notify-virtual-list::-webkit-scrollbar {
  display: none;
}

.notify-content .notify-list-wrapper .notify-virtual-list .notify-loading {
  color: #333;
  font-size: 0.12rem;
  text-align: center;
  height: 0.3rem;
  line-height: 0.3rem;
}

.notify-content
  .notify-list-wrapper
  .notify-virtual-list
  .ant-list
  .ant-list-item {
  transition: all 0.5s;
  padding: 0.08rem 0.24rem;
  cursor: pointer;
}

.notify-content
  .notify-list-wrapper
  .notify-virtual-list
  .ant-list
  .ant-list-item.read {
  opacity: 0.5;
}

.notify-content
  .notify-list-wrapper
  .notify-virtual-list
  .ant-list
  .ant-list-item:hover {
  background-color: #f2f2f2;
}

.notify-content
  .notify-list-wrapper
  .notify-virtual-list
  .ant-list
  .ant-list-item-meta {
  align-items: center;
}

.notify-content
  .notify-list-wrapper
  .notify-virtual-list
  .ant-list
  .ant-list-item-meta-avatar {
  margin-right: 0.1rem;
  position: relative;
}

.notify-content
  .notify-list-wrapper
  .notify-virtual-list
  .ant-list
  .ant-list-item-meta-avatar
  .notify-status {
  width: 0.08rem;
  height: 0.08rem;
  background: #0099ff;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: -35%;
  transform: translate(-50%, -50%);
}

.notify-content
  .notify-list-wrapper
  .notify-virtual-list
  .ant-list
  .ant-list-item-meta-title
  .notify-title {
  font-size: 0.12rem;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #333;
}

.notify-content
  .notify-list-wrapper
  .notify-virtual-list
  .ant-list
  .ant-list-item-meta-description
  .notify-desc {
  max-width: 82%;
  font-size: 0.12rem;
  font-family: PingFang-SC-Regular, PingFang-SC;
  font-weight: 400;
  color: #999;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  word-break: break-all;
}

.notify-content
  .notify-list-wrapper
  .notify-virtual-list
  .ant-list
  .ant-list-item
  .notify-time {
  font-size: 0.12rem;
  font-family: PingFang-SC-Regular, PingFang-SC;
  font-weight: 400;
  color: #999;
}

.notify-content .notify-list-wrapper .notify-bottom {
  width: 100%;
  background-color: #fff;
}

.notify-content .notify-list-wrapper .notify-bottom.active .read-all-icon,
.notify-content .notify-list-wrapper .notify-bottom.active .read-all-txt {
  color: #999 !important;
}

.notify-content .notify-list-wrapper .notify-bottom .notify-all-read {
  position: absolute;
  bottom: 0.16rem;
  left: 0.16rem;
  font-size: 0.12rem;
  font-family: PingFang-SC-Regular, PingFang-SC;
  font-weight: 400;
  color: #333;
  cursor: pointer;
}

.notify-content
  .notify-list-wrapper
  .notify-bottom
  .notify-all-read
  .read-all-icon {
  width: 0.17rem;
  font-size: 0.17rem;
  display: inline-block;
  margin-right: 0.1rem;
}

.notify-content
  .notify-list-wrapper
  .notify-bottom
  .notify-all-read
  .read-all-txt {
  color: #333;
}

.notify-content .empty-wrapper {
  margin-top: 50%;
}

.roast-container__modal .ant-modal-body {
  padding: 0 0.16rem 0.16rem;
}

.header-roast__icon {
  margin-right: 0.05rem;
  font-size: 0.14rem;
}

.team-select-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.team-select-wrapper:hover {
  background: rgba(0,0,0,0.02);
}

.team-select-wrapper .team-name {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;
}

.team-select-wrapper .team-name .anticon {
  margin-right: 8px;
  font-size: 16px;
  color: #666;
}

.team-select-wrapper .ant-select {
  width: 2.64rem;
  visibility: hidden;
  position: absolute;
  right: 0;
}

.team-select-wrapper .ant-select .ant-select-selector {
  align-items: center;
  border: none;
}

.team-select-wrapper
  .ant-select
  .ant-select-selector
  .ant-select-selection-search {
  z-index: 10;
}

.team-select-wrapper .team-member-info {
  width: 3rem;
  position: absolute;
  bottom: 0.1rem;
  left: 0.8rem;
}

.team-select-wrapper .team-member-info span {
  font-size: 0.12rem;
  font-family: PingFang-SC-Regular, PingFang-SC;
  font-weight: 400;
  color: #999;
}

.team-select-wrapper .team-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 0.24rem;
  height: 0.24rem;
  cursor: pointer;
}

.team-select-wrapper .team-name {
  margin-left: 0.05rem;
  height: 0.5rem;
  border-radius: 0.04rem;
  font-weight: 400;
  font-size: 0.7rem;
  color: rgb(255, 255, 255);
  line-height: 0.2rem;
  padding-left: 0.08rem;
  padding-right: 0.08rem;
  font-family: PingFangSC-Regular;
  cursor: pointer;
}

.team-popup-select {
  min-width: 200px;
  padding: 4px 0;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.team-popup-select .rc-virtual-list-scrollbar-thumb {
  background: transparent !important;
}

.team-popup-select .info_wrapper {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.team-popup-select .info_wrapper:hover {
  background: #f5f5f5;
}

.team-popup-select .info_wrapper .info_right {
  margin-left: 12px;
}

.team-popup-select .info_wrapper .info_name {
  font-size: 14px;
  color: #333;
  line-height: 22px;
}

.team-popup-select .info_wrapper .info_rest {
  font-size: 12px;
  color: #999;
}

.team-popup-select .team-divider {
  margin: 4px 0;
  border-top: 1px solid #f0f0f0;
}

.team-popup-select .ant-select-item {
  position: relative;
  font-size: 0.16rem;
  font-family: PingFang-SC-Regular, PingFang-SC;
  font-weight: 400;
  color: #333;
  padding: 0;
  height: 0.56rem;
  line-height: 0.5rem;
}

.team-popup-select .ant-select-item-option-content {
  display: flex;
  align-items: center;
}

.team-popup-select .ant-select-item .team-title.is-team {
  position: relative;
  top: -0.09rem;
}

.team-popup-select
  .ant-select-item.ant-select-item-option-active:not(
    .ant-select-item-option-disabled
  ) {
  background: rgba(217, 240, 255, 0.5);
}

.team-popup-select
  .ant-select-item.ant-select-item-option-selected:not(
    .ant-select-item-option-disabled
  ) {
  background: #d9f0ff;
}

.team-popup-select
  .ant-select-item.ant-select-item-option-selected:not(
    .ant-select-item-option-disabled
  )
  .info_name {
  color: #0063bc !important;
}

.btn__wrapper {
  padding: 0.16rem 0.24rem 0;
}

.btn__wrapper .create-team-btn {
  margin-bottom: 0.16rem;
  color: #09f;
  display: flex;
  justify-content: center;
  align-items: center;
}

.progress-wrapper {
  height: 100%;
  flex-direction: column;
}

.progress-wrapper .progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.16rem;
  border-bottom: 0.01rem solid #edeff2;
}

.progress-wrapper .progress-header-title {
  font-size: 0.16rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333;
}

.progress-wrapper .progress-header-close {
  display: inline-block;
  width: 0.2rem;
  height: 0.2rem;
  background: url(data:image/png;base64,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)
    no-repeat;
  background-size: 100% auto;
  cursor: pointer;
}

.progress-wrapper .progress-list {
  position: relative;
  z-index: 10;
  height: 2.8rem;
  overflow: auto;
  flex: 8 1;
  padding-top: 0.15rem;
}

.progress-wrapper .progress-list::-webkit-scrollbar {
  display: none;
}

.progress-wrapper .progress-list-item {
  display: flex;
  align-content: center;
  align-items: center;
  padding: 0.12rem 0.16rem;
  transition: all 0.5s;
}

.progress-wrapper .progress-list-item:hover {
  background-color: #f9f9f9;
}

.progress-wrapper .progress-list-item .upload-image-wrapper {
  width: 0.36rem;
  height: 0.36rem;
  background: #ebebeb;
  border-radius: 50%;
  color: #3468fe;
  position: relative;
}

.progress-wrapper .progress-list-item .upload-image-wrapper span:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0.16rem;
  height: 0.16rem;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAX9JREFUWEftmDFOhUAQhudPXqDyBhpfZ2nBEgy1jYWFdzDPE3gKT6DxHjavMDFCwdJ5AI2a2L+YCAmOwYhBQJ6bjTAFtMwM3/4zuzMLSPgD4Xw0AdpmaFJwUtBWAVt/KKUOiOiCmTdtg/X5A3giooXW+srkOyXg43/DVUAlpNZ6ywjQ8zw2cbC1TdO09+RQSu0A2J3NZrdxHD9DCmAYhtt5nl8y8/6XCK8AjlqA61ZoqmBTgK74SqkTIjpj5o16fAB3owJ2qNZc//togL+p1iQcHNB13Xmj1r6ZAKxaaf5LjZjWXd2+Gb8LorQHsHQc5zjLsvsfdTg0YCuFwIqITrXW5+W71oLGBKxUi6LooQIXAVimua5ab0mMoaB4wFpv/twY4lLc6BayNon4Y0b8QV0OC8wM3/cXXQPC6K2uPs2sGxYAFIP3YpNxi4huxA6sAN6I6FAMYFV7QRDsFUUxB3CdJMmL/EuT+Gunzaw3hO/088hW5UnBSUFbBWz9xdfgBxJKLRFKorTAAAAAAElFTkSuQmCC)
    no-repeat;
  background-size: 100% auto;
}

.progress-wrapper .progress-list-item .upload-file-info {
  flex: 4 1;
  margin-left: 0.12rem;
  color: #000;
}

.progress-wrapper .progress-list-item .upload-file-info .file-name {
  width: 1.44rem;
  font-size: 0.14rem;
  color: #242529;
  user-select: none;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.progress-wrapper .progress-list-item .upload-file-info .file-info {
  font-size: 0.12rem;
  font-weight: 400;
  color: #8d9099;
  display: flex;
  flex-direction: row;
}

.progress-wrapper .progress-list-item .upload-status {
  flex: 3 1;
}

.progress-wrapper .progress-list-item .upload-status-progress svg {
  vertical-align: middle;
}

.progress-wrapper .progress-list-item .upload-status-speed {
  padding-left: 0.06rem;
  color: #8d9099;
  font-size: 0.12rem;
  font-family: PingFang-SC-Medium, PingFang-SC;
}

.progress-wrapper .progress-list-item .upload-status-folder {
  width: 0.2rem;
  height: 0.2rem;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAXVJREFUWEftmDFKxUAQhmcwnZ5ALLUW2UCIVepHSuMhvEUO4SVsBFs7nxBCsqWVQrC0NWAVHNmHkbAQN/tmFx+y6UJm/v3yz0yyCcKOH7jjfBAAuRX6cVAIQRwxRBwAYNW27T1HR891BqiEEfEdEc+bpnlyBekU8BvqNYqipK7rNxeQPgCVkw0RZVLKDy7kLKCUcvGECyGuAeBKg7nN8/yiLMtPDqQTwKIo9rquuyOi1RQGER+IaKtSSykvN309CupTbOOg0siy7KDv+0cAOOU4NuaO6zsDVMJJkhwNw1ADwCEX0guggorj+IyI1gCwz4H0BjiBPLYEvJnGewW0BNuEz82A0x7cBsw0pAFwqauhxEudmosLDv65g0KIZy6E9iA+mZ6zS8z9JNBvTt+MBEDb8jt3ME1T25f/r8xVVb047UFbh2zj2T1ou6BtfAC0dUyP/38Och3h5hu3/NwFuPkB0LmDXEFf+Yt/EPkCMOkGQJNDputfFugYOIpBHz8AAAAASUVORK5CYII=)
    no-repeat;
  background-size: 100% auto;
}

.progress-wrapper .progress-list-item .upload-btn {
  flex: 2 1;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}

.progress-wrapper .progress-list-item .upload-btn .cancel-icon,
.progress-wrapper .progress-list-item .upload-btn .pause-icon,
.progress-wrapper .progress-list-item .upload-btn .success-icon {
  width: 0.32rem;
  height: 0.32rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
}

.progress-wrapper .progress-list-item .upload-btn .cancel-icon span:before,
.progress-wrapper .progress-list-item .upload-btn .pause-icon span:before,
.progress-wrapper .progress-list-item .upload-btn .success-icon span:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0.2rem;
  height: 0.2rem;
}

.progress-wrapper .progress-list-item .upload-btn .cancel-icon span:before {
  background: url(data:image/png;base64,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)
    no-repeat;
  background-size: 100% auto;
}

.progress-wrapper .progress-list-item .pause-icon {
  margin-right: 0.1rem;
}

.progress-wrapper
  .progress-list-item
  .upload-btn
  .pause-icon
  span.pause:before {
  background: url(data:image/png;base64,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)
    no-repeat;
  background-size: 100% auto;
}

.progress-wrapper .progress-list-item .upload-btn .pause-icon span.play:before {
  background: url(data:image/png;base64,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)
    no-repeat;
  background-size: 100% auto;
}

.progress-wrapper .progress-history {
  padding-left: 0.16rem;
  padding-bottom: 0.16rem;
  font-size: 0.12rem;
  font-family: PingFang-SC-Regular, PingFang-SC;
  font-weight: 400;
  color: #09f;
  cursor: pointer;
}

.progress-wrapper .progress-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.08rem 0.16rem;
  border-top: 0.01rem solid #edeff2;
  width: 100%;
}

.progress-wrapper .progress-total-left {
  width: 70%;
}

.progress-wrapper .progress-total-left.computed {
  width: 100%;
}

.progress-wrapper
  .progress-total-left
  .progress-total-info
  .progress-text
  .total-info-size {
  padding-right: 0.2rem;
  font-weight: 700;
}

.progress-wrapper
  .progress-total-left
  .progress-total-info
  .progress-text
  .total-info-speed {
  color: #8d9099;
  font-size: 0.12rem;
}

.progress-wrapper .progress-total-right {
  display: flex;
  align-items: center;
}

.progress-wrapper .progress-total-right .pause-btn,
.progress-wrapper .progress-total-right .cancel-btn {
  width: 0.2rem;
  height: 0.2rem;
  cursor: pointer;
}

.progress-wrapper .progress-total-right .cancel-btn {
  margin-right: 0.15rem;
  background: url(data:image/png;base64,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)
    no-repeat;
  background-size: 100% auto;
}

.progress-wrapper .progress-total-right .pause-btn.pause {
  background: url(data:image/png;base64,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)
    no-repeat;
  background-size: 100% auto;
}

.progress-wrapper .progress-total-right .pause-btn.play {
  background: url(data:image/png;base64,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)
    no-repeat;
  background-size: 100% auto;
}

.header-upload {
  display: flex;
  align-items: center;
  height: 0.4rem;
}

.header-upload.hide {
  display: none;
}

.header-upload .upload-wrapper {
  display: flex;
  transition: all 0.3s ease-in;
  cursor: pointer;
}

.header-upload .upload-wrapper .upload-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0.2rem;
  height: 0.2rem;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAoCAYAAACIC2hQAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAKqADAAQAAAABAAAAKAAAAACNEtRRAAACkklEQVRYCe2XO0gcQRjHbzdaXBLxSGEfEgLB0pAylYWVnJIcgnIEco/CLkXAJnpaCDZ2gXvYHAaS8xUQhIBVqoSYJiCCCBZ2FuEIkbO5u/w+cY5ZH7lV1p2F7MDc9+23szO/+c/jZiKRMHmrgHXd6prNpl0qlYbl+3Q6vdyunnw+P0WZydNyuWw2K8+uk+26pFaQRruLxeJ6o9FYkow/pr2+EbfjqrUC9Rg1P5Efad8+0Pwbca+kaKFQGATw2xnICKpeewq57ZUrUMAsIN9SqSjZ5bZyL8u1Ba1UKncZ7hUAcwIsjVuWtU9uu4B8A2VVP6xWq18BHFKNArhp2/YTYtsq5oe9VFEgB5h73wHqVSBAzsdisYFUKvVLxfyyF656tp839Xp9FoiTjgB4TGa7TC/6BXa2HQcogLcBWkDFEa3gAbEhIH9oMd9dByitvwcyrlF8iUajL5LJ5KEWM+I65iiLZBL1joQE+w7THwRI4XEoyvD+ZCt6CWQ3/oIUCEpygAoUgL7uj26FcAy9249MlAtBvVY9VDRU1GsFvK4vnKP/jaL8lb8iP1cdPvcXql6Yshw1O2l7nkP7uByQgN2VM0ig5mi5XO4BcpM8LkJx5LwDcE78wICiXF+tVtuC6ZmASULRD5hR8QMx9ECOoVwBnqhAkRrkiUwmM3fyxI9RUK7it7jlzgH5WgGhYhV/BMjPKibWGCi33HtAfmQe9isgILe5ZcS55e6pmLJGQAHqRcUtIO8rEGJrXMWTiUTij4rp1ggogK39EcAmQFNsQTOnvs7X8k2v+t+QxJmP0/+CFFojikrDgO2S4yi5I8/tkm+KskhaCwTADYb/qVtI6YRvigK1yH55LI2yqleBlb0yTMYU+At4gexyMhudTQAAAABJRU5ErkJggg==)
    no-repeat;
  background-size: 100% auto;
}

.header-upload .upload-wrapper .upload-icon.active {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAoCAYAAACIC2hQAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAKqADAAQAAAABAAAAKAAAAACNEtRRAAACuklEQVRYCe2YTWgTQRTHu7tJoDZS6EFIcgpKQXvMpvk4lBx66CGVFhsoqCCIp956EHqpKx4KvfTmQeithRYVSxsEoaB4yHcuhSoUIQchBw+ikoLka/1P2Rey64akJd0JdBeGN/NmZ/a3/ze7O2+HhuyjvwpIF51OURSxUqnc83q9d8rl8pdu88iyrHg8no84X/H5fALGfOo2pr1fbG/0Wg8EAqPJZPJAVdXXrASDwQe9jr3oeY7zDgyHw7fr9foeAMdpLOo3qX5Z9lyKInx3AZlth9TAhMsCpHl7AgWYgPCuwjIlr9NgK21X0Fgs5oaSb5vN5nOAnSknCEIJ5c3AgEYikVt4sjMAmicoAB46nU4Z7WPyWWE7KopQz1Sr1TxCPUEggNzw+/0z6XT6J/mssqZPPUL9FKFeA8TZjQDwL8qTfD6/VSgUrGLTXUcHivfjNQBtQsVFOgvt75IkzWez2SL5eFhj6LcNkJ9dLpfMG5IJowN1OBzP4DvVFHsJ6OlUKvVDa3M1utBDuSOsz0cgGsVa3ORKZri4DpT1AdDS96OBp2NTF/qOZw1Ahw3a7yDYitqK9luBfs9nr9Eroyg+5Y9RFuiG//uEUgcvi62mE1vLDWyIlsBwGgqFTtgeZKDWaDQavQHIQw2SaTWCrJflavptHnPwOqBcAKlPAZBTxADoHdTvs/ZAhJ79aWk0Gq8AOaxBNgG5gp3cutbmC5pIJKRSqbSO/GyZgGB/IfVZzOVyH9p8/ECRio8BchcqThMQVDxGKj6HLPcb+cjyepgmarUaW48tSAC9c7vdYTNIBstljQKw9X4EgyqKooJQv4CiKoMyO7iAEgjA/qD+EP8L9lEnt6nlBgqwE2S9c5lM5qspmcFp2RoFWOsBQf09wj/ZKyRjtgyU/Q4CYIKVeDw+WywWfxtEs5uWKvAPh2TwgJUY5asAAAAASUVORK5CYII=)
    no-repeat;
  background-size: 100% auto;
}

.header-upload .upload-wrapper .upload-icon:hover {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAoCAYAAACIC2hQAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAKqADAAQAAAABAAAAKAAAAACNEtRRAAACuklEQVRYCe2YTWgTQRTHu7tJoDZS6EFIcgpKQXvMpvk4lBx66CGVFhsoqCCIp956EHqpKx4KvfTmQeithRYVSxsEoaB4yHcuhSoUIQchBw+ikoLka/1P2Rey64akJd0JdBeGN/NmZ/a3/ze7O2+HhuyjvwpIF51OURSxUqnc83q9d8rl8pdu88iyrHg8no84X/H5fALGfOo2pr1fbG/0Wg8EAqPJZPJAVdXXrASDwQe9jr3oeY7zDgyHw7fr9foeAMdpLOo3qX5Z9lyKInx3AZlth9TAhMsCpHl7AgWYgPCuwjIlr9NgK21X0Fgs5oaSb5vN5nOAnSknCEIJ5c3AgEYikVt4sjMAmicoAB46nU4Z7WPyWWE7KopQz1Sr1TxCPUEggNzw+/0z6XT6J/mssqZPPUL9FKFeA8TZjQDwL8qTfD6/VSgUrGLTXUcHivfjNQBtQsVFOgvt75IkzWez2SL5eFhj6LcNkJ9dLpfMG5IJowN1OBzP4DvVFHsJ6OlUKvVDa3M1utBDuSOsz0cgGsVa3ORKZri4DpT1AdDS96OBp2NTF/qOZw1Ahw3a7yDYitqK9luBfs9nr9Eroyg+5Y9RFuiG//uEUgcvi62mE1vLDWyIlsBwGgqFTtgeZKDWaDQavQHIQw2SaTWCrJflavptHnPwOqBcAKlPAZBTxADoHdTvs/ZAhJ79aWk0Gq8AOaxBNgG5gp3cutbmC5pIJKRSqbSO/GyZgGB/IfVZzOVyH9p8/ECRio8BchcqThMQVDxGKj6HLPcb+cjyepgmarUaW48tSAC9c7vdYTNIBstljQKw9X4EgyqKooJQv4CiKoMyO7iAEgjA/qD+EP8L9lEnt6nlBgqwE2S9c5lM5qspmcFp2RoFWOsBQf09wj/ZKyRjtgyU/Q4CYIKVeDw+WywWfxtEs5uWKvAPh2TwgJUY5asAAAAASUVORK5CYII=)
    no-repeat;
  background-size: 100% auto;
}

.upload-history-empty {
  position: relative;
}

.upload-history-empty .history-text {
  position: absolute;
  bottom: 0.16rem;
  left: 0.16rem;
  font-size: 0.12rem;
  font-family: PingFang-SC-Regular, PingFang-SC;
  font-weight: 400;
  color: #09f;
  cursor: pointer;
}

.upload-content {
  position: relative;
  right: 0.31rem;
}

.wechat-group {
  padding-right: 0.07rem !important;
}

.wechat-group__button.ant-btn {
  width: 0.8rem;
  font-size: 0.12rem !important;
  background: linear-gradient(-45deg, #ffc000 0%, #ff8800 100%);
  border: none;
}

.wechat-group__content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wechat-group__content .wechat-group__content-code {
  width: 1.15rem;
  height: 1.15rem;
}

.wechat-group__desc {
  margin-top: 0.02rem;
  color: #495770;
  font-size: 0.12rem;
}

.recharge-prompt__modal .ant-modal-footer {
  text-align: center;
}

.recharge-prompt__modal-title {
  font-size: 0.16rem;
  font-weight: 700;
}

.recharge-prompt__modal-title .anticon {
  font-size: 0.16rem;
  color: #ff8b00;
  margin-right: 0.04rem;
}

.recharge-prompt__modal-desc {
  font-size: 0.14rem;
  margin-top: 0.1rem;
  color: #000000bf;
}

.m-header-wrap {
  margin-top: 0.44rem;
}

.header-wrap {
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  height: 0.56rem !important;
  background: #000000 !important;
  z-index: 100;
}

.header-wrap.transparent {
  background: transparent !important;
}

.header-wrap__enterprise-logo {
  width: 0.34rem;
  margin-left: 0.04rem;
}
.ant-layout {
  display: flex;
  flex: auto;
  flex-direction: column;
  min-height: 0;
  background: #f0f2f5;
}

.ant-layout,
.ant-layout * {
  box-sizing: border-box;
}

.ant-layout.ant-layout-has-sider {
  flex-direction: row;
}

.ant-layout.ant-layout-has-sider > .ant-layout,
.ant-layout.ant-layout-has-sider > .ant-layout-content {
  width: 0;
}

.ant-layout-header,
.ant-layout-footer {
  flex: 0 0 auto;
}

.ant-layout-header {
  height: 0.64rem;
  padding: 0 0.5rem;
  color: #ffffffd9;
  line-height: 0.64rem;
  background: #001529;
}

.ant-layout-footer {
  padding: 0.24rem 0.5rem;
  color: #000000d9;
  font-size: 0.14rem;
  background: #f0f2f5;
}

.ant-layout-content {
  flex: auto;
  min-height: 0;
}

.ant-layout-sider {
  position: relative;
  min-width: 0;
  background: #001529;
  transition: all 0.2s;
}

.ant-layout-sider-children {
  height: 100%;
  margin-top: -0.001rem;
  padding-top: 0.001rem;
}

.ant-layout-sider-children .ant-menu.ant-menu-inline-collapsed {
  width: auto;
}

.ant-layout-sider-has-trigger {
  padding-bottom: 0.48rem;
}

.ant-layout-sider-right {
  order: 1;
}

.ant-layout-sider-trigger {
  position: fixed;
  bottom: 0;
  z-index: 1;
  height: 0.48rem;
  color: #fff;
  line-height: 0.48rem;
  text-align: center;
  background: #002140;
  cursor: pointer;
  transition: all 0.2s;
}

.ant-layout-sider-zero-width > * {
  overflow: hidden;
}

.ant-layout-sider-zero-width-trigger {
  position: absolute;
  top: 0.64rem;
  right: -0.36rem;
  z-index: 1;
  width: 0.36rem;
  height: 0.42rem;
  color: #fff;
  font-size: 0.18rem;
  line-height: 0.42rem;
  text-align: center;
  background: #001529;
  border-radius: 0 0.02rem 0.02rem 0;
  cursor: pointer;
  transition: background 0.3s ease;
}

.ant-layout-sider-zero-width-trigger:after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: transparent;
  transition: all 0.3s;
  content: "";
}

.ant-layout-sider-zero-width-trigger:hover:after {
  background: rgba(255, 255, 255, 0.1);
}

.ant-layout-sider-zero-width-trigger-right {
  left: -0.36rem;
  border-radius: 0.02rem 0 0 0.02rem;
}

.ant-layout-sider-light {
  background: #fff;
}

.ant-layout-sider-light .ant-layout-sider-trigger,
.ant-layout-sider-light .ant-layout-sider-zero-width-trigger {
  color: #000000d9;
  background: #fff;
}

.ant-layout-rtl {
  direction: rtl;
}

.conainer_asider {
  padding: 0.08rem 0;
  background: #fefdff;
  border-right: 0.01rem solid rgba(0, 0, 0, 0.06);
}

.container-layout__wrapper {
  overflow-y: hidden;
  height: 100%;
}

.conainer_right_asider {
  padding: 0.13rem 0.16rem 0.24rem;
  border-left: 0.01rem solid rgba(0, 0, 0, 0.06);
  background: #ffffff;
}

.left-pannel__wrapper {
  background: #fefdff;
}

.left-pannel__wrapper .pannel-title-box {
  font-weight: 500;
  color: #000;
  line-height: 0.4rem;
  font-size: 0.16rem;
  padding-left: 0.4rem;
}

.left-pannel__wrapper .pannel__divider {
  margin: 0.1rem 0;
}

.left-pannel__wrapper .ant-menu {
  background: inherit;
  color: #000;
}

.left-pannel__wrapper .ant-menu .ant-menu-item {
  padding-left: 0.4rem !important;
  margin-top: 0;
  margin-bottom: 0;
}

.left-pannel__wrapper .ant-menu .ant-menu-item:hover {
  color: inherit;
  background-color: #e8f4ff59;
}

.left-pannel__wrapper .ant-menu .ant-menu-item-selected {
  background-color: #e8f4ff !important;
  color: #09f !important;
}

.right-pannel__wrapper {
  height: 100%;
  line-height: 0.28rem;
}

.right-pannel__wrapper .pannel-title-box .pannel-title {
  font-weight: 400;
  color: #000000d9;
  font-size: 0.14rem;
  padding: 0;
}

.right-pannel__wrapper .pannel__divider {
  margin: 0.1rem 0;
}

.right-pannel__wrapper .ant-menu .ant-menu-item {
  padding-left: 0.4rem !important;
}

.ease-in-out {
  transition: all 0.25s ease-in-out;
}

.login-form-item
  .ant-form-item
  .ant-row
  .ant-col
  .ant-form-item-control-input
  .ant-form-item-control-input-content
  .ant-btn {
  border: 0.01rem solid rgba(0, 0, 0, 0.3);
  border-radius: 0.04rem;
}

.ant-pro-form-login-container {
  display: flex;
  flex: 1 1;
  flex-direction: column;
  height: 100%;
  padding: 0.32rem 0;
  overflow: auto;
  background: inherit;
}

@media (min-width: 768px) {
  .ant-pro-form-login-container {
    padding: 0.32rem 0 0.24rem;
    background-repeat: no-repeat;
    background-position: center 1.1rem;
    background-size: 100%;
  }
}

.ant-pro-form-login-top {
  text-align: center;
}

.ant-pro-form-login-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 0.44rem;
  line-height: 0.44rem;
}

.ant-pro-form-login-header a {
  text-decoration: none;
}

.ant-pro-form-login-title {
  position: relative;
  top: 0.02rem;
  color: #000000d9;
  font-weight: 600;
  font-size: 0.33rem;
}

.ant-pro-form-login-logo {
  width: 0.44rem;
  height: 0.44rem;
  margin-right: 0.16rem;
  vertical-align: top;
}

.ant-pro-form-login-logo img {
  width: 100%;
}

.ant-pro-form-login-desc {
  margin-top: 0.12rem;
  margin-bottom: 0.4rem;
  color: #00000073;
  font-size: 0.14rem;
}

.ant-pro-form-login-main {
  min-width: 3.28rem;
  max-width: 5rem;
  margin: 0 auto;
}

.ant-pro-form-login-main .ant-tabs-nav-list {
  margin: 0 auto;
  font-size: 0.16rem;
}

.ant-pro-form-login-main .ant-pro-form-login-other {
  margin-top: 0.24rem;
  line-height: 0.22rem;
  text-align: left;
}

.ant-pro-form-group-title {
  margin-bottom: 0.16rem;
  font-weight: 700;
}

.ant-pro-form-group-container {
  flex-wrap: wrap;
  max-width: 100%;
}

.ant-pro-form-group-container > div.ant-space-item {
  max-width: 100%;
}

.ant-pro-form-group-twoLine {
  display: block;
  width: 100%;
}

.ant-pro-form-group-twoLine .ant-pro-form-group-title {
  width: 100%;
  margin: 0.08rem 0;
}

.ant-pro-form-group-twoLine .ant-pro-form-group-container {
  padding-left: 0.16rem;
}

.ant-pro-form-group-twoLine .ant-space-item,
.ant-pro-form-group-twoLine .ant-form-item {
  width: 100%;
}

.ant-pro-form-group-twoLine .ant-form-item-control {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.ant-pro-form-group-twoLine .ant-form-item-control-input {
  align-items: center;
  justify-content: flex-end;
}

.ant-pro-form-group-twoLine .ant-form-item-control-input-content {
  flex: none;
}

.ant-pro-core-label-tip {
  display: inline-flex;
  align-items: center;
  max-width: 100%;
}

.ant-pro-core-label-tip-icon {
  display: block;
  margin-left: 0.04rem;
  cursor: pointer;
}

.ant-pro-core-label-tip-icon:hover {
  color: #29b0ff;
}

.ant-pro-core-label-tip-title {
  display: inline-flex;
  flex: 1 1;
}

.ant-pro-core-label-tip-subtitle {
  margin-left: 0.08rem;
  color: #00000073;
  font-weight: 400;
  font-size: 0.14rem;
  white-space: nowrap;
}

.ant-pro-core-label-tip-title-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: keep-all;
}

.ant-spin {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #000000d9;
  font-size: 0.14rem;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum", "tnum";
  position: absolute;
  display: none;
  color: #1890ff;
  font-size: 0;
  text-align: center;
  vertical-align: middle;
  opacity: 0;
  transition: transform 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
}

.ant-spin-spinning {
  position: static;
  display: inline-block;
  opacity: 1;
}

.ant-spin-nested-loading {
  position: relative;
}

.ant-spin-nested-loading > div > .ant-spin {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 4;
  display: block;
  width: 100%;
  height: 100%;
  max-height: 4rem;
}

.ant-spin-nested-loading > div > .ant-spin .ant-spin-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -0.1rem;
}

.ant-spin-nested-loading > div > .ant-spin .ant-spin-text {
  position: absolute;
  top: 50%;
  width: 100%;
  padding-top: 0.05rem;
  font-size: 0.14rem;
  text-shadow: 0 0.01rem 0.02rem #fff;
}

.ant-spin-nested-loading > div > .ant-spin.ant-spin-show-text .ant-spin-dot {
  margin-top: -0.2rem;
}

.ant-spin-nested-loading > div > .ant-spin-sm .ant-spin-dot {
  margin: -0.07rem;
}

.ant-spin-nested-loading > div > .ant-spin-sm .ant-spin-text {
  padding-top: 0.02rem;
}

.ant-spin-nested-loading > div > .ant-spin-sm.ant-spin-show-text .ant-spin-dot {
  margin-top: -0.17rem;
}

.ant-spin-nested-loading > div > .ant-spin-lg .ant-spin-dot {
  margin: -0.16rem;
}

.ant-spin-nested-loading > div > .ant-spin-lg .ant-spin-text {
  padding-top: 0.11rem;
}

.ant-spin-nested-loading > div > .ant-spin-lg.ant-spin-show-text .ant-spin-dot {
  margin-top: -0.26rem;
}

.ant-spin-container {
  position: relative;
  transition: opacity 0.3s;
}

.ant-spin-container:after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: none;
  width: 100%;
  height: 100%;
  background: #fff;
  opacity: 0;
  transition: all 0.3s;
  content: "";
  pointer-events: none;
}

.ant-spin-blur {
  clear: both;
  opacity: 0.5;
  user-select: none;
  pointer-events: none;
}

.ant-spin-blur:after {
  opacity: 0.4;
  pointer-events: auto;
}

.ant-spin-tip {
  color: #00000073;
}

.ant-spin-dot {
  position: relative;
  display: inline-block;
  font-size: 0.2rem;
  width: 1em;
  height: 1em;
}

.ant-spin-dot-item {
  position: absolute;
  display: block;
  width: 0.09rem;
  height: 0.09rem;
  background-color: #1890ff;
  border-radius: 100%;
  transform: scale(0.75);
  transform-origin: 50% 50%;
  opacity: 0.3;
  animation: antSpinMove 1s infinite linear alternate;
}

.ant-spin-dot-item:nth-child(1) {
  top: 0;
  left: 0;
}

.ant-spin-dot-item:nth-child(2) {
  top: 0;
  right: 0;
  animation-delay: 0.4s;
}

.ant-spin-dot-item:nth-child(3) {
  right: 0;
  bottom: 0;
  animation-delay: 0.8s;
}

.ant-spin-dot-item:nth-child(4) {
  bottom: 0;
  left: 0;
  animation-delay: 1.2s;
}

.ant-spin-dot-spin {
  transform: rotate(0);
  animation: antRotate 1.2s infinite linear;
}

.ant-spin-sm .ant-spin-dot {
  font-size: 0.14rem;
}

.ant-spin-sm .ant-spin-dot i {
  width: 0.06rem;
  height: 0.06rem;
}

.ant-spin-lg .ant-spin-dot {
  font-size: 0.32rem;
}

.ant-spin-lg .ant-spin-dot i {
  width: 0.14rem;
  height: 0.14rem;
}

.ant-spin.ant-spin-show-text .ant-spin-text {
  display: block;
}

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .ant-spin-blur {
    background: #fff;
    opacity: 0.5;
  }
}

@keyframes antSpinMove {
  to {
    opacity: 1;
  }
}

@keyframes antRotate {
  to {
    transform: rotate(360deg);
  }
}

.ant-spin-rtl {
  direction: rtl;
}

.ant-spin-rtl .ant-spin-dot-spin {
  transform: rotate(-45deg);
  animation-name: antRotateRtl;
}

@keyframes antRotateRtl {
  to {
    transform: rotate(-405deg);
  }
}

.scanning-login {
  margin-top: 0.34rem;
  margin-bottom: 0.24rem;
}

.scanning-login__qr-code {
  position: relative;
  width: 1.87rem;
  height: 1.87rem;
  margin: auto;
  color: #fff;
  box-sizing: border-box;
}

.scanning-login__qr-code img {
  width: 1.87rem;
  height: 1.87rem;
}

.scanning-login__qr-code-logo {
  position: absolute;
  width: 0.4rem;
  height: 0.4rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: #fff;
}

.scanning-login__qr-code-logo svg {
  font-size: 0.24rem;
  margin: 0.08rem;
}

.scanning-login__qr-code-refresh {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.75);
  text-align: center;
  border-radius: 0.05rem;
  cursor: pointer;
}

.scanning-login__qr-code-refresh svg {
  font-size: 0.4rem;
  margin-bottom: 0.24rem;
  margin-top: 0.7rem;
}

.scanning-login-desc {
  height: 0.17rem;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  font-size: 0.16rem;
  color: #000000a6;
  text-align: center;
  margin-top: 0.12rem;
}

.scanning-login .form-login-text {
  position: relative;
  width: 100%;
}

.scanning-login .form-login-text-tip {
  width: 48%;
  line-height: 0.22rem;
  color: #ff8b00;
  margin: 0 auto;
  text-align: center;
  position: relative;
}

.scanning-login .form-login-text-tip:before,
.scanning-login .form-login-text-tip:after {
  content: "";
  position: absolute;
  top: 50%;
  width: 0.2rem;
  height: 0.01rem;
  background: #ff8b00;
}

.scanning-login .form-login-text-tip:before {
  left: 0;
}

.scanning-login .form-login-text-tip:after {
  right: 0;
}

.login-form-item
  .ant-form-item
  .ant-row
  .ant-col
  .ant-form-item-control-input
  .ant-form-item-control-input-content
  .ant-btn {
  border: 0.01rem solid rgba(0, 0, 0, 0.3);
}

.login-modal {
  width: 5.2rem;
  padding: 0;
}

.login-modal .ant-modal-content,
.login-modal .ant-modal-content .ant-modal-body {
  padding: 0;
}

.login-modal__box {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 5.2rem;
}

.login-modal__box--header {
  border-radius: 0.08rem 0.08rem 0 0;
  height: 1.79rem;
  width: 100%;
  background-size: 100% 100%;
}

.login-modal__box .agreement-wrapper {
  font-size: 0.12rem;
  color: #999;
}

.login-modal__box .agreement-wrapper.agreement {
  animation: ThirdParty_rock 0.5s 1;
}

.login-modal__box .agreement-wrapper span {
  color: #09f;
}

.login-modal__footer {
  width: 100%;
}

.login-modal__footer--tip {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.login-modal__footer--tip:before {
  content: "";
  display: inline-block;
  border-top: 0.01rem solid rgba(0, 24, 46, 0.25);
  flex: 1 1 auto;
  opacity: 0.66;
}

.login-modal__footer--tip:after {
  content: "";
  display: inline-block;
  border-top: 0.01rem solid rgba(0, 24, 46, 0.25);
  flex: 1 1 auto;
  opacity: 0.66;
}

.login-modal__footer--tip-desc {
  font-size: 0.12rem;
  font-weight: 400;
  color: #00182e8c;
  line-height: 0.17rem;
  letter-spacing: 0.01rem;
  padding: 0 0.14rem;
}

.login-modal__footer .login-modal__footer--control {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0.53rem 0.32rem;
}

.login-modal__footer
  .login-modal__footer--control
  .login-modal__footer--control-btn {
  width: 100%;
  width: 2.56rem;
  height: 0.4rem;
  border-radius: 0.04rem;
  border: 0.01rem solid #fff;
  background: #0000000a !important;
  font-size: 0.16rem;
  color: #00172f;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-modal__footer
  .login-modal__footer--control
  .login-modal__footer--control-btn:hover {
  border: 0.01rem solid #0099ff;
}

.login-modal__footer
  .login-modal__footer--control
  .login-modal__footer--control-btn-icon {
  display: inline-block;
  font-size: 0.2rem;
  color: #09f;
  vertical-align: text-bottom;
}

.login-modal__footer
  .login-modal__footer--control
  .login-modal__footer--control-btn
  .login-modal__footer--control-btn-text {
  display: inline-block;
  margin-left: 0.12rem;
  font-size: 0.16rem;
}

.login-modal .form-login-text {
  position: relative;
  width: 100%;
}

.login-modal .form-login-text-tip {
  width: 48%;
  line-height: 0.22rem;
  color: #ff8b00;
  margin: 0 auto;
  text-align: center;
  position: relative;
}

.login-modal .form-login-text-tip:before,
.login-modal .form-login-text-tip:after {
  content: "";
  position: absolute;
  top: 50%;
  width: 0.2rem;
  height: 0.01rem;
  background: #ff8b00;
}

.login-modal .form-login-text-tip:before {
  left: 0;
}

.login-modal .form-login-text-tip:after {
  right: 0;
}

@media screen and (max-width: 576px) {
  .login-modal__box {
    width: 100%;
  }

  .login-modal__box--header {
    height: 1.5rem;
  }

  .login-modal__box .ant-pro-form-login-container {
    padding-inline: 0.24rem;
  }

  .login-modal__box .ant-pro-form-login-main {
    width: 100% !important;
    min-width: auto;
  }

  .scanning-login .form-login-text-tip {
    width: 70%;
  }
}

@keyframes ThirdParty_rock {
  0% {
    transform: scale(0.5) translate(-0.2rem);
  }

  20% {
    transform: scale(0.5) translate(0.2rem);
  }

  40% {
    transform: scale(0.5) translate(-0.2rem);
  }

  60% {
    transform: scale(0.5) translate(0.2rem);
  }

  80% {
    transform: scale(0.5) translate(-0.2rem);
  }

  to {
    transform: scale(0.5) translate(0);
  }
}

.login-form-item
  .ant-form-item
  .ant-row
  .ant-col
  .ant-form-item-control-input
  .ant-form-item-control-input-content
  .ant-input-affix-wrapper {
  border: 0.01rem solid rgba(0, 0, 0, 0.3);
  border-radius: 0.04rem;
}

.login-form-item
  .ant-form-item
  .ant-row
  .ant-col
  .ant-form-item-control-input
  .ant-form-item-control-input-content
  .ant-input-affix-wrapper.ant-input-affix-wrapper-status-error {
  border-color: #ff4d4f;
}

.login-form-item
  .ant-form-item
  .ant-row
  .ant-col
  .ant-form-item-control-input
  .ant-form-item-control-input-content
  input#captcha {
  border: 0.01rem solid rgba(0, 0, 0, 0.3);
  border-radius: 0.04rem;
}

.login-form-item
  .ant-form-item
  .ant-row
  .ant-col
  .ant-form-item-control-input
  .ant-form-item-control-input-content
  input#captcha.ant-input-status-error {
  border-color: #ff4d4f;
}

.login-form-item
  .ant-form-item
  .ant-row
  .ant-col
  .ant-form-item-control-input
  .ant-form-item-control-input-content
  .ant-input-affix-wrapper:not(.ant-input-affix-wrapper-status-error):hover {
  border-color: #29b0ff;
  border-right-width: 0.01rem;
}

.login-form-item
  .ant-form-item
  .ant-row
  .ant-col
  .ant-form-item-control-input
  .ant-form-item-control-input-content
  .ant-btn {
  border-radius: 0.04rem;
  border: 0.01rem solid rgba(0, 0, 0, 0.3);
}

.login-form-item
  .ant-form-item
  .ant-row
  .ant-col
  .ant-form-item-control-input
  .ant-form-item-control-input-content
  .ant-btn:focus,
.login-form-item
  .ant-form-item
  .ant-row
  .ant-col
  .ant-form-item-control-input
  .ant-form-item-control-input-content
  .ant-btn:hover {
  border-color: #29b0ff;
}

.login-form-item-checkbox .ant-checkbox-wrapper .ant-checkbox-inner {
  border: 0.01rem solid rgba(0, 0, 0, 0.3);
  border-radius: 0.04rem;
}

.login-form-item-checkbox .ant-checkbox-wrapper:hover .ant-checkbox-inner {
  border-color: #29b0ff;
}

@keyframes antCheckboxEffect {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }

  to {
    transform: scale(1.6);
    opacity: 0;
  }
}

@keyframes ant-tree-node-fx-do-not-use {
  0% {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.ant-tree.ant-tree-directory .ant-tree-treenode {
  position: relative;
}

.ant-tree.ant-tree-directory .ant-tree-treenode:before {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0.04rem;
  left: 0;
  transition: background-color 0.3s;
  content: "";
  pointer-events: none;
}

.ant-tree.ant-tree-directory .ant-tree-treenode:hover:before {
  background: #f5f5f5;
}

.ant-tree.ant-tree-directory .ant-tree-treenode > * {
  z-index: 1;
}

.ant-tree.ant-tree-directory .ant-tree-treenode .ant-tree-switcher {
  transition: color 0.3s;
}

.ant-tree.ant-tree-directory .ant-tree-treenode .ant-tree-node-content-wrapper {
  border-radius: 0;
  user-select: none;
}

.ant-tree.ant-tree-directory
  .ant-tree-treenode
  .ant-tree-node-content-wrapper:hover {
  background: transparent;
}

.ant-tree.ant-tree-directory
  .ant-tree-treenode
  .ant-tree-node-content-wrapper.ant-tree-node-selected {
  color: #fff;
  background: transparent;
}

.ant-tree.ant-tree-directory .ant-tree-treenode-selected:hover:before,
.ant-tree.ant-tree-directory .ant-tree-treenode-selected:before {
  background: #1890ff;
}

.ant-tree.ant-tree-directory .ant-tree-treenode-selected .ant-tree-switcher {
  color: #fff;
}

.ant-tree.ant-tree-directory
  .ant-tree-treenode-selected
  .ant-tree-node-content-wrapper {
  color: #fff;
  background: transparent;
}

.ant-tree-checkbox {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #000000d9;
  font-size: 0.14rem;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum", "tnum";
  position: relative;
  top: 0.2em;
  line-height: 1;
  white-space: nowrap;
  outline: none;
  cursor: pointer;
}

.ant-tree-checkbox-wrapper:hover .ant-tree-checkbox-inner,
.ant-tree-checkbox:hover .ant-tree-checkbox-inner,
.ant-tree-checkbox-input:focus + .ant-tree-checkbox-inner {
  border-color: #1890ff;
}

.ant-tree-checkbox-checked:after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0.01rem solid #1890ff;
  border-radius: 0.02rem;
  visibility: hidden;
  animation: antCheckboxEffect 0.36s ease-in-out;
  animation-fill-mode: backwards;
  content: "";
}

.ant-tree-checkbox:hover:after,
.ant-tree-checkbox-wrapper:hover .ant-tree-checkbox:after {
  visibility: visible;
}

.ant-tree-checkbox-inner {
  position: relative;
  top: 0;
  left: 0;
  display: block;
  width: 0.16rem;
  height: 0.16rem;
  direction: ltr;
  background-color: #fff;
  border: 0.01rem solid #d9d9d9;
  border-radius: 0.02rem;
  border-collapse: separate;
  transition: all 0.3s;
}

.ant-tree-checkbox-inner:after {
  position: absolute;
  top: 50%;
  left: 21.5%;
  display: table;
  width: 0.05714rem;
  height: 0.09143rem;
  border: 0.02rem solid #fff;
  border-top: 0;
  border-left: 0;
  transform: rotate(45deg) scale(0) translate(-50%, -50%);
  opacity: 0;
  transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
  content: " ";
}

.ant-tree-checkbox-input {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
}

.ant-tree-checkbox-checked .ant-tree-checkbox-inner:after {
  position: absolute;
  display: table;
  border: 0.02rem solid #fff;
  border-top: 0;
  border-left: 0;
  transform: rotate(45deg) scale(1) translate(-50%, -50%);
  opacity: 1;
  transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
  content: " ";
}

.ant-tree-checkbox-checked .ant-tree-checkbox-inner {
  background-color: #1890ff;
  border-color: #1890ff;
}

.ant-tree-checkbox-disabled {
  cursor: not-allowed;
}

.ant-tree-checkbox-disabled.ant-tree-checkbox-checked
  .ant-tree-checkbox-inner:after {
  border-color: #00000040;
  animation-name: none;
}

.ant-tree-checkbox-disabled .ant-tree-checkbox-input {
  cursor: not-allowed;
  pointer-events: none;
}

.ant-tree-checkbox-disabled .ant-tree-checkbox-inner {
  background-color: #f5f5f5;
  border-color: #d9d9d9 !important;
}

.ant-tree-checkbox-disabled .ant-tree-checkbox-inner:after {
  border-color: #f5f5f5;
  border-collapse: separate;
  animation-name: none;
}

.ant-tree-checkbox-disabled + span {
  color: #00000040;
  cursor: not-allowed;
}

.ant-tree-checkbox-disabled:hover:after,
.ant-tree-checkbox-wrapper:hover .ant-tree-checkbox-disabled:after {
  visibility: hidden;
}

.ant-tree-checkbox-wrapper {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #000000d9;
  font-size: 0.14rem;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum", "tnum";
  display: inline-flex;
  align-items: baseline;
  line-height: unset;
  cursor: pointer;
}

.ant-tree-checkbox-wrapper:after {
  display: inline-block;
  width: 0;
  overflow: hidden;
  content: "\a0";
}

.ant-tree-checkbox-wrapper.ant-tree-checkbox-wrapper-disabled {
  cursor: not-allowed;
}

.ant-tree-checkbox-wrapper + .ant-tree-checkbox-wrapper {
  margin-left: 0.08rem;
}

.ant-tree-checkbox-wrapper.ant-tree-checkbox-wrapper-in-form-item
  input[type="checkbox"] {
  width: 0.14rem;
  height: 0.14rem;
}

.ant-tree-checkbox + span {
  padding-right: 0.08rem;
  padding-left: 0.08rem;
}

.ant-tree-checkbox-group {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #000000d9;
  font-size: 0.14rem;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum", "tnum";
  display: inline-block;
}

.ant-tree-checkbox-group-item {
  margin-right: 0.08rem;
}

.ant-tree-checkbox-group-item:last-child {
  margin-right: 0;
}

.ant-tree-checkbox-group-item + .ant-tree-checkbox-group-item {
  margin-left: 0;
}

.ant-tree-checkbox-indeterminate .ant-tree-checkbox-inner {
  background-color: #fff;
  border-color: #d9d9d9;
}

.ant-tree-checkbox-indeterminate .ant-tree-checkbox-inner:after {
  top: 50%;
  left: 50%;
  width: 0.08rem;
  height: 0.08rem;
  background-color: #1890ff;
  border: 0;
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
  content: " ";
}

.ant-tree-checkbox-indeterminate.ant-tree-checkbox-disabled
  .ant-tree-checkbox-inner:after {
  background-color: #00000040;
  border-color: #00000040;
}

.ant-tree {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #000000d9;
  font-size: 0.14rem;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum", "tnum";
  background: #fff;
  border-radius: 0.02rem;
  transition: background-color 0.3s;
}

.ant-tree-focused:not(:hover):not(.ant-tree-active-focused) {
  background: #e6f7ff;
}

.ant-tree-list-holder-inner {
  align-items: flex-start;
}

.ant-tree.ant-tree-block-node .ant-tree-list-holder-inner {
  align-items: stretch;
}

.ant-tree.ant-tree-block-node
  .ant-tree-list-holder-inner
  .ant-tree-node-content-wrapper {
  flex: auto;
}

.ant-tree.ant-tree-block-node
  .ant-tree-list-holder-inner
  .ant-tree-treenode.dragging {
  position: relative;
}

.ant-tree.ant-tree-block-node
  .ant-tree-list-holder-inner
  .ant-tree-treenode.dragging:after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0.04rem;
  left: 0;
  border: 0.01rem solid #1890ff;
  opacity: 0;
  animation: ant-tree-node-fx-do-not-use 0.3s;
  animation-play-state: running;
  animation-fill-mode: forwards;
  content: "";
  pointer-events: none;
}

.ant-tree .ant-tree-treenode {
  display: flex;
  align-items: flex-start;
  padding: 0 0 0.04rem;
  outline: none;
}

.ant-tree .ant-tree-treenode-disabled .ant-tree-node-content-wrapper {
  color: #00000040;
  cursor: not-allowed;
}

.ant-tree .ant-tree-treenode-disabled .ant-tree-node-content-wrapper:hover {
  background: transparent;
}

.ant-tree .ant-tree-treenode-active .ant-tree-node-content-wrapper {
  background: #f5f5f5;
}

.ant-tree
  .ant-tree-treenode:not(.ant-tree .ant-tree-treenode-disabled).filter-node
  .ant-tree-title {
  color: inherit;
  font-weight: 500;
}

.ant-tree .ant-tree-treenode-draggable .ant-tree-draggable-icon {
  width: 0.24rem;
  line-height: 0.24rem;
  text-align: center;
  visibility: visible;
  opacity: 0.2;
  transition: opacity 0.3s;
}

.ant-tree-treenode:hover
  .ant-tree
  .ant-tree-treenode-draggable
  .ant-tree-draggable-icon {
  opacity: 0.45;
}

.ant-tree
  .ant-tree-treenode-draggable.ant-tree-treenode-disabled
  .ant-tree-draggable-icon {
  visibility: hidden;
}

.ant-tree-indent {
  align-self: stretch;
  white-space: nowrap;
  user-select: none;
}

.ant-tree-indent-unit {
  display: inline-block;
  width: 0.24rem;
}

.ant-tree-draggable-icon {
  visibility: hidden;
}

.ant-tree-switcher {
  position: relative;
  flex: none;
  align-self: stretch;
  width: 0.24rem;
  margin: 0;
  line-height: 0.24rem;
  text-align: center;
  cursor: pointer;
  user-select: none;
}

.ant-tree-switcher .ant-tree-switcher-icon,
.ant-tree-switcher .ant-select-tree-switcher-icon {
  display: inline-block;
  font-size: 0.1rem;
  vertical-align: baseline;
}

.ant-tree-switcher .ant-tree-switcher-icon svg,
.ant-tree-switcher .ant-select-tree-switcher-icon svg {
  transition: transform 0.3s;
}

.ant-tree-switcher-noop {
  cursor: default;
}

.ant-tree-switcher_close .ant-tree-switcher-icon svg {
  transform: rotate(-90deg);
}

.ant-tree-switcher-loading-icon {
  color: #1890ff;
}

.ant-tree-switcher-leaf-line {
  position: relative;
  z-index: 1;
  display: inline-block;
  width: 100%;
  height: 100%;
}

.ant-tree-switcher-leaf-line:before {
  position: absolute;
  top: 0;
  right: 0.12rem;
  bottom: -0.04rem;
  margin-left: -0.01rem;
  border-right: 0.01rem solid #d9d9d9;
  content: " ";
}

.ant-tree-switcher-leaf-line:after {
  position: absolute;
  width: 0.1rem;
  height: 0.14rem;
  border-bottom: 0.01rem solid #d9d9d9;
  content: " ";
}

.ant-tree-checkbox {
  top: initial;
  margin: 0.04rem 0.08rem 0 0;
}

.ant-tree .ant-tree-node-content-wrapper {
  position: relative;
  z-index: auto;
  min-height: 0.24rem;
  margin: 0;
  padding: 0 0.04rem;
  color: inherit;
  line-height: 0.24rem;
  background: transparent;
  border-radius: 0.02rem;
  cursor: pointer;
  transition: all 0.3s, border 0s, line-height 0s, box-shadow 0s;
}

.ant-tree .ant-tree-node-content-wrapper:hover {
  background-color: #f5f5f5;
}

.ant-tree .ant-tree-node-content-wrapper.ant-tree-node-selected {
  background-color: #bae7ff;
}

.ant-tree .ant-tree-node-content-wrapper .ant-tree-iconEle {
  display: inline-block;
  width: 0.24rem;
  height: 0.24rem;
  line-height: 0.24rem;
  text-align: center;
  vertical-align: top;
}

.ant-tree .ant-tree-node-content-wrapper .ant-tree-iconEle:empty {
  display: none;
}

.ant-tree-unselectable .ant-tree-node-content-wrapper:hover {
  background-color: transparent;
}

.ant-tree-node-content-wrapper {
  line-height: 0.24rem;
  user-select: none;
}

.ant-tree-node-content-wrapper .ant-tree-drop-indicator {
  position: absolute;
  z-index: 1;
  height: 0.02rem;
  background-color: #1890ff;
  border-radius: 0.01rem;
  pointer-events: none;
}

.ant-tree-node-content-wrapper .ant-tree-drop-indicator:after {
  position: absolute;
  top: -0.03rem;
  left: -0.06rem;
  width: 0.08rem;
  height: 0.08rem;
  background-color: transparent;
  border: 0.02rem solid #1890ff;
  border-radius: 50%;
  content: "";
}

.ant-tree .ant-tree-treenode.drop-container > [draggable] {
  box-shadow: 0 0 0 0.02rem #1890ff;
}

.ant-tree-show-line .ant-tree-indent-unit {
  position: relative;
  height: 100%;
}

.ant-tree-show-line .ant-tree-indent-unit:before {
  position: absolute;
  top: 0;
  right: 0.12rem;
  bottom: -0.04rem;
  border-right: 0.01rem solid #d9d9d9;
  content: "";
}

.ant-tree-show-line .ant-tree-indent-unit-end:before {
  display: none;
}

.ant-tree-show-line .ant-tree-switcher {
  background: #fff;
}

.ant-tree-show-line .ant-tree-switcher-line-icon {
  vertical-align: -0.15em;
}

.ant-tree .ant-tree-treenode-leaf-last .ant-tree-switcher-leaf-line:before {
  top: auto !important;
  bottom: auto !important;
  height: 0.14rem !important;
}

.ant-tree-rtl {
  direction: rtl;
}

.ant-tree-rtl
  .ant-tree-node-content-wrapper[draggable="true"]
  .ant-tree-drop-indicator:after {
  right: -0.06rem;
  left: unset;
}

.ant-tree .ant-tree-treenode-rtl {
  direction: rtl;
}

.ant-tree-rtl .ant-tree-switcher_close .ant-tree-switcher-icon svg {
  transform: rotate(90deg);
}

.ant-tree-rtl.ant-tree-show-line .ant-tree-indent-unit:before {
  right: auto;
  left: -0.13rem;
  border-right: none;
  border-left: 0.01rem solid #d9d9d9;
}

.ant-tree-rtl .ant-tree-checkbox,
.ant-tree-select-dropdown-rtl .ant-select-tree-checkbox {
  margin: 0.04rem 0 0 0.08rem;
}

.tree-menu__node {
  display: flex;
  justify-content: space-between;
}

.tree-menu__node.root.font-bold {
  font-weight: 600;
}

.tree-menu__node.root .suffix-icon {
  display: block;
}

.tree-menu__node .menu-title {
  width: 1rem;
}

.tree-menu__node .menu-title-icon {
  margin-left: 0.08rem;
  font-size: 0.24rem;
}

.tree-menu__node .menu-title-is-hot {
  display: flex;
  align-items: center;
}

.tree-menu__node .suffix-icon {
  display: none;
}

.tree-menu__node .suffix-icon .anticon {
  color: #000000d9;
}

.tree-menu__node .suffix-icon:hover .anticon {
  color: #000000a6;
}

.tree-menu__container {
  height: calc(100vh - 1.25rem);
  overflow: auto;
}

.tree-menu__wrapper .ant-tree-list {
  overflow-y: auto;
}

.tree-menu__wrapper .ant-tree-list .ant-tree-treenode {
  width: 100%;
  display: flex;
  align-items: center;
  line-height: 0.22rem;
  padding: 0.08rem 0.16rem;
}

.tree-menu__wrapper
  .ant-tree-list
  .ant-tree-treenode
  .ant-tree-indent
  span:first-child {
  display: none;
}

.tree-menu__wrapper .ant-tree-list .ant-tree-treenode .ant-tree-indent-unit {
  width: 0.06rem;
}

.tree-menu__wrapper .ant-tree-list .ant-tree-treenode .ant-tree-switcher {
  display: flex;
  align-items: center;
}

.tree-menu__wrapper .ant-tree-list .ant-tree-treenode .ant-tree-switcher-icon {
  font-size: 0.14rem;
  color: #00000073;
}

.tree-menu__wrapper
  .ant-tree-list
  .ant-tree-treenode
  .ant-tree-switcher-icon
  svg {
  transform: rotate(0);
}

.tree-menu__wrapper
  .ant-tree-list
  .ant-tree-treenode
  .ant-tree-node-content-wrapper {
  flex: 1 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.tree-menu__wrapper
  .ant-tree-list
  .ant-tree-treenode
  .ant-tree-node-content-wrapper
  .ant-tree-title {
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: 0.14rem;
  color: #000000a6;
}

.tree-menu__wrapper
  .ant-tree-list
  .ant-tree-treenode
  .ant-tree-node-content-wrapper:hover,
.tree-menu__wrapper
  .ant-tree-list
  .ant-tree-treenode
  .ant-tree-node-content-wrapper.ant-tree-node-selected {
  background-color: transparent;
}

.tree-menu__wrapper
  .ant-tree-list
  .ant-tree-treenode:not(
    .tree-menu__wrapper .ant-tree-list .ant-tree-treenode-selected
  ):hover {
  background-color: #d9f0ff80;
}

.tree-menu__wrapper
  .ant-tree-list
  .ant-tree-treenode:not(
    .tree-menu__wrapper .ant-tree-list .ant-tree-treenode-selected
  ):hover
  .suffix-icon {
  display: block;
}

.tree-menu__wrapper .ant-tree-list .ant-tree-treenode-selected {
  border-right: 0.02rem solid #0099ff;
  background-color: #d9f0ff;
}

.tree-menu__wrapper
  .ant-tree-list
  .ant-tree-treenode-selected
  .ant-tree-switcher-icon,
.tree-menu__wrapper .ant-tree-list .ant-tree-treenode-selected .ant-tree-title {
  color: #09f !important;
}

.tree-menu__wrapper
  .ant-tree-list
  .ant-tree-treenode-selected:hover
  .suffix-icon {
  display: block;
}

.menu-main-title__container {
  padding: 0.08rem 0 0.08rem 0.44rem;
}

.menu-main-title__container.cursor {
  cursor: pointer;
}

.menu-main-title__container span {
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  font-size: 0.16rem;
  color: #00000073;
}

.left-pannel__wrapper {
  position: relative;
}

.ai-creation__left-pannel .tree-menu__node .menu-title {
  width: 100%;
}
</style>
