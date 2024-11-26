<template>
  <div class="ai-home">
    <div class="ai-content-wrapper ai-home__container">
      <div class="ai-home__content">
        <div
          class="ai-home-top"
          style="
            background-image: url('https://static.yilantv.com/Transformers/vam/images/text/home/home-top.png');
          "
        >
          <div class="ai-home-top__content">
            <div class="ai-home-top__content-title">轻松创作 一键分发</div>
            <div class="ai-home-top__content-desc">
              无论您是自媒体作者、编剧或营销人员，只要您在工作学习中需要文案工作，那么星际创意宝一定会成为您的得力助手。我们基于大规模概率语言模型，经过海量文本知识的学习，使得AI在中文表达上变得得心应手。使用创意宝编剧，您可以轻松生成高质量的剧本和文稿，节约时间和精力，提升工作效率。
            </div>
            <div class="ai-home-top__content-introduce">
              <div class="ai-home-top__content-introduce-item">
                <div class="ai-home-top__content-introduce-icon-box">
                  <img
                    class="ai-home-top__content-introduce-icon"
                    src="https://static.yilantv.com/Transformers/vam/images/text/home/write.svg"
                  />
                </div>
                <span
                  role="img"
                  class="anticon ai-home-top__content-introduce-title"
                  ><svg
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                    focusable="false"
                    class=""
                  >
                    <use xlink:href="#icon-vam-gaoxiaochuangzuo"></use></svg
                ></span>
                <div class="ai-home-top__content-introduce-text">
                  快速生成 专注创意 提高效率
                </div>
              </div>
              <div class="ai-home-top__content-introduce-item">
                <div class="ai-home-top__content-introduce-icon-box">
                  <img
                    class="ai-home-top__content-introduce-icon"
                    src="https://static.yilantv.com/Transformers/vam/images/text/home/style.svg"
                  />
                </div>
                <span
                  role="img"
                  class="anticon ai-home-top__content-introduce-title"
                  ><svg
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                    focusable="false"
                    class=""
                  >
                    <use xlink:href="#icon-vam-fenggeduoyang"></use></svg
                ></span>
                <div class="ai-home-top__content-introduce-text">
                  满足各种场景需求，文章风格多样
                </div>
              </div>
              <div class="ai-home-top__content-introduce-item">
                <div class="ai-home-top__content-introduce-icon-box">
                  <img
                    class="ai-home-top__content-introduce-icon"
                    src="https://static.yilantv.com/Transformers/vam/images/text/home/optimize.svg"
                  />
                </div>
                <span
                  role="img"
                  class="anticon ai-home-top__content-introduce-title"
                  ><svg
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                    focusable="false"
                    class=""
                  >
                    <use xlink:href="#icon-vam-wenbenyouhua"></use></svg
                ></span>
                <div class="ai-home-top__content-introduce-text">
                  结构优化 表达润色 流畅自然
                </div>
              </div>
              <div class="ai-home-top__content-introduce-item">
                <div class="ai-home-top__content-introduce-icon-box">
                  <img
                    class="ai-home-top__content-introduce-icon"
                    src="https://static.yilantv.com/Transformers/vam/images/text/home/inspiration.svg"
                  />
                </div>
                <span
                  role="img"
                  class="anticon ai-home-top__content-introduce-title"
                  ><svg
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                    focusable="false"
                    class=""
                  >
                    <use xlink:href="#icon-vam-lingganjifa"></use></svg
                ></span>
                <div class="ai-home-top__content-introduce-text">
                  激活创作灵感，助力涌现全新思路
                </div>
              </div>
              <div class="ai-home-top__content-introduce-item">
                <div class="ai-home-top__content-introduce-icon-box">
                  <img
                    class="ai-home-top__content-introduce-icon"
                    src="https://static.yilantv.com/Transformers/vam/images/text/home/language.svg"
                  />
                </div>
                <span
                  role="img"
                  class="anticon ai-home-top__content-introduce-title"
                  ><svg
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    aria-hidden="true"
                    focusable="false"
                    class=""
                  >
                    <use xlink:href="#icon-vam-duozhongyuyan"></use></svg
                ></span>
                <div class="ai-home-top__content-introduce-text">
                  支持多语言创作，拓展全球受众
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="border-bottom: 16px solid rgba(0, 0, 0, 0.02)"></div>
        <div class="ai-home__item">
          <div class="ai-home__item-title">热门工具</div>
          <div
            class="ai-home__list"
            style="grid-template-columns: repeat(4, 1fr)"
          >
            <div
              class="ai-home-card"
              v-for="(itemDomain, index) in apiItemDomainList"
              :key="index"
            >
              <router-link
              :to="{
                 path: 'mediaInfo?routePath=${itemDomain.routePath}&iconName=${itemDomain.iconName}&uniqueKey=${itemDomain.uniqueKey}&firstContent=${itemDomain.firstContent}&infomation=${itemDomain.infomation}',
                 query: { routePath: itemDomain.routePath ,iconName : itemDomain.iconName,uniqueKey : itemDomain.uniqueKey,firstContent : itemDomain.firstContent,infomation : itemDomain.infomation},
                }"
              >
                <div class="ai-home-card__icon">
                  <span role="img" class="anticon"
                    ><svg
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      aria-hidden="true"
                      focusable="false"
                      class=""
                    >
                      <use v-bind:xlink:href="itemDomain.svgLogo"></use></svg
                  ></span>
                </div>
                <div class="ai-home-card__title">{{ itemDomain.iconName }}</div>
                <div class="ai-home-card__desc">
                  {{ itemDomain.iconSubName }}
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
const questionArrays = [];
export default {
  name: "HomeComponentsChat",
  data() {
    return {
      questionArrays,
      isLogin: !!getToken(),
      apiItemDomainList: [],
    };
  },
  created() {
    this.getDomainByHot();
  },
  methods: {
    handleEgClick(msg) {
      this.$router.push({ name: "sessionChat", params: { inputMsg: msg } });
    },
    handleStart() {
      if (!this.isLogin) {
        this.$message.info("登录后体验更佳，快来加入吧");
        this.$store.commit("SET_AUTH_DIALOG", true);
        this.$store.commit("SET_LOGIN_DIALOG", true);
        return;
      }
      this.$router.push({ name: "sessionChat" });
    },
    getDomainByHot() {
      this.$api.get("/module/session/domain/getDomainByHot").then((res) => {
        this.apiItemDomainList = res.data;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.ai-content-wrapper {
  width: 100%;
  height: calc(100vh - 1.1rem);
  border: 0.16rem solid rgba(0, 0, 0, 0.02);
  background: white;
  overflow: hidden;
}

.ai-content-wrapper ::-webkit-scrollbar {
  height: 0;
}

.ai-home-card {
  position: relative;
  width: 100%;
  height: 2.04rem;
  padding: 0.24rem 0.16rem 0.24rem 0.24rem;
  border: 0.01rem solid #0101011f;
  box-shadow: 0 0.02rem 0.1rem #0000001f;
  border-radius: 0.08rem;
  cursor: pointer;
}

.ai-home-card:hover {
  background-size: 100% 100%;
}

.ai-home-card__icon {
  width: 0.4rem;
  height: 0.4rem;
  text-align: center;
  line-height: 0.4rem;
  background: #ffffff;
  border: 0.01rem solid #0000000f;
  box-shadow: 0 0.01rem 0.1rem 0.06rem #0000000f;
  border-radius: 0.08rem;
  font-size: 0.21rem;
}

.ai-home-card__title {
  margin-top: 0.08rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  font-size: 0.16rem;
  color: #000000d9;
  line-height: 0.24rem;
}

.ai-home-card__desc {
  margin-top: 0.1rem;
  width: 2.16rem;
  height: 0.34rem;
  font-size: 0.12rem;
  color: #000000d9;
}

.ai-script-feedback__modal .ant-modal-body {
  padding: 0 0.16rem 0.16rem;
}

.ai-home {
  min-width: 10.33rem;
}

.ai-home .ai-home__container {
  height: calc(100vh - 0.56rem);
  overflow-y: auto;
  border: none;
  background: #fafafa;
  padding: 0.16rem;
}

.ai-home__content {
  width: 100%;
  min-height: 100%;
  background: white;
}

.ai-home__item {
  margin-bottom: 0.24rem;
  padding: 0.16rem 0.16rem 0.24rem;
  border-bottom: 0.01rem solid rgba(0, 0, 0, 0.06);
}

.ai-home__item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.ai-home__item-title {
  font-family: PingFangSC-Medium;
  font-weight: 500;
  font-size: 0.2rem;
  color: #000000d9;
  line-height: 0.24rem;
}

.ai-home__list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.35rem 0.24rem;
  padding: 0.16rem 0;
  max-height: 100%;
  overflow-y: auto;
  transition: all 0.2s;
}

.yl-float-button {
  position: fixed;
  right: 0.49rem;
  bottom: 0.31rem;
  cursor: pointer;
  width: 0.48rem;
  height: 0.48rem;
  background: #ffffff;
  border: 0.01rem solid #0000001f;
  box-shadow: 0 0.01rem 0.1rem 0.06rem #0000000f;
  border-radius: 0.08rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.yl-float-button:hover {
  background: #0099ff;
}

.yl-float-button:hover .yl-float-button-icon {
  color: #fff;
}

.yl-float-button-icon {
  font-size: 0.26rem;
  color: #39a9ff;
}

.yl-float-button__detail {
  width: 0.83rem;
  height: 1rem;
  background: #ffffff;
  padding: 0.06rem;
}

.yl-float-button__detail--img {
  width: 0.7rem;
  height: 0.7rem;
}

.yl-float-button__detail--name {
  display: block;
  width: 100%;
  text-align: center;
  height: 0.2rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: 0.14rem;
  color: #000;
  letter-spacing: 0;
}

.ai-home-top {
  position: relative;
  width: 100%;
  padding-bottom: 32.295%;
  background: rgba(0, 0, 0, 0.02) no-repeat;
  background-size: 100%;
  object-fit: cover;
  border-radius: 0.08rem;
  overflow: hidden;
}

.ai-home-top__content {
  position: absolute;
  top: 4.37499972vw;
  left: 4.79166636vw;
  width: 33.12499788vw;
  line-height: 1.94444432vw;
}

.ai-home-top__content-title {
  font-family: FZLTCHK--GBK1-0;
  font-size: 3.33333312vw;
  color: #000000d9;
  font-weight: 600;
  line-height: 3.19444424vw;
  text-align: center;
}

.ai-home-top__content-desc {
  margin-top: 1.11111104vw;
  color: #000000a6;
  font-size: 0.97222216vw;
  line-height: 1.94444432vw;
  text-align: justify;
}

.ai-home-top__content-introduce {
  display: flex;
  align-items: center;
  margin-top: 2.36111096vw;
}

.ai-home-top__content-introduce-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 0.6944444vw;
  width: 5.9027774vw;
  height: 6.2499996vw;
  background: #ffffff80;
  box-shadow: 0 0.06944444vw 0.6944444vw #02237833;
  border-radius: 0.55555552vw;
  cursor: pointer;
}

.ai-home-top__content-introduce-item:hover
  .ai-home-top__content-introduce-text {
  opacity: 1;
}

.ai-home-top__content-introduce-text {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 0.55555552vw 0.48611108vw 0.55555552vw 0.55555552vw;
  line-height: 2;
  font-size: 0.90277772vw;
  background: linear-gradient(#4396ff, #4563fd);
  transition: all 0.2s;
  border-radius: 0.55555552vw;
  color: #fff;
  white-space: pre-line;
}

.ai-home-top__content-introduce-icon {
  width: 1.66666656vw;
  height: 1.66666656vw;
}

.ai-home-top__content-introduce-icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.7777776vw;
  height: 2.7777776vw;
  background: #ffffff;
  border-radius: 0.27777776vw;
}

.ai-home-top__content-introduce-title {
  margin-top: 0.55555552vw;
  font-size: 4.44444416vw;
}

.ai-home-top__content-introduce-title svg {
  height: 1.31944436vw !important;
}

@media screen and (max-width: 1233px) {
  .ai-home-top__content {
    top: 0.53943rem;
    left: 0.59081rem;
    width: 4.08426rem;
    line-height: 0.23975rem;
  }

  .ai-home-top__content-title {
    font-size: 0.411rem;
    line-height: 0.39387rem;
  }

  .ai-home-top__content-desc {
    margin-top: 0.137rem;
    font-size: 0.11987rem;
    line-height: 0.23975rem;
  }

  .ai-home-top__content-introduce {
    margin-top: 0.29112rem;
  }

  .ai-home-top__content-introduce-item {
    margin-right: 0.08562rem;
    width: 0.7278rem;
    height: 0.77062rem;
    box-shadow: 0 0.00856rem 0.08562rem #02237833;
    border-radius: 0.0685rem;
  }

  .ai-home-top__content-introduce-text {
    padding: 0.0685rem 0.05994rem;
    line-height: 2;
    font-size: 0.11131rem;
    border-radius: 0.0685rem;
  }

  .ai-home-top__content-introduce-icon {
    width: 0.2055rem;
    height: 0.2055rem;
  }

  .ai-home-top__content-introduce-icon-box {
    width: 0.3425rem;
    height: 0.3425rem;
    border-radius: 0.03425rem;
  }

  .ai-home-top__content-introduce-title {
    margin-top: 0.0685rem;
    font-size: 0.54799rem;
  }

  .ai-home-top__content-introduce-title svg {
    height: 0.16269rem !important;
  }
}
</style>
