<template>
  <div class="main">
    <div class="page-title__container">
      <div class="page-title__text">
        <div class="template__title">
          <span  class="anticon"
            ><svg
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
              class=""
            >
              <use xlink:href="#icon-vam-fanhuijiantou"></use></svg></span
          >{{ iconName }}
        </div>
      </div>
    </div>
    <div class="template__step">
      <div class="step-template">
        <div class="ai-content-wrapper step-template__wrapper">
          <div class="template-form step-template__form">
            <form class="ant-form ant-form-vertical template-form__form">
              <div class="ai-form-ui">
                <div class="ai-form-ui__top"></div>
                <div class="ai-form-ui__content">
                  <div class="ant-form-item ant-form-item-has-success">
                    <div
                      class="ant-row ant-form-item-row"
                      v-if="Object.keys(infomationList).length === 0"
                    >
                      <div class="ant-col ant-form-item-label">
                        <label
                          for="anytext"
                          class="ant-form-item-required"
                          title="请输入内容"
                          >请输入内容</label
                        >
                      </div>
                      <div class="ant-col ant-form-item-control">
                        <div class="ant-form-item-control-input">
                          <div class="ant-form-item-control-input-content">
                            <div
                              class="ant-input-textarea ant-input-textarea-show-count ant-input-textarea-in-form-item ant-input-textarea-status-success form-item-template__textarea"
                              data-count="0 / 300"
                            >
                              <textarea
                                v-bind:placeholder="this.iconSubName"
                                id="anytext"
                                aria-required="true"
                                class="ant-input ant-input-lg ant-input-status-success"
                                style="height: 57px; resize: none"
                                @keyup.enter="handleKeyDown"
                                v-model="inputContent"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- 后台配置infomation取值 -->
                    <div
                      style="padding-top: 25px"
                      class="ant-row ant-form-item-row"
                      v-for="(infomations, index) in infomationList"
                      :key="index"
                      v-if="Object.keys(infomationList).length !== 0"
                    >
                      <div class="ant-col ant-form-item-label">
                        <label
                          for="anytext"
                          class="ant-form-item-required"
                          v-bind:title="infomations.propertyValue"
                          >{{ infomations.propertyValue }}</label
                        >
                      </div>
                      <div class="ant-col ant-form-item-control">
                        <div class="ant-form-item-control-input">
                          <div class="ant-form-item-control-input-content">
                            <div
                              class="ant-input-textarea ant-input-textarea-show-count ant-input-textarea-in-form-item ant-input-textarea-status-success form-item-template__textarea"
                              data-count="0 / 300"
                            >
                              <textarea
                                v-bind:id="infomations.propertyId"
                                aria-required="true"
                                class="ant-input ant-input-lg ant-input-status-success"
                                style="height: 57px; resize: none"
                                v-model="textareas[index]"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="ai-form-ui__footer" style="padding-bottom: 8px">
                  <div class="ant-form-item template-form__footer-item">
                    <div class="ant-row ant-form-item-row">
                      <div class="ant-col ant-form-item-control">
                        <div class="ant-form-item-control-input">
                          <div class="ant-form-item-control-input-content">
                            <div class="form-item-template__btn">
                              <button
                                @click="sendInputMessage"
                                type="button"
                                class="ant-btn ant-btn-primary ant-btn-lg"
                                style="width: 100%"
                              >
                                <span>生成</span
                                ><span class="form-item-template__btn-tip"
                                  >（消耗5积分）</span
                                >
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="ant-row ant-form-item-row">
                      <div class="ant-col ant-form-item-control">
                        <div class="ant-form-item-control-input">
                          <div class="ant-form-item-control-input-content">
                            <div class="form-item-template__btn">
                              <button
                                @click="getLastSessionData()"
                                type="button"
                                class="ant-btn ant-btn-primary ant-btn-lg"
                                style="width: 100%"
                              >
                                <span>历史操作</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="ai-protocol__container">
                    <div class="ai-protocol__link">
                      <span class="ai-protocol__link-title"
                        >使用AI创作服务表示您已同意</span
                      ><button type="button" class="ant-btn ant-btn-link">
                        <span>《</span
                        ><router-link
                          tag="a"
                          target="_blank"
                          to="/userAgreement"
                          >用户协议</router-link
                        >
                        <span>》</span></button
                      ><button type="button" class="ant-btn ant-btn-link">
                        <span>《</span
                        ><router-link tag="a" target="_blank" to="/disclaimer"
                          >免责申明</router-link
                        ><span>》</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="ai-result-preview" v-if="sessionRecordData.length === 0">
            <ul class="ai-result-preview__list">
              <div class="ant-empty" style="margin-top: 120px">
                <div class="ant-empty-image" style="height: 122px">
                  <img :src="require('/src/assets/imgs/text.png')" alt="" />
                </div>
                <div class="ant-empty-description">
                  <div class="ai-result-preview__empty-desc">
                    生成的内容可在操作
                  </div>
                </div>
              </div>
            </ul>
          </div>
          <div
            class="step-template__content"
            v-if="sessionRecordData.length !== 0"
          >
            <div class="template-preview step-template__preview">
              <div class="template-preview__text" ref="sessionWindow">
                <div
                  class="content-editable template-preview__editable"
                  ref="chatContent"
                  @scroll="onScroll"
                >
                  <li
                    class="ant-input ant-input-borderless content-editable__input ant-input-disabled"
                    v-for="(item, index) in sessionRecordData"
                    :key="index"
                    v-if="item.role === 'assistant'"
                  >
                    <window-session-content
                      v-if="item.role === 'assistant'"
                      :role="item.role"
                      :item-data="item"
                      @getSessionDataBySessionId="getSessionDataBySessionId"
                    ></window-session-content>
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import StreamResponseType from "@/common/constants/StreamResponseType";
import { linkSseEvent } from "@/utils/request/SseRequest";
import { getToken } from "@/utils/auth";
import SessionTypeConstant from "@/common/constants/SessionType";
import ContentShowType from "@/common/constants/ContentShowType";
import MarkdownView from "@/components/MarkdownView/index";
import ChatTools from "@/components/session/window/ChatToolsByMediaInfo";
import WindowSessionContent from "@/components/session/window/chat/WindowSessionContentByMediaInfo";

