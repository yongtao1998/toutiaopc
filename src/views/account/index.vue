<template>
 <el-card>
 <!-- 账号信息 -->
    <bread-crumb slot="header">
        <template slot="titles">
            账户信息
        </template>
    </bread-crumb>
    <!-- 表单容器 -->
    <el-form ref="myForm" :model="formData" :rules="rules" label-width="100px">
    <el-form-item prop="name" label="用户名">
        <el-input v-model="formData.name" style="width:30%"></el-input>
    </el-form-item>

    <el-form-item  label="简介">
        <el-input v-model="formData.intro" style="width:30%"></el-input>
    </el-form-item>

    <el-form-item prop="email" label="邮箱">
        <el-input v-model="formData.email" style="width:30%"></el-input>
    </el-form-item>

    <el-form-item  label="手机号">
        <el-input v-model="formData.mobile" disabled="" style="width:30%"></el-input>
    </el-form-item>

    <el-form-item>
        <el-button type='primary' @click="saveUser">保存</el-button>
    </el-form-item>
    </el-form>

    <!-- 头像 -->
   <el-upload action="" :http-request="uploadImg" :show-file-list="false">
        <img class='head-upload' :src="formData.photo ? formData.photo : defaultImg" alt="">
      </el-upload>
 </el-card>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      formData: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      rules: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' },
        // min 字符最低 长度 max标识最大长度
          { min: 1, max: 7, message: '用户名的长度为1-7位', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '邮箱格式不正确', trigger: 'blur' }

        ]
      },
      defaultImg: require('../../assets/img/touxiang.jpg')
    }
  },
  methods: {
    // 获取个人资料
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    },
    // 上传图片
    uploadImg (params) {
      const data = new FormData()
      data.append('images', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(result => {
        this.formData.photo = result.data.photo
      })
    },
    saveUser () {
      this.$refs.myForm.validate().then(() => {
        this.$axios({
          url: 'user/profile',
          method: 'patch',
          data: this.formData
        }).then(() => {
          this.$message.success('保存成功')
        }).catch(() => {
          this.$message.error('保存失败')
        })
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style>
 .head-upload {
    position: absolute;
    right: 350px;
    top:160px;
    width: 200px;
    height: 200px;
    /* border-radius: 50%; */
  }
</style>
