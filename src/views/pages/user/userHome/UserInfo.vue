<template>
    <div class="main" v-if="isLogin">
    <div class="col-right">
      <div class="col-header">
        <div class="description" >
          <h4>个人中心</h4>
        </div>
      </div>
      <user-info-right></user-info-right>
    </div>
  </div>
 
</template>

<script>
  import UserInfoLeft from "@/views/pages/user/userHome/components/UserInfoLeft";
  import {getToken} from "@/utils/auth";
  import UserInfoRight from "@/views/pages/user/userHome/components/UserInfoRight";
  import Menu from "@/components/layout/nav/userMenu.vue";
  export default {
    name: "UserInfo",
    components: {UserInfoRight, UserInfoLeft,Menu},
    data(){
      return{
        isLogin: !!getToken(),
      }
    },
    methods:{
      logout(){
        this.$store.dispatch('LogOut')
      }
    }
  }
</script>

<style scoped lang="scss">
  .nav {
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
  }
.main{
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  overflow: auto;
  background: var(--help-background);
}

  .col-left{
    width: 24%;
    height: 100%;
    border-right: 1px solid var(--col-border-color);
    overflow: auto;
  }
.col-right{
  width: 100%;
  height: 100%;
  overflow: auto;
}
.col-item-center{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
  .col-header{
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
    h1{
      color: var(--font-color-default);
      font-weight: 200;
      font-size: 26px;
    }
    .description{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      h4{
        width: 100%;
        margin-left: 30px;
        padding-bottom: 15px;
        padding-left: 30px;
        border-bottom: 1px var(--col-border-color) solid;
        /*font-weight: 100;*/
        color: var(--font-color-default);
        font-size: 14px;
      }
    }
  }
</style>
