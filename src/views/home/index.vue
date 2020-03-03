<template>
<!-- 最外层容器 -->
<el-container>
    <!-- 左侧导航 -->
    <el-aside style="width:230px">
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 右侧 再次嵌套 el-container -->
    <el-container>
        <!-- 右侧 头部 -->
        <el-header>
          <layout-header></layout-header>
        </el-header>
        <!-- 主体内容 -->
        <el-main>
         <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
