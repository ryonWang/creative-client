<template>
  <div class="coins-container">
    <el-card class="balance-card">
      <div class="balance-info">
        <div class="icon-wrapper">
          <i class="el-icon-coin"></i>
        </div>
        <div class="info">
          <div class="label">当前金币余额</div>
          <div class="amount">{{currentCoins}}</div>
        </div>
      </div>
    </el-card>

    <el-card class="main-content">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="金币充值" name="first">
          <div class="coins-grid">
            <div v-for="(item, index) in coinPackages" :key="index" 
                 :class="['coin-package', {'hot-sale': item.isHot}]">
              <div class="tag" v-if="item.isHot">热销</div>
              <div class="package-content">
                <div class="price-section">
                  <span class="price">￥{{item.price}}</span>
                  <span class="discount" v-if="item.discount">
                    省 <span class="discount-amount">￥{{item.discount}}</span>
                  </span>
                </div>
                <div class="coins-section">
                  <span class="coins-amount">{{item.coins}}币</span>
                  <el-button size="small" plain class="buy-btn" @click="handleBuy(item)">
                    立即充值
                  </el-button>
                </div>
              </div>
            </div>
          </div>

          <!-- 自定义充值 -->
          <div class="custom-recharge">
            <div class="input-section">
              <span class="label">自定义充值</span>
              <el-input
                v-model="customAmount"
                placeholder="50元起充"
                style="width: 300px; margin-right: 10px;"
                @input="handleCustomInput"
              >
                <template slot="prefix">￥</template>
              </el-input>
              <el-button 
                type="primary" 
                @click="handleCustomRecharge"
                :style="gradientStyle"
              >
                立即充值
              </el-button>
            </div>
          </div>

          <!-- 计费规则 -->
          <div class="billing-rules">
            <div class="title">
              <i class="el-icon-info"></i>
              计费规则
            </div>
            <div class="rules-content">
              <div class="rule-item">
                <div class="rule-title">生成视频计费规则：</div>
                <div class="rule-detail">每混剪一条视频扣除4个金币</div>
              </div>
              <div class="rule-item">
                <div class="rule-title">生成文案计费规则：</div>
                <div class="rule-detail">文案使用量包括输入和输出的总量，每500个字算一个计量单位，不足500按500计算；一个计量单位1一个金币</div>
              </div>
              <div class="rule-item">
                <div class="rule-title">发布视频计费规则：</div>
                <div class="rule-detail">
                  1、矩阵发布，如果使用的是系统混剪视频，则不扣费；如果导入的本地素材视频做发布，每次扣除2个金币<br>
                  2、扫码发布，同矩阵发布规则
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="充值记录" name="second">
          <div class="search-section">
            <el-form :inline="true" size="medium">
              <el-form-item label="充值时间">
                <el-date-picker
                  v-model="dateRange"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button 
                  type="primary" 
                  @click="handleSearch"
                  :style="gradientStyle"
                >
                  查询
                </el-button>
              </el-form-item>
            </el-form>
          </div>

          <el-table
            :data="rechargeRecords"
            style="width: 100%"
            border
            :header-cell-style="tableHeaderStyle"
            :cell-style="tableCellStyle"
            v-loading="loading"
          >
            <el-table-column prop="coins" label="充值币数" align="center"></el-table-column>
            <el-table-column prop="coinsAfter" label="充值后币数" align="center"></el-table-column>
            <el-table-column prop="amount" label="充值金额" align="center">
              <template slot-scope="scope">
                ￥{{scope.row.amount}}
              </template>
            </el-table-column>
            <el-table-column prop="time" label="充值时间" align="center"></el-table-column>
            <el-table-column prop="status" label="充值状态" align="center">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status === '成功' ? 'success' : 'danger'">
                  {{scope.row.status}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="120">
              <template slot-scope="scope">
                <el-button type="text" @click="handleDetail(scope.row)">
                  查看详情
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class="pagination-container">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40, 50, 100]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 支付弹窗 -->
    <payment-dialog
      :visible.sync="showPayment"
      :amount="paymentAmount"
      :type="paymentType"
    />
  </div>

</template>

<script>
import PaymentDialog from '@/components/finance/PaymentDialog.vue'

