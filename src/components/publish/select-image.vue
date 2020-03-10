<template>
<!-- 页签形式显示 -->
  <el-tabs v-model="activName">
      <el-tab-pane label="素材库" name='material'>
          <div class="select-image-list">
              <el-card v-for="item in list" :key="item.id" class="img-card">
                  <img @click="clickImg(item.url)" :src="item.url" alt="">
              </el-card>
          </div>
          <!-- 分页 -->
          <el-row type="flex" justify="center" style="height:80px" align="middle">
              <el-pagination background layout="prev,pager,next"
               :total="page.total"
               :current-page="page.currentPage"
               :page-size="page.pageSize"
               @current-change="changePage"
              ></el-pagination>
          </el-row>
      </el-tab-pane>
      <el-tab-pane label="上传素材" name="upload">
          <!-- 上传组件 -->
          <el-upload action="" class="upload-img" :http-request="uploadImg" :show-file-list="false">
              <i class="el-icon-plus"></i>
          </el-upload>
      </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activName: 'material',

      list: [],
      page: {
        currentPage: 1, // 第几页
        pageSize: 8, // 每页多少条
        total: 0 // 总条数
      }
    }
  },
  methods: {
    // 获取全部素材
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        // debugger
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    },
    // 页码改变拉取数据
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg() // 重新获取数据
    },
    // 点击图片上传
    clickImg (url) {
      this.$emit('selectOneImg', url)
    },
    // 上传素材
    uploadImg (params) {
      const data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data // es6简写
      }).then(result => {
        // 成功了 接口会返回给我们一个上传成功之后的图片地址
        // 拿到了返回的url地址 往外传
        this.$emit('selectOneImg', result.data.url) // 将url参数传出去
      }).catch(() => {
        this.$message.error('上传素材失败')
      })
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang='less' scoped>
.select-image-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .img-card {
        width: 150px;
        height: 150px;
        margin: 20px 0;
        img {
            width: 100%;
            height: 100%;
        }
    }

}
.upload-img {
  display: flex;
  justify-content: center;
  i {
    font-size: 20px;
    padding: 50px;
    border:2px dashed #ccc;
    border-radius: 4px;
  }
}
</style>
