<template>
  <div class="traffic-analysis">
    <!-- 数据概览卡片 -->
    <el-row :gutter="20" class="data-overview">
      <el-col :span="6" v-for="item in overviewData" :key="item.title">
        <el-card shadow="hover">
          <div class="overview-item">
            <div class="item-info">
              <div class="title">{{ item.title }}</div>
              <div class="value">{{ item.value }}</div>
              <div class="trend" :class="item.trend">
                {{ item.rate }}
                <i :class="['el-icon-' + (item.trend === 'up' ? 'top' : 'bottom')]"></i>
              </div>
            </div>
            <i :class="['el-icon-' + item.icon]"></i>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 筛选条件 -->
    <el-card class="filter-section">
      <el-form :inline="true" :model="filterForm">
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="filterForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="店铺">
          <el-select v-model="filterForm.shop" placeholder="请选择店铺">
            <el-option label="全部店铺" value="" />
            <el-option
              v-for="shop in shopList"
              :key="shop.id"
              :label="shop.name"
              :value="shop.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-cascader
            v-model="filterForm.category"
            :options="categoryOptions"
            placeholder="请选择分类"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetFilter">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 流量趋势图 -->
    <el-card class="chart-section">
      <div class="chart-header">
        <h3>流量趋势</h3>
        <el-radio-group v-model="chartPeriod" size="small">
          <el-radio-button label="day">日</el-radio-button>
          <el-radio-button label="week">周</el-radio-button>
          <el-radio-button label="month">月</el-radio-button>
        </el-radio-group>
      </div>
      <div class="chart-container">
        <!-- 这里集成图表组件 -->
      </div>
    </el-card>

    <!-- 流量来源分析 -->
    <el-row :gutter="20" class="source-analysis">
      <el-col :span="12">
        <el-card class="source-card">
          <div slot="header">
            <span>流量来源分布</span>
          </div>
          <div class="chart-container">
            <!-- 饼图展示流量来源 -->
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="source-card">
          <div slot="header">
            <span>访问设备分布</span>
          </div>
          <div class="chart-container">
            <!-- 饼图展示设备分布 -->
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 热门商品排行 -->
    <el-card class="ranking-section">
      <div slot="header">
        <span>热门商品排行</span>
        <el-button-group class="header-actions">
          <el-button size="small" :type="rankType === 'pv' ? 'primary' : ''" @click="rankType = 'pv'">
            访问量
          </el-button>
          <el-button size="small" :type="rankType === 'uv' ? 'primary' : ''" @click="rankType = 'uv'">
            访客数
          </el-button>
        </el-button-group>
      </div>
      <el-table :data="rankingList" border stripe>
        <el-table-column type="index" label="排名" width="80" />
        <el-table-column prop="image" label="商品图片" width="100">
          <template #default="{ row }">
            <el-image :src="row.image" :preview-src-list="[row.image]" fit="cover" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" show-overflow-tooltip />
        <el-table-column prop="pv" label="访问量" width="120" sortable />
        <el-table-column prop="uv" label="访客数" width="120" sortable />
        <el-table-column prop="avgTime" label="平均停留时间" width="150" sortable />
        <el-table-column prop="bounceRate" label="跳出率" width="120">
          <template #default="{ row }">
            {{ row.bounceRate }}%
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 数据概览
const overviewData = ref([
  {
    title: '总访问量(PV)',
    value: '125,789',
    rate: '+15.2%',
    trend: 'up',
    icon: 'view'
  },
  {
    title: '访客数(UV)',
    value: '45,623',
    rate: '+12.5%',
    trend: 'up',
    icon: 'user'
  },
  {
    title: '平均停留时间',
    value: '3分28秒',
    rate: '-2.1%',
    trend: 'down',
    icon: 'time'
  },
  {
    title: '跳出率',
    value: '35.6%',
    rate: '-5.3%',
    trend: 'down',
    icon: 'back'
  }
])

// 筛选表单
const filterForm = reactive({
  dateRange: [],
  shop: '',
  category: []
})

// 图表周期
const chartPeriod = ref('day')

// 排行榜类型
const rankType = ref('pv')

// 排行榜数据
const rankingList = ref([
  {
    image: 'https://example.com/image1.jpg',
    name: '商品1',
    pv: 12345,
    uv: 5432,
    avgTime: '2分45秒',
    bounceRate: 32.5
  }
  // ... 更多数据
])

// 搜索
const handleSearch = () => {
  // 实现搜索逻辑
}

// 重置筛选
const resetFilter = () => {
  filterForm.dateRange = []
  filterForm.shop = ''
  filterForm.category = []
  handleSearch()
}
</script>

<style scoped>
.traffic-analysis {
  padding: 20px;
}

.data-overview {
  margin-bottom: 20px;
}

.overview-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-info {
  .title {
    font-size: 14px;
    color: #909399;
  }
  .value {
    font-size: 24px;
    font-weight: bold;
    margin: 8px 0;
  }
  .trend {
    font-size: 12px;
    &.up {
      color: #67C23A;
    }
    &.down {
      color: #F56C6C;
    }
  }
}

.filter-section,
.chart-section,
.source-analysis,
.ranking-section {
  margin-bottom: 20px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chart-container {
  height: 400px;
}

.source-card .chart-container {
  height: 300px;
}

.header-actions {
  float: right;
}
</style> 