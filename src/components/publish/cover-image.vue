<template>
  <div class="cover-image">
      <!-- for循环 -->
      <div @click="openDialog(index)" v-for="(item,index) in list" :key="index" class="cover-image-item">
          <img :src="item ? item : defaultImg" alt="">
      </div>

      <!-- 弹层组件 -->
      <el-dialog :visible="dialogVisible" @close="dialogVisible=false">
          <!-- 图片上传组件 -->
          <select-image @selectOneImg="receiveImg"></select-image>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false, // 弹层显示或隐藏
      selectIndex: -1
    }
  },
  methods: {
    //   点击图片 弹层
    openDialog (index) {
      this.dialogVisible = true // 显示图层
      this.selectIndex = index //  点击的是第几个图片
    },
    // 接受传递过来的地址
    receiveImg (url) {
      // 二次传递 把记录要更改的索引 传出去
      this.$emit('selectTwoImg', url, this.selectIndex)
      //   关闭弹层
      this.dialogVisible = false
    }
  }
}
</script>

<style lang='less' scoped>
    .cover-image{
        display: flex;
        margin: 20px 100px;
        .cover-image-item{
            border: 2px dashed #ccc;
            width: 250px;
            height: 250px;
            padding: 20px;
            margin: 0 5px;
            cursor: pointer;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
