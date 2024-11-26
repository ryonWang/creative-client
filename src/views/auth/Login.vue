<template>
  <div class="login-form">
    <el-form ref="loginForm" :model="form" :rules="rules">
      <el-form-item prop="userName">
        <div class="input-wrapper">
          <i class="el-icon-user"></i>
          <el-input
            v-model="form.userName"
            placeholder="请输入用户名/邮箱"
          ></el-input>
        </div>
      </el-form-item>
      
      <el-form-item prop="password">
        <div class="input-wrapper">
          <i class="el-icon-lock"></i>
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </div>
      </el-form-item>

      <div class="form-options">
        <el-checkbox v-model="rememberMe">记住我</el-checkbox>
        <a href="javascript:;" class="forget-link">忘记密码？</a>
      </div>

      <div class="form-buttons">
        <el-button 
          type="primary" 
          class="submit-btn"
          :loading="loading"
          @click="handleLogin"
        >
          <i class="el-icon-right"></i>
          登录
        </el-button>
        
        <el-button 
          class="tourist-btn"
          :loading="loading"
          @click="handleTouristLogin"
        >
          <i class="el-icon-user"></i>
          游客登录
        </el-button>
      </div>
    </el-form>

    <Verify
      ref="verify"
      v-if="stateVerify"
      @success="success"
      mode="pop"
      captchaType="blockPuzzle"
    />
  </div>
</template>

<script>
  import Verify from "@/components/verifition/Verify";

  export default {
    name: "LoginComponent",
    components: {Verify},
    data(){
      return {
        form: {
          userName: '',
          password: '',
          captcha: {}
        },
        loading: false,
        stateVerify: false,
        rememberMe: false,
        rules:{
          userName: [
            { required: true, trigger: "blur", message: "请输入您的账号" }
          ],
          password: [
            { required: true, trigger: "blur", message: "请输入您的密码" }
          ]
        },
        timer: null,
        countdown: 60
      }
    },
    created() {
      const rememberedUser = localStorage.getItem('rememberedUser');
      if (rememberedUser) {
        this.form.userName = rememberedUser;
        this.rememberMe = true;
      }
    },
    mounted() {
    },
    methods:{
      success(data){
        this.loading = true;
        this.form.captcha.captchaVerification = data.captchaVerification
        this.doLogin()
      },
      // 登录
      handleLogin(){
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            const userName = this.form.userName;
            const password = this.form.password;
            if (!userName) {
              this.$message.warning("请输入帐号");
              return;
            }
            if (!password) {
              this.$message.warning("请输入登录密码");
              return;
            }
            this.stateVerify = true;
            this.$refs.verify.show();
          }
        });
      },
      doLogin(){
        this.$store.dispatch('Login',this.form).then(() => {
          this.loading = false;
          this.form.captcha = {};
          if (this.rememberMe) {
            localStorage.setItem('rememberedUser', this.form.userName);
          } else {
            localStorage.removeItem('rememberedUser');
          }
        }).catch(() => {
          this.loading = false;
          this.form.captcha = {};
        });
      },
      handleTouristLogin(){
        this.$store.dispatch('TouristLogin').then(() => {
          this.loading = false;
          this.form.captcha = {};
        }).catch(() => {
          this.loading = false;
        });
      },
      cancel(){
        this.form = {
          userName: '',
          password: '',
          captcha: {}
        };
      },
      // 发送验证码
      sendCode() {
        if (this.timer) return;
        // 这里添加发送验证码的逻辑
        this.startCountdown();
      },
      startCountdown() {
        this.countdown = 60;
        this.timer = setInterval(() => {
          if (this.countdown > 0) {
            this.countdown--;
          } else {
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  }
</script>

<style lang="scss" scoped>
.login-form {
  padding: 20px 0;
}

.input-wrapper {
  position: relative;
  
  i {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    color: #4285f4;
    z-index: 2;
  }
  
  :deep(.el-input) {
    .el-input__wrapper {
      background: rgba(66, 133, 244, 0.05);
      border: 1px solid rgba(66, 133, 244, 0.1);
      border-radius: 12px;
      height: 50px;
      padding: 0 16px 0 50px;
      transition: all 0.3s;
      
      .el-input__inner {
        padding-left: 12px;
        color: #333;
        font-size: 15px;
        text-indent: 0;
        
        &::placeholder {
          color: #999;
          text-align: left;
          padding-left: 0;
        }
      }
      
      &:hover, &:focus-within {
        background: rgba(66, 133, 244, 0.08);
        border-color: #4285f4;
        box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.1);
      }
    }
  }
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0;
  
  .forget-link {
    color: #4285f4;
    text-decoration: none;
    font-size: 14px;
    transition: opacity 0.3s;
    
    &:hover {
      opacity: 0.8;
    }
  }
}

.form-buttons {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
  
  .submit-btn, .tourist-btn {
    height: 50px;
    border-radius: 12px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.3s;
    
    i {
      font-size: 18px;
    }
    
    &:hover {
      transform: translateY(-2px);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
  
  .submit-btn {
    background: linear-gradient(135deg, #4285f4, #34a853);
    border: none;
    
    &:hover {
      box-shadow: 0 4px 12px rgba(66, 133, 244, 0.3);
    }
  }
  
  .tourist-btn {
    background: rgba(66, 133, 244, 0.05);
    border: 1px solid rgba(66, 133, 244, 0.2);
    color: #4285f4;
    
    &:hover {
      background: rgba(66, 133, 244, 0.1);
      border-color: #4285f4;
    }
  }
}
</style>
