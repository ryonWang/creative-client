<template>
  <div class="inventory-summary">
    <!-- 搜索条件 -->
    <el-card class="search-card">
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="商品分类">
          <el-cascader
            :value="searchForm.category"
            :options="categoryOptions"
            :props="{ checkStrictly: true }"
            placeholder="请选择商品分类"
            clearable
            @input="handleSearch"
          />
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="searchForm.name" placeholder="请输入商品名称" @input="handleSearch" />
        </el-form-item>
        <el-form-item label="库存状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable @input="handleSearch">
            <el-option label="全部" value="" />
            <el-option label="充足" value="sufficient" />
            <el-option label="正常" value="normal" />
            <el-option label="偏低" value="low" />
            <el-option label="缺货" value="stockout" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
          <el-button type="success" @click="handleExport">导出报表</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 数据汇总 -->
    <el-row :gutter="20" class="summary-row">
      <el-col :span="6" v-for="item in summaryData" :key="item.title">
        <el-card shadow="hover" class="summary-card">
          <div class="card-content">
            <div class="info">
              <div class="title">{{ item.title }}</div>
              <div class="value">{{ item.value }}</div>
              <div class="trend" :class="item.trend">
                {{ item.trend === 'up' ? '↑' : '↓' }} {{ item.rate }}%
                <span class="compare">较上期</span>
              </div>
            </div>
            <i :class="[
              'el-icon-' + item.icon.toLowerCase(), 
              'icon',
              item.type
            ]"></i>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表区域 -->
    <el-row :gutter="20" class="chart-row">
      <el-col :span="16">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>库存趋势</span>
              <el-radio-group v-model="trendType" size="small">
                <el-radio-button label="amount">库存金额</el-radio-button>
                <el-radio-button label="count">库存数量</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div class="chart-container">
            <!-- 这里放折线图 -->
            <div class="chart-placeholder">库存趋势图表</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>分类占比</span>
              <el-radio-group v-model="categoryChartType" size="small">
                <el-radio-button label="amount">库存金额</el-radio-button>
                <el-radio-button label="count">库存数量</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div class="chart-container">
            <!-- 这里放饼图 -->
            <div class="chart-placeholder">分类占比图表</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 数据明细 -->
    <el-card class="detail-card">
      <template #header>
        <div class="card-header">
          <span>库存明细</span>
          <el-button-group>
            <el-button
              :type="viewType === 'table' ? 'primary' : ''"
              @click="viewType = 'table'"
            >
              <i class="el-icon-menu"></i>
            </el-button>
            <el-button
              :type="viewType === 'card' ? 'primary' : ''"
              @click="viewType = 'card'"
            >
              <i class="el-icon-s-grid"></i>
            </el-button>
          </el-button-group>
        </div>
      </template>

      <!-- 表格视图 -->
      <el-table
        v-if="viewType === 'table'"
        :data="productList"
        border
        v-loading="loading"
      >
        <el-table-column type="expand">
          <template #default="{ row }">
            <el-descriptions :column="3" border>
              <el-descriptions-item label="商品SKU">
                {{ row.sku }}
              </el-descriptions-item>
              <el-descriptions-item label="商品分类">
                {{ row.category }}
              </el-descriptions-item>
              <el-descriptions-item label="创建时间">
                {{ row.createTime }}
              </el-descriptions-item>
              <el-descriptions-item label="销售店铺数">
                {{ row.shopCount }}
              </el-descriptions-item>
              <el-descriptions-item label="月均销量">
                {{ row.avgSales }}
              </el-descriptions-item>
              <el-descriptions-item label="安全库存">
                {{ row.safetyStock }}
              </el-descriptions-item>
            </el-descriptions>

            <!-- 店铺库存分布 -->
            <div class="shop-stock">
              <h4>店铺库存分布</h4>
              <el-table :data="row.shopStock" border size="small">
                <el-table-column prop="name" label="店铺名称" />
                <el-table-column prop="stockCount" label="库存数量" width="100" />
                <el-table-column prop="stockAmount" label="库存金额" width="120">
                  <template #default="{ row }">
                    ¥{{ row.stockAmount }}
                  </template>
                </el-table-column>
                <el-table-column prop="proportion" label="占比" width="100">
                  <template #default="{ row }">
                    {{ row.proportion }}%
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品图片" width="100">
          <template #default="{ row }">
            <el-image
              :src="row.image"
              :preview-src-list="[row.image]"
              fit="cover"
              class="product-image"
            />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称" show-overflow-tooltip />
        <el-table-column prop="category" label="商品分类" width="150" />
        <el-table-column prop="stockCount" label="库存数量" width="100" sortable />
        <el-table-column prop="stockAmount" label="库存金额" width="150" sortable>
          <template #default="{ row }">
            ¥{{ row.stockAmount }}
            <el-tag
              size="small"
              :type="row.trend === 'up' ? 'success' : 'danger'"
              class="trend-tag"
            >
              {{ row.trend === 'up' ? '↑' : '↓' }}{{ row.rate }}%
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="avgCost" label="平均成本" width="120" sortable>
          <template #default="{ row }">
            ¥{{ row.avgCost }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="库存状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusLabel(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleDetail(row)">
              详情
            </el-button>
            <el-button type="success" link @click="handleAnalysis(row)">
              分析
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 卡片视图 -->
      <div v-else class="card-view">
        <el-row :gutter="20">
          <el-col
            :span="6"
            v-for="product in productList"
            :key="product.id"
            class="card-col"
          >
            <el-card :body-style="{ padding: '0px' }" class="product-card">
              <el-image :src="product.image" class="card-image" />
              <div class="card-content">
                <h3 class="product-name">{{ product.name }}</h3>
                <div class="product-category">{{ product.category }}</div>
                <div class="product-status">
                  <el-tag :type="getStatusType(product.status)" size="small">
                    {{ getStatusLabel(product.status) }}
                  </el-tag>
                  <span class="stock-count">库存: {{ product.stockCount }}</span>
                </div>
                <div class="stock-info">
                  <div class="stock-amount">¥{{ product.stockAmount }}</div>
                  <div class="stock-trend" :class="product.trend">
                    {{ product.trend === 'up' ? '↑' : '↓' }}{{ product.rate }}%
                  </div>
                </div>
                <div class="card-footer">
                  <el-button type="primary" link @click="handleDetail(product)">
                    详情
                  </el-button>
                  <el-button type="success" link @click="handleAnalysis(product)">
                    分析
                  </el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          :current-page.sync="currentPage"
          :page-size.sync="pageSize"
          :total="total"
          :page-sizes="[12, 24, 36, 48]"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 详情抽屉 -->
    <el-drawer
      :visible.sync="drawerVisible"
      :title="'库存详情'"
      :size="'60%'"
    >
      <div class="detail-content" v-if="currentProduct">
        <el-descriptions title="基本信息" :column="2" border>
          <el-descriptions-item label="商品名称">{{ currentProduct.name }}</el-descriptions-item>
          <el-descriptions-item label="商品分类">{{ currentProduct.category }}</el-descriptions-item>
          <el-descriptions-item label="库存金额">¥{{ currentProduct.stockAmount }}</el-descriptions-item>
          <el-descriptions-item label="库存数量">{{ currentProduct.stockCount }}</el-descriptions-item>
        </el-descriptions>

        <el-divider>库存趋势</el-divider>
        <div class="trend-chart">
          <!-- 这里放趋势图表 -->
          <div class="chart-placeholder">库存趋势图表</div>
        </div>

        <el-divider>店铺分布</el-divider>
        <div class="shop-chart">
          <!-- 这里放饼图 -->
          <div class="chart-placeholder">店铺分布图表</div>
        </div>
      </div>
    </el-drawer>

    <!-- 分析对话框 -->
    <el-dialog
      :visible.sync="analysisDialogVisible"
      :title="'库存分析'"
      :width="'800px'"
    >
      <div class="analysis-content" v-if="currentProduct">
        <el-alert
          title="库存分析建议"
          type="info"
          :closable="false"
          class="analysis-alert"
        >
          <p v-for="(item, index) in analysisResult" :key="index">
            {{ index + 1 }}. {{ item }}
          </p>
        </el-alert>

        <el-divider>关键指标</el-divider>
        <el-row :gutter="20">
          <el-col :span="8" v-for="(item, index) in keyMetrics" :key="index">
            <el-card shadow="hover" class="metric-card">
              <div class="metric-content">
                <div class="metric-title">{{ item.title }}</div>
                <div class="metric-value">{{ item.value }}</div>
                <div class="metric-trend" :class="item.trend">
                  {{ item.trend === 'up' ? '↑' : '↓' }} {{ item.rate }}%
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Message } from 'element-ui'

