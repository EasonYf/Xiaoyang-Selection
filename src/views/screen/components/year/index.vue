<template>
  <div class="box">
    <div class="top">
      <p class="title">年度游客量对比</p>
      <p class="bg"></p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
let charts = ref();
onMounted(() => {
  //一个容器可以同时展示多种类型的图形图标
  let mychart = echarts.init(charts.value);
  //设置配置项
  mychart.setOption({
    title: {
      text: "散点图",
      left: "40%",
      textStyle: {
        color: "white",
      },
    },
    xAxis: {
      type: "category",
      show: true,
    },
    yAxis: {
      show: false,
    },
    grid: {
      left: 20,
      top: 20,
      right: 0,
      bottom: 20,
    },
    series: {
      type: "scatter",
      data: [
        33, 88, 21, 9, 88, 234, 113, 1231, 674, 3, 88, 33, 21, 888, 3332, 313,
        123, 5, 657, 7,
      ],
      //标记图形设置
      symbol: "pin",
      symbolSize: 16,
      //图文标签
      label: {
        show: true,
        position: "top",
        color: "#fff",
      },
      //散点图标记的颜色
      itemStyle: {
        color: 'cyan'
      },
    },
  });
});
</script>
<script lang="ts">
export default {
  name: "Year",
};
</script>
<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-rc.png) no-repeat;
  background-size: 100% 100%;
  margin: 20px 0px;
  .top {
    .title {
      margin-left: 5px;

      color: white;
      font-size: 20px;
    }
    .bg {
      width: 68px;
      height: 7px;
      margin-top: 10px;
      background: url(../../images/dataScreen-title.png) no-repeat;
    }
  }
  .charts {
    height: calc(100% - 30px);
  }
}
</style>
