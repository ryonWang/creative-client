<template>
  <div class="marketing-countdown">
    <!-- 顶部操作栏 -->
    <div class="operation-bar">
      <el-button-group>
        <el-button type="primary" icon="el-icon-plus" @click="createActivity">
          新建活动
        </el-button>
        <el-button icon="el-icon-copy-document" @click="openTemplates">
          活动模板
        </el-button>
      </el-button-group>
    </div>

    <!-- 活动列表 -->
    <div class="activity-list">
      <el-row :gutter="20">
        <el-col :span="8" v-for="item in activityList" :key="item.id">
          <el-card class="activity-card" shadow="hover">
            <div class="activity-header">
              <span class="activity-name">{{ item.name }}</span>
              <el-tag 
                :type="getStatusType(item.status)"
                size="mini"
              >
                {{ getStatusText(item.status) }}
              </el-tag>
            </div>

            <!-- 倒计时展示 -->
            <div class="countdown-display">
              <template v-if="item.status === 'pending'">
                <div class="countdown-title">距离开始还有</div>
                <div class="countdown-time">
                  <span class="time-block">{{ item.countdown.days }}</span> 天
                  <span class="time-block">{{ item.countdown.hours }}</span> 时
                  <span class="time-block">{{ item.countdown.minutes }}</span> 分
                  <span class="time-block">{{ item.countdown.seconds }}</span> 秒
                </div>
              </template>
              <template v-else-if="item.status === 'active'">
                <div class="countdown-title">距离结束还有</div>
                <div class="countdown-time">
                  <span class="time-block">{{ item.countdown.days }}</span> 天
                  <span class="time-block">{{ item.countdown.hours }}</span> 时
                  <span class="time-block">{{ item.countdown.minutes }}</span> 分
                  <span class="time-block">{{ item.countdown.seconds }}</span> 秒
                </div>
              </template>
              <template v-else>
                <div class="countdown-ended">活动已结束</div>
              </template>
            </div>

            <!-- 活动信息 -->
            <div class="activity-info">
              <div class="info-item">
                <span class="label">活动时间：</span>
                <span class="value">{{ item.startTime }} 至 {{ item.endTime }}</span>
              </div>
              <div class="info-item">
                <span class="label">活动商品：</span>
                <span class="value">{{ item.productCount }} 个</span>
              </div>
              <div class="info-item">
                <span class="label">优惠力度：</span>
                <span class="value discount">{{ item.discount }}</span>
              </div>
            </div>

            <!-- 操作按钮 -->
            <div class="activity-actions">
              <el-button-group>
                <el-button 
                  size="small"
                  type="primary"
                  plain
                  @click="editActivity(item)"
                >
                  编辑
                </el-button>
                <el-button 
                  size="small"
                  type="success"
                  plain
                  @click="previewActivity(item)"
                >
                  预览
                </el-button>
                <el-button 
                  size="small"
                  type="danger"
                  plain
                  @click="deleteActivity(item)"
                >
                  删除
                </el-button>
              </el-button-group>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 新建/编辑活动弹窗 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="700px"
    >
      <el-form 
        ref="activityForm"
        :model="activityForm"
        :rules="activityRules"
        label-width="100px"
      >
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="activityForm.name"></el-input>
        </el-form-item>

        <el-form-item label="活动时间" prop="timeRange">
          <el-date-picker
            v-model="activityForm.timeRange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :default-time="['00:00:00', '23:59:59']"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="活动商品">
          <div class="product-selector">
            <div class="selected-products">
              <div 
                v-for="product in activityForm.products"
                :key="product.id"
                class="product-item"
              >
                <el-image 
                  :src="product.image"
                  fit="cover"
                  class="product-image"
                ></el-image>
                <div class="product-info">
                  <div class="product-name">{{ product.name }}</div>
                  <div class="product-price">
                    <span class="original">¥{{ product.originalPrice }}</span>
                    <span class="current">¥{{ product.activityPrice }}</span>
                  </div>
                </div>
                <i 
                  class="el-icon-delete"
                  @click="removeProduct(product)"
                ></i>
              </div>
            </div>
            <el-button 
              type="dashed" 
              icon="el-icon-plus"
              @click="openProductSelector"
            >
              添加商品
            </el-button>
          </div>
        </el-form-item>

        <el-form-item label="倒计时样式">
          <el-tabs v-model="activityForm.style.type">
            <el-tab-pane label="基础样式" name="basic">
              <el-form-item label="背景颜色">
                <el-color-picker 
                  v-model="activityForm.style.backgroundColor"
                ></el-color-picker>
              </el-form-item>
              <el-form-item label="文字颜色">
                <el-color-picker 
                  v-model="activityForm.style.textColor"
                ></el-color-picker>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="高级样式" name="advanced">
              <el-form-item label="动画效果">
                <el-select v-model="activityForm.style.animation">
                  <el-option label="翻转" value="flip"></el-option>
                  <el-option label="滑动" value="slide"></el-option>
                  <el-option label="弹跳" value="bounce"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="自定义CSS">
                <el-input
                  type="textarea"
                  v-model="activityForm.style.customCSS"
                  rows="4"
                ></el-input>
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveActivity">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 商品选��弹窗 -->
    <el-dialog
      title="选择商品"
      :visible.sync="productSelectorVisible"
      width="800px"
    >
      <div class="product-selector-content">
        <!-- 商品搜索 -->
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
        <div class="product-grid">
          <el-checkbox-group v-model="selectedProducts">
            <div 
              v-for="product in filteredProducts"
              :key="product.id"
              class="product-grid-item"
            >
              <el-checkbox :label="product.id">
                <div class="product-card">
                  <el-image 
                    :src="product.image"
                    fit="cover"
                  ></el-image>
                  <div class="product-detail">
                    <div class="product-name">{{ product.name }}</div>
                    <div class="product-price">¥{{ product.price }}</div>
                  </div>
                </div>
              </el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
      </div>
      <span slot="footer">
        <el-button @click="productSelectorVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmProducts">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 预览弹窗 -->
    <el-dialog
      title="活动预览"
      :visible.sync="previewVisible"
      width="375px"
      custom-class="preview-dialog"
    >
      <div class="preview-container">
        <!-- 预览内容 -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'MarketingCountdown',
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '新建活动',
      productSelectorVisible: false,
      previewVisible: false,
      activityForm: {
        name: '',
        timeRange: [],
        products: [],
        style: {
          type: 'basic',
          backgroundColor: '#ff4400',
          textColor: '#ffffff',
          animation: 'flip',
          customCSS: ''
        }
      },
      activityRules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        timeRange: [
          { type: 'array', required: true, message: '请选择活动时间', trigger: 'change' }
        ]
      },
      productSearchKey: '',
      productCategory: '',
      selectedProducts: [],
      activityList: [
        {
          id: 1,
          name: '618大促',
          status: 'pending',
          startTime: '2024-06-18 00:00:00',
          endTime: '2024-06-20 23:59:59',
          productCount: 128,
          discount: '低至5折',
          countdown: {
            days: 88,
            hours: 23,
            minutes: 59,
            seconds: 59
          }
        }
        // ... 其他活动数据
      ]
    }
  },
  computed: {
    filteredProducts() {
      // 根据搜索条件过滤商品
      return []
    }
  },
  methods: {
    createActivity() {
      this.dialogTitle = '新建活动'
      this.activityForm = {
        name: '',
        timeRange: [],
        products: [],
        style: {
          type: 'basic',
          backgroundColor: '#ff4400',
          textColor: '#ffffff',
          animation: 'flip',
          customCSS: ''
        }
      }
      this.dialogVisible = true
    },
    editActivity(activity) {
      this.dialogTitle = '编辑活动'
      this.activityForm = { ...activity }
      this.dialogVisible = true
    },
    saveActivity() {
      this.$refs.activityForm.validate(valid => {
        if (valid) {
          // 保存活动逻辑
          this.$message.success('保存成功')
          this.dialogVisible = false
        }
      })
    },
    previewActivity(activity) {
      this.previewVisible = true
    },
    deleteActivity(activity) {
      this.$confirm('确认删除该活动？', '提示', {
        type: 'warning'
      }).then(() => {
        // 删除活动逻辑
        this.$message.success('删除成功')
      })
    },
    openProductSelector() {
      this.productSelectorVisible = true
      this.selectedProducts = []
    },
    confirmProducts() {
      // 确认选择商品逻辑
      this.productSelectorVisible = false
    },
    removeProduct(product) {
      const index = this.activityForm.products.indexOf(product)
      if (index > -1) {
        this.activityForm.products.splice(index, 1)
      }
    },
    getStatusType(status) {
      const typeMap = {
        pending: 'info',
        active: 'success',
        ended: 'danger'
      }
      return typeMap[status]
    },
    getStatusText(status) {
      const textMap = {
        pending: '未开始',
        active: '进行中',
        ended: '已结束'
      }
      return textMap[status]
    }
  }
}
</script>