// 商品列表
const productList = ref([
  {
    id: 1,
    name: '测试商品1',
    image: 'https://example.com/image.jpg',
    category: '服装/上衣',
    stockCount: 1234,
    stockAmount: 123456.78,
    avgCost: 100.05,
    status: 'sufficient',
    trend: 'up',
    rate: 12.3,
    sku: 'SKU001',
    shopCount: 10,
    avgSales: 100,
    safetyStock: 500,
    createTime: '2024-01-01',
    shopStock: [
      {
        name: '店铺A',
        stockCount: 100,
        stockAmount: 9999.99,
        proportion: 12.5
      }
    ]
  }
])

// 分类选项
const categoryOptions = [
  {
    value: 1,
    label: '服装',
    children: [
      { value: 11, label: '上衣' },
      { value: 12, label: '裤装' }
    ]
  }
]

// 搜索表单
const searchForm = reactive({
  category: [],
  name: '',
  status: ''
})

// 图标定义
const icons = {
  money: 'el-icon-money',
  goods: 'el-icon-goods',
  list: 'el-icon-menu',
  dataLine: 'el-icon-data-line'
}

// 汇总数据
const summaryData = [
  {
    title: '库存总额',
    value: '¥128,930',
    trend: 'up',
    rate: 12.3,
    icon: 'money',
    type: 'primary'
  },
  {
    title: '库存总量',
    value: '1,234',
    trend: 'up',
    rate: 8.5,
    icon: 'goods',
    type: 'success'
  },
  {
    title: '商品总数',
    value: '3,456',
    trend: 'down',
    rate: 3.2,
    icon: 'list',
    type: 'warning'
  },
  {
    title: '平均库存',
    value: '99.9',
    trend: 'up',
    rate: 5.6,
    icon: 'data-line',
    type: 'info'
  }
]

