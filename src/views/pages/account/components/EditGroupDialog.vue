<template>
  <el-dialog
    title="编辑分组"
    :visible.sync="visible"
    width="400px"
    :before-close="handleClose"
  >
    <div class="edit-group-form">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="分组名称">
          <el-input v-model="form.name" placeholder="请输入分组名称"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'EditGroupDialog',
  
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      form: {
        name: ''
      }
    }
  },

  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },

    handleConfirm() {
      this.$emit('confirm', this.form)
      this.handleClose()
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-group-form {
  padding: 20px;
}
</style> 