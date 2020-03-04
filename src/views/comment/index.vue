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
<el-table-column prop="comment_status" label="评论状态"></el-table-column>
<el-table-column prop="total_comment_count" label="粉丝数量"></el-table-column>
<el-table-column prop="fans_comment_count" label="评论数量"></el-table-column>
<el-table-column  label="操作">
    <template slot-scope="">
        <el-button size="small" type='text'>修改</el-button>
        <el-button size="small" type='text'>改变状态</el-button>
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
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>

</style>
