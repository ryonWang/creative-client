<template>
  <div
    class="window-session-content w100"
    :class="{ user: role === 'user' }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="info"></div>
    <div class="content rounded-md">
      <MarkdownView
        ref="mv"
        v-if="contentShowType == ContentShowType.Markdown"
        :content="itemData.content"
      ></MarkdownView>
      <div
        class="content-html"
        v-html="itemData.content"
        v-if="contentShowType == ContentShowType.Html"
      />
    </div>
    <chat-tools
      :content="itemData.content"
      :session-record-id="itemData.id"
      :session-id="itemData.sessionId"
      @deleteAfter="handleDeleteAfter"
      v-show="toolsShow && openTools"
    ></chat-tools>
    <div style="height: 40px" v-show="!toolsShow && openTools"></div>
    <div style="height: 40px" v-show="!openTools"></div>
  </div>
</template>

<script>
import ContentShowType from "@/common/constants/ContentShowType";
import MarkdownView from "@/components/MarkdownView/index";
import ChatTools from "@/components/session/window/ChatToolsByMediaInfo";

export default {
  name: "WindowSessionContent",
  components: {
    ChatTools,
    MarkdownView,
  },
  props: {
    role: { type: String, required: true },
    itemData: { type: Object, required: true },
    contentShowType: { type: String, default: ContentShowType.Markdown },
    openTools: { type: Boolean, default: true },
  },
  data() {
    return {
      ContentShowType,
      toolsShow: false,
      staticWebsite: this.$store.getters.resourceMain.staticWebsite,
    };
  },
  created() {},
  methods: {
    handleMouseEnter() {
      this.toolsShow = true;
    },
    handleMouseLeave() {
      this.toolsShow = true;
    },
    handleDeleteAfter() {
      this.$emit("handleFlushThisSession", this.itemData.sessionId);
    },
  },
};
</script>

<style scoped lang="scss">
.window-session-content {
  padding: 2% 2% 2% 2%;
  flex-direction: column;
  align-items: flex-end;
  color: var(--font-color-default);

  &:hover {
    background-color: var(--session-window-item-hover-color);
  }
}
.window-session-content.user {
  align-items: flex-end;
}

.info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  span {
    font-size: 0.8rem;
  }
}
::v-deep.window-session-content .info .el-image img {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 10px;
  margin-left: 10px;
}

.content {
  background: var(--session-window-system-background);
}
.content-html {
  padding: 0.4rem;
  word-wrap: break-word;
  font-size: 15px;
  max-width: 60vw;
}
.window-session-content.user .content {
  background: var(--session-window-user-background);
}
.window-session-content.user .content-html {
  color: var(--font-color-default2) !important;
}

::v-deep.window-session-content.user .content .markdown-body {
  color: var(--font-color-default2) !important;
}

::v-deep .chat-tools {
  display: flex;
  justify-content: flex-end;
}
::v-deep.window-session-content.user .chat-tools {
  justify-content: flex-end;
}
</style>
