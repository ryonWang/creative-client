<template>
  <div class="marketing-recommend">
    <!-- 顶部操作栏 -->
    <div class="operation-bar">
      <el-button-group>
        <el-button type="primary" icon="el-icon-plus" @click="createRecommend">
          新建推荐
        </el-button>
        <el-button icon="el-icon-s-operation" @click="openSettings">
          推荐设置
        </el-button>
      </el-button-group>

      <div class="filter-group">
        <el-select v-model="filterType" placeholder="推荐类型">
          <el-option label="全部" value=""></el-option>
          <el-option label="相关推荐" value="related"></el-option>
          <el-option label="猜你喜欢" value="guess"></el-option>
          <el-option label="热销榜单" value="hot"></el-option>
        </el-select>
        <el-select v-model="filterPosition" placeholder="展示位置">
          <el-option label="全部" value=""></el-option>
          <el-option label="详情页底部" value="detail_bottom"></el-option>
          <el-option label="购物车页面" value="cart"></el-option>
          <el-option label="支付成功页" value="pay_success"></el-option>
        </el-select>
      </div>
    </div>

    <!-- 推荐列表 -->
    <div class="recommend-list">
      <el-table
        :data="filteredRecommends"
        style="width: 100%"
        border
      >
        <el-table-column prop="name" label="推荐名称" min-width="180">
          <template #default="{ row }">
            <div class="recommend-name">
              <span>{{ row.name }}</span>
              <el-tag 
                size="small" 
                :type="getTypeTag(row.type)"
              >
                {{ getTypeText(row.type) }}
              </el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="展示位置" width="150">
          <template #default="{ row }">
            {{ getPositionText(row.position) }}
          </template>
        </el-table-column>

        <el-table-column label="推荐商品" width="120">
          <template #default="{ row }">
            {{ row.productCount }}个
          </template>
        </el-table-column>

        <el-table-column label="展示效果" width="200">
          <template #default="{ row }">
            <div class="effect-data">
              <div class="effect-item">
                <span class="label">曝光</span>
                <span class="value">{{ row.exposure }}</span>
              </div>
              <div class="effect-item">
                <span class="label">点击</span>
                <span class="value">{{ row.clicks }}</span>
              </div>
              <div class="effect-item">
                <span class="label">转化</span>
                <span class="value">{{ row.conversion }}%</span>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="更新方式" width="120">
          <template #default="{ row }">
            <el-tag size="small" :type="row.updateMode === 'auto' ? 'success' : 'warning'">
              {{ row.updateMode === 'auto' ? '自动' : '手动' }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-switch
              v-model="row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="(val) => toggleStatus(row, val)"
            >
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="250" fixed="right">
          <template #default="{ row }">
            <el-button-group>
              <el-button 
                size="small"
                type="primary"
                plain
                @click="editRecommend(row)"
              >
                编辑
              </el-button>
              <el-button 
                size="small"
                type="success"
                plain
                @click="viewData(row)"
              >
                数据
              </el-button>
              <el-button 
                size="small"
                type="warning"
                plain
                @click="updateProducts(row)"
              >
                更新
              </el-button>
              <el-button 
                size="small"
                type="danger"
                plain
                @click="deleteRecommend(row)"
              >
                删除
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 新建/编辑推荐弹窗 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="800px"
    >
      <el-form 
        ref="recommendForm"
        :model="recommendForm"
        :rules="recommendRules"
        label-width="100px"
      >
        <el-form-item label="推荐名称" prop="name">
          <el-input v-model="recommendForm.name"></el-input>
        </el-form-item>

        <el-form-item label="推荐类型" prop="type">
          <el-radio-group v-model="recommendForm.type">
            <el-radio label="related">相关推荐</el-radio>
            <el-radio label="guess">猜你喜欢</el-radio>
            <el-radio label="hot">热销榜单</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="展示位置" prop="position">
          <el-select v-model="recommendForm.position">
            <el-option label="详情页底部" value="detail_bottom"></el-option>
            <el-option label="购物车页面" value="cart"></el-option>
            <el-option label="支付成功页" value="pay_success"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="更新方式" prop="updateMode">
          <el-radio-group v-model="recommendForm.updateMode">
            <el-radio label="auto">自动更新</el-radio>
            <el-radio label="manual">手动更新</el-radio>
          </el-radio-group>
        </el-form-item>

        <template v-if="recommendForm.updateMode === 'auto'">
          <el-form-item label="更新规则">
            <el-form-item label="更新频率">
              <el-select v-model="recommendForm.updateRule.frequency">
                <el-option label="每天" value="daily"></el-option>
                <el-option label="每周" value="weekly"></el-option>
                <el-option label="每月" value="monthly"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input-number
                v-model="recommendForm.updateRule.count"
                :min="1"
                :max="100"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="排序方式">
              <el-select v-model="recommendForm.updateRule.sortBy">
                <el-option label="销量优先" value="sales"></el-option>
                <el-option label="好评优先" value="rating"></el-option>
                <el-option label="新品优先" value="new"></el-option>
              </el-select>
            </el-form-item>
          </el-form-item>
        </template>

        <template v-else>
          <el-form-item label="选择商品">
            <el-button 
              type="primary" 
              icon="el-icon-plus"
              @click="openProductSelector"
            >
              添加商品
            </el-button>
            <div class="selected-products">
              <el-table
                :data="recommendForm.products"
                style="width: 100%"
              >
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="name" label="商品名称"></el-table-column>
                <el-table-column prop="price" label="价格" width="100"></el-table-column>
                <el-table-column label="操作" width="100">
                  <template #default="{ $index }">
                    <el-button 
                      type="text" 
                      icon="Delete"
                      @click="removeProduct($index)"
                    >
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
        </template>

        <el-form-item label="展示样式">
          <el-tabs v-model="recommendForm.style.type">
            <el-tab-pane label="列表样式" name="list">
              <el-form-item label="每行显示">
                <el-radio-group v-model="recommendForm.style.columns">
                  <el-radio :label="2">2列</el-radio>
                  <el-radio :label="3">3列</el-radio>
                  <el-radio :label="4">4列</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="轮播样式" name="carousel">
              <el-form-item label="轮播设置">
                <el-checkbox v-model="recommendForm.style.autoplay">自动轮播</el-checkbox>
                <el-input-number
                  v-model="recommendForm.style.interval"
                  :min="1"
                  :max="10"
                  label="轮播间隔(秒)"
                ></el-input-number>
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRecommend">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 数据分析弹窗 -->
    <el-dialog
      title="推荐效果分析"
      :visible.sync="dataVisible"
      width="900px"
    >
      <div class="data-analysis">
        <!-- 数据概览 -->
        <div class="data-overview">
          <div class="data-card">
            <div class="data-value">{{ currentData.exposure }}</div>
            <div class="data-label">总曝光量</div>
            <div class="data-trend up">
              <i class="el-icon-top"></i>
              12.5%
            </div>
          </div>
          <div class="data-card">
            <div class="data-value">{{ currentData.clicks }}</div>
            <div class="data-label">点击次数</div>
            <div class="data-trend up">
              <i class="el-icon-top"></i>
              8.3%
            </div>
          </div>
          <div class="data-card">
            <div class="data-value">{{ currentData.ctr }}%</div>
            <div class="data-label">点击率</div>
            <div class="data-trend down">
              <i class="el-icon-bottom"></i>
              2.1%
            </div>
          </div>
          <div class="data-card">
            <div class="data-value">{{ currentData.conversion }}%</div>
            <div class="data-label">转化率</div>
            <div class="data-trend up">
              <i class="el-icon-top"></i>
              5.7%
            </div>
          </div>
        </div>

        <!-- 趋势图表 -->
        <div class="data-chart">
          <!-- 这里可以使用 ECharts 等图表库 -->
        </div>

        <!-- 商品效果排行 -->
        <div class="product-ranking">
          <h4>商品效果排行</h4>
          <el-table
            :data="currentData.products"
            style="width: 100%"
          >
            <el-table-column type="index" width="50" label="排名"></el-table-column>
            <el-table-column prop="name" label="商品名称"></el-table-column>
            <el-table-column prop="exposure" label="曝光量" width="120"></el-table-column>
            <el-table-column prop="clicks" label="点击量" width="120"></el-table-column>
            <el-table-column prop="ctr" label="点击率" width="120">
              <template #default="{ row }">
                {{ row.ctr }}%
              </template>
            </el-table-column>
            <el-table-column prop="conversion" label="转化率" width="120">
              <template #default="{ row }">
                {{ row.conversion }}%
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>

    <!-- 商品选择弹窗 -->
    <el-dialog
      title="选择商品"
      :visible.sync="productSelectorVisible"
      width="800px"
    >
      <div class="product-selector">
        <!-- 搜索条件 -->
        <div class="selector-header">
          <el-input
            v-model="productSearchKey"
            placeholder="搜索商品"
            prefix-icon="el-icon-search"
          ></el-input>
          <el-select v-model="productCategory" placeholder="商品分类">
            <el-option label="全部" value=""></el-option>
            <el-option label="服装" value="clothing"></el-option>
            <el-option label="数码" value="digital"></el-option>
            <el-option label="美妆" value="beauty"></el-option>
          </el-select>
        </div>

        <!-- 商品列表 -->
        <div class="product-list">
          <el-table
            :data="filteredProducts"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="商品名称"></el-table-column>
            <el-table-column prop="price" label="价格" width="120"></el-table-column>
            <el-table-column prop="stock" label="库存" width="120"></el-table-column>
            <el-table-column prop="sales" label="销量" width="120"></el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer">
        <el-button @click="productSelectorVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmProducts">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'MarketingRecommend',
  data() {
    return {
      filterType: '',
      filterPosition: '',
      dialogVisible: false,
      dataVisible: false,
      productSelectorVisible: false,
      dialogTitle: '新建推荐',
      recommendForm: {
        name: '',
        type: 'related',
        position: 'detail_bottom',
        updateMode: 'auto',
        updateRule: {
          frequency: 'daily',
          count: 10,
          sortBy: 'sales'
        },
        products: [],
        style: {
          type: 'list',
          columns: 3,
          autoplay: true,
          interval: 3
        }
      },
      recommendRules: {
        name: [
          { required: true, message: '请输入推荐名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择推荐类型', trigger: 'change' }
        ],
        position: [
          { required: true, message: '请选择展示位置', trigger: 'change' }
        ]
      },
      productSearchKey: '',
      productCategory: '',
      selectedProducts: [],
      recommends: [
        {
          id: 1,
          name: '详情页相关推荐',
          type: 'related',
          position: 'detail_bottom',
          productCount: 12,
          exposure: 12580,
          clicks: 2360,
          conversion: 15.6,
          updateMode: 'auto',
          status: true
        }
        // ... 其他推荐数据
      ],
      currentData: {
        exposure: 12580,
        clicks: 2360,
        ctr: 18.8,
        conversion: 15.6,
        products: [
          {
            name: '商品1',
            exposure: 1200,
            clicks: 360,
            ctr: 30,
            conversion: 25
          }
          // ... 其他商品数据
        ]
      }
    }
  },
  computed: {
    filteredRecommends() {
      return this.recommends.filter(item => {
        if (this.filterType && item.type !== this.filterType) return false
        if (this.filterPosition && item.position !== this.filterPosition) return false
        return true
      })
    },
    filteredProducts() {
      // 根据搜索条件过滤商品
      return []
    }
  },
  methods: {
    createRecommend() {
      this.dialogTitle = '新建推荐'
      this.recommendForm = {
        name: '',
        type: 'related',
        position: 'detail_bottom',
        updateMode: 'auto',
        updateRule: {
          frequency: 'daily',
          count: 10,
          sortBy: 'sales'
        },
        products: [],
        style: {
          type: 'list',
          columns: 3,
          autoplay: true,
          interval: 3
        }
      }
      this.dialogVisible = true
    },
    editRecommend(recommend) {
      this.dialogTitle = '编辑推荐'
      this.recommendForm = { ...recommend }
      this.dialogVisible = true
    },
    saveRecommend() {
      this.$refs.recommendForm.validate(valid => {
        if (valid) {
          // 保存推荐逻辑
          this.$message.success('保存成功')
          this.dialogVisible = false
        }
      })
    },
    viewData(recommend) {
      this.dataVisible = true
      // 加载数据分析
    },
    updateProducts(recommend) {
      // 更新商品逻辑
      this.$message.success('商品更新成功')
    },
    deleteRecommend(recommend) {
      this.$confirm('确认删除该推荐？', '提示', {
        type: 'warning'
      }).then(() => {
        // 删除推荐逻辑
        this.$message.success('删除成功')
      })
    },
    toggleStatus(recommend, status) {
      // 切换状态逻辑
      this.$message.success(`${status ? '启用' : '停用'}成功`)
    },
    openProductSelector() {
      this.productSelectorVisible = true
      this.selectedProducts = []
    },
    handleSelectionChange(val) {
      this.selectedProducts = val
    },
    confirmProducts() {
      // 确认选择商品逻辑
      this.productSelectorVisible = false
    },
    removeProduct(index) {
      this.recommendForm.products.splice(index, 1)
    },
    getTypeTag(type) {
      const tagMap = {
        related: 'primary',
        guess: 'success',
        hot: 'danger'
      }
      return tagMap[type]
    },
    getTypeText(type) {
      const textMap = {
        related: '相关推荐',
        guess: '猜你喜欢',
        hot: '热销榜单'
      }
      return textMap[type]
    },
    getPositionText(position) {
      const textMap = {
        detail_bottom: '详情页底部',
        cart: '购物车页面',
        pay_success: '支付成功页'
      }
      return textMap[position]
    }
  }
}
</script>

