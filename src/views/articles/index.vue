<template>
 <el-card class="articles">
    <bread-crumb slot="header">
    <template slot="titles">
        文章列表
    </template>
  </bread-crumb>

<!-- 搜索工具栏 -->
<el-form style="padding-left:0px">
  <el-form-item label="文章状态 :">
    <el-radio-group v-model="searchForm.status">
      <el-radio :label="5">全部</el-radio>
      <el-radio :label="0">草稿</el-radio>
      <el-radio :label="1">待审核</el-radio>
      <el-radio :label="2">审核通过</el-radio>
      <el-radio :label="3">审核失败</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="频道类型 :">
    <el-select placeholder="请选择频道" v-model="searchForm.channel_id">
      <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="日期范围">
    <el-date-picker type="daterange" value-format="yyyy-MM-dd" v-model="searchForm.dateRange"></el-date-picker>
  </el-form-item>
</el-form>

<!-- 文章主体 -->
<el-row class="total" type="flex" align="middle">
  <span>共找到 {{page.total}} 条符合条件的数据</span>
</el-row>

<!-- 列表内容 -->
<div class="article-item" v-for="item in list" :key="item.id.toString()">
  <!-- 左侧 -->
  <div class="left">
    <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt="">
    <div class="info">
      <!-- <span>{{item.title}}</span> -->
      <span>{{item.title}}</span>
      <el-tag  class='tag' :type="item.status | filterType">{{item.status | filterStatus }}</el-tag>
      <span class="date">{{item.pubdate}}</span>
    </div>
  </div>

  <!-- 右侧 -->
  <div class="right">
      <span><i class="el-icon-edit"></i> 修改</span>
      <span><i class="el-icon-delete"></i> 删除</span>
  </div>
</div>

<!-- 分页 -->
<el-row type="flex" justify="center" style="height:80px" align="middle">
  <el-pagination
    :current-page="page.currentPage"
    :page-size="page.pageSize"
    :total="page.total"
    @current-change='changePage'
    background layout='prev,pager,next'
  ></el-pagination>
  </el-row>
 </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 分页
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      // 表单数据对象
      searchForm: {
        status: 5,
        channel_id: '',
        dateRange: []
      },
      channels: [],
      list: [],
      defaultImg: require('../../assets/img/default.gif')
      // count: 0

    }
  },
  filters: {
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2 :
          return '已发表'
        case 3:
          return '审核失败'
      }
    },
    // 作用域 组件上 用来改变 tag的标签颜色
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2 :
          return ''
        case 3:
          return 'danger'
      }
    }
  },
  methods: {
    // 获取全部频道数据
    getChannels () {
      this.$axios({
        url: 'channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },

    // 改变页码事件
    changePage (newPage) {
      this.page.currentPage = newPage
      this.changeCondition()
    },
    // 改变搜索条件
    changeCondition () {
      const params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.dateRange && this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null,
        end_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null

      }
      this.getArticles(params)
    }, // 获取 文章列表
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        // debugger
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  // 监听 表单中的数据变化 watch监听对象的深度检测
  watch: {
    searchForm: {
      // 深度检测
      deep: true,
      // 数据发生改变 就会触发
      handler () {
        this.page.currentPage = 1
        this.changeCondition()
      }
    }
  },

  created () {
    this.getChannels()
    this.getArticles()
  }
}
</script>

<style lang="less" scoped>
  .articles{
    .total{
      height:60px;
      border-bottom: 1px dashed #ccc;
    }
    .article-item{
      display: flex;
      justify-content: space-between;
      padding: 20px;
      border-bottom: 1px solid #ccc;
      .left{
        display: flex;
        img{
          width: 180px;
          height: 180px;
          border-radius: 4px;
      }
      .info{
        margin-left:10px;
        display: flex;
        flex-direction: column;
        height: 180px;
        justify-content: space-around;
        .data{
          color:#999;
          font-size: 12px;
        }
        .tag{
          width: 40px;
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          text-align: center;
          padding: 0;
        }
      }
      }
      .right{
        span{
          font-size: 12px;
          margin-right: 8px;
          cursor: pointer;
          user-select: none;

        }
        span:hover{
          color:rgb(20, 111, 230)
        }
      }

    }

  }
</style>
