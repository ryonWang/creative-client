<template>
  <div class="digital-human-container">
    <!-- 顶部活动banner -->
    <div class="promotion-banner">
      <img src="@/assets/images/promotion-banner.png" alt="promotion">
    </div>

    <!-- 功能卡片区 -->
    <div class="feature-cards">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="feature-card purple" @click="handleNavigate('/digitalHuman/digital-avatar')">
            <div class="card-content">
              <div class="card-icon">
                <img src="@/assets/icons/2d-avatar.png" alt="2D数字人">
              </div>
              <div class="card-info">
                <h3>2D数字人克隆</h3>
                <p>还原真人表情动作</p>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="feature-card blue" @click="handleNavigate('/digitalHuman/digital-avatar')">
            <div class="card-content">
              <div class="card-icon">
                <img src="@/assets/icons/photo-avatar.png" alt="照片数字人">
              </div>
              <div class="card-info">
                <h3>照片数字人克隆</h3>
                <p>让你的照片会说话</p>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="feature-card cyan" @click="handleNavigate('/digitalHuman/digital-avatar')">
            <div class="card-content">
              <div class="card-icon">
                <img src="@/assets/icons/3d-avatar.png" alt="3D数字人">
              </div>
              <div class="card-info">
                <h3>3D数字人生成</h3>
                <p>一句话生成3D数字人</p>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="feature-card blue-light" @click="handleNavigate('/digitalHuman/voice')">
            <div class="card-content">
              <div class="card-icon">
                <img src="@/assets/icons/voice.png" alt="声音克隆">
              </div>
              <div class="card-info">
                <h3>声音克隆</h3>
                <p>上传音频克隆声音</p>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 功能选项卡 -->
    <div class="function-tabs">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="数字人直播" name="live">
          <div class="tab-content">
            <div class="left-section">
              <h3>一键开播，让数字人替你直播，轻松实现24小时不间断直播</h3>
              <div class="statistics">
                <span>累计直播时长</span>
                <div class="number">1,234,567小时</div>
              </div>
              <el-button type="primary" class="quick-start" @click="handleNavigate('/digitalHuman/live-workspace')">开始直播</el-button>
            </div>
            <div class="right-section">
              <img src="https://via.placeholder.com/600x400?text=Live+Streaming+Preview" alt="live-preview">
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="数字人视频" name="video">
          <div class="tab-content">
            <div class="left-section">
              <h3>智能生成数字人视频，一键批量制作，提升内容创作效率</h3>
              <div class="statistics">
                <span>累计生成视频</span>
                <div class="number">89,123个</div>
              </div>
              <el-button type="primary" class="quick-start" @click="handleNavigate('/digitalHuman/video-workspace')">制作视频</el-button>
            </div>
            <div class="right-section">
              <img src="https://via.placeholder.com/600x400?text=Video+Creation+Preview" alt="video-preview">
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="数字人对话" name="chat">
          <div class="tab-content">
            <div class="left-section">
              <h3>轻松构建有知识、有技能、有个性的新一代交互数字人，让交流更具新意，体验更智能</h3>
              <div class="statistics">
                <span>累计交互次数</span>
                <div class="number">586,770次</div>
              </div>
              <el-button type="primary" class="quick-start" @click="handleNavigate('/digitalHuman/chat-workspace')">快速接建</el-button>
            </div>
            <div class="right-section">
              <img src="https://via.placeholder.com/600x400?text=Digital+Human+Preview" alt="preview">
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 模板推荐区 -->
    <div class="template-section">
      <div class="section-header">
        <h3>推荐模板</h3>
        <div class="filter-tabs">
          <el-radio-group v-model="templateFilter">
            <el-radio-button label="all">全部</el-radio-button>
            <el-radio-button label="live">直播间</el-radio-button>
            <el-radio-button label="video">视频</el-radio-button>
            <el-radio-button label="chat">对话</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      
      <div class="template-grid">
        <el-row :gutter="20">
          <el-col :span="4" v-for="item in filteredTemplates" :key="item.id">
            <div class="template-card" @click="handleTemplateClick(item)">
              <img :src="item.image" :alt="item.title">
              <div class="template-info">
                <span class="tag">{{item.tag}}</span>
                <h4>{{item.title}}</h4>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DigitalHuman',
  data() {
    return {
      activeTab: 'chat',
      templateFilter: 'all',
      templates: [
        {
          id: 1,
          title: '茶艺师',
          tag: '休闲娱乐',
          image: 'https://via.placeholder.com/300x400?text=Tea+Master'
        },
        {
          id: 2,
          title: '奶茶双生',
          tag: '饮品饮料',
          image: 'https://via.placeholder.com/300x400?text=Milk+Tea'
        },
        {
          id: 3,
          title: '奶茶双生时光',
          tag: '饮品饮料',
          image: 'https://via.placeholder.com/300x400?text=Milk+Tea+Time'
        },
        {
          id: 4,
          title: '魅力瑜伽',
          tag: '运动健身',
          image: 'https://via.placeholder.com/300x400?text=Yoga'
        },
        {
          id: 5,
          title: '活力建设',
          tag: '运动健身',
          image: 'https://via.placeholder.com/300x400?text=Fitness'
        },
        {
          id: 6,
          title: '轻食健康餐',
          tag: '轻食健康',
          image: 'https://via.placeholder.com/300x400?text=Healthy+Food'
        }
      ]
    }
  },
  computed: {
    filteredTemplates() {
      if (this.templateFilter === 'all') {
        return this.templates;
      }
      return this.templates.filter(template => template.type === this.templateFilter);
    }
  },
  methods: {
    handleNavigate(path) {
      if (this.$route.path !== path) {
        this.$router.push(path);
      }
    },
    handleTemplateClick(template) {
      let path = '/digitalHuman/';
      switch(template.type) {
        case 'live':
          path += 'live-workspace';
          break;
        case 'video':
          path += 'video-workspace';
          break;
        case 'chat':
          path += 'chat-workspace';
          break;
        default:
          path += 'digital-avatar';
      }
      this.handleNavigate(path);
    }
  }
}
</script>