// 图表控制
const trendType = ref('amount')
const categoryChartType = ref('amount')
const viewType = ref('table')

// 表格数据
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(12)
const total = ref(100)

// 详情抽屉
const drawerVisible = ref(false)
const currentProduct = ref(null)

// 分析对话框
const analysisDialogVisible = ref(false)
const analysisResult = ref([
  '库存金额环比增长12.3%，主要来自新品备货',
  '当前存水平高于安全库存，建议控制采购',
  '部分店铺库存分布不均，需要优化调配'
])

// 关键指标
const keyMetrics = ref([
  {
    title: '库存周转率',
    value: '3.5次',
    trend: 'up',
    rate: 0.5
  },
  {
    title: '库存积压率',
    value: '15%',
    trend: 'down',
    rate: 2.1
  },
  {
    title: '缺货率',
    value: '2%',
    trend: 'down',
    rate: 1.5
  }
])

// 获取状态样式
const getStatusType = (status) => {
  const types = {
    sufficient: 'success',
    normal: 'warning',
    low: 'danger',
    stockout: 'info'
  }
  return types[status] || 'info'
}

// 获取状态文本
const getStatusLabel = (status) => {
  const labels = {
    sufficient: '充足',
    normal: '正常',
    low: '偏低',
    stockout: '缺货'
  }
  return labels[status] || status
}

