<template>
  <main
    class="ant-layout-content site-layout-background ease-in-out"
    style="margin: 0px; min-height: 280px"
  >
    <div class="page-title__container">
      <div class="page-title__text">基础信息</div>
    </div>
    <div class="personal-box">
      <form
        class="ant-form ant-form-horizontal ant-form-default"
        style="width: 750px; margin-top: 40px"
      >
        <div class="ant-form-item">
          <div class="ant-row ant-form-item-row">
            <div
              class="ant-col ant-col-4 ant-form-item-label ant-form-item-label-left"
            >
              <label for="personal_avatar" class="" title="头像">头像</label>
            </div>
            <div class="ant-col ant-col-14 ant-form-item-control">
              <div class="ant-form-item-control-input">
                <div class="ant-form-item-control-input-content">
                  <div class="upload-avatar">
                    <ImageUpload  @input="imgUploadCallBack" :value="form.imgUrl" :if-wane="false"></ImageUpload>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ant-form-item ant-form-item-has-success">
          <div class="ant-row ant-form-item-row">
            <div
              class="ant-col ant-col-4 ant-form-item-label ant-form-item-label-left"
            >
              <label
                for="personal_userName"
                class="ant-form-item-required"
                title="用户名"
                >用户昵称</label
              >
            </div>
            <div class="ant-col ant-col-14 ant-form-item-control">
              <div class="ant-form-item-control-input">
                <div class="ant-form-item-control-input-content">
                  <span
                    class="ant-input-affix-wrapper ant-input-affix-wrapper-status-success"
                    ><input
                      maxlength="20"
                      id="personal_userName"
                      aria-required="true"
                      class="ant-input ant-input-status-success"
                      type="text"
                      v-model="form.nickName"
                    /><span class="ant-input-suffix"
                      ><span class="ant-input-show-count-suffix"
                        >5 / 20</span
                      ></span
                    ></span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ant-form-item ant-form-item-has-success">
          <div class="ant-row ant-form-item-row">
            <div
              class="ant-col ant-col-4 ant-form-item-label ant-form-item-label-left"
            >
              <label
                for="personal_userName"
                class="ant-form-item-required"
                title="性别"
                >性别</label
              >
            </div>
            <div class="ant-col ant-col-14 ant-form-item-control">
              <div class="ant-form-item-control-input">
                <div class="ant-form-item-control-input-content">
                  <el-select v-model="form.sex" clearable style="width: 30%;">
            <el-option v-for="item in dictSex" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ant-form-item ant-form-item-has-success">
          <div class="ant-row ant-form-item-row">
            <div
              class="ant-col ant-col-4 ant-form-item-label ant-form-item-label-left"
            >
              <label for="personal_company" class="" title="手机号"
                >手机号</label
              >
            </div>
            <div class="ant-col ant-col-14 ant-form-item-control">
              <div class="ant-form-item-control-input">
                <div class="ant-form-item-control-input-content">
                  <span
                    class="ant-input-affix-wrapper ant-input-affix-wrapper-status-success"
                    ><input
                      maxlength="50"
                      id="personal_company"
                      class="ant-input ant-input-status-success"
                      type="text"
                      v-model="form.phone"
                    /><span class="ant-input-suffix"
                      ><span class="ant-input-show-count-suffix"
                        >0 / 50</span
                      ></span
                    ></span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="ant-form-item ant-form-item-has-success">
          <div class="ant-row ant-form-item-row">
            <div
              class="ant-col ant-col-4 ant-form-item-label ant-form-item-label-left"
            >
              <label for="personal_company" class="" title="邮箱"
                >邮箱</label
              >
            </div>
            <div class="ant-col ant-col-14 ant-form-item-control">
              <div class="ant-form-item-control-input">
                <div class="ant-form-item-control-input-content">
                  <span
                    class="ant-input-affix-wrapper ant-input-affix-wrapper-status-success"
                    ><input
                      maxlength="50"
                      id="personal_company"
                      class="ant-input ant-input-status-success"
                      type="text"
                      v-model="form.email"
                    /><span class="ant-input-suffix"
                      ><span class="ant-input-show-count-suffix"
                        >0 / 50</span
                      ></span
                    ></span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="ant-form-item ant-form-item-has-success">
          <div class="ant-row ant-form-item-row">
            <div
              class="ant-col ant-col-4 ant-form-item-label ant-form-item-label-left"
            >
              <label for="personal_company" class="" title="QQ号"
                >QQ号码</label
              >
            </div>
            <div class="ant-col ant-col-14 ant-form-item-control">
              <div class="ant-form-item-control-input">
                <div class="ant-form-item-control-input-content">
                  <span
                    class="ant-input-affix-wrapper ant-input-affix-wrapper-status-success"
                    ><input
                      maxlength="50"
                      id="personal_company"
                      class="ant-input ant-input-status-success"
                      type="text"
                      v-model="form.qqNumber"
                    /><span class="ant-input-suffix"
                      ><span class="ant-input-show-count-suffix"
                        >0 / 50</span
                      ></span
                    ></span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <button
        type="button"
        class="ant-btn ant-btn-primary save-btn"
        style="margin-left: 120px"
      >
        <span>保存修改</span>
      </button>
    </div>
  </main>
</template>

<script>
import ImageUpload from "@/components/ImageUpload/index";
export default {
  name: "ComponentsUserBaseInfo",
  components: { ImageUpload },
  data() {
    return {
      form: JSON.parse(JSON.stringify(this.$store.state.user.userDetail || {})),
      dictSex: [],
    };
  },
  mounted() {
    this.getDictSex();
  },
  methods: {
    getDictSex() {
      this.$api
        .get("/module/system/basedictdata/optionSelect/sys_user_sex")
        .then((res) => {
          this.dictSex = res.data;
        });
    },
    imgUploadCallBack(val) {
      this.form.imgUrl = val;
    },
    handleSubmit() {
      const param = {
        id: this.form.id,
        imgUrl: this.form.imgUrl,
        nickName: this.form.nickName,
        sex: this.form.sex,
      };
      this.$api
        .put("/module/user/userinfo/clientUpdateUser", param)
        .then((res) => {
          if (res.status) {
            this.$message.success(res.message);
            this.$store.dispatch("GetInfo");
          } else {
            this.$message.error(res.message);
          }
        });
    },
  },
};
</script>
