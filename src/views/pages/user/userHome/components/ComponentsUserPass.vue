<template>
  <main
    class="ant-layout-content site-layout-background ease-in-out"
    style="margin: 0px; min-height: 280px"
  >
    <div class="personal-box">
      <form
        class="ant-form ant-form-horizontal ant-form-default"
        style="width: 750px; margin-top: 40px"
      >
        <div class="ant-form-item">
        <div class="ant-form-item ant-form-item-has-success">
          <div class="ant-row ant-form-item-row">
            <div
              class="ant-col ant-col-4 ant-form-item-label ant-form-item-label-left"
            >
              <label
                for="personal_userName"
                class="ant-form-item-required"
                title="用户名"
                ></label
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
                      value="线条绘画家"
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

<style scoped>
.components-info {
  border: 1px var(--col-border-color) solid;
}

h1 {
  color: var(--font-color-default);
  margin: 20px 20px 10px 35px;
  border-bottom: 1px var(--col-border-color) solid;
  font-weight: 500;
  font-size: 20px;
  padding-bottom: 20px;
}
</style>
