<template>
  <div class="logo">
    <el-image style="width: 60%" :lazy="true" :src="require('/src/assets/imgs/logo/logo1.png')"  @click="goHome"/>
  </div>
</template>

<script>
  export default {
    name: "LogoIndex",
    methods:{
      goHome(){
        this.$router.push("/home")
      },
    }
  }
</script>

<style scoped>
.logo{
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-bottom: 1px var(--col-border-color) solid;
  margin-bottom: 10px;
}
  span{
    color: white;
  }
</style>
