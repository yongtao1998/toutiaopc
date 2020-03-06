<template>
<!-- ek-card组件做主页面 -->
<el-card>
    <!-- 头部 -->
<!-- slot='header' 表示面包屑会作为具名插槽给card的 header区域 -->
 <bread-crumb slot="header">
    <span slot="titles" style="font-size:13px">
        评论管理
    </span>
  </bread-crumb>

<!-- 表格组件 -->
<el-table :data='list'>
<!-- el-table-column 代表列 -->
<!-- prop 表示要显示的字段  -->
<!-- lable 表示表头 -->
<el-table-column prop="title" width="600" label="标题"></el-table-column>
<el-table-column :formatter="fromatterBool" prop="comment_status" label="评论状态"></el-table-column>
<el-table-column prop="total_comment_count" label="粉丝数量"></el-table-column>
<el-table-column prop="fans_comment_count" label="评论数量"></el-table-column>
<el-table-column  label="操作">
    <template slot-scope="obj">
        <el-button size="small" type='text'>修改</el-button>
        <el-button @click="openOrClose(obj.row)" size="small" type='text'>{{ obj.row.comment_status ? '关闭' : '打开'}}评论</el-button>
    </template>
</el-table-column>
</el-table>
</el-card>

</template>

<script>
export default {
  name: '',
  data () {
    return {
      list: []
    }
  },
  methods: {
    // 获取评论
    getComment () {
      this.$axios({
        url: '/articles', // 请求地址
        params: {
          response_type: 'comment'
        }
      }).then(result => {
        this.list = result.data.results
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
