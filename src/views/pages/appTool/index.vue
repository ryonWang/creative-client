<template>
  <div class="home">
    <div class="content">
      <HomeComponentsChat v-if="tabsSelect === '1'"></HomeComponentsChat>
    </div>
    <div class="right-bottom-help">
      <el-popover placement="left" trigger="click">
        <el-image src="http://chat.static.hootin19.fun/image/MatrixAI%E4%BA%A4%E6%B5%81%E7%BE%A4%E8%81%8A%E4%BA%8C%E7%BB%B4%E7%A0%81.png"></el-image>        <div slot="reference">
          <el-tooltip content="QQ交流群" placement="left">
            <span class="iconfont icon-kefu pointer click-box"></span>
          </el-tooltip>
        </div>
      </el-popover>
      <el-tooltip content="常见问题/帮助" placement="left">
        <span class="iconfont icon-guanyu pointer click-box" @click="goHelp"></span>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
  import Cache from "@/utils/cache";
  import HomeComponentsChat from "@/views/pages/home/components/HomeComponentsChat";

  export default {
    name: "HomeIndex",
    components: {HomeComponentsChat},
    data() {
      return {
        tabsSelect: undefined,
        tipsStatus: true,
        tabItem: [
          {value: '1', label: "电商创意", route: ''},
          {value: '2', label: "小红书", route: '/gallery'},
          {value: '3', label: "社交电商", route: '/sessionDomain'},
          {value: '4', label: "剧本创意", route: ''},
          {value: '5', label: "脚本生成", route: ''},
          {value: '6', label: "智能改稿", route: ''},
         
        ]
      }
    },
    created() {
      this.tabsSelect = '1'
    },
    mounted() {
      const inviteCode = this.$route.query.inviteCode;
      if (inviteCode != null && inviteCode !== ''){
        Cache.local.set('inviteCode',inviteCode)
      }
    },
    methods: {
      handleTabsChange(val){
        this.tabsSelect = val;
      },
      goHelp(){
        this.$router.push("/other/help")
      }
    }
  }
</script>

<style scoped lang="scss">
  .home{
    width: 100%;
    height: 100%;
    display: flex;
    justify-items: flex-start;
    flex-direction: column;
  }
  .top-tabs {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content{
    flex: 1;
    width: 100%;
    height: 100%;
  }

  .right-bottom-help{
    position: absolute;
    right: 2%;
    bottom: 2%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .right-bottom-help span{
    margin: 10px 0;
  }
  ::v-deep .right-bottom-help .iconfont{
    font-size: 38px;
  }
</style>
