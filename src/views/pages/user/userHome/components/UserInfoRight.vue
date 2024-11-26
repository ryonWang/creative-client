<template>
  <div class="userInfoRight">
    <div style="margin: 0px 15px 15px 0">
      <a-tabs :value="tabsValue" :width="'35%'" :tab-item="tabsConfig" theme="simple" @change="tabsChange"></a-tabs>
    </div>
    <div class="right-content">
      <transition-group name="fade-list">
        <components-user-base-info :key="tabsValue"></components-user-base-info>
      </transition-group>
    </div>
  </div>
</template>

<script>
  import ComponentsUserBaseInfo from "@/views/pages/user/userHome/components/ComponentsUserBaseInfo";
  import ComponentsUserPass from "@/views/pages/user/userHome/components/ComponentsUserPass";
  import { RouterLink } from "vue-router";

  export default {
    name: "UserInfoRight",
    components: {ComponentsUserBaseInfo,ComponentsUserPass,RouterLink},
    data(){
      return{
        tabsValue: undefined,
        tabsConfig: [
          { value: 'ComponentsUserBaseInfo', label: '基础信息'},
          { value: 'ComponentsUserPass', label: '修改密码'},
        ]
      }
    },
    created() {
      this.tabsChange(this.tabsConfig[0].value)
    },
    methods:{
      tabsChange(val){
        this.tabsValue = val;
      }
    }
  }
</script>


