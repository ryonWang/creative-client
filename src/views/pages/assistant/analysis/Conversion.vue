<template>
  <div class="conversion-analysis">
    <!-- 转化漏斗概览 -->
    <el-card class="funnel-overview">
      <div class="funnel-header">
        <h3>转化漏斗</h3>
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </div>
      <div class="funnel-chart">
        <!-- 这里集成漏斗图表 -->
      </div>
      <div class="funnel-metrics">
        <div class="metric-item" v-for="item in funnelData" :key="item.stage">
          <div class="stage-name">{{ item.stage }}</div>
          <div class="stage-value">{{ item.value }}</div>
          <div class="stage-rate">转化率: {{ item.rate }}%</div>
        </div>
      </div>
    </el-card>

    <!-- 转化趋势 -->
    <el-card class="trend-section">
      <div class="trend-header">
        <h3>转化趋势分析</h3>
        <div class="header-actions">
          <el-select v-model="trendMetric" size="small" style="margin-right: 10px;">
            <el-option label="访问-加购转化率" value="visit_cart" />
            <el-option label="加购-下单转化率" value="cart_order" />
            <el-option label="下单-支付转化率" value="order_pay" />
          </el-select>
          <el-radio-group v-model="trendPeriod" size="small">
            <el-radio-button label="day">日</el-radio-button>
            <el-radio-button label="week">周</el-radio-button>
            <el-radio-button label="month">月</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="trend-chart">
        <!-- 这里集成趋势图表 -->
      </div>
    </el-card>

    <!-- 商品转化分析 -->
    <el-card class="product-conversion">
      <template #header>
        <div class="card-header">
          <span>商品转化分析</span>
          <el-button-group>
            <el-button size="small" :type="productView === 'list' ? 'primary' : ''" @click="productView = 'list'">
              列表视图
            </el-button>
            <el-button size="small" :type="productView === 'card' ? 'primary' : ''" @click="productView = 'card'">
              卡片视图
            </el-button>
          </el-button-group>
        </div>
      </template>

      <!-- 筛选条件 -->
      <el-form :inline="true" :model="filterForm" class="filter-form">
        <el-form-item label="商品分类">
          <el-cascader
            v-model="filterForm.category"
            :options="categoryOptions"
            placeholder="请选择分类"
          />
        </el-form-item>
        <el-form-item label="价格区间">
          <el-input-number v-model="filterForm.minPrice" :min="0" placeholder="最小值" />
          <span class="separator">-</span>
          <el-input-number v-model="filterForm.maxPrice" :min="0" placeholder="最大值" />
        </el-form-item>
        <el-form-item label="转化率">
          <el-select v-model="filterForm.conversion" placeholder="请选择">
            <el-option label="全部" value="" />
            <el-option label="0%-1%" value="0-1" />
            <el-option label="1%-5%" value="1-5" />
            <el-option label="5%-10%" value="5-10" />
            <el-option label="10%以上" value="10+" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetFilter">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 列表视图 -->
      <el-table
        v-if="productView === 'list'"
        :data="productList"
        border
        stripe
      >
        <el-table-column prop="image" label="商品图片" width="100">
          <template #default="{ row }">
            <el-image :src="row.image" :preview-src-list="[row.image]" fit="cover" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" show-overflow-tooltip />
        <el-table-column prop="price" label="价格" width="100">
          <template #default="{ row }">
            ¥{{ row.price }}
          </template>
        </el-table-column>
        <el-table-column prop="pv" label="访问量" width="100" sortable />
        <el-table-column prop="cartRate" label="加购率" width="100" sortable>
          <template #default="{ row }">
            {{ row.cartRate }}%
          </template>
        </el-table-column>
        <el-table-column prop="orderRate" label="下单率" width="100" sortable>
          <template #default="{ row }">
            {{ row.orderRate }}%
          </template>
        </el-table-column>
        <el-table-column prop="payRate" label="支付率" width="100" sortable>
          <template #default="{ row }">
            {{ row.payRate }}%
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="showDetail(row)">
              详情
            </el-button>
            <el-button type="success" link @click="optimize(row)">
              优化建议
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 卡片视图 -->
      <el-row v-else :gutter="20" class="card-view">
        <el-col :span="6" v-for="item in productList" :key="item.id">
          <el-card shadow="hover" class="product-card">
            <el-image :src="item.image" fit="cover" class="product-image" />
            <h4 class="product-name">{{ item.name }}</h4>
            <div class="product-price">¥{{ item.price }}</div>
            <div class="conversion-rates">
              <div class="rate-item">
                <span class="label">加购率</span>
                <span class="value">{{ item.cartRate }}%</span>
              </div>
              <div class="rate-item">
                <span class="label">下单率</span>
                <span class="value">{{ item.orderRate }}%</span>
              </div>
              <div class="rate-item">
                <span class="label">支付率</span>
                <span class="value">{{ item.payRate }}%</span>
              </div>
            </div>
            <div class="card-actions">
              <el-button type="primary" link @click="showDetail(item)">
                详情
              </el-button>
              <el-button type="success" link @click="optimize(item)">
                优化建议
              </el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>

    <!-- 优化建议对话框 -->
    <el-dialog
      v-model="optimizeDialog.visible"
      title="优化建议"
      width="600px"
    >
      <div class="optimize-content">
        <div v-for="(item, index) in optimizeDialog.suggestions" :key="index" class="suggestion-item">
          <div class="suggestion-title">
            <el-tag :type="item.type">{{ item.title }}</el-tag>
          </div>
          <div class="suggestion-desc">{{ item.description }}</div>
          <div class="suggestion-actions" v-if="item.actions">
            <el-button
              v-for="action in item.actions"
              :key="action.name"
              size="small"
              :type="action.type"
              @click="action.handler"
            >
              {{ action.name }}
            </el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 日期范围
