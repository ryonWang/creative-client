<template>
  <div class="dashboard">
    <el-row :gutter="20" class="mb-4">
      <el-col :xs="24" :sm="12" :md="6" v-for="(item, index) in quickEntries" :key="index">
        <div class="quick-entry-card" :style="{ backgroundImage: `url(${item.image})` }">
          <div class="quick-entry-content">
            <i :class="item.icon"></i>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </el-col>
    </el-row>

    <h2 class="section-title">
      <i class="el-icon-star-on"></i>
      热门功能
    </h2>
    <el-row :gutter="35" class="mb-4">
      <el-col :xs="24" :sm="12" :md="8" v-for="(module, index) in hotModules" :key="index" class="mb-4">
        <el-card 
          shadow="hover" 
          class="hot-module-card"
          :style="{ background: module.gradient }"
          @click="navigateToModule(module.route)"
        >
          <div class="hot-module-icon">
            <i :class="module.icon"></i>
            <div class="module-tags">
              <el-tag 
                v-for="(tag, tagIndex) in module.tags" 
                :key="tagIndex"
                :type="tag.type"
                size="mini"
              >
                {{ tag.text }}
              </el-tag>
            </div>
          </div>
          <div class="hot-module-content">
            <h3>{{ module.title }}</h3>
            <p>{{ module.description }}</p>
            <div class="module-features">
              <span v-for="(feature, featureIndex) in module.features" :key="featureIndex">
                <i :class="feature.icon"></i>
                {{ feature.text }}
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <h2 class="section-title">
      <i class="el-icon-data-line"></i>
      核心数据
    </h2>
    <el-card shadow="hover" class="core-data-card">
      <div slot="header" class="clearfix">
        <el-select v-model="selectedTable" placeholder="选择数据类型" @change="updateChartData">
          <el-option
            v-for="(table, index) in coreTables"
            :key="index"
            :label="table.title"
            :value="index">
          </el-option>
        </el-select>
        <el-radio-group v-model="coreTables[selectedTable].activePeriod" size="small" class="float-right" @change="updateChartData">
          <el-radio-button v-for="(period, periodIndex) in coreTables[selectedTable].periods" :key="periodIndex" :label="period.value">
            {{ period.label }}
          </el-radio-button>
        </el-radio-group>
      </div>
      <el-row :gutter="20">
        <el-col :span="4" v-for="(metric, metricIndex) in coreTables[selectedTable].metrics" :key="metricIndex">
          <div class="metric-item" @click="selectMetric(metricIndex)">
            <div :class="['metric-value', { 'highlighted': metric.highlighted }]">{{ metric.value }}</div>
            <div :class="['metric-label', { 'active': selectedMetricIndex === metricIndex }]">{{ metric.label }}</div>
          </div>
        </el-col>
      </el-row>
      <div class="chart-container">
        <v-chart 
          :option="chartOptions" 
          :autoresize="true"
          style="width: 100%; height: 100%;"
        />
      </div>
    </el-card>

    <h2 class="section-title">精选行业视频</h2>
    <el-row :gutter="20" class="mb-4">
      <el-col :xs="24" :sm="12" :md="8" :lg="4" v-for="(video, index) in featuredVideos" :key="index">
        <el-card shadow="hover" :body-style="{ padding: '0px' }" class="video-card">
          <el-image :src="video.thumbnail" :alt="video.title" fit="cover" class="video-thumbnail"></el-image>
          <div style="padding: 14px;">
            <h3 class="video-title">{{ video.title }}</h3>
            <p class="video-views">{{ video.views }} 播放</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <h2 class="section-title">客户案例</h2>
    <el-card shadow="hover">
      <div class="empty-content">暂无客户案例</div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTable: 0, // 默认选择第一个表
      quickEntries: [
        {
          title: '素材管理',
          description: '包括的图像素材和交互式存储，不丢失',
          icon: 'el-icon-picture-outline',
          image: require('@/assets/imgs/dashboard-card-pg.png')
        },
        {
          title: '视频进阶',
          description: '1000条视频模板一分钟成视频，智能生成',
          icon: 'el-icon-video-camera',
          image: require('@/assets/imgs/dashboard-card-pg.png')
        },
        {
          title: '短视频分发',
          description: '一键多号发布，支持定发布和关键词分发',
          icon: 'el-icon-share',
          image: require('@/assets/imgs/dashboard-card-pg.png')
        },
        {
          title: '创意模板广场',
          description: '营销行业最新模板视频，轻松实现内容创作',
          icon: 'el-icon-goods',
          image: require('@/assets/imgs/dashboard-card-pg.png')
        }
      ],
      metricColors: {
        '抖音分发': '#FF6B6B',
        '新增粉丝': '#4ECDC4',
        '新增播放量': '#45B7D1',
        '新增点赞': '#96CEB4',
        '新增评论': '#FFEEAD',
        '快手分发': '#FF6B6B',
        '快手播放': '#45B7D1',
        '快手点赞': '#96CEB4',
        '快手评论': '#FFEEAD'
      },
      coreTables: [
        {
          title: '抖音数据',
          activePeriod: 'day',
          periods: [
            { label: '昨日', value: 'day' },
            { label: '最近7天', value: 'week' },
            { label: '最近30天', value: 'month' },
            { label: '自定义时间段', value: 'custom' },
          ],
          metrics: [
            { label: '抖音分发', value: '330', highlighted: true },
            { label: '新增粉丝', value: '20', highlighted: false },
            { label: '新增播放量', value: '1.2k', highlighted: false },
            { label: '新增点赞', value: '568', highlighted: false },
            { label: '新增评论', value: '128', highlighted: false },
          ]
        },
        {
          title: '快手数据',
          activePeriod: 'day',
          periods: [
            { label: '昨日', value: 'day' },
            { label: '最近7天', value: 'week' },
            { label: '最近30天', value: 'month' },
            { label: '自定义时间段', value: 'custom' },
          ],
          metrics: [
            { label: '快手分发', value: '286', highlighted: true },
            { label: '新增粉丝', value: '15', highlighted: false },
            { label: '新增播放量', value: '956', highlighted: false },
            { label: '新增点赞', value: '432', highlighted: false },
            { label: '新增评论', value: '96', highlighted: false },
          ]
        }
      ],
      featuredVideos: [
        { title: '美食视频推荐，产品特写', views: '15w', thumbnail: '/placeholder.svg?height=128&width=256' },
        { title: '真诚文案视频推荐', views: '17w', thumbnail: '/placeholder.svg?height=128&width=256' },
        { title: '活动餐饮店服务细节', views: '25w', thumbnail: '/placeholder.svg?height=128&width=256' },
        { title: '探店骨灰级店铺推荐', views: '20w', thumbnail: '/placeholder.svg?height=128&width=256' },
        { title: '地铁画面吸引', views: '18w', thumbnail: '/placeholder.svg?height=128&width=256' },
      ],
      hotModules: [
        {
          title: 'AI智能创作',
          description: '智能文案生成，一键生成多样化内容',
          icon: 'el-icon-cpu',
          gradient: 'linear-gradient(135deg, #FF00FF 10%, #00FFFF 100%)',
          tags: [
            { text: '智能', type: 'success' },
            { text: '高效', type: 'warning' }
          ],
          features: [
            { icon: 'el-icon-magic-stick', text: '智能生成' },
            { icon: 'el-icon-refresh', text: '批量处理' },
            { icon: 'el-icon-edit', text: '实时编辑' }
          ],
          route: '/ai-creation'
        },
        {
          title: '文案创作',
          description: '专业文案模板，助力内容创作灵感',
          icon: 'el-icon-edit-outline',
          gradient: 'linear-gradient(135deg, #00FFFF 10%, #FF69B4 100%)',
          tags: [
            { text: '热门', type: 'danger' },
            { text: '创意', type: 'warning' }
          ],
          features: [
            { icon: 'el-icon-collection', text: '模板库' },
            { icon: 'el-icon-share', text: '一键分发' },
            { icon: 'el-icon-data-line', text: '数据分析' }
          ],
          route: '/copywriting'
        },
        {
          title: '电商剪辑',
          description: '专业电商视频剪辑工具，快速出片',
          icon: 'el-icon-film',
          gradient: 'linear-gradient(135deg, #FF69B4 10%, #4169E1 100%)',
          tags: [
            { text: '专业', type: 'primary' },
            { text: '高清', type: 'success' }
          ],
          features: [
            { icon: 'el-icon-scissors', text: '智能剪辑' },
            { icon: 'el-icon-picture', text: '特效库' },
            { icon: 'el-icon-video-camera', text: '批量处理' }
          ],
          route: '/video-edit'
        },
        {
          title: '素材管理',
          description: '高效素材管理系统，资源永不丢失',
          icon: 'el-icon-folder-opened',
          gradient: 'linear-gradient(135deg, #FF00FF 10%, #00FFFF 100%)',
          tags: [
            { text: '云存储', type: 'info' },
            { text: '安全', type: 'success' }
          ],
          features: [
            { icon: 'el-icon-upload', text: '批量上传' },
            { icon: 'el-icon-folder', text: '分类管理' },
            { icon: 'el-icon-search', text: '智能检索' }
          ],
          route: '/material'
        },
        {
          title: '模板广场',
          description: '海量精选模板，一键套用生成',
          icon: 'el-icon-goods',
          gradient: 'linear-gradient(135deg, #4169E1 10%, #00FFFF 100%)',
          tags: [
            { text: '推荐', type: 'warning' },
            { text: '海量', type: 'success' }
          ],
          features: [
            { icon: 'el-icon-shopping-bag-1', text: '精选模板' },
            { icon: 'el-icon-download', text: '一键套用' },
            { icon: 'el-icon-star', text: '收藏夹' }
          ],
          route: '/template'
        },
        {
          title: '影视编剧',
          description: 'AI辅助编剧系统，灵感创意激发',
          icon: 'el-icon-notebook-2',
          gradient: 'linear-gradient(135deg, #FF00FF 10%, #4169E1 100%)',
          tags: [
            { text: '创新', type: 'danger' },
            { text: 'AI助手', type: 'primary' }
          ],
          features: [
            { icon: 'el-icon-reading', text: '剧本创作' },
            { icon: 'el-icon-chat-dot-round', text: '智能对话' },
            { icon: 'el-icon-connection', text: '情节分析' }
          ],
          route: '/script'
        }
      ],
      selectedMetricIndex: 0,
      chartOptions: {}
    }
  },
  methods: {
    selectMetric(index) {
      this.selectedMetricIndex = index;
      this.updateChartData();
    },
    updateChartData() {
      const table = this.coreTables[this.selectedTable];
      const period = table.activePeriod;
      const metric = table.metrics[this.selectedMetricIndex];
      
      let xAxisData = [];
      let seriesData = [];
      
      switch(period) {
        case 'day':
          xAxisData = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '23:59'];
          seriesData = this.generateRandomData(9, metric.label);
          break;
        case 'week':
          xAxisData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
          seriesData = this.generateRandomData(7, metric.label);
          break;
        case 'month':
          xAxisData = Array.from({length: 30}, (_, i) => `${i + 1}日`);
          seriesData = this.generateRandomData(30, metric.label);
          break;
        case 'custom':
          xAxisData = ['1月', '2月', '3月', '4月', '5月', '6月'];
          seriesData = this.generateRandomData(6, metric.label);
          break;
      }
      
      this.$set(this, 'chartOptions', {
        title: {
          text: `${table.title} - ${metric.label}趋势`,
          textStyle: {
            fontSize: 14,
            fontWeight: 'normal'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: (params) => {
            const data = params[0];
            const unit = this.getYAxisUnit(data.seriesName);
            return `${data.name}<br/>${data.seriesName}: ${data.value}${unit}`;
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
          axisLabel: {
            interval: 0,
            rotate: period === 'month' ? 45 : 0
          }
        },
        yAxis: {
          type: 'value',
          name: this.getYAxisName(metric.label),
          axisLabel: {
            formatter: (value) => {
              return value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value;
            }
          }
        },
        series: [{
          name: metric.label,
          type: 'bar',
          data: seriesData,
          itemStyle: {
            color: this.metricColors[metric.label] || '#409EFF',
            borderRadius: [4, 4, 0, 0]
          },
          barWidth: '40%',
          emphasis: {
            itemStyle: {
              color: this.getLighterColor(this.metricColors[metric.label] || '#409EFF')
            }
          }
        }]
      });
    },
    generateRandomData(length, metricType) {
      const platformMultiplier = this.selectedTable === 0 ? 1 : 0.8; // 快手数据基准值为抖音的80%
      
      const baseValues = {
        '抖音分发': { base: 300, variance: 100 },
        '新增粉丝': { base: 20, variance: 10 },
        '新增播放量': { base: 1000, variance: 300 },
        '新增点赞': { base: 500, variance: 150 },
        '新增评论': { base: 100, variance: 30 },
        '快手分发': { base: 250, variance: 80 },
        '新增粉丝': { base: 15, variance: 8 },
        '新增播放量': { base: 800, variance: 250 },
        '新增点赞': { base: 400, variance: 120 },
        '新增评论': { base: 80, variance: 25 }
      };
      
      const { base, variance } = baseValues[metricType] || { base: 100, variance: 30 };
      
      return Array.from({ length }, (_, index) => {
        const trend = Math.sin(index / length * Math.PI) * variance * 0.5;
        const random = Math.random() * variance;
        return Math.floor((base + trend + random) * platformMultiplier);
      });
    },
    getYAxisName(metricType) {
      const units = {
        '抖音分发': '次',
        '新增粉丝': '人',
        '新��播放量': '次',
        '新增点赞': '个',
        '新增评论': '条',
        '快手分发': '次',
        '新增粉丝': '人',
        '新增播放量': '次',
        '新增点赞': '个',
        '新增评论': '条'
      };
      return units[metricType] || '';
    },
    getLighterColor(color) {
      return color.replace(')', ', 0.8)').replace('rgb', 'rgba');
    },
    getYAxisUnit(metricType) {
      const units = {
        '抖音分发': '次',
        '新增粉丝': '人',
        '新增播放量': '次',
        '新增点赞': '个',
        '新增评论': '条',
        '快手分发': '次',
        '快手播放': '次',
        '快手点赞': '个',
        '快手评论': '条'
      };
      return units[metricType] || '';
    },
    navigateToModule(route) {
      this.$router.push(route);
    }
  },
  watch: {
    selectedMetricIndex() {
      this.updateChartData();
    },
    coreTables: {
      deep: true,
      handler() {
        this.updateChartData();
      }
    },
    selectedTable() {
      this.updateChartData();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.updateChartData();
    });
  }
}
</script>

