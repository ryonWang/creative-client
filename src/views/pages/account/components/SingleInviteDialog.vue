<template>
  <el-dialog
    title="单个邀请"
    :visible.sync="visible"
    width="448px"
    :before-close="handleClose"
  >
    <div class="box">
      <div 
        v-for="(item, index) in platforms" 
        :key="index"
        :class="['item', { 
          active: item.active,
          disabled: item.disabled 
        }]"
        @click="!item.disabled && handleSelect(index)"
      >
        <span :class="['icon', item.iconClass]"></span>
        {{ item.name }}
      </div>
    </div>
    <div slot="footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" class="primary-btn" @click="handleConfirm">
        去邀请
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'SingleInviteDialog',
  
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      platforms: [
        { name: '抖音', iconClass: 'icon1', active: true, disabled: false },
        { name: '快手', iconClass: 'icon2', active: false, disabled: false },
        { name: '抖音+', iconClass: 'icon1', active: false, disabled: true },
        { name: '视频号', iconClass: 'icon3', active: false, disabled: true },
        { name: '小红书', iconClass: 'icon4', active: false, disabled: true }
      ]
    }
  },

  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },

    handleSelect(index) {
      this.platforms.forEach((item, i) => {
        item.active = i === index
      })
    },

    handleConfirm() {
      const selectedPlatform = this.platforms.find(item => item.active)
      this.$emit('confirm', selectedPlatform)
      this.handleClose()
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;

  .item {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;

    &:not(.disabled):hover {
      border-color: #409EFF;
    }

    &.active {
      border-color: #409EFF;
      background-color: #ECF5FF;
    }

    &.disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    .icon {
      width: 20px;
      height: 20px;
      margin-right: 5px;
      background-size: contain;
      background-repeat: no-repeat;

      &.icon1 {
        background-image: url('@/assets/imgs/douyin-icon.png');
      }
      &.icon2 {
        background-image: url('@/assets/imgs/kuaishou-icon.png');
      }
      &.icon3 {
        background-image: url('@/assets/imgs/shipin-icon.png');
      }
      &.icon4 {
        background-image: url('@/assets/imgs/xiaohongshu-icon.png');
      }
    }
  }
}
</style> 