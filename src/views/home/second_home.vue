<template>
<div>
  <div class="bgc">
   <div class="bgcb">
      <div class="ech" ref="myChart"></div>
   </div>
  </div>

</div>

</template>

<script>
import Echarts from 'echarts'
export default {
  mounted () {
    this.myChart = Echarts.init(this.$refs.myChart)
    this.myChart.setOption({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }]
    })
  }
}
</script>

<style scoped>
.bgc{
  opacity: 0.9;
  height: calc(100vh - 60px);
  background-size: cover;
  background-image: url("../../assets/img/main_bgc.jpg")
}
.bgcb{
  float: left;;
  width: 100%;
  height: 100%;
}
.ech{
  margin: 20px 10px;
  height: 400px;
  width: 400px;
  background-color: rgb(243, 239, 239);
}

</style>