// 搜索
const handleSearch = () => {
  fetchProductList()
}

// 重置搜索
const resetSearch = () => {
  searchForm.category = []
  searchForm.name = ''
  searchForm.status = ''
  handleSearch()
}

// 导出报表
const handleExport = () => {
  Message.success('报表导出中...')
}

// 获取商品列表
const fetchProductList = async () => {
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
  } catch (error) {
    Message.error('获取数据失败')
  } finally {
    loading.value = false
  }
}

// 查看详情
const handleDetail = (row) => {
  currentProduct.value = row
  drawerVisible.value = true
}

// 查看分析
const handleAnalysis = (row) => {
  currentProduct.value = row
  analysisDialogVisible.value = true
}

// 分页相关
const handleSizeChange = (val) => {
  pageSize.value = val
  fetchProductList()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchProductList()
}

// 初始化
fetchProductList()
</script>

<style scoped>
.inventory-summary {
  padding: 20px;
}

.search-card {
  margin-bottom: 20px;
}

.summary-row {
  margin-bottom: 20px;
}

.summary-card {
  .card-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .info {
    .title {
      font-size: 14px;
      color: #909399;
    }
    .value {
      font-size: 24px;
      font-weight: bold;
      color: #303133;
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

      .compare {
        color: #909399;
        margin-left: 4px;
      }
    }
  }

  .icon {
    font-size: 48px;
    padding: 10px;
    border-radius: 8px;
    opacity: 0.8;
    
    &.primary {
      color: #409EFF;
      background-color: rgba(64, 158, 255, 0.1);
    }
    &.success {
      color: #67C23A;
      background-color: rgba(103, 194, 58, 0.1);
    }
    &.warning {
      color: #E6A23C;
      background-color: rgba(230, 162, 60, 0.1);
    }
    &.info {
      color: #909399;
      background-color: rgba(144, 147, 153, 0.1);
    }
  }
}

.chart-row {
  margin-bottom: 20px;
}

.chart-card {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .chart-container {
    height: 300px;
  }

  .chart-placeholder {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f7fa;
    color: #909399;
    border-radius: 4px;
  }
}

.detail-card {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.product-image {
  width: 60px;
  height: 60px;
  border-radius: 4px;
}

.trend-tag {
  margin-left: 5px;
}

.shop-stock {
  margin: 20px;

  h4 {
    margin: 0 0 10px 0;
    color: #303133;
  }
}

.card-view {
  .card-col {
    margin-bottom: 20px;
  }

  .product-card {
    .card-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .card-content {
      padding: 15px;

      .product-name {
        margin: 0;
        font-size: 16px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .product-category {
        font-size: 14px;
        color: #909399;
        margin: 8px 0;
      }

      .product-status {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        .stock-count {
          font-size: 12px;
          color: #909399;
        }
      }

      .stock-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0;

        .stock-amount {
          font-size: 18px;
          font-weight: bold;
          color: #303133;
        }

        .stock-trend {
          font-size: 12px;

          &.up {
            color: #67C23A;
          }
          &.down {
            color: #F56C6C;
          }
        }
      }

      .card-footer {
        margin-top: 10px;
        display: flex;
        justify-content: flex-end;
        gap: 10px;
      }
    }
  }
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.detail-content {
  padding: 20px;

  .trend-chart,
  .shop-chart {
    height: 300px;
    margin: 20px 0;
  }
}

.analysis-content {
  .analysis-alert {
    margin-bottom: 20px;
  }

  .metric-card {
    .metric-content {
      text-align: center;

      .metric-title {
        font-size: 14px;
        color: #909399;
      }

      .metric-value {
        font-size: 24px;
        font-weight: bold;
        color: #303133;
        margin: 8px 0;
      }

      .metric-trend {
        font-size: 12px;

        &.up {
          color: #67C23A;
        }
        &.down {
          color: #F56C6C;
        }
      }
    }
  }
}
</style> 