export default {
  name: "mediaInfo",
  props: {
    windowData: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    ContentShowType,
    WindowSessionContent,
    ChatTools,
    MarkdownView,
  },
  data() {
    return {
      hiddenStatus: this.$store.state.settings.hiddenStatusSessionList,
      ifConc: this.$store.state.settings.ifConc,
      SessionTypeConstant,
      loading: true,
      loadingLine: false,
      sessionLoadingStatus: false,
      connectId: undefined,
      ifConnect: false,
      chatModelId: undefined,
      isLogin: !!getToken(),
      hiddenStatusSession: this.$store.state.settings.hiddenStatusSessionList,
      sessionData: [],
      sessionRecordData: [],
      ContentShowType: [],
      inputContent: [],
      infomationList: [],
      textareas: [],
    };
  },
  watch: {},
  created() {
    // 从路由中获取参数（标题、跳转、领域模型等）
    this.iconName = this.$route.query.iconName;
    this.iconSubName = this.$route.query.iconSubName;
    this.routePath = this.$route.query.routePath;
    this.uniqueKey = this.$route.query.uniqueKey;
    this.firstContent = this.$route.query.firstContent;
    this.infomation = this.$route.query.infomation;
    this.handleBefore();
    this.getInfomationList();
  },
  methods: {
    getInfomationList() {
      if (
        this.infomation != null &&
        Object.keys(this.infomation).length !== 0
      ) {
        this.infomationList = JSON.parse(this.infomation);
      } else {
        this.infomationList = {};
      }
    },
    getSessionDataBySessionId(sessionId) {
      this.loading = true;
      this.$api
        .getRestful("/module/session/sessioninfo/getSessionInfo", sessionId)
        .then((res) => {
          if (res.data != null) {
            this.sessionData = res.data;
            this.getSessionRecordData(this.sessionData.id);
            this.loading = false;
          }
        });
    },
    onScroll() {
      const scrollDom = this.$refs.chatContent;
      const scrollTop = scrollDom.scrollTop;
      const offsetHeight = scrollDom.offsetHeight;
      const scrollHeight = scrollDom.scrollHeight;
      // 当滚动到底部，设置 isAutoScroll 为 true
      if (scrollTop + offsetHeight >= scrollHeight) {
        this.isAutoScroll = true;
      } else {
        // 否则，用户正在手动滑动，设置为 false，停止自动滚动
        this.isAutoScroll = false;
      }
    },
    handleBefore() {
      if (!this.isLogin) {
        this.$message.info("登录/注册体验完整功能");
        return false;
      }
      return true;
    },
    handleKeyDown(event) {
      if (event.keyCode == 13 && event.ctrlKey) {
        this.sendInputMessage();
      }
    },
    sendInputMessage() {
      if (this.loadingLine) {
        this.$message.error("会话加载中......");
        return;
      }
      this.loadingLine = true;
      if (this.inputContent.length !== 0) {
        let streamResponseType = this.$store.getters.streamResponseType;
        switch (streamResponseType) {
          case StreamResponseType.Websocket:
            this.handleCreateSession();
            // this.socketConnectMessage(this.inputContent);
            break;
          case StreamResponseType.SSE:
            this.handleCreateSession();
            // this.sseConnectMessage(this.inputContent);
            break;
        }
      }
      if (Object.keys(this.infomationList).length !== 0) {
        let streamResponseType = this.$store.getters.streamResponseType;
        switch (streamResponseType) {
          case StreamResponseType.Websocket:
            this.handleCreateSession();
            // this.socketConnectMessage(this.inputContent);
            break;
          case StreamResponseType.SSE:
            this.handleCreateSession();
            // this.sseConnectMessage(this.inputContent);
            break;
        }
      } else {
        this.$message.warning("内容不能为空");
        this.loadingLine = false;
      }
    },
    //sse发送
    sseConnectMessage(inputMessage) {
      const that = this;
      if (window.EventSource) {
        let sseEvent = linkSseEvent();
        sseEvent.onmessage = function (event) {
          let connectId = event.lastEventId;
          let data = event.data;
          if (connectId == data) {
            that.connectId = connectId;
            that.ifConnect = true;
            that.flushSendData(inputMessage);
            that.apiSend(connectId, inputMessage);
          } else {
            if (!that.ifConnect) {
              return;
            }
            let popData =
              that.sessionRecordData[that.sessionRecordData.length - 1];
            let data = event.data;
            data = data.replaceAll("↖emsp↘", " ");
            data = data.replaceAll("↖br↘", "\n");
            data = data.replaceAll("↖tab↘", "   ");
            popData.content += data;
          }
        };

        sseEvent.onerror = function () {
          that.loadingLine = false;
          that.connectId = undefined;
          sseEvent.close();
          sseEvent = null;
        };
      } else {
        this.$message.error("浏览器版本不支持sse，请更换浏览器");
        this.loadingLine = false;
      }
    },
    socketConnectMessage(inputMessage) {
      const that = this;
      const websocketUrl = this.$store.getters.resourceMain.websocketUrl;
      const wsUrl = websocketUrl + "/socket/chat";
      const webSocket = new WebSocket(wsUrl);

      webSocket.onmessage = function (event) {
        let data = event.data;
        if (that.connectId === undefined) {
          that.connectId = data;
          that.ifConnect = true;
          that.flushSendData(inputMessage);
          that.apiSend(that.connectId, inputMessage);
        } else {
          if (!that.ifConnect) {
            return;
          }
          let popData =
            that.sessionRecordData[that.sessionRecordData.length - 1];
          popData.content += data;
        }
      };

      webSocket.onclose = function () {
        that.loadingLine = false;
        that.connectId = undefined;
      };

      webSocket.onerror = function () {
        that.apiErrorHandle("请求失败");
      };
    },
    handleBoxClickIfConc() {
      this.ifConc = this.ifConc == "1" ? "0" : "1";
      this.$store.commit("SET_SETTING_ITEM", {
        key: "ifConc",
        value: this.ifConc,
      });
    },
    handleBoxClickSidebarHidden() {
      this.hiddenStatus = !this.hiddenStatus;
      this.$store.commit("SET_SETTING_ITEM", {
        key: "hiddenStatusSessionList",
        value: this.hiddenStatus,
      });
    },
    apiErrorHandle(msg) {
      const that = this;
      that.$message.error(msg);
      that.sessionRecordData.pop();
      that.sessionRecordData.pop();
      that.loadingLine = false;
    },
    apiSend(connectId, inputMessage) {
      if (connectId == null) {
        return;
      }
      this.$api
        .post(`/module/chat/sendDomain`, {
          connectId: connectId,
          sessionId: this.sessionData.id,
          //1745636161061154818 ERNIE-Lite-8K模型，先写死
          chatModelId: "1745636161061154818",
          sessionType: SessionTypeConstant.DOMAIN,
          domainUniqueKey: this.uniqueKey,
          content: inputMessage,
          // ifConc2: ifConc
        })
        .then((res) => {
          if (!res.status) {
            this.apiErrorHandle(res.message);
          }
        });
    },
    handleStopStream() {
      this.$api.get("/module/chat/stopStreamResponse/" + this.connectId);
    },
    flushSendData(inputMessage) {
      let userData = {
        role: "user",
        content: JSON.parse(JSON.stringify(inputMessage)),
        createTime: new Date().toLocaleString(),
      };
      this.sessionRecordData.push(userData);
      let assistantData = {
        role: "assistant",
        content: "",
        createTime: new Date().toLocaleString(),
      };
      this.sessionRecordData.push(assistantData);
    },
    //创建新的会话，把新sessionId传给ssechat,
    handleCreateSession() {
      if (this.textareas.length !== 0) {
        this.inputContent = JSON.stringify(this.textareas);
      }
      this.$api
        .post("/module/session/sessioninfo/addDomainSession", {
          sessionType: SessionTypeConstant.DOMAIN,
          domainUniqueKey: this.uniqueKey,
          content: this.inputContent,
          chatModelId: "1745636161061154818",
        })
        .then((res) => {
          if (res.data != null) {
            this.sessionData = res.data;
            this.loading = false;
            //由于then异步问题，这里执行实际sse的发送和响应
            this.sseConnectMessage(this.inputContent);
          }
        });
    },
       // 获取当前窗口最新的会话
       getLastSessionData(){
        this.loading = true
        this.$api.get('/module/session/sessioninfo/userLastDomainSession',{
          sessionType: SessionTypeConstant.DOMAIN,
          domainUniqueKey: this.uniqueKey,
        }).then(res => {
          if (res.data != null){
            this.sessionData = res.data;
            this.getSessionDataBySessionId(this.sessionData.id)
            this.loading = false
          }
        })
      },
    getSessionData(item) {
      this.loading = true;
      setTimeout(() => {
        this.sessionData = JSON.parse(JSON.stringify(item));
        this.getSessionRecordData(this.sessionData.id);
        this.loading = false;
        this.$refs.sessionWindowHeader.setModelValue(
          this.sessionData.chatModelId
        );
      }, 30);
    },
       // 会话列表
       getSessionRecordData(sessionId){
        this.$api.get('/module/session/sessionrecord/getRecordSession',{sessionId}).then(res => {
          if (res.status){
            console.log(res.data)
            this.sessionRecordData = res.data;
            this.ifConnect = false
          }
        })
      },
    // handleFlushList(){
    //   this.$refs.sessionList.handleFlushList()
    // },
  },
};
</script>
