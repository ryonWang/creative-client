<template>
  <aside
    class="ant-layout-sider ant-layout-sider-dark site-layout-background"
    style="
      overflow: auto;
      height: calc(-40px + 100vh);
      position: fixed;
      left: 0px;
      top: 0px;
      bottom: 0px;
      margin-top: 40px;
      background: rgb(249, 249, 255);
      min-height: 410px;
      flex: 0 0 64px;
      max-width: 64px;
      min-width: 64px;
      width: 64px;
    "
  >
    <div class="ant-layout-sider-children">
      <ul
        class="ant-menu ant-menu-root ant-menu-inline ant-menu-light vam-menu-wrapper vertical-menu-wrapper"
        role="menu"
        tabindex="0"
        data-menu-list="true"
        style="border-right: 0px; background: inherit; padding-top: 20px"
      >
        <li
          class="ant-menu-item ant-menu-item-active vam-menu-item__wrapper"
          role="menuitem"
          tabindex="-1"
          style="padding-left: 0px"
          data-menu-id="rc-menu-uuid-87215-1-undefined"
        >
          <span class="ant-menu-title-content"  @click="goVideos()"
            ><span role="img" class="anticon vam-menu-item__icon"
              ><svg
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
                class=""
              >
                <use xlink:href="#icon-shipinku"></use></svg
            ></span>
            <div class="active__label">视频库</div></span
          >
        </li>
        <li
          class="ant-menu-item ant-menu-item-active vam-menu-item__wrapper"
          role="menuitem"
          tabindex="-1"
          style="padding-left: 0px"
          data-menu-id="rc-menu-uuid-87215-1-undefined"
        >
          <span class="ant-menu-title-content"  @click="goProjects()"
            ><span role="img" class="anticon vam-menu-item__icon"
              ><svg
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
                class=""
              >
                <use xlink:href="#icon-lvsexiangmuku"></use></svg
            ></span>
            <div class="vam-menu-item__label">项目库</div></span
          >
        </li>
        <li
          class="ant-menu-item ant-menu-item-active vam-menu-item__wrapper"
          role="menuitem"
          tabindex="-1"
          style="padding-left: 0px"
          data-menu-id="rc-menu-uuid-87215-1-undefined"
        >
          <span class="ant-menu-title-content" @click="goMaterials()"
            ><span role="img" class="anticon vam-menu-item__icon"
              ><svg
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
                class=""
              >
                <use xlink:href="#icon-sucaiku"></use></svg
            ></span>
            <div class="vam-menu-item__label">素材库</div></span
          >
        </li>
        <li
          class="ant-menu-item ant-menu-item-active vam-menu-item__wrapper"
          role="menuitem"
          tabindex="-1"
          style="padding-left: 0px"
          data-menu-id="rc-menu-uuid-87215-1-undefined"
        >
          <span class="ant-menu-title-content" @click="goScript()"
            ><span role="img" class="anticon vam-menu-item__icon"
              ><svg
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
                class=""
              >
                <use xlink:href="#icon-jiaoben1"></use></svg
            ></span>
            <div class="vam-menu-item__label">脚本库</div></span
          >
        </li>
      </ul>
      <div aria-hidden="true" style="display: none"></div>
      <div class="fixed-bottom">
        <ul
          class="ant-menu ant-menu-root ant-menu-inline ant-menu-light vam-menu-wrapper bottom-menu-wrapper"
          role="menu"
          tabindex="0"
          data-menu-list="true"
        >
          <li
            class="ant-menu-item ant-menu-item-only-child vam-menu-item__wrapper"
            role="menuitem"
            tabindex="-1"
            style="padding-left: 24px"
            data-menu-id="rc-menu-uuid-87215-2-/manage/team/overview"
          >
            <span class="ant-menu-title-content"
              ><span role="img" class="anticon vam-menu-item__icon"
                ><svg
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  focusable="false"
                  class=""
                >
                  <use xlink:href="#icon-vam-menu-team"></use></svg></span
            ></span>
          </li>
          <li
            class="ant-menu-item ant-menu-item-only-child vam-menu-item__wrapper"
            role="menuitem"
            tabindex="-1"
            style="padding-left: 24px"
            data-menu-id="rc-menu-uuid-87215-2-/manage/tag"
          >
            <span class="ant-menu-title-content"
              ><span role="img" class="anticon vam-menu-item__icon"
                ><svg
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  focusable="false"
                  class=""
                >
                  <use xlink:href="#icon-vam-menu-label"></use></svg></span
            ></span>
          </li>
          <li
            class="ant-menu-item ant-menu-item-only-child vam-menu-item__wrapper"
            role="menuitem"
            tabindex="-1"
            style="padding-left: 24px"
            data-menu-id="rc-menu-uuid-87215-2-/manage/share"
          >
            <span class="ant-menu-title-content"
              ><span role="img" class="anticon vam-menu-item__icon"
                ><svg
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  focusable="false"
                  class=""
                >
                  <use xlink:href="#icon-vam-menu-share"></use></svg></span
            ></span>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>
<script>
import { getToken } from "@/utils/auth";
export default {
  name: "workbenchMenu",
  methods: {
    goVideos() {
      this.$router.push("/workbench/videos");
    },
    goProjects() {
      this.$router.push("/workbench/projects");
    },
    goMaterials() {
      this.$router.push("/workbench/materials");
    },
    goScript() {
      this.$router.push("/workbench/script");
    },
  },
};
</script>
