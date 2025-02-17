import VueRouter from 'vue-router'

import Layout from "@/components/layout/index";

const routerList = [
  {
    path: "/",
    redirect: "/home",
    name: 'index',
    component: () => import('/src/views/index')
  },
  {
    path: "/",
    name: "home",
    component: Layout,
    children: [
      {
        path: "/home",
        name: 'home',
        meta: { title: '主页' },
        component: () => import('/src/views/pages/home/index')
      },
      {
        path: "/home/account/auth",
        name: 'AccountAuth',
        meta: { title: '账号授权' },
        component: () => import('/src/views/pages/account/index')
      },
      {
        path: '/home/account/permission',
        name: 'UserPermission',
        component: () => import('@/views/pages/account/Permission.vue'),
        meta: { title: '权限管理' }
      },
      {
        path: '/home/account/profile',
        name: 'UserProfile',
        component: () => import('@/views/pages/account/Profile.vue'),
        meta: { title: '用户信息修改' }
      },
      {
        path: "/home/account/group",
        name: 'AccountGroup',
        meta: { title: '账号分组' },
        component: () => import('/src/views/pages/account/group')
      },
      {
        path: "/home/matrix/zhanghaofenxi",
        name: 'ZhangHaoFenXi',
        meta: { title: '账号数据分析' },
        component: () => import('/src/views/pages/matrix/zhanghaofenxi.vue')
      },
      {
        path: "/home/matrix/shipinfenxi",
        name: 'ShiPinFenXi',
        meta: { title: '视频数据分析' },
        component: () => import('/src/views/pages/matrix/shipinfenxi.vue')
      },
      {
        path: "/weMedia",
        name: 'weMedia',
        meta: { title: '自媒体' },
        component: () => import('/src/views/pages/weMedia/index')
      },
      {
        path: "/mediaInfo",
        name: 'mediaInfo',
        meta: { title: '操作明细' },
        component: () => import('/src/views/pages/weMedia/mediaInfo')
      },
      {
        path: "/scriptFormat",
        name: 'scriptFormat',
        meta: { title: '格式化脚本' },
        component: () => import('/src/views/pages/scriptFormat/index')
      },
      {
        path: "/home/matrix/task",
        name: 'MatrixTask',
        meta: { title: '矩阵任务' },
        component: () => import('/src/views/pages/matrix/task')
      },
      {
        path: "/home/matrix/analysis",
        name: 'MatrixAnalysis',
        meta: { title: '效果分析' },
        component: () => import('/src/views/pages/matrix/analysis')
      },
      {
        path: "/home/contentProduction/aiMixing",
        name: 'AiMixing',
        meta: { title: '智能混剪' },
        component: () => import('@/views/contentProduction/aiMixing/index')
      }
    ]
  },
  {
    path: "/workbench",
    name: "workbench",
    component: Layout,
    children: [
      {
        path: "/workbench",
        name: 'workbench',
        meta: { title: '工作台' },
        component: () => import('/src/views/pages/workbench/videos/index')
      },
      {
        path: "/workbench/videos",
        name: 'videos',
        meta: { title: '视频库' },
        component: () => import('/src/views/pages/workbench/videos/index')
      },
      {
        path: "/workbench/projects",
        name: 'projects',
        meta: { title: '项目库' },
        component: () => import('/src/views/pages/workbench/projects/index')
      },
      {
        path: "/workbench/materials",
        name: 'materials',
        meta: { title: '素材库' },
        component: () => import('/src/views/pages/workbench/materials/index')
      },
      {
        path: "/workbench/script",
        name: 'script',
        meta: { title: '脚本库' },
        component: () => import('/src/views/pages/workbench/script/index')
      },
      {
        path: "/workbench/jiaobenInfo",
        name:"jiaobenInfo",
        meta: { title: '格式化脚本表单' },
        component: () => import('/src/views/pages/jiaobenInfo/index')
      },
      {
        path: "/workbench/sub_jiaobenInfo",
        name:"sub_jiaobenInfo",
        meta: { title: '格式化脚本表单' },
        component: () => import('/src/views/pages/workbench/script/subIndex')
      },

      {
        path: '/workbench/projects/subProject/:projectId',
        name: 'subProject',
        component: () => import('@/views/pages/workbench/projects/subProject.vue')
      }
    ]
  },
  {
    path: "/userAgreement",
    name: 'userAgreement',
    component: () => import('/src/views/pages/help/UserAgreement')
  },
  {
    path: "/disclaimer",
    name: 'disclaimer',
    component: () => import('/src/views/pages/help/Disclaimer')
  },
  {
    path: "/",
    name: "sessionChat",
    component: Layout,
    children: [
      {
        path: "/sessionChat",
        name: 'sessionChat',
        meta: { title: '万能问答' },
        component: () => import('/src/views/pages/sessionChat/index')
      }
    ]
  },
  {
    path: "/",
    name: "sessionDomain",
    component: Layout,
    children: [
      {
        path: "/sessionDomain",
        name: 'sessionDomain',
        meta: { title: '场景对话' },
        component: () => import('/src/views/pages/sessionDomain/index')
      }
    ]
  },
  {
    path: "/",
    name: "appTool",
    component: Layout,
    children: [
      {
        path: "/appTool",
        name: 'appTool',
        meta: { title: '场景对话' },
        component: () => import('/src/views/pages/appTool/index')
      }
    ]
  },
  {
    path: '/',
    name: "sessionDomain",
    component: Layout,
    children: [
      {
        path: '/sessionDomain/:domainKey',
        component: () => import('/src/views/pages/sessionDomain/session/Common'),
        name: 'sessionDomain',
        meta: { title: 'aaa' }
      }
    ]
  },
  {
    path: "/",
    name: "gallery",
    component: Layout,
    children: [
      {
        path: "/gallery",
        name: 'gallery',
        meta: { title: '画廊' },
        component: () => import('/src/views/pages/gallery/index')
      }
    ]
  },
  {
    path: "/userHome",
    name: "userHome",
    component: Layout,
    children: [
      {
        path: "/userHome",
        name: 'UserHome',
        meta: { title: '用户中心' },
        component: () => import('/src/views/pages/user/userHome/components/ComponentsUserBaseInfo')
      },
      {
        path: "/userHome/certification",
        name: 'certification',
        meta: { title: '认证中心' },
        component: () => import('/src/views/pages/user/userHome/components/Certification')
      },
      {
        path: "/userHome/invite",
        name: 'certification',
        meta: { title: '推广邀请' },
        component: () => import('/src/views/pages/user/userHome/components/Invite')
      }
    ]
  },
  {
    path: "/",
    name: "other",
    component: Layout,
    children: [
      {
        path: "/other/help",
        name: 'help',
        meta: { title: '常见问题' },
        component: () => import('/src/views/pages/help/index')
      }
    ]
  },
  {
    path: "/",
    name: "SessionDraw",
    component: Layout,
    children: [
      {
        path: "/sessionDraw",
        name: 'sessionDraw',
        meta: { title: 'AI画图' },
        component: () => import('/src/views/pages/sessionDraw/index')
      }
    ]
  },
  {
    path: "/",
    name: "account",
    component: Layout,
    children: [
      {
        path: "/account/auth",
        name: 'AccountAuth', 
        meta: { title: '账号授权' },
        component: () => import('/src/views/pages/account/index')
      }
    ]
  },
  {
    path: "/home/contentProduction",
    component: Layout,
    children: [
      {
        path: "aiMixing",
        name: "AiMixing", 
        meta: { title: '智能混剪' },
        component: () => import('@/views/contentProduction/aiMixing/index')
      },
      {
        path: "aiMixing/create",
        name: "AiMixingCreate",
        meta: { title: '素材混剪', activeMenu: '/home/contentProduction/aiMixing' },
        component: () => import('@/views/contentProduction/aiMixing/create')
      },
      {
        path: "aiTemplate",
        name: "AiTemplate",
        meta: { title: '模板广场' },
        component: () => import('@/views/contentProduction/aiTemplate/index')
      }
    ]
  },
  {
    path: '/home',
    component: Layout,
    children: [
      
      // 新增财务管理相关路由
      {
        path: 'finance/recharge',
        name: 'Recharge',
        component: () => import('@/views/pages/finance/recharge.vue'),
        meta: { title: '充值' }
      },
      {
        path: 'finance/coins',
        name: 'Coins',
        component: () => import('@/views/pages/finance/coins.vue'),
        meta: { title: '金币购买' }
      },
      {
        path: 'finance/digital-human',
        name: 'DigitalHuman',
        component: () => import('@/views/pages/finance/digital-human.vue'),
        meta: { title: '数字人定制' }
      }
    ]
  },
  {
    path: '/aiDraw',
    component: Layout,
    children: [
      {
        path: '',
        name: 'AiDrawHome',
        component: () => import('@/views/pages/aiDraw/home.vue')
      },
      {
        path: 'mannequin',
        name: 'AiDrawMannequin',
        component: () => import('@/views/pages/aiDraw/pages/mannequin/index.vue')
      },
      {
        path: 'human',
        name: 'AiDrawHuman',
        component: () => import('@/views/pages/aiDraw/pages/human/index.vue')
      },
      {
        path: 'shoes',
        name: 'AiDrawShoes',
        component: () => import('@/views/pages/aiDraw/pages/shoes/index.vue')
      },
      {
        path: 'bags',
        name: 'AiDrawBags',
        component: () => import('@/views/pages/aiDraw/pages/bags/index.vue')
      },
      {
        path: 'background',
        name: 'AiDrawBackground',
        component: () => import('@/views/pages/aiDraw/pages/background/index.vue')
      }
    ]
  },
  {
    path: "/",
    name: "assistant",
    component: Layout,
    children: [
      {
        path: "/assistant",
        name: 'Assistant',
        component: () => import('@/views/pages/assistant/index.vue'),
        meta: {
          title: '商品助理',
          keepAlive: true,
          requireAuth: true
        },
        children: [
          // 系统管理路由
          // {
          //   path: 'system/user/register',
          //   name: 'UserRegister',
          //   component: () => import('@/views/pages/assistant/system/user/Register.vue'),
          //   meta: { title: '用户注册/登录' }
          // },
          
          // 营销工具
          {
            path: 'marketing/coupon',
            name: 'CouponManage',
            component: () => import('@/views/pages/assistant/marketing/Coupon.vue'),
            meta: { title: '优惠券管理' }
          },
          {
            path: 'marketing/countdown',
            name: 'ActivityCountdown',
            component: () => import('@/views/pages/assistant/marketing/Countdown.vue'),
            meta: { title: '活动倒计时' }
          },
          {
            path: 'marketing/recommend',
            name: 'ProductRecommend',
            component: () => import('@/views/pages/assistant/marketing/Recommend.vue'),
            meta: { title: '商品推荐' }
          },
          // 商品管理路由
          {
            path: 'product/edit/create',
            name: 'ProductCreate',
            component: () => import('@/views/pages/assistant/product/edit/Create.vue'),
            meta: { title: '新建商品' }
          },
          {
            path: 'product/edit/modify',
            name: 'ProductModify',
            component: () => import('@/views/pages/assistant/product/edit/Modify.vue'),
            meta: { title: '商品信息修改' }
          },
          // 数据管理路由
          {
            path: 'data/order/receive',
            name: 'OrderReceive',
            component: () => import('@/views/pages/assistant/data/order/Receive.vue'),
            meta: { title: '订单接收' }
          },
          // 报表路由
          {
            path: 'report/sales/shop',
            name: 'ShopSalesReport',
            component: () => import('@/views/pages/assistant/report/sales/Shop.vue'),
            meta: { title: '店铺销售报表' }
          },
          // 系统配置路由
          {
            path: 'system/config/erp',
            name: 'ErpConfig',
            component: () => import('@/views/pages/assistant/system/config/Erp.vue'),
            meta: { title: 'ERP系统对接配置' }
          },
          {
            path: 'system/config/platform',
            name: 'PlatformConfig',
            component: () => import('@/views/pages/assistant/system/config/Platform.vue'),
            meta: { title: '平台参数设置' }
          },
          {
            path: 'system/config/logs',
            name: 'LogManage',
            component: () => import('@/views/pages/assistant/system/config/Logs.vue'),
            meta: { title: '日志管理' }
          },
          // 铺货管理路由
          {
            path: 'distribution/shop/bind',
            name: 'ShopBind',
            component: () => import('@/views/pages/assistant/distribution/shop/Bind.vue'),
            meta: { title: '店铺绑定' }
          },
          {
            path: 'distribution/shop/template',
            name: 'ShopTemplate',
            component: () => import('@/views/pages/assistant/distribution/shop/Template.vue'),
            meta: { title: '店铺模板设置' }
          },
          {
            path: 'distribution/shop/monitor',
            name: 'ShopMonitor',
            component: () => import('@/views/pages/assistant/distribution/shop/Monitor.vue'),
            meta: { title: '店铺状态监控' }
          },
          // 商品数据由
          {
            path: 'product/data/import',
            name: 'ProductImport',
            component: () => import('@/views/pages/assistant/product/data/Import.vue'),
            meta: { title: '商品数据导入' }
          },
          {
            path: 'product/data/maintain',
            name: 'ProductMaintain',
            component: () => import('@/views/pages/assistant/product/data/Maintain.vue'),
            meta: { title: '商品数据维护' }
          },
          {
            path: 'product/data/mapping',
            name: 'ProductMapping',
            component: () => import('@/views/pages/assistant/product/data/Mapping.vue'),
            meta: { title: '数据映射' }
          },
          // 数据同步路由
          {
            path: 'data/sync/erp',
            name: 'ErpSync',
            component: () => import('@/views/pages/assistant/data/sync/Erp.vue'),
            meta: { title: '与ERP步' }
          },
          {
            path: 'data/sync/shop',
            name: 'ShopSync',
            component: () => import('@/views/pages/assistant/data/sync/Shop.vue'),
            meta: { title: '与店铺同步' }
          },
          // 报表路由
          {
            path: 'report/distribution/products',
            name: 'DistributionProductsReport',
            component: () => import('@/views/pages/assistant/report/distribution/Products.vue'),
            meta: { title: '铺货商品报表' }
          },
          {
            path: 'report/distribution/tasks',
            name: 'DistributionTasksReport',
            component: () => import('@/views/pages/assistant/report/distribution/Tasks.vue'),
            meta: { title: '铺货任务报表' }
          },
          {
            path: 'report/inventory/summary',
            name: 'InventorySummary',
            component: () => import('@/views/pages/assistant/report/inventory/Summary.vue'),
            meta: { title: '库存汇总报表' }
          },
          {
            path: 'report/inventory/turnover',
            name: 'InventoryTurnover',
            component: () => import('@/views/pages/assistant/report/inventory/Turnover.vue'),
            meta: { title: '库存转率报表' }
          },
          {
            path: 'distribution/product/single',
            name: 'SingleDistribution',
            component: () => import('@/views/pages/assistant/distribution/product/Single.vue'),
            meta: { title: '单商品铺货' }
          },
          {
            path: 'distribution/product/batch',
            name: 'BatchDistribution',
            component: () => import('@/views/pages/assistant/distribution/product/Batch.vue'),
            meta: { title: '批量铺货' }
          },
          {
            path: 'distribution/product/task',
            name: 'DistributionTask',
            component: () => import('@/views/pages/assistant/distribution/product/Task.vue'),
            meta: { title: '铺货任务管理' }
          },
          {
            path: 'distribution/rule/price',
            name: 'PriceRule',
            component: () => import('@/views/pages/assistant/distribution/rule/Price.vue'),
            meta: { title: '价格规则' }
          },
          {
            path: 'distribution/rule/stock',
            name: 'StockRule',
            component: () => import('@/views/pages/assistant/distribution/rule/Stock.vue'),
            meta: { title: '库存规则' }
          },
          {
            path: 'distribution/rule/product',
            name: 'ProductRule',
            component: () => import('@/views/pages/assistant/distribution/rule/Product.vue'),
            meta: { title: '商品信息规则' }
          },
          
          {
            path: 'product/edit/audit',
            name: 'ProductAudit',
            component: () => import('@/views/pages/assistant/product/edit/Audit.vue'),
            meta: { title: '商品审核' }
          },
          {
            path: 'data/order/process',
            name: 'OrderProcess',
            component: () => import('@/views/pages/assistant/data/order/Process.vue'),
            meta: { title: '订单处理' }
          },
          {
            path: 'data/order/analysis',
            name: 'OrderAnalysis',
            component: () => import('@/views/pages/assistant/data/order/Analysis.vue'),
            meta: { title: '订单查询与统计' }
          },
          {
            path: 'report/sales/product',
            name: 'ProductSalesReport',
            component: () => import('@/views/pages/assistant/report/sales/Product.vue'),
            meta: { title: '商品销售报表' }
          },
          // 智能设计相关路由
          {
            path: 'smart/detail-page-editor',
            name: 'DetailPageEditor',
            component: () => import('@/views/pages/assistant/smart/DetailPageEditor.vue'),
            meta: { title: '详情页编辑器' }
          },
          // 数据分析相关路由
          {
            path: 'analysis/traffic',
            name: 'TrafficAnalysis',
            component: () => import('@/views/pages/assistant/analysis/Traffic.vue'),
            meta: { title: '流量分析' }
          },
          {
            path: 'analysis/conversion',
            name: 'ConversionAnalysis',
            component: () => import('@/views/pages/assistant/analysis/Conversion.vue'),
            meta: { title: '转化分析' }
          }
        ]
      }
    ]
  },
  {
    path: "/",
    name: "digitalHuman",
    component: Layout,
    children: [
      {
        path: '/digitalHuman',
        name: 'DigitalHumanIndex',
        component: () => import('@/views/pages/digital-human/index.vue'),
        meta: { keepAlive: true }
      },
      {
        path: '/digitalHuman/digital-avatar',
        name: 'DigitalAvatar',
        component: () => import('@/views/pages/digital-human/digital-avatar/index.vue'),
        meta: { 
          title: '数字人',
          keepAlive: true
        }
      },
      {
        path: "/digitalHuman/digital-avatar/create",
        name: "CreateDigitalAvatar",
        meta: { title: '创建数字人', activeMenu: '/digitalHuman/digital-avatar' },
        component: () => import('@/views/pages/digital-human/digital-avatar/create')
      },
      {
        path: '/digitalHuman/voice',
        name: 'Voice',
        component: () => import('@/views/pages/digital-human/voice/index.vue'),
        meta: { 
          title: '声音',
          keepAlive: true
        }
      },
      {
        path: '/digitalHuman/voice/create',
        name: 'VoiceCreate',
        component: () => import('@/views/pages/digital-human/voice/create.vue'),
        meta: { 
          title: '添加声音',
          activeMenu: '/digitalHuman/voice',
          keepAlive: true
        }
      },
      {
        path: '/digitalHuman/voice/edit',
        name: 'VoiceEdit',
        component: () => import('@/views/pages/digital-human/voice/edit.vue'),
        meta: { 
          title: '编辑声音',
          activeMenu: '/digitalHuman/voice',
          keepAlive: true
        }
      },
      {
        path: '/digitalHuman/live-workspace',
        name: 'LiveWorkspace',
        component: () => import('@/views/pages/digital-human/live-workspace/index.vue'),
        meta: { title: '直播工作台' }
      },
      {
        path: '/digitalHuman/video-workspace',
        name: 'VideoWorkspace',
        component: () => import('@/views/pages/digital-human/video-workspace/index.vue'),
        meta: { title: '视频工作台' }
      },
      {
        path: '/digitalHuman/my-works',
        name: 'MyWorks',
        component: () => import('@/views/pages/digital-human/my-works/index.vue'),
        meta: { title: '我的作品' }
      },
      {
        path: '/digitalHuman/drafts',
        name: 'Drafts',
        component: () => import('@/views/pages/digital-human/drafts/index.vue'),
        meta: { title: '草稿箱' }
      },
      {
        path: '/digitalHuman/chat-workspace',
        name: 'ChatWorkspace',
        component: () => import('@/views/pages/digital-human/chat-workspace/index.vue'),
        meta: { title: '对话工作台' }
      },
      {
        path: '/digitalHuman/knowledge-base',
        name: 'KnowledgeBase',
        component: () => import('@/views/pages/digital-human/knowledge-base/index.vue'),
        meta: { title: '知识库' }
      }
    ]
  },
 
  
];

// 修改路由跳转处理
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => {
    if (err.name !== 'NavigationDuplicated') {
      throw err;
    }
  });
};

const all = function () {
  const allList = [];
  routerList.forEach(item => allList.push(item));
  return allList;
}

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: all()
})

export default router
