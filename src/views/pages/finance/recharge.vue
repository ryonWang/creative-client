<template>
  <div class="recharge-container">
    <!-- 头部余额信息 -->
    <div class="head">
      <div class="balance-cards">
        <!-- 可用余额卡片 -->
        <el-card class="balance-card available">
          <div class="card-content">
            <div class="icon-wrapper">
              <i class="el-icon-wallet"></i>
            </div>
            <div class="info">
              <div class="label">可用余额</div>
              <div class="amount">￥{{balance}}</div>
            </div>
          </div>
        </el-card>

        <!-- 任务绑定余额卡片 -->
        <el-card class="balance-card task">
          <div class="card-content">
            <div class="icon-wrapper">
              <i class="el-icon-lock"></i>
            </div>
            <div class="info">
              <div class="label">任务绑定余额</div>
              <div class="amount">￥{{taskBalance}}</div>
            </div>
          </div>
        </el-card>

        <!-- 已消费余额卡片 -->
        <el-card class="balance-card consumed">
          <div class="card-content">
            <div class="icon-wrapper">
              <i class="el-icon-shopping-cart-full"></i>
            </div>
            <div class="info">
              <div class="label">已消费余额</div>
              <div class="amount">￥{{consumedBalance}}</div>
            </div>
          </div>
        </el-card>
      </div>

      <!-- 充值输入框 -->
      <el-card class="recharge-input-card">
        <div class="input-section">
          <span class="label">充值金额</span>
          <el-input
            v-model="rechargeAmount"
            placeholder="请输入充值金额"
            class="amount-input"
            @input="handleInput"
          >
            <template slot="prefix">￥</template>
          </el-input>
          <el-button type="primary" size="medium" @click="handleRecharge">
            <i class="el-icon-plus"></i>
            立即充值
          </el-button>
        </div>
        <div class="tip">
          <i class="el-icon-warning-outline"></i>
          仅支持微信充值
        </div>
      </el-card>
    </div>

    <!-- 充值记录表格 -->
    <el-card class="record-card">
      <el-tabs v-model="activeTab" type="card">
        <el-tab-pane label="充值明细" name="recharge">
          <div class="search-section">
            <el-form :inline="true" size="medium">
              <el-form-item label="充值时间">
                <el-date-picker
                  v-model="dateRange"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  size="medium"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleSearch">
                  <i class="el-icon-search"></i>
                  查询
                </el-button>
              </el-form-item>
            </el-form>
          </div>
          
          <el-table
            :data="rechargeList"
            style="width: 100%"
            border
            v-loading="loading"
            :header-cell-style="tableHeaderStyle"
            :cell-style="tableCellStyle"
            stripe
          >
            <el-table-column prop="amount" label="充值金额" align="center" min-width="200">
              <template slot-scope="scope">
                <span class="amount-text">￥{{scope.row.amount}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" align="center" min-width="150">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status === '成功' ? 'success' : 'danger'" effect="dark">
                  {{scope.row.status}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="balanceAfter" label="充值后金额" align="center" min-width="200">
              <template slot-scope="scope">
                <span class="amount-text">￥{{scope.row.balanceAfter}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="time" label="充值时间" align="center" min-width="180"></el-table-column>
            <el-table-column label="操作" align="center" width="150" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="handleDetail(scope.row)">
                  查看详情
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 充值明细分页 -->
          <div class="pagination-container" v-show="activeTab === 'recharge'">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40, 50]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>

        <el-tab-pane label="账单明细" name="bill">
          <div class="search-section">
            <el-form :inline="true" size="medium">
              <el-form-item label="变动时间">
                <el-date-picker
                  v-model="billDateRange"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  size="medium"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="变动类型">
                <el-select v-model="billType" placeholder="请选择" size="medium">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="任务充值" value="task_recharge"></el-option>
                  <el-option label="商户奖励" value="merchant_reward"></el-option>
                  <el-option label="任务发布冻结金额" value="task_freeze"></el-option>
                  <el-option label="任务解冻金额" value="task_unfreeze"></el-option>
                  <el-option label="达人结算" value="talent_settlement"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleBillSearch">
                  <i class="el-icon-search"></i>
                  查询
                </el-button>
              </el-form-item>
            </el-form>
          </div>
          
          <el-table
            :data="billList"
            style="width: 100%"
            border
            v-loading="billLoading"
            :header-cell-style="tableHeaderStyle"
            :cell-style="tableCellStyle"
            stripe
          >
            <el-table-column prop="billNo" label="账单编号" align="center" min-width="200"></el-table-column>
            <el-table-column prop="amount" label="变动金额" align="center" min-width="180">
              <template slot-scope="scope">
                <span :class="['amount-text', scope.row.amount >= 0 ? 'positive' : 'negative']">
                  {{ scope.row.amount >= 0 ? '+' : '' }}￥{{Math.abs(scope.row.amount)}}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="变动类型" align="center" min-width="150">
              <template slot-scope="scope">
                <el-tag :type="getBillTypeTag(scope.row.type)" effect="dark">{{scope.row.type}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="description" label="变动说明" align="center" min-width="250" show-overflow-tooltip></el-table-column>
            <el-table-column prop="time" label="变动时间" align="center" min-width="180"></el-table-column>
          </el-table>

          <!-- 账单明细分页 -->
          <div class="pagination-container" v-show="activeTab === 'bill'">
            <el-pagination
              background
              @size-change="handleBillSizeChange"
              @current-change="handleBillCurrentChange"
              :current-page="billCurrentPage"
              :page-sizes="[10, 20, 30, 40, 50]"
              :page-size="billPageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="billTotal">
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
  name: 'Recharge',
  components: {
    PaymentDialog
  },
  data() {
    return {
      balance: 0,
      taskBalance: 0,
      consumedBalance: 0,
      rechargeAmount: '',
      activeTab: 'recharge',
      dateRange: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      rechargeList: [
        { amount: 1000, status: '成功', balanceAfter: 2000, time: '2024-03-20 14:30:00' },
        { amount: 500, status: '成功', balanceAfter: 1000, time: '2024-03-19 10:15:00' },
        { amount: 200, status: '失败', balanceAfter: 500, time: '2024-03-18 16:45:00' },
        { amount: 300, status: '成功', balanceAfter: 500, time: '2024-03-17 09:20:00' },
        { amount: 1500, status: '成功', balanceAfter: 200, time: '2024-03-16 11:30:00' },
      ],
      loading: false,
      billDateRange: [],
      billType: '',
      billList: [
        { 
          billNo: 'B202403200001',
          amount: 1000,
          type: '任务充值',
          description: '账户充值',
          time: '2024-03-20 14:30:00'
        },
        {
          billNo: 'B202403200002',
          amount: -500,
          type: '任务发布冻结金额',
          description: '发布任务ID:12345冻结金额',
          time: '2024-03-20 15:00:00'
        },
        {
          billNo: 'B202403190001',
          amount: 200,
          type: '商户奖励',
          description: '新用户奖励',
          time: '2024-03-19 10:00:00'
        },
        {
          billNo: 'B202403190002',
          amount: 300,
          type: '任务解冻金额',
          description: '任务ID:12345完成解冻',
          time: '2024-03-19 16:30:00'
        },
        {
          billNo: 'B202403180001',
          amount: -800,
          type: '达人结算',
          description: '达人任务结算',
          time: '2024-03-18 09:15:00'
        }
      ],
      billLoading: false,
      billCurrentPage: 1,
      billPageSize: 20,
      billTotal: 0,
      showPayment: false,
      paymentAmount: 0,
      paymentType: ''
    }
  },
  methods: {
    handleInput(value) {
      // 只允许输入数字和小数点
      this.rechargeAmount = value.replace(/[^\d.]/g, '')
    },
    handleRecharge() {
      if(!this.rechargeAmount) {
        this.$message.warning('请输入充值金额')
        return
      }
      this.paymentAmount = this.rechargeAmount
      this.showPayment = true
    },
    handleSearch() {
      // 查询充值记录
      // TODO: 调用查询API
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.handleSearch()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.handleSearch()
    },
    handleBillSearch() {
      this.billLoading = true
      // TODO: 调用账单查询API
      setTimeout(() => {
        this.billLoading = false
      }, 1000)
    },
    handleBillSizeChange(val) {
      this.billPageSize = val
      this.handleBillSearch()
    },
    handleBillCurrentChange(val) {
      this.billCurrentPage = val
      this.handleBillSearch()
    },
    getBillTypeTag(type) {
      const typeMap = {
        '任务充值': 'success',
        '商户奖励': 'warning',
        '任务发布冻结金额': 'info',
        '任务解冻金额': 'primary',
        '达人结算': 'danger'
      }
      return typeMap[type] || ''
    },
    // 表格样式
    tableHeaderStyle() {
      return {
        backgroundColor: '#f5f7fa',
        color: '#606266',
        fontWeight: 600,
        height: '50px',
        padding: '0',
        fontSize: '14px'
      }
    },
    tableCellStyle() {
      return {
        padding: '12px 0',
        fontSize: '14px'
      }
    }
  },
  watch: {
    activeTab(val) {
      if (val === 'bill') {
        this.handleBillSearch()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.recharge-container {
  padding: 20px;
  background-color: #f5f7fa;

  .balance-cards {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .balance-card {
      flex: 1;
      margin: 0 10px;
      
      &:first-child {
        margin-left: 0;
      }
      
      &:last-child {
        margin-right: 0;
      }

      .card-content {
        display: flex;
        align-items: center;

        .icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          
          i {
            font-size: 24px;
            color: #fff;
          }
        }

        .info {
          flex: 1;

          .label {
            font-size: 14px;
            color: #909399;
            margin-bottom: 8px;
          }

          .amount {
            font-size: 24px;
            font-weight: bold;
            color: #303133;
          }
        }
      }
    }

    .available .icon-wrapper {
      background: linear-gradient(135deg, #409EFF, #36a3f7);
    }

    .task .icon-wrapper {
      background: linear-gradient(135deg, #67C23A, #85ce61);
    }

    .consumed .icon-wrapper {
      background: linear-gradient(135deg, #E6A23C, #ebb563);
    }
  }

  .recharge-input-card {
    margin-bottom: 20px;

    .input-section {
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      .label {
        font-size: 14px;
        color: #606266;
        margin-right: 15px;
        white-space: nowrap;
      }

      .amount-input {
        width: 300px;
        margin-right: 20px;
      }
    }

    .tip {
      color: #909399;
      font-size: 12px;

      i {
        margin-right: 5px;
        color: #E6A23C;
      }
    }
  }

  .record-card {
    .search-section {
      margin-bottom: 20px;
    }

    .amount-text {
      color: #409EFF;
      font-weight: 500;
    }

    .el-table {
      margin: 15px 0;
      border-radius: 8px;
      overflow: hidden;
      
      &::before {
        display: none;
      }
      
      .el-table__header-wrapper {
        th {
          background-color: #f5f7fa !important;
        }
      }
    }

    .amount-text {
      font-weight: 500;
      
      &.positive {
        color: #67C23A;
      }
      &.negative {
        color: #F56C6C;
      }
    }

    .el-tag {
      padding: 0 15px;
      height: 28px;
      line-height: 28px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }

  .amount-text {
    &.positive {
      color: #67C23A;
    }
    &.negative {
      color: #F56C6C;
    }
  }

  .el-select {
    width: 200px;
  }

  // 确保只显示当前激活tab的分页
  .el-tabs__content {
    overflow: visible;
  }
}
</style> 