<template>
  <div class="digital-human">
    <!-- 顶部横幅 -->
    <div class="digital-human-banner">
      <div class="banner-overlay">
        <div class="particles"></div>
      </div>
      <div class="banner-content">
        <h1>AI数字人定制</h1>
        <p>打造专属于您的品牌数字代言人</p>
        <div class="banner-stats">
          <div class="stat-item">
            <div class="stat-number">
              <span class="number">10000</span>
              <span class="plus">+</span>
            </div>
            <div class="stat-label">服务客户</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">98%</div>
            <div class="stat-label">好评率</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">24h</div>
            <div class="stat-label">响应时间</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 效果展示区域 -->
    <div class="digital-human-showcase floating-section">
      <div class="section-title">
        <i class="el-icon-video-camera"></i>
        <span>效果展示</span>
        <small>真实案例展示，所见即所得</small>
      </div>
      <div class="showcase-grid">
        <div class="showcase-item" 
          v-for="(item, index) in demoList" 
          :key="index"
          @click="handlePlayVideo(item)"
        >
          <div class="video-wrapper">
            <video 
              :src="item.video"
              :poster="item.poster"
              width="135"
              height="240"
            ></video>
            <div class="video-mask">
              <i class="el-icon-video-play"></i>
              <span>点击播放</span>
            </div>
            <div class="video-tag" v-if="item.tag">{{item.tag}}</div>
          </div>
          <div class="showcase-info">
            <div class="showcase-name">{{item.name}}</div>
            <div class="showcase-desc">{{item.description}}</div>
            <div class="showcase-tags">
              <el-tag 
                v-for="(tag, tagIndex) in item.features" 
                :key="tagIndex"
                size="small"
                effect="plain"
                :type="getTagType(tagIndex)"
              >
                {{tag}}
              </el-tag>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 功能介绍区域 -->
    <div class="digital-human-features floating-section">
      <div class="section-title">
        <i class="el-icon-star-on"></i>
        <span>核心优势</span>
        <small>专业技术团队，为您提供全方位服务</small>
      </div>
      <div class="features-grid">
        <div class="feature-item" v-for="(item, index) in introList" :key="index">
          <div class="feature-icon">
            <i :class="item.icon"></i>
          </div>
          <div class="feature-content">
            <h3>{{item.title}}</h3>
            <p>{{item.subtitle}}</p>
          </div>
          <div class="bg" :class="'bg' + (index + 1)"></div>
        </div>
      </div>
    </div>

    <!-- 应用场景 -->
    <div class="digital-human-scenarios floating-section">
      <div class="section-title">
        <i class="el-icon-connection"></i>
        <span>应用场景</span>
        <small>多场景覆盖，助力品牌营销</small>
      </div>
      <div class="scenarios-grid">
        <div class="scenario-item" v-for="(item, index) in scenarios" :key="index">
          <div class="scenario-icon">
            <i :class="item.icon"></i>
          </div>
          <div class="scenario-content">
            <h4>{{item.title}}</h4>
            <p>{{item.desc}}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 联系区域 -->
    <div class="digital-human-contact floating-section">
      <div class="contact-content">
        <div class="contact-left">
          <div class="section-title">
            <i class="el-icon-service"></i>
            <span>立即咨询</span>
            <small>专业客服团队，7*24小时在线服务</small>
          </div>
          <div class="service-features">
            <div class="service-item">
              <i class="el-icon-user"></i>
              <div class="service-text">
                <h4>形象定制</h4>
                <p>专业团队一对一服务，打造独特数字人形象</p>
              </div>
            </div>
            <div class="service-item">
              <i class="el-icon-video-camera"></i>
              <div class="service-text">
                <h4>动作设计</h4>
                <p>自然流畅的动作系统，真实表情互动</p>
              </div>
            </div>
            <div class="service-item">
              <i class="el-icon-picture"></i>
              <div class="service-text">
                <h4>场景搭建</h4>
                <p>多样化场景模板，满足不同行业需求</p>
              </div>
            </div>
            <div class="service-item">
              <i class="el-icon-microphone"></i>
              <div class="service-text">
                <h4>语音合成</h4>
                <p>自然清晰的声音，支持多语言配音</p>
              </div>
            </div>
            <div class="service-item">
              <i class="el-icon-data-line"></i>
              <div class="service-text">
                <h4>效果优化</h4>
                <p>专业后期团队，确保最佳播出效果</p>
              </div>
            </div>
            <div class="service-item">
              <i class="el-icon-time"></i>
              <div class="service-text">
                <h4>快速交付</h4>
                <p>高效制作流程，按时保质交付</p>
              </div>
            </div>
          </div>
          <div class="contact-desc">
            <div class="desc-item">
              <i class="el-icon-medal"></i>
              <span>专业定制团队，十年行业经验</span>
            </div>
            <div class="desc-item">
              <i class="el-icon-chat-line-round"></i>
              <span>一对一专属服务，全程跟进指导</span>
            </div>
            <div class="desc-item">
              <i class="el-icon-magic-stick"></i>
              <span>AI驱动技术，高品质输出保证</span>
            </div>
            <div class="desc-item">
              <i class="el-icon-thumb"></i>
              <span>终身免费维护，持续优化升级</span>
            </div>
          </div>
        </div>
        <div class="contact-right">
          <div class="qrcode-wrapper">
            <img src="@/assets/imgs/digital-human/qrcode.jpg" alt="客服二维码">
            <div class="scan-tip">
              <i class="el-icon-mobile-phone"></i>
              <span>扫码添加客服</span>
            </div>
            <p class="contact-note">专业顾问为您提供详细解决方案</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 视频播放弹窗 -->
    <el-dialog
      :visible.sync="videoDialogVisible"
      width="800px"
      custom-class="video-dialog"
      :show-close="false"
      @close="handleCloseVideo"
    >
      <div class="video-player">
        <video 
          ref="videoPlayer"
          :src="currentVideo.video"
          controls
          autoplay
        ></video>
      </div>
      <div class="video-info">
        <h3>{{currentVideo.name}}</h3>
        <p>{{currentVideo.description}}</p>
        <div class="video-tags" v-if="currentVideo.features">
          <el-tag 
            v-for="(tag, index) in currentVideo.features" 
            :key="index"
            size="small"
            effect="plain"
          >
            {{tag}}
          </el-tag>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseVideo">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import xjhuman1 from '@/assets/videos/digital-human/xjhuman1.mp4'

