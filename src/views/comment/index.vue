<template>
<!-- ek-card组件做主页面 -->
<el-card v-loading="loading" element-loading-text="拼命加载中"
 element-loading-spinner="el-icon-loading"
  element-loading-background="rgba(0, 0, 0, 0.5)">
    <!-- 头部 -->
<!-- slot='header' 表示面包屑会作为具名插槽给card的 header区域 -->
 <bread-crumb slot="header">
    <span slot="titles" style="font-size:13px">
        评论管理
    </span>
  </bread-crumb>

<!-- 表格组件 -->
<el-table :data='list' >
<!-- el-table-column 代表列 -->
<!-- prop 表示要显示的字段  -->
<!-- lable 表示表头 -->
<el-table-column prop="title" width="600" label="标题"></el-table-column>
<el-table-column :formatter="fromatterBool" prop="comment_status" label="评论状态"></el-table-column>
<el-table-column prop="total_comment_count" label="粉丝数量"></el-table-column>
<el-table-column prop="fans_comment_count" label="评论数量"></el-table-column>
<el-table-column  label="操作">
  <!-- el-table-column组件 在插槽中传出了 row $index store column -->
  <!-- row 行数据 $index索引 -->
    <template slot-scope="obj">
        <el-button size="small" type='text'>修改</el-button>
        <el-button @click="openOrClose(obj.row)" size="small" type='text'>{{ obj.row.comment_status ? '关闭' : '打开'}}评论</el-button>
    </template>
</el-table-column>
</el-table>

<!-- 分页组件 -->
<el-row type="flex" justify="center" align='middle' style="height:80px" >
  <!-- <el-pagination
    layout="prev,pager,next"
    :total="page.total"
    :page-size="page.pageSize"

    :current-page="page.currentPage"
  ></el-pagination> -->
   <el-pagination
    layout="prev, pager, next"
    :currentPage='page.currentPage'
    :total="page.total"
    :page-size="page.pageSize"
    @current-change="changePage"
    >
  </el-pagination>
</el-row>

</el-card>

</template>

<script>
export default {
  name: '',

  data () {
    return {
      list: [],
      page: {
        total: 100,
        currentPage: 1,
        pageSize: 10
      },
      loading: false
    }
  },
  methods: {
    changePage (i) {
      this.page.currentPage = i
      this.getComment()
    },
    // 获取评论
    getComment () {
      this.loading = true
      this.$axios({
        url: '/articles', // 请求地址
        params: {
          response_type: 'comment',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        // debugger
        this.list = result.data.results
        this.page.total = result.data.total_count
        this.loading = false
      })
    },
    // 格式化函数
    fromatterBool (row, column, cellValue, index) {
      // row 当前的一行数据
      // column 当前列信息
      // cellValue 当前单元格的值
      // index 当前索引
      return cellValue ? '正常' : '关闭'
    },
    openOrClose (row) {
      const mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`是否确定${mess}评论`, '提示').then(() => {
        this.$axios({
          url: '/comments/status',
          method: 'put',
          params: {
            article_id: row.id.toString()
          },
          data: {
            allow_comment: !row.comment_status
          }
        }).then(() => {
          this.$message.success(`${mess}评论成功`)
          this.getComment()
        }).catch(() => {
          this.$message.error(`${mess}评论失败`)
        })
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>

</style>
