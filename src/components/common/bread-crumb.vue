<template>
<!-- el 面包屑  -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <!-- 相当于 router-link标签 -->
      <el-breadcrumb-item :to="{ path:'/home' }">首页</el-breadcrumb-item>
    <!-- 二级菜单是动态的 有两种传值方式 props传值 slot插槽传值 -->
    <el-hreadcrumb-item>
      <slot name="title"></slot>
    </el-hreadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
