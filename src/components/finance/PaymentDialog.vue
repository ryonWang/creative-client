<template>
  <el-dialog
    :visible.sync="dialogVisible"
    width="600px"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    class="payment-dialog"
    @close="handleClose"
  >
    <div class="payment-container" v-loading="loading" element-loading-text="提交支付中...">
      <!-- 支付信息卡片 -->
      <el-card class="payment-info">
        <div class="el-descriptions">
          <div class="el-descriptions__header">
            <div class="el-descriptions__title">
              <i class="el-icon-document"></i>
              支付信息
            </div>
          </div>
          <div class="el-descriptions__body">
            <el-descriptions :column="3" border>
              <el-descriptions-item label="支付单号">{{paymentInfo.orderNo}}</el-descriptions-item>
              <el-descriptions-item label="商品标题">{{paymentInfo.title}}</el-descriptions-item>
              <el-descriptions-item label="商品内容">{{paymentInfo.content}}</el-descriptions-item>
              <el-descriptions-item label="支付金额">
                <span class="amount">￥{{paymentInfo.amount}}</span>
              </el-descriptions-item>
              <el-descriptions-item label="创建时间">{{paymentInfo.createTime}}</el-descriptions-item>
              <el-descriptions-item label="过期时间">{{paymentInfo.expireTime}}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
      </el-card>

      <!-- 支付方式卡片 -->
      <el-card class="payment-method">
        <div class="el-descriptions">
          <div class="el-descriptions__header">
            <div class="el-descriptions__title">
              <i class="el-icon-bank-card"></i>
              选择支付方式
            </div>
          </div>
        </div>
        <div class="pay-channel-container">
          <div 
            v-for="method in paymentMethods" 
            :key="method.id"
            :class="['payment-method-item', { active: selectedMethod === method.id }]"
            @click="selectPaymentMethod(method.id)"
          >
            <div class="method-box">
              <img :src="method.icon" :alt="method.name">
              <div class="method-title">{{method.name}}</div>
              <el-tag 
                v-if="method.tag" 
                :type="method.tagType" 
                size="mini"
                class="method-tag"
              >
                {{method.tag}}
              </el-tag>
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button 
        type="primary" 
        @click="handleConfirmPayment" 
        :disabled="!selectedMethod"
        :loading="loading"
      >
        确认支付
      </el-button>
      <el-button @click="handleCancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'PaymentDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    amount: {
      type: [Number, String],
      required: true
    },
    type: {
      type: String,
      default: '充值'
    }
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      selectedMethod: null,
      paymentInfo: {
        orderNo: '',
        title: '',
        content: '',
        amount: 0,
        createTime: '',
        expireTime: ''
      },
      paymentMethods: [
        {
          id: 'wxpay',
          name: '微信扫码支付',
          icon: 'data:image/svg+xml;base64,PHN2ZyB0PSIxNzEwOTIxNjI3NDczIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIzNjgiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNMzgzLjcgNDI0LjZjLTEzLjMgMC0yNi45IDkuOS0yNi45IDIzLjJzMTMuNiAyMy4yIDI2LjkgMjMuMmMxMy4zIDAgMjMuMi05LjkgMjMuMi0yMy4ycy05LjktMjMuMi0yMy4yLTIzLjJ6IG0xNjYuMSAwYy0xMy4zIDAtMjYuOSA5LjktMjYuOSAyMy4yczEzLjYgMjMuMiAyNi45IDIzLjJjMTMuMyAwIDIzLjItOS45IDIzLjItMjMuMi0wLjEtMTMuMy0xMC0yMy4yLTIzLjItMjMuMnpNNTEyIDY0QzI2NC42IDY0IDY0IDI2NC42IDY0IDUxMnMyMDAuNiA0NDggNDQ4IDQ0OCA0NDgtMjAwLjYgNDQ4LTQ0OFM3NTkuNCA2NCA1MTIgNjR6IG0yMDMuOCA1NzYuM2MtMzMuNSAxNi42LTY5LjggMjkuOS0xMDYuMSAzMy4xLTM5LjcgNi42LTc5LjMgMy4zLTExNS44LTMuMy0zOS43LTYuNi03Ni4xLTE5LjktMTA5LjQtMzYuNC0xOS45LTkuOS0zOS43LTIzLjItNTYuMy0zOS43LTkuOS05LjktMjMuMi0yMy4yLTMzLjEtMzYuNC0yOS45LTM5LjctMTYuNi04OS40IDMuMy0xMjIuNSAxOS45LTMzLjEgNTYuMy01OS42IDk2LTczLjEgMzYuNC0xMy4zIDc5LjMtMTYuNiAxMTkuMS0xMy4zIDQ2LjQgNi42IDg5LjQgMTkuOSAxMjkuMSA0My4xbC0xMy4zLTQzLjFjMC0zLjMtMy4zLTYuNi0zLjMtOS45di0zLjNjMC0xMy4zIDkuOS0yMy4yIDIzLjItMjMuMmgxMDkuNGMxMy4zIDAgMjMuMiA5LjkgMjMuMiAyMy4yIDAgMy4zIDAgMy4zLTMuMyA2LjZsLTY5LjggMjE1LjJjMCAzLjMtMy4zIDYuNi0zLjMgNi42IDAgMy4zIDAgMy4zIDMuMyA2LjYgMjkuOS0yMy4yIDUzLTQ5LjcgNjkuOC04Mi44IDEzLjMtMjYuOSAxOS45LTU2LjMgMTkuOS04NS45IDAtNDMuMS0xMy4zLTgyLjgtMzYuNC0xMTkuMS0yMy4yLTM2LjQtNTYuMy02Ni4yLTk2LTg5LjQtODIuOC00Ni40LTE4NS40LTUzLTI3NC44LTE5LjktNDMuMSAxNi42LTgyLjggMzkuNy0xMTUuOCA3My4xLTMzLjEgMzMuMS01OS42IDc2LjEtNjkuOCAxMjIuNS0yMy4yIDkyLjcgNi42IDE4NS40IDc2LjEgMjUxLjYgMzYuNCAzMy4xIDc5LjMgNTkuNiAxMjUuNyA3Ni4xIDQ5LjcgMTkuOSA5OS4zIDI2LjkgMTUyLjQgMjMuMiA0OS43LTMuMyA5OS4zLTE2LjYgMTQ1LjctMzkuNyAxMy4zLTYuNiAyOS45IDAgMzMuMSAxMy4zIDYuNiAxMy4zIDAgMjkuOS0xMy4zIDMzLjF6IG0tMTQ5LjEtMjk1LjFjLTEzLjMgMC0yMy4yIDkuOS0yMy4yIDIzLjJzOS45IDIzLjIgMjMuMiAyMy4yYzEzLjMgMCAyNi45LTkuOSAyNi45LTIzLjJzLTEzLjYtMjMuMi0yNi45LTIzLjJ6IG0xNjYuMSAwYy0xMy4zIDAtMjMuMiA5LjktMjMuMiAyMy4yczkuOSAyMy4yIDIzLjIgMjMuMmMxMy4zIDAgMjYuOS05LjkgMjYuOS0yMy4ycy0xMy42LTIzLjItMjYuOS0yMy4yeiIgZmlsbD0iIzA3QzE2MCIgcC1pZD0iMjM2OSI+PC9wYXRoPjwvc3ZnPg==',
          tag: '推荐',
          tagType: 'success'
        },
        {
          id: 'alipay',
          name: '支付宝支付',
          icon: 'data:image/svg+xml;base64,PHN2ZyB0PSIxNzEwOTIxNjkxOTk0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjM5MjgiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNODk0LjQgNzEwLjRjLTM0LjQgNDEuNS04NS4yIDYyLjktMTQ4LjcgNjIuOS05NS4xIDAtMTc0LjYtNzYuNi0xNzQuNi0xNzEgMC05NC40IDc5LjUtMTcxIDEzNC42LTE3MSA4Ni42IDAgMTU2IDYzLjggMTY5LjcgMTQ5bC0zNDQuMS0wLjF2NDYuM2gxNzIuNnYzMS4yaC0xNzIuNnY2Mi40aDE3Mi42djc3LjloLTYyLjR2LTMxLjJoLTc3LjlWODg2aDMxLjJ2LTMxLjJoLTkzLjV2LTYyLjRoOTMuNXYtMzEuMmgtMTA5djQ2LjNoLTQ2LjN2LTQ2LjNoLTkzLjV2LTYyLjRoOTMuNXYtMzEuMmgtMTA5di00Ni4zaDI2Ni4yYy0xMy43LTU0LTYyLjQtOTMuNS0xMjMuMi05My41LTYyLjQgMC0xMTIgNDkuNi0xMTIgMTEyIDAgNjIuNCA0OS42IDExMiAxMTIgMTEyIDYyLjQgMCAxMTItNDkuNiAxMTItMTEyaDQ2LjNjMCA4Ny4xLTcwLjggMTU4LTE1OC4zIDE1OC04Ny41IDAtMTU4LjMtNzAuOC0xNTguMy0xNTggMC04Ny41IDcwLjgtMTU4LjMgMTU4LjMtMTU4LjMgNjEuOSAwIDExNS41IDM1LjYgMTQxLjUgODcuMmwyNi42LTg3LjJjMC0yLjUgMC00LjkgMC02LjJ2LTIuNWMwLTkuOSA3LjQtMTcuMyAxNy4zLTE3LjNoODEuNmM5LjkgMCAxNy4zIDcuNCAxNy4zIDE3LjMgMCAyLjUgMCAyLjUtMi41IDQuOWwtNTIgMTYwLjVjMCAyLjUtMi41IDQuOS0yLjUgNC45IDAgMi41IDAgMi41IDIuNSA0LjkgMjIuMy0xNy4zIDM5LjUtMzcgNTItNjEuOCA5LjktMjAgMTQuOC00MiAxNC44LTY0IDAtMzIuMS05LjktNjEuOC0yNy4yLTg4LjgtMTcuMy0yNy4yLTQyLTQ5LjQtNzEuNi02Ni43LTYxLjgtMzQuNi0xMzguMy0zOS41LTIwNC45LTE0LjgtMzIuMSAxMi40LTYxLjggMjkuNi04Ni4zIDU0LjUtMjQuNyAyNC43LTQ0LjQgNTYuOC01Mi4xIDkxLjQtMTcuMyA2OS4yIDQuOSAxMzguMyA1Ni44IDE4Ny43IDI3LjIgMjQuNyA1OS4yIDQ0LjQgOTMuOCA1Ni44IDM3IDQuOSA3NC4xIDEyLjQgMTEzLjYgOS45IDM3LTIuNSA3NC4xLTEyLjQgMTA4LjctMjkuNiA5LjktNC45IDIyLjMgMCAyNC43IDkuOSA0LjkgOS45IDAgMjIuMy05LjkgMjQuN3oiIGZpbGw9IiMxNjc3RkYiIHAtaWQ9IjM5MjkiPjwvcGF0aD48L3N2Zz4='
        }
      ]
    }
  },
  watch: {
    visible(val) {
      this.dialogVisible = val
      if (val) {
        this.initPaymentInfo()
      }
    }
  },
  methods: {
    initPaymentInfo() {
      const now = new Date()
      const expire = new Date(now.getTime() + 30 * 60000) // 30分钟后过期
      
      this.paymentInfo = {
        orderNo: this.generateOrderNo(),
        title: `${this.type}`,
        content: `${this.type}金额：￥${this.amount}`,
        amount: this.amount,
        createTime: this.formatDate(now),
        expireTime: this.formatDate(expire)
      }
    },
    generateOrderNo() {
      return Date.now().toString() + Math.random().toString().slice(2, 8)
    },
    formatDate(date) {
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(/\//g, '-')
    },
    selectPaymentMethod(methodId) {
      this.selectedMethod = methodId
    },
    handleConfirmPayment() {
      this.loading = true
      // TODO: 实现支付逻辑
      setTimeout(() => {
        this.loading = false
        this.$message.success('支付提交成功')
        this.$emit('update:visible', false)
      }, 1500)
    },
    async handleCancel() {
      try {
        await this.$confirm('是否放弃本次充值？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        this.$emit('update:visible', false)
      } catch {
        // 用户取消关闭
      }
    },
    handleClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.payment-dialog {
  .payment-container {
    .payment-info {
      margin-bottom: 20px;
      
      .el-descriptions__title {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: bold;
        
        i {
          margin-right: 8px;
          color: #409EFF;
        }
      }

      .amount {
        color: #F56C6C;
        font-size: 16px;
        font-weight: bold;
      }
    }

    .payment-method {
      .el-descriptions__title {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: bold;
        
        i {
          margin-right: 8px;
          color: #409EFF;
        }
      }

      .pay-channel-container {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        margin-top: 20px;

        .payment-method-item {
          cursor: pointer;
          transition: all 0.3s;

          .method-box {
            position: relative;
            width: 200px;
            height: 80px;
            border: 1px solid #DCDFE6;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 15px;
            transition: all 0.3s;

            img {
              height: 32px;
              width: 32px;
              margin-bottom: 8px;
              object-fit: contain;
            }

            .method-title {
              font-size: 14px;
              color: #606266;
            }

            .method-tag {
              position: absolute;
              top: -10px;
              right: -10px;
            }
          }

          &:hover .method-box {
            border-color: #409EFF;
            transform: translateY(-2px);
            box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
          }

          &.active .method-box {
            border-color: #409EFF;
            background-color: #ecf5ff;
          }
        }
      }
    }
  }

  .dialog-footer {
    text-align: center;
  }
}

// 自定义 element-ui 样式
:deep(.el-dialog__body) {
  padding: 20px;
}

:deep(.el-descriptions__label) {
  width: 120px;
}
</style> 