export default {
  name: 'DigitalHuman',
  data() {
    return {
      demoList: [
        { 
          name: '凡宇无桌坐姿',
          video: xjhuman1,
          description: '自然流畅的坐姿展示，适合直播带货场景',
          tag: '热门',
          features: ['自然流畅', '真实感强', '表情丰富']
        },
        { 
          name: '柏翰无桌坐姿',
          video: xjhuman1,
          description: '专业稳重的形象展示，适合企业宣传',
          tag: '推荐',
          features: ['专业', '稳重', '企业宣传']
        },
        { 
          name: '凡宇营销站姿',
          video: xjhuman1,
          description: '活力四射的站姿展示，适合产品推广',
          tag: '热门',
          features: ['活力四射', '站姿展示', '产品推广']
        }
      ],
      introList: [
        {
          icon: 'el-icon-cpu',
          title: '强大算力支持',
          subtitle: '依托国内顶级GPU集群',
          description: '千卡级算力集群，支持高并发渲染'
        },
        {
          icon: 'el-icon-magic-stick',
          title: 'AI驱动技术',
          subtitle: '领先的深度学习模型',
          description: '自研AI算法，精准捕捉表情与动作'
        },
        {
          icon: 'el-icon-data-line',
          title: '高效生产力',
          subtitle: '快速生成优质内容',
          description: '10分钟内完成视频制作，效率提升300%'
        },
        {
          icon: 'el-icon-picture-outline',
          title: '场景定制化',
          subtitle: '丰富的场景模板',
          description: '支持多场景自由切换，满足不同需求'
        },
        {
          icon: 'el-icon-video-camera',
          title: '真实表现力',
          subtitle: '超高清画质输出',
          description: '支持4K分辨率，细节真实自然'
        },
        {
          icon: 'el-icon-connection',
          title: '多平台适配',
          subtitle: '全渠道内容分发',
          description: '支持主流短视频平台一键发布'
        },
        {
          icon: 'el-icon-data-analysis',
          title: '数据分析能力',
          subtitle: '智能效果评估',
          description: '实时数据追踪，优化投放策略'
        },
        {
          icon: 'el-icon-umbrella',
          title: '版权保护',
          subtitle: '内容安全保障',
          description: '完善的版权体系，确保内容安全合规'
        }
      ],
      scenarios: [
  {
    icon: 'el-icon-shopping-cart-full',
    title: '电商直播',
    desc: '24小时不间断直播带货',
    detail: '智能商品讲解，提升转化率'
  },
  {
    icon: 'el-icon-office-building',
    title: '企业宣传',
    desc: '品牌形象代言',
    detail: '专业化形象展示，提升品牌价值'
  },
  {
    icon: 'el-icon-school',
    title: '在线教育',
    desc: '智能教学助手',
    detail: '个性化课程讲解，提升学习效果'
  },
  {
    icon: 'el-icon-guide',
    title: '景区导览',
    desc: '全天候讲解服务',
    detail: '多语言支持，提供专业讲解'
  },
  {
    icon: 'el-icon-mic',
    title: '新闻播报',
    desc: '智能新闻主播',
    detail: '及时准确传递资讯'
  },
  {
    icon: 'el-icon-film',
    title: '影视创作',
    desc: '虚拟演员制作',
    detail: '降低制作成本，提升创作效率'
  },
  {
    icon: 'el-icon-headset',
    title: '客服支持',
    desc: '智能客服助手',
    detail: '7*24小时在线服务'
  },
  {
    icon: 'el-icon-data-board',
    title: '数据展示',
    desc: '数据可视化讲解',
    detail: '生动形象展示数据分析结果'
  }
],
      videoDialogVisible: false,
      currentVideo: {}
    }
  },
  methods: {
    handlePlayVideo(video) {
      this.currentVideo = video
      this.videoDialogVisible = true
    },
    handleCloseVideo() {
      this.videoDialogVisible = false
      if (this.$refs.videoPlayer) {
        this.$refs.videoPlayer.pause()
      }
    },
    getTagType(index) {
      const types = ['', 'success', 'warning', 'danger', 'info'];
      return types[index % types.length];
    }
  }
}
</script>