<style scoped>
.marketing-recommend {
  padding: 20px;
}

.operation-bar {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-group {
  display: flex;
  gap: 12px;
}

.recommend-name {
  display: flex;
  align-items: center;
  gap: 8px;
}

.effect-data {
  display: flex;
  gap: 16px;
}

.effect-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.effect-item .label {
  font-size: 12px;
  color: #909399;
}

.effect-item .value {
  font-size: 14px;
  color: #303133;
  font-weight: 500;
}

/* 数据分析样式 */
.data-analysis {
  padding: 20px;
}

.data-overview {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.data-card {
  background: #f5f7fa;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.data-value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 8px;
}

.data-label {
  font-size: 14px;
  color: #909399;
  margin-bottom: 8px;
}

.data-trend {
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.data-trend.up {
  color: #67c23a;
}

.data-trend.down {
  color: #f56c6c;
}

.data-chart {
  height: 300px;
  background: #f5f7fa;
  margin-bottom: 30px;
  border-radius: 8px;
}

.product-ranking h4 {
  margin: 0 0 16px;
  font-size: 16px;
  color: #303133;
}

/* 商品选择器样式 */
.product-selector {
  height: 500px;
  display: flex;
  flex-direction: column;
}

.selector-header {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.product-list {
  flex: 1;
  overflow-y: auto;
}

.selected-products {
  margin-top: 12px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}
</style> 