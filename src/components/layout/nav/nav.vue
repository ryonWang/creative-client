<template>
    <aside class="ant-layout-sider ant-layout-sider-light conainer_asider conainer_left_asider ease-in-out" style="width: 13%;" v-if="this.$route.path.includes('home')">
      <HomeMenu></HomeMenu>
    </aside>
    <aside class="ant-layout-sider ant-layout-sider-light conainer_asider conainer_left_asider ease-in-out" style="width: 13%;" v-else-if="this.$route.path.includes('userHome')">
      <Logo></Logo>
      <UserMenu></UserMenu>
    </aside>
    <aside class="ant-layout-sider ant-layout-sider-light conainer_asider conainer_left_asider ease-in-out" style="width: 13%;" v-else-if="this.$route.path.includes('appTool')">
      <LeftMenu></LeftMenu>
    </aside>
    <aside class="ant-layout-sider ant-layout-sider-light conainer_asider conainer_left_asider ease-in-out" style="width: 13%;" v-else-if="this.$route.path.includes('aiDraw')">
      <DrawMenu></DrawMenu>
    </aside>
    <aside class="ant-layout-sider ant-layout-sider-light conainer_asider conainer_left_asider ease-in-out" style="width: 3%;" v-else-if="this.$route.path.includes('workbench')">
      <workbenchMenu></workbenchMenu>
    </aside>
    <aside class="ant-layout-sider ant-layout-sider-light conainer_asider conainer_left_asider ease-in-out" style="width: 13%;" v-else-if="this.$route.path.includes('assistant')">
      <AssMenu></AssMenu>
    </aside>
    <aside class="ant-layout-sider ant-layout-sider-light conainer_asider conainer_left_asider ease-in-out" style="width: 13%;" v-else-if="this.$route.path.includes('digitalHuman')">
      <DigitalHumanMenu></DigitalHumanMenu>
    </aside>
    <aside class="ant-layout-sider ant-layout-sider-light conainer_asider conainer_left_asider ease-in-out" style="width: 13%;" v-else>
      <LeftMenu></LeftMenu>
    </aside>
</template>

<script>
import Logo from "./Logo";
import Menu from "@/components/layout/nav/LeftMenu";
import UserMenu from "@/components/layout/nav/userMenu";
import DrawMenu from "@/components/layout/nav/drawMenu";
import workbenchMenu from "@/components/layout/nav/workbenchMenu";
import Bottom from "@/components/layout/nav/Bottom";
import LeftMenu from "./LeftMenu.vue";
import HomeMenu from "./homeMenu.vue";
import AssMenu from "./assMenu.vue";
import DigitalHumanMenu from "./digitalHumanMenu.vue";

export default {
  name: "navIndex",
  components: { Bottom, Menu, Logo, UserMenu, DrawMenu ,workbenchMenu,LeftMenu,HomeMenu,AssMenu,DigitalHumanMenu},
  data() {
    return {};
  },
};
</script>

