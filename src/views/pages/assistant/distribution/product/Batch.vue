<template>
  <div class="batch-distribution">
    <!-- 批量铺货配置 -->
    <el-card class="config-card">
      <template #header>
        <div class="card-header">
          <span>批量铺货配置</span>
          <el-button type="primary" @click="startDistribute" :loading="distributing">
            开始铺货
          </el-button>
        </div>
      </template>
      
      <el-form :model="configForm" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="目标店铺">
              <el-select
                v-model="configForm.targetShops"
                multiple
                placeholder="请选择目标店铺"
              >
                <el-option
                  v-for="shop in shopList"
                  :key="shop.id"
                  :label="shop.name"
                  :value="shop.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品范围">
              <el-select v-model="configForm.scope" placeholder="请选择商品范围">
                <el-option label="全部商品" value="all" />
                <el-option label="按分类选择" value="category" />
                <el-option label="按品牌选择" value="brand" />
                <el-option label="自定义选择" value="custom" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="铺货数量">
              <el-input-number
                v-model="configForm.limit"
                :min="0"
                placeholder="0表示不限制"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="价格策略">
              <el-select v-model="configForm.priceStrategy" placeholder="请选择价格策略">
                <el-option label="同步原价" value="sync" />
                <el-option label="固定加价" value="fixed" />
                <el-option label="百分比加价" value="percent" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="configForm.priceStrategy !== 'sync'">
            <el-form-item :label="configForm.priceStrategy === 'fixed' ? '加价金额' : '加价比例'">
              <el-input-number
                v-model="configForm.priceValue"
                :min="0"
                :precision="configForm.priceStrategy === 'fixed' ? 2 : 0"
                :step="configForm.priceStrategy === 'fixed' ? 0.1 : 1"
              />
              <span class="unit">{{ configForm.priceStrategy === 'fixed' ? '元' : '%' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="库存策略">
              <el-select v-model="configForm.stockStrategy" placeholder="请选择库存策略">
                <el-option label="同步库存" value="sync" />
                <el-option label="固定库存" value="fixed" />
                <el-option label="百分比库存" value="percent" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="执行时间">
              <el-radio-group v-model="configForm.executeTime">
                <el-radio label="now">立即执行</el-radio>
                <el-radio label="schedule">定时执行</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="configForm.executeTime === 'schedule'">
            <el-form-item label="执行时间点">
              <el-date-picker
                v-model="configForm.scheduleTime"
                type="datetime"
                placeholder="选择执行时间"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="铺货间隔">
              <el-input-number
                v-model="configForm.interval"
                :min="0"
                placeholder="单位：秒"
              />
              <span class="unit">秒</span>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 商品选择区域 -->
        <div v-if="configForm.scope === 'custom'" class="product-selection">
          <el-divider>商品选择</el-divider>
          <el-table
            ref="multipleTableRef"
            :data="productList"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" />
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
            <el-table-column prop="price" label="售价" width="100">
              <template #default="{ row }">
                ¥{{ row.price }}
              </template>
            </el-table-column>
            <el-table-column prop="stock" label="库存" width="100" />
          </el-table>
          <div class="pagination">
            <el-pagination
              :current-page.sync="currentPage"
              :page-size.sync="pageSize"
              :total="total"
              :page-sizes="[10, 20, 50, 100]"
              layout="total, sizes, prev, pager, next"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-form>
    </el-card>

    <!-- 预览对话框 -->
    <el-dialog
      :visible.sync="previewVisible"
      title="铺货预览"
      width="60%"
    >
      <div class="preview-content">
        <el-descriptions title="铺货配置" :column="2" border>
          <el-descriptions-item label="目标店铺">
            {{ selectedShopNames.join('、') }}
          </el-descriptions-item>
          <el-descriptions-item label="商品数量">
            {{ selectedProducts.length }}个
          </el-descriptions-item>
          <el-descriptions-item label="价格策略">
            {{ getPriceStrategyText() }}
          </el-descriptions-item>
          <el-descriptions-item label="库存策略">
            {{ getStockStrategyText() }}
          </el-descriptions-item>
          <el-descriptions-item label="执行时间">
            {{ configForm.executeTime === 'now' ? '立即执行' : configForm.scheduleTime }}
          </el-descriptions-item>
          <el-descriptions-item label="铺货间隔">
            {{ configForm.interval }}秒
          </el-descriptions-item>
        </el-descriptions>

        <div class="preview-warning" v-if="hasWarnings">
          <el-alert
            title="存在以下风险提示"
            type="warning"
            :closable="false"
          >
            <template v-if="configForm.limit === 0">
              - 未设置铺货数量限制，可能导致铺货商品过多
            </template>
            <template v-if="configForm.interval === 0">
              - 未设置铺货间隔，可能触发平台限流
            </template>
          </el-alert>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="previewVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmDistribute">
            确认铺货
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { Message } from 'element-ui'

// 配置表单
const configForm = reactive({
  targetShops: [],
  scope: 'all',
  limit: 0,
  priceStrategy: 'sync',
  priceValue: 0,
  stockStrategy: 'sync',
  stockValue: 0,
  executeTime: 'now',
  scheduleTime: '',
  interval: 0
})

// 店铺列表
const shopList = [
  { id: 1, name: '店铺A' },
  { id: 2, name: '店铺B' },
  { id: 3, name: '店铺C' }
]

// 商品列表
const productList = ref([
  {
    id: 1,
    image: 'https://via.placeholder.com/100',
    name: '测试商品1',
    category: '服装/上衣',
    price: 99.00,
    stock: 100
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/100',
    name: '测试商品2',
    category: '鞋靴/运动鞋',
    price: 299.00,
    stock: 50
  }
])

// 分页相关
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

// 选中的商品
const selectedProducts = ref([])

// 对话框控制
const previewVisible = ref(false)
const distributing = ref(false)

// 计算选中的店铺名称
const selectedShopNames = computed(() => {
  return configForm.targetShops.map(id => 
    shopList.find(shop => shop.id === id)?.name
  ).filter(Boolean)
})

// 计算是否有风险提示
const hasWarnings = computed(() => {
  return configForm.limit === 0 || configForm.interval === 0
})

// 获取价格策略文本
const getPriceStrategyText = () => {
  const strategies = {
    sync: '同步原价',
    fixed: `固定加价 ${configForm.priceValue}元`,
    percent: `百分比加价 ${configForm.priceValue}%`
  }
  return strategies[configForm.priceStrategy] || ''
}

// 获取库存策略文本
const getStockStrategyText = () => {
  const strategies = {
    sync: '同步库存',
    fixed: `固定库存 ${configForm.stockValue}件`,
    percent: `百分比库存 ${configForm.stockValue}%`
  }
  return strategies[configForm.stockStrategy] || ''
}

// 表格选择变化
const handleSelectionChange = (selection) => {
  selectedProducts.value = selection
}

// 开始铺货
const startDistribute = async () => {
  if (!configForm.targetShops.length) {
    Message.warning('请选择目标店铺')
    return
  }
  previewVisible.value = true
}

// 确认铺货
const confirmDistribute = async () => {
  distributing.value = true
  try {
    // TODO: 调用批量铺货接口
    await new Promise(resolve => setTimeout(resolve, 1000))
    Message.success('铺货任务已提交')
    previewVisible.value = false
  } catch (error) {
    Message.error('铺货失败')
  } finally {
    distributing.value = false
  }
}

// 分页相关
const handleSizeChange = (val) => {
  pageSize.value = val
  // TODO: 重新加载商品列表
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  // TODO: 重新加载商品列表
}
</script>

<style scoped>
.batch-distribution {
  padding: 20px;
}

.config-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-selection {
  margin-top: 20px;
}

.product-image {
  width: 60px;
  height: 60px;
  border-radius: 4px;
}

.unit {
  margin-left: 5px;
  color: #909399;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.preview-content {
  .preview-warning {
    margin-top: 20px;
  }
}
</style> 