<style scoped>
.marketing-countdown {
  padding: 20px;
}

.operation-bar {
  margin-bottom: 20px;
}

.activity-card {
  margin-bottom: 20px;
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.activity-name {
  font-size: 16px;
  font-weight: 500;
}

.countdown-display {
  text-align: center;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 4px;
  margin-bottom: 16px;
}

.countdown-title {
  font-size: 14px;
  color: #909399;
  margin-bottom: 12px;
}

.countdown-time {
  font-size: 16px;
  color: #303133;
}

.time-block {
  display: inline-block;
  min-width: 40px;
  padding: 4px 8px;
  margin: 0 4px;
  background: #409EFF;
  color: #fff;
  border-radius: 4px;
  font-weight: bold;
}

.countdown-ended {
  font-size: 16px;
  color: #909399;
  font-weight: 500;
}

.activity-info {
  margin-bottom: 16px;
}

.info-item {
  display: flex;
  margin-bottom: 8px;
}

.info-item .label {
  color: #909399;
  width: 80px;
}

.info-item .value {
  flex: 1;
  color: #606266;
}

.info-item .discount {
  color: #ff4400;
  font-weight: 500;
}

.activity-actions {
  text-align: right;
}

/* 商品选择器样式 */
.product-selector {
  border: 1px dashed #dcdfe6;
  border-radius: 4px;
  padding: 16px;
}

.selected-products {
  margin-bottom: 16px;
}

.product-item {
  display: flex;
  align-items: center;
  padding: 8px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  margin-bottom: 8px;
}

.product-image {
  width: 60px;
  height: 60px;
  margin-right: 12px;
}

.product-info {
  flex: 1;
}

.product-name {
  font-size: 14px;
  margin-bottom: 4px;
}

.product-price .original {
  color: #909399;
  text-decoration: line-through;
  margin-right: 8px;
}

.product-price .current {
  color: #ff4400;
  font-weight: 500;
}

.product-item .el-icon-delete {
  color: #909399;
  cursor: pointer;
  padding: 4px;
}

.product-item .el-icon-delete:hover {
  color: #f56c6c;
}

/* 商品选择弹窗样式 */
.selector-header {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.product-grid {
  height: 400px;
  overflow-y: auto;
}

.product-grid-item {
  margin-bottom: 12px;
}

.product-card {
  display: flex;
  align-items: center;
  padding: 8px;
}

.product-card .el-image {
  width: 80px;
  height: 80px;
  margin-right: 12px;
}

.product-detail {
  flex: 1;
}

/* 预��弹窗样式 */
.preview-dialog {
  margin-top: 5vh !important;
}

.preview-container {
  min-height: 600px;
  background: #fff;
}
</style> 