<style lang="scss" scoped>
.digital-human-container {
  padding: 20px;
  background: #f5f7fa;

  .promotion-banner {
    margin-bottom: 20px;
    border-radius: 8px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: auto;
    }
  }

  .feature-cards {
    margin-bottom: 24px;

    .feature-card {
      height: 120px;
      border-radius: 8px;
      padding: 24px;
      cursor: pointer;
      transition: all 0.3s;

      &.purple { background: linear-gradient(135deg, #e9d6ff, #d6b8ff); }
      &.blue { background: linear-gradient(135deg, #d6e4ff, #b8cfff); }
      &.cyan { background: linear-gradient(135deg, #d6f5ff, #b8edff); }
      &.blue-light { background: linear-gradient(135deg, #e6f4ff, #cce6ff); }

      .card-content {
        display: flex;
        align-items: center;
        gap: 16px;

        .card-icon {
          width: 48px;
          height: 48px;
          
          img {
            width: 100%;
            height: 100%;
          }
        }

        .card-info {
          h3 {
            margin: 0 0 8px;
            font-size: 16px;
            color: #1d2129;
          }

          p {
            margin: 0;
            font-size: 14px;
            color: #4e5969;
          }
        }
      }

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }
    }
  }

  .function-tabs {
    background: #fff;
    border-radius: 8px;
    padding: 24px;
    margin-bottom: 24px;

    .tab-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 40px 0;

      .left-section {
        flex: 1;
        padding-right: 60px;

        h3 {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 24px;
          color: #1d2129;
        }

        .statistics {
          margin-bottom: 24px;

          span {
            font-size: 14px;
            color: #4e5969;
          }

          .number {
            font-size: 24px;
            font-weight: bold;
            color: #1d2129;
            margin-top: 8px;
          }
        }

        .quick-start {
          padding: 12px 24px;
        }
      }

      .right-section {
        flex: 1;
        
        img {
          width: 100%;
          height: auto;
        }
      }
    }
  }

  .template-section {
    background: #fff;
    border-radius: 8px;
    padding: 24px;

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;

      h3 {
        margin: 0;
        font-size: 16px;
        color: #1d2129;
      }
    }

    .template-grid {
      .template-card {
        border-radius: 8px;
        overflow: hidden;
        transition: all 0.3s;

        img {
          width: 100%;
          height: 160px;
          object-fit: cover;
        }

        .template-info {
          padding: 12px;

          .tag {
            font-size: 12px;
            color: #86909c;
          }

          h4 {
            margin: 8px 0 0;
            font-size: 14px;
            color: #1d2129;
          }
        }

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
      }
    }
  }
}
</style>