<style lang="scss" scoped>
.digital-human {
  padding: 40px;

  .digital-human-banner {
    height: 300px;
    position: relative;
    overflow: hidden;
    margin: -40px -40px 40px;

    .banner-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, #000428, #004e92);
      opacity: 0.9;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
          radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 20%),
          radial-gradient(circle at 80% 30%, rgba(255,255,255,0.1) 0%, transparent 20%);
        animation: pulse 4s infinite;
      }
    }

    .banner-content {
      position: relative;
      z-index: 2;
      text-align: center;
      padding-top: 40px;

      h1 {
        font-size: 32px;
        margin-bottom: 15px;
        background: linear-gradient(to right, #fff, #87ceeb);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      p {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }

  .section-title {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    padding: 0 40px;
    
    i {
      font-size: 32px;
      color: #1890ff;
      margin: 0 20px;
      filter: drop-shadow(0 2px 4px rgba(24,144,255,0.3));
      transform: translateZ(0);
      transition: transform 0.3s;

      &:hover {
        transform: scale(1.1) translateZ(0);
      }
    }
    
    span {
      font-size: 20px;
      font-weight: bold;
    }

    small {
      margin-left: 10px;
      font-size: 14px;
      color: #909399;
      font-weight: normal;
    }
  }

  .digital-human-showcase,
  .digital-human-features,
  .digital-human-scenarios,
  .digital-human-contact {
    .section-title {
      // 继承统一样式
    }
  }

  .digital-human-showcase {
    padding: 30px 40px;

    .showcase-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 20px;
      padding: 0 40px;
      
      .showcase-item {
        .video-wrapper {
          width: 135px;
          height: 240px;
          margin: 0 auto;
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          background: #000;
          
          video {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .video-mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: all 0.3s;
            cursor: pointer;

            i {
              font-size: 36px;
              color: #fff;
              margin-bottom: 10px;
            }

            span {
              color: #fff;
              font-size: 12px;
            }
          }

          &:hover .video-mask {
            opacity: 1;
          }

          .video-tag {
            position: absolute;
            top: 10px;
            right: 10px;
            background: linear-gradient(135deg, #ff4e50, #f9d423);
            color: white;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 12px;
            z-index: 2;
          }
        }

        .showcase-info {
          padding: 15px;
          text-align: center;
          
          .showcase-name {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 5px;
            color: #303133;
          }
          
          .showcase-desc {
            font-size: 12px;
            color: #909399;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          .showcase-tags {
            margin-top: 10px;
            display: flex;
            flex-wrap: wrap;
            gap: 5px;

            .el-tag {
              margin-right: 5px;
              margin-bottom: 5px;
              
              &.el-tag--success {
                color: #67C23A;
                background: rgba(103, 194, 58, 0.1);
                border-color: rgba(103, 194, 58, 0.2);
              }
              
              &.el-tag--warning {
                color: #E6A23C;
                background: rgba(230, 162, 60, 0.1);
                border-color: rgba(230, 162, 60, 0.2);
              }
              
              &.el-tag--danger {
                color: #F56C6C;
                background: rgba(245, 108, 108, 0.1);
                border-color: rgba(245, 108, 108, 0.2);
              }
              
              &.el-tag--info {
                color: #909399;
                background: rgba(144, 147, 153, 0.1);
                border-color: rgba(144, 147, 153, 0.2);
              }
            }
          }
        }
      }
    }
  }

  .digital-human-features {
    .features-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;

      .feature-item {
        position: relative;
        padding: 30px 20px;
        border-radius: 8px;
        overflow: hidden;
        text-align: center;

        .feature-icon {
          margin-bottom: 20px;
          
          i {
            font-size: 36px;
            color: #1890ff;
          }
        }

        .feature-content {
          position: relative;
          z-index: 1;

          h3 {
            margin-bottom: 10px;
            font-size: 18px;
          }

          p {
            color: #666;
            line-height: 1.6;
          }
        }

        .bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.1;
          transition: all 0.3s;
        }

        &:hover .bg {
          opacity: 0.2;
        }
      }
    }
  }

  .digital-human-scenarios {
    .scenarios-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;

      .scenario-item {
        text-align: center;
        padding: 20px;
        border-radius: 8px;
        transition: all 0.3s;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 2px 12px rgba(0,0,0,0.1);
        }

        .scenario-icon {
          i {
            font-size: 40px;
            color: #1890ff;
          }
        }

        .scenario-content {
          margin-top: 15px;

          h4 {
            margin-bottom: 8px;
            font-size: 16px;
          }

          p {
            color: #666;
            font-size: 14px;
          }
        }
      }
    }
  }

  .digital-human-contact {
    .contact-content {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .contact-left {
        flex: 1;
        padding-right: 50px;

        .service-features {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin: 20px 0;

          .service-item {
            display: flex;
            align-items: center;
            
            i {
              color: #67C23A;
              margin-right: 8px;
            }
          }
        }

        .contact-desc {
          p {
            color: #666;
            margin-bottom: 20px;
          }
        }
      }

      .contact-right {
        text-align: center;

        .qrcode-wrapper {
          width: 200px;
          height: 200px;
          margin-bottom: 15px;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .scan-tip {
          font-size: 16px;
          margin-bottom: 5px;

          i {
            color: #67C23A;
            margin-right: 8px;
          }
        }
      }
    }
  }

  // 添加浮动效果的通用样式
  .floating-section {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s;
    margin-bottom: 25px;
    backdrop-filter: blur(10px);
    padding: 30px 40px;
    position: relative;
    z-index: 1;

    &:hover {
      transform: translateY(-5px);
    }

    .section-title {
      display: flex;
      align-items: center;
      margin-bottom: 30px;
      
      i {
        font-size: 32px;
        color: #1890ff;
        margin-right: 20px;
        filter: drop-shadow(0 2px 4px rgba(24,144,255,0.3));
        transform: translateZ(0);
        transition: transform 0.3s;

        &:hover {
          transform: scale(1.1) translateZ(0);
        }
      }
      
      span {
        font-size: 20px;
        font-weight: bold;
      }

      small {
        margin-left: 10px;
        font-size: 14px;
        color: #909399;
        font-weight: normal;
      }
    }

    .features-grid,
    .scenarios-grid,
    .contact-content {
      padding: 0 20px;
    }
  }

  // 添加粒子动画效果
  .particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 20%),
      radial-gradient(circle at 80% 30%, rgba(255,255,255,0.1) 0%, transparent 20%);
    animation: particleMove 20s infinite linear;
  }

  @keyframes particleMove {
    0% {
      transform: translateY(0) rotate(0deg);
    }
    100% {
      transform: translateY(-100px) rotate(360deg);
    }
  }
}

