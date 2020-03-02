<template>
  <div class="login">
    <el-card class="login-card">
      <!-- 表单内容 -->
      <!-- 头部图片 -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- 表单 -->
      <el-form style="margin-top:20px" :model="loginForm" :rules="loginRules" ref="loginForm">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"  ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input style="width:60%" placeholder="请输入验证码" v-model="loginForm.code"></el-input>
          <el-button plain style="float:right">获取验证码</el-button>
        </el-form-item>
        <el-form-item prop="checked">
          <el-checkbox v-model="loginForm.checked">我已阅读同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type='primary' @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: '',
        checked: false
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^[1][3-9][0-9]{9}$/, message: '您输入的手机号格式不正确' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码应该是6位数字' }
        ],
        checked: [{
          validator (rule, value, callback) {
            value ? callback() : callback(new Error('您必须同意我们的条款和协议'))
          }
        }]
      }
    }
  },
  methods: {
    login () {
      // 1. 回调函数
      // this.$refs.loginForm.validate((isOK) => {
      //   if (isOK) {
      //     console.log('校验通过')
      //   } else {
      //     console.log('校验不通过')
      //   }
      // })
      // 2. promise
      this.$refs.loginForm.validate().then(() => {
        console.log('校验通过')
      }).catch(() => console.log('校验失败')
      )
    }
  }
}
</script>

<style lang="less" scoped>
// scoped：此页面才会起作用(范围内)
// scoped 会自动生成一个data-v....
.login{
  background-image: url('../../assets/img/beijing2.jpg') ;
  height: 100vh;
  // filter:blur(2px);
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card{
    width: 440px;
    height: 340px;
    .title{
      text-align: center;
      img{
      height: 30px;
      }
    }
  }
}
</style>