<style scoped>
.dashboard {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #303133;
}

.mb-4 {
  margin-bottom: 24px;
}

.quick-entry-card {
  height: 120px;
  background-color: #f0f9ff;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: transform 0.3s ease;
}

.quick-entry-card:hover {
  transform: translateY(-5px);
}

.quick-entry-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
}

.quick-entry-content h3 {
  font-size: 18px;
  margin: 0 0 4px;
}

.quick-entry-content p {
  font-size: 14px;
  margin: 0;
  opacity: 0.8;
}

.core-data-card {
  margin-bottom: 20px;
  height: 100%;
}

.core-data-title {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
}

.float-right {
  float: right;
}

.metric-item {
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.3s;
}

.metric-item:hover {
  background-color: #f5f7fa;
}

.metric-value {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
}

.metric-value.highlighted {
  color: #409EFF;
}

.metric-label {
  font-size: 14px;
  color: #606266;
}

.metric-label.active {
  color: #409EFF;
  font-weight: bold;
}

.empty-content {
  text-align: center;
  color: #909399;
  padding: 20px;
}

.video-card {
  height: 100%;
}

.video-thumbnail {
  height: 128px;
  width: 100%;
  object-fit: cover;
}

.video-title {
  font-size: 14px;
  margin: 0 0 4px;
  color: #303133;
}

