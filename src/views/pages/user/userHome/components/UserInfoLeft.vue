<template>
  <div class="nav">
    <Menu></Menu>
  </div>
</template>

<script>
  import Menu from "@/components/layout/nav/userMenu.vue";

  export default {
    name: 'navIndex',
    components: { Menu },
    data() {
      return{

      }
    },
  };
</script>

<style lang="scss" scoped>

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
  .nav > *:first-child {
    margin-left: auto;
    margin-right: auto;
  }

</style>
