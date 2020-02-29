<template>
  <div class="login">
    <el-card class="login-card">
      <!-- 表单内容 -->
      <!-- 头部图片 -->
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- 表单 -->
      <el-form style="margin-top:20px">
        <el-form-item>
          <el-input placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input style="width:60%" placeholder="请输入验证码"></el-input>
          <el-button plain style="float:right">获取验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox>我已阅读同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" type='primary'>登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {

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
