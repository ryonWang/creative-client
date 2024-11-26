import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
require('@/assets/css/pace-theme.css')
import VueRouter from 'vue-router'
import store from "@/store";
import cache from '@/utils/cache'
import '@/assets/css/style.scss'
import '@/assets/css/script.scss'
import '@/assets/css/invite.scss'
import '@/assets/css/certification.scss'
import '@/assets/css/upload.scss'
import '@/assets/css/more-style.scss'
import '@/assets/css/globalTransition.scss'
import '@/assets/css/menu-style.scss'
import apiRequest from "/src/utils/request/BaseRequest";
import plugins from './common/plugins'
import DialogTopClose from "@/components/TopClose/TopClose";
import LoadingIframe from "@/components/Loading/LoadingIframe";
import ATabs from "@/components/Tabs/Tabs";
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import waterfall from "vue-waterfall2";
import '@/assets/iconfont/iconfont.js'

// 修改 ECharts 引入方式
import ECharts from 'vue-echarts'
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// 注册必需的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer
])

// 全局注册组件
Vue.component('v-chart', ECharts)

Vue.use(waterfall);

import { copyToClipboard } from '@/utils/util'

import router from './router/index'

Vue.component('DialogTopClose', DialogTopClose)
Vue.component('LoadingIframe', LoadingIframe)
Vue.component('a-tabs', ATabs)

Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.use(plugins);
Vue.use(mavonEditor);

Vue.config.productionTip = false
Vue.prototype.$cache = cache;
Vue.prototype.$api = apiRequest;
Vue.prototype.$copy = function (value,mes) {
  if (copyToClipboard(value)) {
    this.$message.success(mes)
  }
}

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
