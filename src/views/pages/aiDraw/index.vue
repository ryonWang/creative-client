<template>
  <div class="dashboard">
    <!-- 顶部快速入口卡片 -->
    <el-row :gutter="20" class="mb-4">
      <el-col :xs="24" :sm="12" :md="6" v-for="(item, index) in quickEntries" :key="index">
        <div class="quick-entry-card" :style="{ backgroundImage: item.gradient }">
          <div class="quick-entry-content">
            <i :class="item.icon"></i>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 热门分类 -->
    <h2 class="section-title">
      <i class="el-icon-star-on"></i>
      热门分类
    </h2>
    <el-row :gutter="20" class="mb-4">
      <el-col :xs="24" :sm="12" :md="6" v-for="(item, index) in categories" :key="index">
        <div class="category-card">
          <div class="card-images">
            <img :src="item.before" class="before-img">
            <img :src="item.after" class="after-img">
          </div>
          <div class="card-info">
            <div class="card-title">
              <i :class="item.icon"></i>
              {{item.title}}
            </div>
            <div class="card-desc">{{item.desc}}</div>
            <el-button type="primary" size="small" round>
              立即使用
              <i class="el-icon-arrow-right"></i>
            </el-button>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- AI工具箱 -->
    <h2 class="section-title">
      <i class="el-icon-magic-stick"></i>
      AI工具箱
    </h2>
    <el-row :gutter="20" class="mb-4">
      <el-col :xs="24" :sm="12" :md="8" v-for="(tool, index) in tools" :key="index">
        <el-card class="tool-card" shadow="hover" :body-style="{ background: tool.gradient }">
          <div class="tool-header">
            <i :class="tool.icon"></i>
            <div class="tool-tags">
              <el-tag v-for="tag in tool.tags" :key="tag.text" :type="tag.type" size="mini">
                {{ tag.text }}
              </el-tag>
            </div>
          </div>
          <div class="tool-content">
            <h3>{{tool.name}}</h3>
            <p>{{tool.desc}}</p>
            <div class="tool-features">
              <span v-for="(feature, idx) in tool.features" :key="idx">
                <i :class="feature.icon"></i>
                {{ feature.text }}
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 优秀案例展示 -->
    <h2 class="section-title">
      <i class="el-icon-picture"></i>
      优秀案例
      <div class="section-tabs">
        <el-radio-group v-model="currentTab" size="small">
          <el-radio-button v-for="tab in tabs" :key="tab" :label="tab"></el-radio-button>
        </el-radio-group>
      </div>
    </h2>
    
    <el-row :gutter="16" class="gallery-grid">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="(example, index) in examples" :key="index">
        <el-card class="example-card" shadow="hover">
          <el-image 
            :src="example.image" 
            fit="cover"
            :preview-src-list="[example.image]"
          >
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
          <div class="example-info">
            <h4>{{ example.title }}</h4>
            <p>{{ example.desc }}</p>
            <div class="example-actions">
              <el-button type="text" icon="el-icon-download">下载</el-button>
              <el-button type="text" icon="el-icon-star-off">收藏</el-button>
              <el-button type="text" icon="el-icon-share">分享</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AiDraw',
  data() {
    return {
      quickEntries: [
        {
          title: '一键抠图',
          desc: '智能识别主体，快速抠图',
          icon: 'el-icon-scissors',
          gradient: 'linear-gradient(135deg, #FF6B6B 10%, #FF8E53 100%)'
        },
        {
          title: '风格迁移',
          desc: '一键转换图片艺术风格',
          icon: 'el-icon-magic-stick',
          gradient: 'linear-gradient(135deg, #4ECDC4 10%, #45B7AF 100%)'
        },
        {
          title: '智能修图',
          desc: '自动优化图片质量',
          icon: 'el-icon-picture',
          gradient: 'linear-gradient(135deg, #A177FF 10%, #7C5CFF 100%)'
        },
        {
          title: '批量处理',
          desc: '批量处理图片更高效',
          icon: 'el-icon-files',
          gradient: 'linear-gradient(135deg, #FFB347 10%, #FFCC33 100%)'
        }
      ],
      categories: [
        {
          title: '人台图',
          desc: '假模生成真人图',
          icon: 'el-icon-user',
          before: require('@/assets/imgs/user_img_default1.png'),
          after: require('@/assets/imgs/user_img_default2.png')
        },
        // ... 其他分类
      ],
      tools: [
        {
          name: '替换背景',
          desc: '智能识别主体，一键替换背景',
          icon: 'el-icon-picture-outline',
          gradient: 'linear-gradient(135deg, #FF6B6B 10%, #FF8E53 100%)',
          tags: [
            { text: '智能', type: 'success' },
            { text: '高效', type: 'warning' }
          ],
          features: [
            { icon: 'el-icon-magic-stick', text: '智能抠图' },
            { icon: 'el-icon-picture', text: '场景库' },
            { icon: 'el-icon-refresh', text: '批量处理' }
          ],
          usageCount: '12,354',
          successRate: '98%'
        },
        {
          name: '消除笔',
          desc: '一键消除多余部分，完美修复',
          icon: 'el-icon-delete',
          gradient: 'linear-gradient(135deg, #4ECDC4 10%, #45B7AF 100%)',
          tags: [
            { text: '精准', type: 'primary' },
            { text: '便捷', type: 'success' }
          ],
          features: [
            { icon: 'el-icon-aim', text: '智能识别' },
            { icon: 'el-icon-brush', text: '修复增强' },
            { icon: 'el-icon-refresh-right', text: '一键还原' }
          ],
          usageCount: '8,766',
          successRate: '95%'
        },
        {
          name: '高清放大',
          desc: '图片无损放大，细节更清晰',
          icon: 'el-icon-zoom-in',
          gradient: 'linear-gradient(135deg, #A177FF 10%, #7C5CFF 100%)',
          tags: [
            { text: '超清', type: 'danger' },
            { text: '无损', type: 'info' }
          ],
          features: [
            { icon: 'el-icon-full-screen', text: '2-8倍放大' },
            { icon: 'el-icon-picture-outline', text: '细节增强' },
            { icon: 'el-icon-finished', text: '去噪锐化' }
          ],
          usageCount: '15,987',
          successRate: '99%'
        }
      ],
      currentTab: '全部',
      tabs: ['全部', '人台图', '真人图', '鞋靴图', '箱包图', '替换背景'],
      examples: [
        {
          image: require('@/assets/imgs/user_img_default1.png'),
          title: '时尚街拍风',
          desc: '街拍风格人像摄影',
          views: '12.5k',
          likes: '2.3k',
          downloads: '856'
        },
        {
          image: require('@/assets/imgs/user_img_default2.png'),
          title: '商品展示图',
          desc: '电商产品展示',
          views: '8.9k',
          likes: '1.8k',
          downloads: '634'
        },
        {
          image: require('@/assets/imgs/user_img_default1.png'),
          title: '场景合成',
          desc: '创意场景合成作品',
          views: '15.2k',
          likes: '3.1k',
          downloads: '1,243'
        },
        {
          image: require('@/assets/imgs/user_img_default2.png'),
          title: '人像精修',
          desc: '专业人像精修效果',
          views: '10.7k',
          likes: '2.5k',
          downloads: '987'
        }
      ]
    }
  }
}
</script>
<style scoped>
.dashboard {
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
}