.video-views {
  font-size: 12px;
  color: #909399;
  margin: 0;
}

.el-card {
  border-radius: 4px;
}

.el-card__header {
  padding: 12px 20px;
  border-bottom: 1px solid #EBEEF5;
}

.el-radio-button__inner {
  padding: 8px 15px;
}

.chart-container {
  height: 400px;
  margin-top: 20px;
  position: relative;
}

.quick-entry-card i {
  font-size: 24px;
  margin-bottom: 8px;
  color: #409EFF;
}

.section-title i {
  margin-right: 8px;
  color: #409EFF;
}

.hot-module-card {
  height: 180px;
  color: white;
  overflow: hidden;
  padding: 24px 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 16px;
  border: none;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2),
              0 5px 10px rgba(0, 0, 0, 0.1),
              inset 0 0 1px rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
  position: relative;
}

.hot-module-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
  pointer-events: none;
}

.hot-module-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3),
              0 10px 20px rgba(0, 0, 0, 0.2),
              inset 0 0 2px rgba(255, 255, 255, 0.5);
}

.hot-module-icon {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.hot-module-icon i {
  font-size: 28px;
  margin-right: 12px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  color: rgba(255, 255, 255, 0.9);
}

.module-tags {
  display: flex;
  gap: 8px;
  margin-left: auto;
  margin-top: -4px;
}

.el-tag {
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  backdrop-filter: blur(5px);
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.el-tag--success {
  background: rgba(103, 194, 58, 0.25);
  color: #e1f3d8;
}

.el-tag--warning {
  background: rgba(230, 162, 60, 0.25);
  color: #faecd8;
}

.el-tag--danger {
  background: rgba(245, 108, 108, 0.25);
  color: #fde2e2;
}

.el-tag--info {
  background: rgba(144, 147, 153, 0.25);
  color: #e9e9eb;
}

.el-tag--primary {
  background: rgba(64, 158, 255, 0.25);
  color: #d9ecff;
}

.el-tag:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.el-tag--success:hover {
  background: rgba(103, 194, 58, 0.35);
}

.el-tag--warning:hover {
  background: rgba(230, 162, 60, 0.35);
}

.el-tag--danger:hover {
  background: rgba(245, 108, 108, 0.35);
}

.el-tag--info:hover {
  background: rgba(144, 147, 153, 0.35);
}

.el-tag--primary:hover {
  background: rgba(64, 158, 255, 0.35);
}

.hot-module-content {
  margin-top: -4px;
}

.hot-module-content h3 {
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
  color: white;
}

.hot-module-content p {
  margin: 0 0 12px;
  font-size: 13px;
  opacity: 0.95;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.9);
}

.module-features {
  display: flex;
  gap: 12px;
  margin: 12px 0;
  font-size: 12px;
}

.module-features span {
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(255, 255, 255, 0.18);
  padding: 3px 10px;
  border-radius: 16px;
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.module-features span:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.el-button {
  margin-top: 4px;
  padding: 6px 16px;
  font-size: 13px;
}

.el-button:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateX(5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

@media screen and (max-width: 768px) {
  .hot-module-card {
    height: auto;
    min-height: 160px;
  }
  
  .module-features {
    flex-wrap: wrap;
    gap: 6px;
  }
  
  .module-features span {
    flex: 1 1 calc(50% - 6px);
  }
}

.echarts {
  width: 100% !important;
  height: 100% !important;
}

/* 覆盖 el-card 的默认内边距 */
:deep(.el-card__body) {
  padding: 0 !important;
}

.hot-module-card {
  height: 180px;
  color: white;
  overflow: hidden;
  padding: 24px 20px; /* 在卡片内容上直接控制内边距 */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 16px;
  border: none;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2),
              0 5px 10px rgba(0, 0, 0, 0.1),
              inset 0 0 1px rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
  position: relative;
}

/* 为其他卡片类型添加内边距控制 */
.video-card .el-card__body > div {
  padding: 14px;
}

.core-data-card .el-card__body {
  padding: 20px !important; /* 核心数据卡片保持原有内边距 */
}
</style>
