<template>
  <div class="main">
    <div class="ai-home">
      <div class="ai-content-wrapper ai-home__container">
        <div class="ai-home__content">
          <div class="ai-home__menus">
            <div
              class="ai-home__item"
              id=""
              v-for="(dict, index) in dictData"
              :key="index"
              v-if="index !== 0"
            >
              <div class="ai-home__item-title">{{ dict.dictLabel }}</div>
              <div
                class="ai-home__list"
                style="grid-template-columns: repeat(4, 1fr)"
              >
                <div
                  class="ai-home-card"
                  v-for="(itemDomain, itemDoaminIndex) in apiItemDomainList"
                  :key="itemDoaminIndex"
                  v-if="dict.dictValue === itemDomain.type"
                >
                  <!-- <span v-for="(windowData, windowDatasIndex) in windowDatas"
                  :key="windowDatasIndex">{{ windowData.description }}</span> -->
                  <router-link
                    :to="{
                      path: 'mediaInfo?routePath=${itemDomain.routePath}&iconName=${itemDomain.iconName}&uniqueKey=${itemDomain.uniqueKey}&firstContent=${itemDomain.firstContent}&iconSubName=${itemDomain.iconSubName}&infomation=${itemDomain.infomation}',
                      query: {
                        routePath: itemDomain.routePath,
                        iconName: itemDomain.iconName,
                        uniqueKey: itemDomain.uniqueKey,
                        firstContent: itemDomain.firstContent,
                        infomation: itemDomain.infomation,
                        iconSubName: itemDomain.iconSubName,
                      },
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
                          <use
                            v-bind:xlink:href="itemDomain.svgLogo"
                          ></use></svg
                      ></span>
                    </div>
                    <div class="ai-home-card__title">
                      {{ itemDomain.iconName }}
                    </div>
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
    </div>
  </div>
</template>
<style></style>
<script>
import { getDicts } from "@/store/modules/dict";
import { getToken } from "@/utils/auth";

export default {
  name: "weMediaIndex",
  data() {
    return {
      dictData: [],
      apiItemDomainList: [],
      isLogin: !!getToken(),
      windowDatas: [],
    };
  },
  created() {
    this.getDictsByType();
    this.getDomainItemList();
  },
  computed: {},
  methods: {
    handleStart() {
      if (!this.isLogin) {
        this.$message.info("登录后体验更佳，快来加入吧");
        this.$store.commit("SET_AUTH_DIALOG", true);
        this.$store.commit("SET_LOGIN_DIALOG", true);
        return;
      }
      this.$router.push({ name: "sessionChat" });
    },
    //从字典获取分类列表
    getDictsByType() {
      getDicts("domain_type").then((res) => {
        this.dictData = res.data;
      });
    },
    getDomainItemList() {
      let queryParams = {};
      this.$api
        .post("/module/session/domain/baseQueryByParam", queryParams)
        .then((res) => {
          this.apiItemDomainList = res.data;
          res.data.forEach((items) => {
            this.windowDatas.push(JSON.parse(items.windowData));
          });
        });
    },
  },
};
</script>