.mb-4 {
  margin-bottom: 24px;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  margin: 32px 0 20px;
  display: flex;
  align-items: center;
  color: #303133;
}

.section-title i {
  margin-right: 8px;
  color: #409EFF;
}

/* 快速入口卡片样式 */
.quick-entry-card {
  height: 140px;
  border-radius: 12px;
  padding: 20px;
  color: white;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
}

.quick-entry-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}

.quick-entry-content {
  position: relative;
  z-index: 1;
}

.quick-entry-content i {
  font-size: 32px;
  margin-bottom: 12px;
}

.quick-entry-content h3 {
  font-size: 18px;
  margin: 0 0 8px;
}

.quick-entry-content p {
  font-size: 14px;
  margin: 0;
  opacity: 0.9;
}

/* 分类卡片样式 */
.category-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

/* 工具卡片样式 */
.tool-card {
  height: 100%;
  color: white;
  border: none;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  position: relative;
}

.tool-card .el-card__body {
  padding: 24px;
  height: 100%;
  position: relative;
  z-index: 1;
}

/* 添加渐变背景和花纹效果 */
.tool-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.1) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.1) 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  opacity: 0.1;
}

/* 添加光晕效果 */
.tool-card::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
  transform: rotate(30deg);
}

/* 修改工具卡片悬浮效果 */
.tool-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.15);
}

.tool-card:hover::before {
  animation: patternMove 20s linear infinite;
}

@keyframes patternMove {
  0% {
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  }
  100% {
    background-position: 20px 20px, 20px 30px, 30px 10px, 10px 20px;
  }
}

.tool-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.tool-header i {
  font-size: 32px;
  margin-right: 16px;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.2);
}

.tool-content {
  position: relative;
  z-index: 1;
}

.tool-content h3 {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 12px;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.2);
}

.tool-content p {
  font-size: 14px;
  margin: 0 0 16px;
  opacity: 0.9;
}

.tool-features {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
}

.tool-features span {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255,255,255,0.15);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  backdrop-filter: blur(5px);
  transition: all 0.3s;
}

.tool-features span:hover {
  background: rgba(255,255,255,0.25);
  transform: translateY(-2px);
}

.tool-stats {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid rgba(255,255,255,0.2);
}

.tool-stat-item {
  text-align: center;
}

.tool-stat-value {
  font-size: 18px;
  font-weight: 600;
}

.tool-stat-label {
  font-size: 12px;
  opacity: 0.8;
}

/* 案例展示样式 */
.example-card {
  margin-bottom: 20px;
}

.example-info {
  padding: 12px;
}

.example-actions {
  display: flex;
  justify-content: space-around;
  margin-top: 12px;
  border-top: 1px solid #eee;
  padding-top: 12px;
}

/* 添加更多动画和过渡效果 */
.tool-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}

.el-image {
  transition: all 0.3s;
}

.el-image:hover {
  transform: scale(1.05);
}

/* 响应式调整 */
@media screen and (max-width: 768px) {
  .dashboard {
    padding: 10px;
  }
  
  .quick-entry-card {
    height: 120px;
  }
}
</style>

