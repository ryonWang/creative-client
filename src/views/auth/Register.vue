<template>
  <el-form 
    ref="registerForm" 
    :model="form" 
    :rules="rules"
    class="auth-form">
    <el-form-item prop="email">
      <el-input
        v-model="form.email"
        placeholder="请输入邮箱"
        prefix-icon="Message">
      </el-input>
    </el-form-item>
    
    <el-form-item prop="code">
      <div class="flex gap-3">
        <el-input
          v-model="form.code"
          placeholder="验证码"
          prefix-icon="Key">
        </el-input>
        <el-button 
          type="primary"
          :disabled="!!timer"
          @click="sendCode">
          {{ timer ? `${countdown}s` : '获取验证码' }}
        </el-button>
      </div>
    </el-form-item>

    <el-form-item prop="password">
      <el-input
        v-model="form.password"
        type="password"
        placeholder="设置密码"
        prefix-icon="Lock"
        show-password>
      </el-input>
    </el-form-item>

    <el-form-item prop="confirmPassword">
      <el-input
        v-model="form.confirmPassword"
        type="password"
        placeholder="确认密码"
        prefix-icon="Lock"
        show-password>
      </el-input>
    </el-form-item>

    <el-button 
      type="primary"
      class="auth-button"
      :loading="loading"
      @click="handleRegister">
      注册
    </el-button>
  </el-form>
</template>

<script>
  import Cache from '@/utils/cache'
  import Verify from "@/components/verifition/Verify";

  export default {
    name: "LoginComponent",
    components: {Verify},
    data(){
      return {
        form: {
          captcha: {},
        },
        loading: false,
        stateVerify: false,
        emailButtonText: '发送验证码',
        emailButtonDisable: false,
        timer: undefined,
        countDown: 0,
      }
    },
    created() {
    },
    mounted() {
    },
    methods:{
      success(data){

      },
      handleRegister(){
        const password = this.form.password;
        const email = this.form.email;
        const code = this.form.code;
        const password2 = this.form.password2;
        if (password == null || password === ''){
          this.$message.warning("请输入登录密码")
          return
        }
        if (email == null || email === ''){
          this.$message.warning("请输入邮箱")
          return
        }
        if (code == null || code === ''){
          this.$message.warning("验证码不能为空")
          return
        }
        if (password2 == null || password2 === ''){
          this.$message.warning("确认登录密码不能为空")
          return
        }
        // 注册请求
        this.$api.post('/module/user/userinfo/register',this.form).then(res => {
          if (res.status){
            this.$message.success("注册成功，欢迎加入创意宝~~~")
            this.$emit('changeSelect','1')
          }else{
            this.$message.error(res.message)
          }
        })
      },
      handleSendCode(){
        const email = this.form.email;
        if (email == null || email === ''){
          this.$message.warning('邮箱号不能为空')
          return
        }
        this.emailButtonDisable = true
        this.$api.get('/module/user/userinfo/registerSendMail',{email: email}).then(res => {
          this.startTimer()
          if (res.status){
            this.$message.success(res.message)
          }else{
            this.$message.error(res.message)
          }
        })
      },
      initTimer(){
        this.emailButtonDisable = true
        this.countDown = 60
      },
      endTimer(){
        this.emailButtonDisable = false
        this.countDown = 0
        clearInterval(this.timer)
        this.timer = null
      },
      startTimer(){
        this.initTimer()
        if (this.timer === undefined || this.timer == null){
          this.timer = setInterval(() => {
            if (this.countDown < 0){
              this.endTimer()
              this.emailButtonText = '发送验证码'
            }else{
              this.countDown--
              this.emailButtonText = '重新发送(' + this.countDown + ')'
            }
          },1000)
        }
      },
      cancel(){
        this.form = {}
      }
    }
  }
</script>

<style lang="scss">
@import '@/styles/auth.scss';
</style>
