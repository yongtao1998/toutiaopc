<template>
<!-- el 面包屑  -->
  <el-breadcrumb separator=">">
    <!-- 相当于 router-link标签 -->
     <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
    <!-- 二级菜单是动态的 有两种传值方式 props传值 slot插槽传值 -->
    <el-breadcrumb-item>
      <slot name="titles"></slot>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'bread-crumb'
}
</script>

<style>

</style>