// 视频播放弹窗样式
.video-dialog {
  .video-player {
    width: 100%;
    background: #000;
    border-radius: 8px;
    overflow: hidden;

    video {
      width: 100%;
      max-height: 70vh;
      object-fit: contain;
    }
  }

  .video-info {
    margin-top: 15px;
    padding: 0 20px;

    h3 {
      font-size: 18px;
      margin-bottom: 10px;
    }

    p {
      color: #666;
      line-height: 1.6;
    }

    .video-tags {
      margin-top: 10px;
      
      .el-tag {
        margin-right: 8px;
        margin-bottom: 8px;
      }
    }
  }
}

@keyframes pulse {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.5;
  }
}

.banner-stats {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 60px;

  .stat-item {
    .stat-number {
      font-size: 36px;
      font-weight: bold;
      color: #fff;
      text-shadow: 0 2px 10px rgba(0,0,0,0.2);
      display: flex;
      align-items: baseline;

      .number {
        background: linear-gradient(to bottom, #fff, #87ceeb);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .plus {
        font-size: 24px;
        margin-left: 2px;
        color: #87ceeb;
      }
    }

    .stat-label {
      margin-top: 8px;
      font-size: 16px;
      color: rgba(255,255,255,0.8);
    }
  }
}

.digital-human-contact {
  .contact-content {
    .contact-left {
      .service-features {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        margin: 30px 0;

        .service-item {
          display: flex;
          align-items: flex-start;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 8px;
          transition: all 0.3s;
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 2px 12px rgba(0,0,0,0.1);
          }

          i {
            font-size: 24px;
            color: #409EFF;
            margin-right: 12px;
            margin-top: 2px;
          }

          .service-text {
            flex: 1;

            h4 {
              font-size: 16px;
              color: #303133;
              margin-bottom: 6px;
            }

            p {
              font-size: 13px;
              color: #909399;
              line-height: 1.4;
            }
          }
        }
      }

      .contact-desc {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        margin-top: 30px;
        padding: 20px;
        background: linear-gradient(135deg, #f0f7ff 0%, #e6f3ff 100%);
        border-radius: 8px;

        .desc-item {
          display: flex;
          align-items: center;
          
          i {
            font-size: 20px;
            color: #409EFF;
            margin-right: 10px;
          }

          span {
            font-size: 14px;
            color: #606266;
          }
        }
      }
    }

    .contact-right {
      .qrcode-wrapper {
        .contact-note {
          margin-top: 10px;
          color: #909399;
          font-size: 13px;
        }
      }
    }
  }
}
</style> 