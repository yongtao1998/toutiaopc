<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="titles">发布文章</template>
      </bread-crumb>
      <!-- 表单元素 -->
      <el-form ref="myForm" :model="publishForm" :rules="publishRules" label-width="100px" >
          <el-form-item label="标题" prop="title">
              <el-input v-model="publishForm.title" placeholder="请输入您的标题" style="width:60%"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
              <!-- <el-input v-model="publishForm.content" placeholder="请输入您的内容" type="textarea" :rows="4"></el-input> -->
           <quill-editor v-model="publishForm.content"
             style="height:300px"
            ></quill-editor>
          </el-form-item>
          <el-form-item label="封面" prop="cover"  style="margin-top:120px;">
              <el-radio-group v-model="publishForm.cover.type">
                  <el-radio :label="1">单图</el-radio>
                  <el-radio :label="3">三图</el-radio>
                  <el-radio :label="0">无图</el-radio>
                  <el-radio :label="-1">自动</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="频道" prop="channel_id">
              <el-select placeholder="请选择频道" v-model="publishForm.channel_id">
                  <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
          </el-form-item>

          <el-form-item>
              <el-button @click="publish(false)" type="primary">发表</el-button>
              <el-button @click="publish(true)">存入草稿</el-button>
          </el-form-item>

      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      publishForm: {
        title: '',
        content: '',
        cover: {
          // -1自动 0 无图 1 单图 3 三图
          type: 0,
          images: []
        },
        channel_id: null // 频道id
      },
      publishRules: {
        title: [
          { required: true, message: '文章标题不能为空', trigger: 'blur' },
          { min: 5, max: 20, message: '标题应该在5-30字符之间', trigger: 'blur' }],
        content: [{ required: true, message: '文章内容不能为空', trigger: 'blur' }],
        channel_id: [{ required: true, message: '频道内容不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    //   根据id获取文章详情
    getArticleById (id) {
      this.$axios({
        url: `/articles/${id}`
      }).then((result) => {
        this.publishForm = result.data
      })
    },
    // 获取频道列表
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then((result) => {
        this.channels = result.data.channels
      })
    },

    // 发布 存入草稿
    publish (bool) {
      const { articleId } = this.$route.params
      this.$refs.myForm.validate().then(() => {
        this.$axios({
          // 如果id存在 就是编辑
          // id 不存在就是 新增
          url: articleId ? `/articles/${articleId}` : '/articles',
          //   id存在就是编辑 用put请求
          //   id不存在就是新增 用post请求
          method: articleId ? 'put' : 'post',
          //   根据传入的 参数 来决定是发布还是存为草稿
          params: { draft: bool },
          data: this.publishForm
        }).then(() => {
          this.$message.success('操作成功')
          this.$router.push('/home/articles')
        }).catch(() => {
          this.$message.error('操作失败')
        })
      })
    }
  },
  created () {
    this.getChannels()
    const { articleId } = this.$route.params
    articleId && this.getArticleById(articleId)
  }
}
</script>

<style lang='less' scoped>
    // .hh{
    //     // margin-bottom: 200px;
    //     height: 410px;
    // }
</style>
