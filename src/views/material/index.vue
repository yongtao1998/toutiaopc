<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="titles">
            素材管理
        </template>
      </bread-crumb>

      <!-- 上传组件 -->
    <el-row type="flex" justify="end">
        <el-upload class="upload-demo" :show-file-list="false" :http-request="uploading" action="">
            <el-button size="small" type="primary">上传素材</el-button>
        </el-upload>
    </el-row>
      <!-- el-tabs tab栏 -->
      <!-- v-model 绑定的是当前激活的页签 -->
      <el-tabs v-model="activName"  @tab-click="changeTab">
          <el-tab-pane label="全部素材" name="all">
              <div class="img-list">
                  <el-card class="img-card" v-for="(item,index) in list" :key="item.id">
                      <img :src="item.url" alt="" @click="selectImg(index)">
                    <!-- 图片放大功能 -->
                       <el-row class='operate' type='flex' align="middle" justify="space-around">
                         <i class='el-icon-star-on' @click="collectOrCancel(item)" :style="{color: item.is_collected ? 'red' : 'black'}"></i>
                         <i class='el-icon-delete-solid' @click="deleteOrCancel(item)"></i>
                      </el-row>
                  </el-card>
              </div>
          </el-tab-pane>

          <el-tab-pane label="收藏素材" name="collect" >
                <!-- 内容 -->
                  <div class='img-list'>
                    <!-- 采用v-for对list数据进行循环 -->
                    <el-card class='img-card' v-for="item in list" :key="item.id">
                        <!-- 放置图片 并且赋值 图片地址-->
                       <el-popover placement="top-start" trigger="click" > <!--trigger属性值：hover、click、focus 和 manual-->
                          <img :src="item.url" style="height:200px">
                          <img slot="reference" :src="item.url" style="width:100%;height:100%;cursor:pointer" />
                  </el-popover>
                    </el-card>
                </div>
          </el-tab-pane>
      </el-tabs>

      <!-- 分页器 -->
      <!--
        toatl 总条数
        current-page 当前页
        page-size 每页多少条
      -->
    <el-row type="flex" justify="center" style="80px" align="middle">
        <el-pagination background
        layout="prev,pager,next"
        :total="page.total"
        :page-size="page.pageSize"
        :current-page="page.currentPage"
        @current-change='changePage'
        ></el-pagination>
    </el-row>

<!-- el-dialog组件  -->
<el-dialog @opened='openEnd' :visible="dialogVisible" @close="dialogVisible = false">

  <!-- 走马灯组件 -->
  <el-carousel ref="myCarousel" indicator-position="outside" height="400px">
    <el-carousel-item v-for="item in list" :key="item.id">
      <!-- 放置图片 -->
      <img  style="width:100%;height:100%" :src="item.url" alt="">
    </el-carousel-item>
  </el-carousel>
</el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      activName: 'all',
      page: {
        currentPage: 1, // 默认第一页
        total: 0, // 当前总数
        pageSize: 8 // 每页多少条
      },
      dialogVisible: false, // 控制显示隐藏
      clickIndex: -1 // 点击的索引
    }
  },
  methods: {
    openEnd () {
      this.$refs.myCarousel.setActiveItem(this.clickIndex)
    },
    // 图片放大
    selectImg (index) {
      this.clickIndex = index
      this.dialogVisible = true
    },

    // 收藏和取消收藏
    collectOrCancel (row) {
      this.$axios({
        url: `/user/images/${row.id}`,
        method: 'put',
        data: {
          collect: !row.is_collected
        }
      }).then(() => {
        this.getMaterial()
      }).catch(() => {
        this.$message.error('操作失败')
      })
    },

    // 删除素材
    deleteOrCancel (item) {
      this.$confirm('您确定要删除该图片吗', '提示').then(() => {
        this.$axios({
          url: `/user/images/${item.id}`,
          method: 'delete'
        }).then(() => {
          this.$message.success('删除成功')
          this.getMaterial()
        }).catch(() => {
          this.$message.error('操作失败')
        })
      })
    },

    // 页数切换
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },

    // 上传素材
    uploading (params) {
      // params.file 要上传的文件
      const data = new FormData()
      //   加入文件参数
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(() => {
        this.getMaterial()
      }).catch(() => {
        this.$message.error('上传失败')
      })
    },

    // 获取素材
    getMaterial () {
      this.$axios({
        url: '/user/images', // 请求地址
        params: {
          collect: this.activName === 'collect', // activeName === 'all' 获取所有的素材  activeName = 'collect' 获取收藏素材
          page: this.page.currentPage, // 取页码变量中的值
          per_page: this.page.pageSize // 获取每页数量

        } // get参数 也就是query参数
      }).then(result => {
        // 将返回的数据 赋值到data中的数据
        this.list = result.data.results
        // 将总条数赋值给total变量
        this.page.total = result.data.total_count // 总数  全部素材的总数  收藏素材的总数 总数 跟随 当前页签变化而变化
      })
    },

    // 切换后清除 页码
    changeTab () {
      this.page.currentPage = 1
      // alert(this.activName)
      this.getMaterial()
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
  .img-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .img-card {
          width: 220px;
          height: 240px;
          margin: 20px 40px;
          position: relative;
          img {
              width: 100%;
              height: 100%;
          }
          .operate {
              position: absolute;
              left:0;
              bottom:0;
              width: 100%;
              background: #f4f5f6;
              height: 30px;
              i  {
                  font-size:20px;
              }
          }
      }
  }
</style>