export default {
  name: 'Coins',
  components: {
    PaymentDialog
  },
  data() {
    return {
      currentCoins: 0,
      activeTab: 'first',
      customAmount: '',
      dateRange: [],
      loading: false,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      gradientStyle: {
        background: 'linear-gradient(270deg, #2656F8 0%, #10A9FF 100%)',
        borderRadius: '6px',
        marginRight: '10px',
        border: 'none'
      },
      coinPackages: [
        { price: 50, coins: 500, discount: 0 },
        { price: 250, coins: 2500, discount: 0 },
        { price: 500, coins: 5000, discount: 0 },
        { price: 750, coins: 7500, discount: 0 },
        { price: 1800, coins: 18000, discount: 0, isHot: true },
        { price: 4380, coins: 43800, discount: 0 },
        { price: 8500, coins: 85000, discount: 0 },
        { price: 16000, coins: 160000, discount: 0 }
      ],
      rechargeRecords: [
        {
          coins: 500,
          coinsAfter: 1500,
          amount: 50,
          time: '2024-03-20 14:30:00',
          status: '成功'
        },
        {
          coins: 2500,
          coinsAfter: 4000,
          amount: 250,
          time: '2024-03-19 15:20:00',
          status: '成功'
        },
        {
          coins: 1000,
          coinsAfter: 1000,
          amount: 100,
          time: '2024-03-18 09:15:00',
          status: '失败'
        }
      ],
      showPayment: false,
      paymentAmount: 0,
      paymentType: ''
    }
  },
  methods: {
    handleCustomInput(value) {
      this.customAmount = value.replace(/[^\d]/g, '')
    },
    handleBuy(pkg) {
      this.paymentAmount = pkg.price
      this.paymentType = '金币充值'
      this.showPayment = true
    },
    handleCustomRecharge() {
      if (!this.customAmount || this.customAmount < 50) {
        this.$message.warning('最低充值金额为50元')
        return
      }
      // 处理自定义充值逻辑
    },
    handleSearch() {
      this.loading = true
      // TODO: 实现查询逻辑
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.handleSearch()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.handleSearch()
    },
    handleDetail(row) {
      // 查看详情逻辑
    },
    tableHeaderStyle() {
      return {
        backgroundColor: '#f5f7fa',
        color: '#606266',
        fontWeight: 600,
        height: '50px'
      }
    },
    tableCellStyle() {
      return {
        padding: '12px 0'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.coins-container {
  padding: 20px;
  background-color: #f5f7fa;

  .balance-card {
    margin-bottom: 20px;

    .balance-info {
      display: flex;
      align-items: center;

      .icon-wrapper {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #ffd700, #ffa500);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20px;

        i {
          font-size: 30px;
          color: #fff;
        }
      }

      .info {
        .label {
          font-size: 14px;
          color: #909399;
          margin-bottom: 8px;
        }

        .amount {
          font-size: 28px;
          font-weight: bold;
          color: #303133;
        }
      }
    }
  }

  .main-content {
    .coins-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-bottom: 30px;

      .coin-package {
        position: relative;
        border: 1px solid #e4e7ed;
        border-radius: 8px;
        padding: 20px;
        transition: all 0.3s;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
        }

        &.hot-sale {
          border-color: #ffd700;
        }

        .tag {
          position: absolute;
          top: -10px;
          right: 10px;
          background: #ff4949;
          color: #fff;
          padding: 2px 10px;
          border-radius: 12px;
          font-size: 12px;
        }

        .package-content {
          .price-section {
            margin-bottom: 15px;

            .price {
              font-size: 24px;
              font-weight: bold;
              color: #303133;
            }

            .discount {
              margin-left: 10px;
              font-size: 12px;
              color: #909399;

              .discount-amount {
                color: #ff4949;
              }
            }
          }

          .coins-section {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .coins-amount {
              font-size: 16px;
              color: #606266;
            }
          }
        }
      }
    }

    .custom-recharge {
      margin-bottom: 30px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 8px;

      .input-section {
        display: flex;
        align-items: center;

        .label {
          margin-right: 15px;
          font-size: 14px;
          color: #606266;
        }
      }
    }

    .billing-rules {
      background: #fff;
      padding: 20px;
      border-radius: 8px;

      .title {
        font-size: 16px;
        font-weight: bold;
        color: #303133;
        margin-bottom: 15px;
        display: flex;
        align-items: center;

        i {
          color: #409EFF;
          margin-right: 8px;
        }
      }

      .rules-content {
        .rule-item {
          margin-bottom: 15px;

          .rule-title {
            color: #606266;
            margin-bottom: 5px;
            font-weight: 500;
          }

          .rule-detail {
            color: #909399;
            line-height: 1.6;
          }
        }
      }
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style> 