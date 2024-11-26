<template>
  <div class="chat-tools">
    <el-tooltip content="生成可视化脚本" effect="dark" placement="bottom">
      <div class="icon" @click="handleJiaobenFormat">
        <svg width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><use xlink:href="#icon-vam-shoucang1"></use></svg>
        <span>生成可视化脚本</span>
      </div>
    </el-tooltip>
    <el-tooltip content="复制" effect="dark" placement="bottom">
      <div class="icon" @click="$copy(content, '内容已复制')">
        <svg width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><use xlink:href="#icon-vam-copy"></use></svg>
        <span>复制</span>
      </div>
    </el-tooltip>
    <el-tooltip content="删除" effect="dark" placement="bottom">
      <div class="icon" @click="handleIconDeleteClick">
        <svg width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><use xlink:href="#icon-vam-shanchu"></use></svg>
        <span>删除</span>
      </div>
    </el-tooltip>
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form  :model="form" :rules="rules" label-width="80px">
        <el-form-item label="脚本名称" prop="scriptName">
          <el-input v-model="form.scriptName" placeholder="请输入脚本名称" />
        </el-form-item>
        <el-form-item label="脚本状态">
          <el-select v-model="form.status" prop="status">
            <el-option label="启用" value="1" selected="true" />
            <el-option label="关闭" value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
  
</template>

<script>
import { listJiaobenInfo, getJiaobenInfo, delJiaobenInfo, addJiaobenInfo, updateJiaobenInfo,getJiaobenList } from "@/utils/jiaobenInfo";
import crud from '/src/common/crud/crud';
import { getToken } from "@/utils/auth";
  export default {
    name: "ChatTools",
    data() {
      return {
      // 是否显示弹出层
      open: false,
      title: null,
      // 表单参数
      form: {
        scriptName: '',
        status: '1',  // 默认启用
        content: this.content   // 用于存储脚本内容
      },
      // 表单校验
      rules: {

      },
      }
    },
    props:{
      content: { type: String, default: '' },
      sessionRecordId: { type: String, default: null },
      sessionId: { type: String, default: null },
    },
    methods:{
      handleIconDeleteClick(){
        if (this.sessionRecordId != null && this.sessionId != null){
          this.$confirm('确定删除该条会话记录吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$api.get('/module/session/sessionrecord/removeSessionRecord',{
              sessionId: this.sessionId,
              sessionRecordIds: this.sessionRecordId
            }).then(res => {
              if (res.status)
                this.$emit('deleteAfter',this.sessionRecordId)
            })
          }).catch(() => {
          });
        }
      },
      handleJiaobenFormat(){
        this.baseHandleAdd();
      },
      /** 新增按钮操作 */
    baseHandleAdd() {
      this.open = true;
      this.title = "添加脚本库";
    },
    submitForm(){
      addJiaobenInfo(this.form).then(res => {
        if(res.data) {
          this.open = false;
          this.$message.success('脚本库添加成功');
          this.$router.push('/workbench/script');
        }
        else{
          this.$message.error('脚本库添加失败');
          this.open = false;
        }
      });
      
    },
    // 取消按钮
    cancel() {
      this.open = false;
      // this.reset();
    },
  }
}
</script>

<style scoped lang="scss">
  .chat-tools{
    width: 100%;
    max-height: 40px;
    height: 40px;
    align-items: center;
    color:#09f;
  }
  .chat-tools .icon{
    margin: 0 2px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    transition: all 0.2s ease-in-out;
    &:active{
      transform: scale(0.9);
      transition: all 0.2s ease-in-out;
    }
  }


  .chat-tools img{
    width: 100%;
  }
</style>
