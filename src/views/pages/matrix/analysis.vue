<template>
  <div class="app-container">
    <!-- 核心指标 -->
    <div class="section-wrapper">
      <div class="section-header">
        <div class="title-left">
          <span class="title">核心指标</span>
          <el-select v-model="platform" placeholder="请选择" class="platform-select">
            <el-option label="抖音" value="douyin" />
            <el-option label="快手" value="kuaishou" />
          </el-select>
        </div>
        <div class="time-filter">
          <span 
            v-for="(item, index) in timeOptions" 
            :key="index"
            :class="['time-item', { active: currentTime === item.value }]"
            @click="handleTimeChange(item.value)"
          >
            {{ item.label }}
          </span>
          <span class="label">选择时间段</span>
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            size="medium"
          />
        </div>
      </div>

      <div class="index-box">
        <div 
          v-for="(item, index) in coreIndexes" 
          :key="index"
          :class="['index-item', { active: index === 0 }]"
        >
          <span class="index-item-name">
            {{ item.name }}
            <el-tooltip :content="item.tip" placement="top">
              <i class="el-icon-question question-icon"></i>
            </el-tooltip>
          </span>
          <span class="index-item-num">{{ item.value }}</span>
        </div>
      </div>

      <div id="main" class="echart-container" ref="chart"></div>
    </div>

    <!-- 账号数据分析 -->
    <div class="section-wrapper">
      <div class="section-header">
        <div class="title-left">
          <span class="title">账号数据分析</span>
          <span class="more" @click="goToAccountAnalysis">查看更多</span>
        </div>
        <div class="time-filter">
          <span 
            v-for="(item, index) in timeOptions" 
            :key="index"
            :class="['time-item', { active: currentTime === item.value }]"
            @click="handleTimeChange(item.value)"
          >
            {{ item.label }}
          </span>
        </div>
      </div>

      <div class="table-box">
        <el-table :data="accountData" border class="customTable customTable50">
          <el-table-column prop="name" label="账号名称" width="141" />
          <el-table-column prop="publishCount" label="新增内容发布数" width="191" sortable />
          <el-table-column prop="playCount" label="新增播放" width="123" sortable />
          <el-table-column prop="fansCount" label="新增粉丝" width="123" sortable />
          <el-table-column prop="likeCount" label="新增点赞" width="123" sortable />
          <el-table-column prop="commentCount" label="新增评论" width="109" />
          <el-table-column prop="shareCount" label="新增转发" width="109" />
          <el-table-column prop="favoriteCount" label="新增收藏" width="109" />
          <el-table-column prop="totalPublish" label="视频总发布数" width="136" />
          <el-table-column prop="totalFans" label="总粉丝数" width="123" sortable />
          <el-table-column prop="totalPlay" label="总播放量" width="123" sortable />
        </el-table>
      </div>
    </div>

    <!-- 分发任务数据分析 -->
    <div class="section-wrapper">
      <div class="section-header">
        <div class="title-left">
          <span class="title">分发任务数据分析</span>
        </div>
        <div class="time-filter">
          <span 
            v-for="(item, index) in timeOptions" 
            :key="index"
            :class="['time-item', { active: currentTime === item.value }]"
            @click="handleTimeChange(item.value)"
          >
            {{ item.label }}
          </span>
        </div>
      </div>

      <div class="table-box">
        <el-table :data="taskData" border class="customTable">
          <el-table-column prop="name" label="任务名称" width="178" />
          <el-table-column prop="publishCount" label="已发布内容数" width="176" sortable />
          <el-table-column prop="playCount" label="新增播放" width="176" sortable />
          <el-table-column prop="likeCount" label="新增点赞" width="176" />
          <el-table-column prop="commentCount" label="新增评论" width="176" />
          <el-table-column prop="shareCount" label="新增转发" width="176" />
          <el-table-column prop="favoriteCount" label="新增收藏" width="176" />
          <el-table-column prop="totalPlay" label="总播放量" width="176" sortable />
        </el-table>
      </div>
    </div>

    <!-- 视频数据分析 -->
    <div class="section-wrapper">
      <div class="section-header">
        <div class="title-left">
          <span class="title">视频数据分析</span>
          <span class="more" @click="goToVideoAnalysis">查看更多</span>
        </div>
        <div class="time-filter">
          <span 
            v-for="(item, index) in timeOptions" 
            :key="index"
            :class="['time-item', { active: currentTime === item.value }]"
            @click="handleTimeChange(item.value)"
          >
            {{ item.label }}
          </span>
        </div>
      </div>

      <div class="table-box">
        <el-table :data="videoData" border class="customTable customTable50">
          <el-table-column prop="account" label="所属账号" width="168" />
          <el-table-column prop="videoLink" label="视频链接" width="200" />
          <el-table-column prop="newPlay" label="新增播放" width="147" sortable />
          <el-table-column prop="newLike" label="新增点赞" width="130" />
          <el-table-column prop="newComment" label="新增评论" width="130" />
          <el-table-column prop="newShare" label="新增转发" width="130" />
          <el-table-column prop="newFavorite" label="新增收藏" width="130" />
          <el-table-column prop="totalPlay" label="总播放量" width="147" sortable />
          <el-table-column 
            prop="avgPlayDuration" 
            label="近30天平均播放时长" 
            width="228" 
            fixed="right"
          />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'MatrixAnalysis',
  
  data() {
    return {
      platform: 'douyin',
      currentTime: '7days',
      dateRange: '',
      timeOptions: [
        { label: '昨日', value: 'yesterday' },
        { label: '最近7天', value: '7days' },
        { label: '最近30天', value: '30days' },
        { label: '最近60天', value: '60days' }
      ],
      coreIndexes: [
        { name: '新增播放', value: '125,890', tip: '视频新增的播放次数' },
        { name: '新增粉丝', value: '1,234', tip: '账号新增的粉丝数量' },
        { name: '新增点赞', value: '3,456', tip: '视频新增的点赞数量' },
        { name: '新增评论', value: '789', tip: '视频新增的评论数量' },
        { name: '新增转发', value: '234', tip: '视频新增的转发次数' },
        { name: '新增收藏', value: '567', tip: '视频新增的收藏次数' }
      ],
      accountData: [
        {
          name: '官方账号1',
          publishCount: 15,
          playCount: 45678,
          fansCount: 234,
          likeCount: 1234,
          commentCount: 89,
          shareCount: 45,
          favoriteCount: 123,
          totalPublish: 156,
          totalFans: 12345,
          totalPlay: 234567
        },
        {
          name: '官方账号2',
          publishCount: 12,
          playCount: 34567,
          fansCount: 178,
          likeCount: 890,
          commentCount: 67,
          shareCount: 34,
          favoriteCount: 98,
          totalPublish: 134,
          totalFans: 9876,
          totalPlay: 198765
        }
      ],
      taskData: [
        {
          name: '618活动视频分发',
          publishCount: 25,
          playCount: 67890,
          likeCount: 2345,
          commentCount: 234,
          shareCount: 123,
          favoriteCount: 345,
          totalPlay: 345678
        },
        {
          name: '新品发布视频分发',
          publishCount: 18,
          playCount: 45678,
          likeCount: 1678,
          commentCount: 156,
          shareCount: 89,
          favoriteCount: 234,
          totalPlay: 234567
        }
      ],
      videoData: [
        {
          account: '官方账号1',
          videoLink: 'https://example.com/video1',
          newPlay: 1234,
          newLike: 345,
          newComment: 123,
          newShare: 45,
          newFavorite: 123,
          totalPlay: 234567,
          avgPlayDuration: '00:02:30'
        },
        {
          account: '官方账号2',
          videoLink: 'https://example.com/video2',
          newPlay: 1567,
          newLike: 234,
          newComment: 156,
          newShare: 89,
          newFavorite: 234,
          totalPlay: 234567,
          avgPlayDuration: '00:02:30'
        }
      ]
    }
  },

  mounted() {
    this.initChart()
    if (this.$route.query.from === 'zhanghaofenxi') {
      // 可以在这里处理从子页面返回后的逻辑
      // 比如刷新数据等
    }
  },

  methods: {
    handleTimeChange(time) {
      this.currentTime = time
      // 更新数据
    },

    initChart() {
      const chart = echarts.init(this.$refs.chart)
      const option = {
        title: {
          text: '数据趋势'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['播放量', '点赞数', '评论数']
        },
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '播放量',
            type: 'line',
            data: [12000, 15000, 18000, 22000, 25000, 28000, 32000]
          },
          {
            name: '点赞数',
            type: 'line',
            data: [1200, 1500, 1800, 2200, 2500, 2800, 3200]
          },
          {
            name: '评论数',
            type: 'line',
            data: [120, 150, 180, 220, 250, 280, 320]
          }
        ]
      }
      chart.setOption(option)
    },

    goToAccountAnalysis() {
      this.$router.push({
        path: '/home/matrix/zhanghaofenxi',
        query: { 
          parent: 'analysis'
        }
      })
    },

    goToVideoAnalysis() {
      this.$router.push({
        path: '/home/matrix/shipinfenxi',
        query: { 
          parent: 'analysis'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;

  .section-wrapper {
    background: #fff;
    border-radius: 8px;
    padding: 24px;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      .title-left {
        display: flex;
        align-items: center;

        .title {
          font-size: 16px;
          font-weight: 500;
          margin-right: 16px;
        }

        .platform-select {
          width: 120px;
        }

        .more {
          color: #2656F8;
          font-size: 14px;
          cursor: pointer;
          margin-left: 16px;

          &:hover {
            opacity: 0.8;
          }
        }
      }

      .time-filter {
        display: flex;
        align-items: center;
        gap: 16px;

        .time-item {
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s;

          &:hover {
            color: #2656F8;
          }

          &.active {
            background: #2656F8;
            color: #fff;
          }
        }

        .label {
          color: #606266;
          margin-right: 8px;
        }
      }
    }

    .index-box {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 24px;

      .index-item {
        flex: 1;
        min-width: 200px;
        padding: 20px;
        background: #f5f7fa;
        border-radius: 8px;
        transition: all 0.3s;

        &.active {
          background: #ecf5ff;
          border: 1px solid #d9ecff;
        }

        .index-item-name {
          display: flex;
          align-items: center;
          color: #606266;
          margin-bottom: 8px;

          .question-icon {
            margin-left: 4px;
            color: #909399;
            cursor: pointer;
          }
        }

        .index-item-num {
          font-size: 24px;
          font-weight: 500;
          color: #303133;
        }
      }
    }

    .echart-container {
      height: 300px;
      margin-top: 24px;
    }

    .table-box {
      margin-top: 16px;

      ::v-deep .el-table {
        th {
          background-color: #f5f7fa;
          color: #606266;
          font-weight: 500;
          height: 50px;
        }

        td {
          padding: 12px 0;
        }

        .cell {
          padding: 0 12px;
        }
      }
    }
  }
}
</style> 