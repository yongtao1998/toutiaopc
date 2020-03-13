<template>
<!-- 行 -->
<el-row align="middle" type="flex" class="layout-header">
<!-- 左侧列 -->
<el-col class='left' :span="12">
  <i class="el-icon-s-fold"></i>
  <span style="margin-left:2px">今日头条后台管理系统</span>
</el-col>
<!-- 右侧列 -->
<el-col class="right" :span="12">
  <el-row type="flex" justify="end" align="middle">
    <img :src="userInfo.photo">

    <!-- 下拉菜单 -->
    <el-dropdown trigger="click" @command='clickMenu'>
      <span style="color:#409EFF;cursor: pointer;">用户名: {{userInfo.name}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="info">我的信息</el-dropdown-item>
        <el-dropdown-item command="git">Github</el-dropdown-item>
        <el-dropdown-item command="lgout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-row>
</el-col>

</el-row>
</template>

<script>
import eventBus from '@/utils/eventBus'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    clickMenu (command) {
      if (command === 'info') {
      } else if (command === 'git') {
        window.location.href = 'https://github.com/yongtao1998/yongtao1998.github.io'
      } else {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    },
    getUserInfo () {
      this.$axios({
        url: '/user/profile' // 请求地址
      }).then(result => {
        this.userInfo = result.data
      })
    }
  },
  created () {
    //   获取用户的个人信息
    this.getUserInfo()
    eventBus.$on('updateUser', () => {
      this.getUserInfo()
    })
  }
}
</script>

<style lang="less" scoped>
.layout-header{
  height: 60px;
  .left{
  font-size: 20px;
  }
  .right{
    img{
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px
    }
  }
}
</style>