const dateRange = ref([])

// 漏斗数据
const funnelData = ref([
  {
    stage: '访问',
    value: '100,000',
    rate: 100
  },
  {
    stage: '加购',
    value: '35,000',
    rate: 35
  },
  {
    stage: '下单',
    value: '15,000',
    rate: 42.8
  },
  {
    stage: '支付',
    value: '12,000',
    rate: 80
  }
])

// 趋势分析
const trendMetric = ref('visit_cart')
const trendPeriod = ref('day')

// 商品视图
const productView = ref('list')

// 筛选表单
const filterForm = reactive({
  category: [],
  minPrice: null,
  maxPrice: null,
  conversion: ''
})

// 商品列表
const productList = ref([
  {
    id: 1,
    image: 'https://example.com/image1.jpg',
    name: '示例商品1',
    price: 199,
    pv: 1234,
    cartRate: 35.5,
    orderRate: 15.2,
    payRate: 80.5
  }
  // ... 更多数据
])

// 优化建议对话框
const optimizeDialog = reactive({
  visible: false,
  suggestions: []
})

// 显示详情
const showDetail = (product) => {
  // 实现详情查看逻辑
}

// 显示优化建议
const optimize = (product) => {
  optimizeDialog.suggestions = [
    {
      type: 'warning',
      title: '价格策略优化',
      description: '当前价格高于同类商品平均价格15%，建议适当调整价格策略',
      actions: [
        {
          name: '查看价格分析',
          type: 'primary',
          handler: () => {
            // 实现价格分析逻辑
          }
        }
      ]
    },
    {
      type: 'success',
      title: '商品详情优化',
      description: '建议增加商品细节图片，完善商品描述信息',
      actions: [
        {
          name: '编辑商品',
          type: 'primary',
          handler: () => {
            // 实现编辑跳转逻辑
          }
        }
      ]
    }
  ]
  optimizeDialog.visible = true
}

// 搜索
const handleSearch = () => {
  // 实现搜索逻辑
}

// 重置筛选
const resetFilter = () => {
  filterForm.category = []
  filterForm.minPrice = null
  filterForm.maxPrice = null
  filterForm.conversion = ''
  handleSearch()
}
</script>

<style scoped>
.conversion-analysis {
  padding: 20px;
}

.funnel-overview,
.trend-section,
.product-conversion {
  margin-bottom: 20px;
}

.funnel-header,
.trend-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.funnel-chart,
.trend-chart {
  height: 400px;
}

.funnel-metrics {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  
  .metric-item {
    text-align: center;
    
    .stage-name {
      font-size: 14px;
      color: #909399;
    }
    
    .stage-value {
      font-size: 24px;
      font-weight: bold;
      margin: 8px 0;
    }
    
    .stage-rate {
      font-size: 12px;
      color: #67C23A;
    }
  }
}

.filter-form {
  margin-bottom: 20px;
  
  .separator {
    margin: 0 10px;
    color: #909399;
  }
}

.card-view {
  margin-top: 20px;
}

.product-card {
  margin-bottom: 20px;
  
  .product-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .product-name {
    margin: 10px 0;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .product-price {
    color: #F56C6C;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .conversion-rates {
    border-top: 1px solid #EBEEF5;
    padding-top: 10px;
    
    .rate-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      
      .label {
        color: #909399;
      }
      
      .value {
        color: #67C23A;
      }
    }
  }
  
  .card-actions {
    margin-top: 10px;
    text-align: right;
  }
}

.optimize-content {
  .suggestion-item {
    margin-bottom: 20px;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .suggestion-title {
      margin-bottom: 10px;
    }
    
    .suggestion-desc {
      color: #606266;
      margin-bottom: 10px;
    }
    
    .suggestion-actions {
      text-align: right;
    }
  }
}
</style> 