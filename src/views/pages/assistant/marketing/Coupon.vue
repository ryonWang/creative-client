<template>
  <div class="marketing-coupon">
    <!-- 顶部操作栏 -->
    <div class="operation-bar">
      <el-button-group>
        <el-button type="primary" icon="el-icon-plus" @click="createCoupon">
          新建优惠券
        </el-button>
        <el-button icon="el-icon-upload2" @click="importCoupons">
          批量导入
        </el-button>
      </el-button-group>

      <div class="filter-group">
        <el-select v-model="filterStatus" placeholder="优惠券状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="未开始" value="pending"></el-option>
          <el-option label="进行中" value="active"></el-option>
          <el-option label="已结束" value="expired"></el-option>
        </el-select>
        <el-input
          placeholder="搜索优惠券"
          prefix-icon="el-icon-search"
          v-model="searchKey"
        ></el-input>
      </div>
    </div>

    <!-- 优惠券列表 -->
    <div class="coupon-list">
      <el-table
        :data="filteredCoupons"
        style="width: 100%"
        border
      >
        <el-table-column prop="name" label="优惠券名称" min-width="180">
          <template #default="{ row }">
            <div class="coupon-name">
              <span>{{ row.name }}</span>
              <el-tag 
                size="mini" 
                :type="row.type === 'discount' ? 'warning' : 'danger'"
              >
                {{ row.type === 'discount' ? '折扣券' : '满减券' }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        
        <el-table-column label="优惠内容" width="180">
          <template #default="{ row }">
            <div class="coupon-value">
              <template v-if="row.type === 'discount'">
                {{ row.value }}折
              </template>
              <template v-else>
                满{{ row.condition }}减{{ row.value }}
              </template>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="total" label="发放总量" width="120">
          <template #default="{ row }">
            {{ row.total }}张
          </template>
        </el-table-column>

        <el-table-column prop="received" label="已领取" width="120">
          <template #default="{ row }">
            {{ row.received }}张
          </template>
        </el-table-column>

        <el-table-column prop="used" label="已使用" width="120">
          <template #default="{ row }">
            {{ row.used }}张
          </template>
        </el-table-column>

        <el-table-column label="有效期" width="280">
          <template #default="{ row }">
            {{ row.startTime }} 至 {{ row.endTime }}
          </template>
        </el-table-column>

        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button-group>
              <el-button 
                size="mini"
                type="primary"
                plain
                @click="editCoupon(row)"
              >
                编辑
              </el-button>
              <el-button 
                size="mini"
                type="success"
                plain
                @click="viewStats(row)"
              >
                数据
              </el-button>
              <el-button 
                size="mini"
                type="danger"
                plain
                @click="deleteCoupon(row)"
              >
                删除
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 新建/编辑优惠券弹窗 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="600px"
    >
      <el-form 
        ref="couponForm"
        :model="couponForm"
        :rules="couponRules"
        label-width="100px"
      >
        <el-form-item label="优惠券名称" prop="name">
          <el-input v-model="couponForm.name"></el-input>
        </el-form-item>

        <el-form-item label="优惠类型" prop="type">
          <el-radio-group v-model="couponForm.type">
            <el-radio label="discount">折扣券</el-radio>
            <el-radio label="amount">满减券</el-radio>
          </el-radio-group>
        </el-form-item>

        <template v-if="couponForm.type === 'discount'">
          <el-form-item label="折扣力度" prop="value">
            <el-input-number 
              v-model="couponForm.value"
              :min="1"
              :max="9.9"
              :step="0.1"
            ></el-input-number>
            <span class="unit">折</span>
          </el-form-item>
        </template>

        <template v-else>
          <el-form-item label="使用门槛" prop="condition">
            <el-input-number 
              v-model="couponForm.condition"
              :min="0"
              :step="10"
            ></el-input-number>
            <span class="unit">元</span>
          </el-form-item>
          <el-form-item label="优惠金额" prop="value">
            <el-input-number 
              v-model="couponForm.value"
              :min="0"
              :max="couponForm.condition"
              :step="1"
            ></el-input-number>
            <span class="unit">元</span>
          </el-form-item>
        </template>

        <el-form-item label="发放总量" prop="total">
          <el-input-number 
            v-model="couponForm.total"
            :min="1"
            :step="100"
          ></el-input-number>
          <span class="unit">张</span>
        </el-form-item>

        <el-form-item label="每人限领" prop="perLimit">
          <el-input-number 
            v-model="couponForm.perLimit"
            :min="1"
            :max="10"
          ></el-input-number>
          <span class="unit">张</span>
        </el-form-item>

        <el-form-item label="有效期" prop="timeRange">
          <el-date-picker
            v-model="couponForm.timeRange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="使用说明" prop="description">
          <el-input
            type="textarea"
            v-model="couponForm.description"
            :rows="3"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCoupon">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 数据统计弹窗 -->
    <el-dialog
      title="优惠券数据"
      :visible.sync="statsVisible"
      width="800px"
    >
      <div class="stats-container">
        <!-- 数据概览 -->
        <div class="stats-overview">
          <div class="stat-card">
            <div class="stat-value">{{ currentStats.receiveRate }}%</div>
            <div class="stat-label">领取率</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ currentStats.useRate }}%</div>
            <div class="stat-label">使用率</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">¥{{ currentStats.orderAmount }}</div>
            <div class="stat-label">带动销售额</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ currentStats.newUsers }}</div>
            <div class="stat-label">新增用户数</div>
          </div>
        </div>

        <!-- 数据趋势图 -->
        <div class="stats-chart">
          <!-- 这里可以使用 ECharts 等图表库 -->
        </div>

        <!-- 用户分析 -->
        <div class="user-analysis">
          <h4>用户画像分析</h4>
          <!-- 用户画像数据展示 -->
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'MarketingCoupon',
  data() {
    return {
      filterStatus: '',
      searchKey: '',
      dialogVisible: false,
      statsVisible: false,
      dialogTitle: '新建优惠券',
      couponForm: {
        name: '',
        type: 'discount',
        value: 9.5,
        condition: 100,
        total: 1000,
        perLimit: 1,
        timeRange: [],
        description: ''
      },
      couponRules: {
        name: [
          { required: true, message: '请输入优惠券名称', trigger: 'blur' }
        ],
        timeRange: [
          { type: 'array', required: true, message: '请选择有效期', trigger: 'change' }
        ]
      },
      coupons: [
        {
          id: 1,
          name: '新人专享券',
          type: 'discount',
          value: 8.5,
          total: 1000,
          received: 328,
          used: 156,
          startTime: '2024-03-01 00:00:00',
          endTime: '2024-03-31 23:59:59',
          status: 'active'
        }
        // ... 其他优惠券数据
      ],
      currentStats: {
        receiveRate: 32.8,
        useRate: 47.6,
        orderAmount: 15680,
        newUsers: 286
      }
    }
  },
  computed: {
    filteredCoupons() {
      return this.coupons.filter(coupon => {
        if (this.filterStatus && coupon.status !== this.filterStatus) return false
        if (this.searchKey && !coupon.name.includes(this.searchKey)) return false
        return true
      })
    }
  },
  methods: {
    createCoupon() {
      this.dialogTitle = '新建优惠券'
      this.couponForm = {
        name: '',
        type: 'discount',
        value: 9.5,
        condition: 100,
        total: 1000,
        perLimit: 1,
        timeRange: [],
        description: ''
      }
      this.dialogVisible = true
    },
    editCoupon(coupon) {
      this.dialogTitle = '编辑优惠券'
      this.couponForm = { ...coupon }
      this.dialogVisible = true
    },
    saveCoupon() {
      this.$refs.couponForm.validate(valid => {
        if (valid) {
          // 保存优惠券逻辑
          this.$message.success('保存成功')
          this.dialogVisible = false
        }
      })
    },
    viewStats(coupon) {
      this.statsVisible = true
      // 加载数据统计
    },
    deleteCoupon(coupon) {
      this.$confirm('确认删除该优惠券？', '提示', {
        type: 'warning'
      }).then(() => {
        // 删除优惠券逻辑
        this.$message.success('删除成功')
      })
    },
    importCoupons() {
      // 批量导入逻辑
    },
    getStatusType(status) {
      const typeMap = {
        pending: 'info',
        active: 'success',
        expired: 'danger'
      }
      return typeMap[status]
    },
    getStatusText(status) {
      const textMap = {
        pending: '未开始',
        active: '进行中',
        expired: '已结束'
      }
      return textMap[status]
    }
  }
}
</script>

<style scoped>
.marketing-coupon {
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

.coupon-name {
  display: flex;
  align-items: center;
  gap: 8px;
}

.coupon-value {
  font-size: 16px;
  font-weight: 500;
  color: #ff4400;
}

.unit {
  margin-left: 8px;
  color: #909399;
}

/* 数据统计样式 */
.stats-container {
  padding: 20px;
}

.stats-overview {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: #f5f7fa;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #409EFF;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: #909399;
}

.stats-chart {
  height: 300px;
  margin-bottom: 30px;
  background: #f5f7fa;
  border-radius: 8px;
}

.user-analysis {
  background: #f5f7fa;
  padding: 20px;
  border-radius: 8px;
}

.user-analysis h4 {
  margin: 0 0 16px;
  font-size: 16px;
  color: #303133;
}
</style> 