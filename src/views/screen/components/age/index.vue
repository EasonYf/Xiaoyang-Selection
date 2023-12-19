<template>
  <div class="box">
    <div class="top">
      <p class="title">年龄分布</p>
      <p class="bg"></p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { ref, onMounted } from "vue";

let charts = ref();

onMounted(() => {
  let myChart = echarts.init(charts.value);

  myChart.setOption({
    legend: {
      top: "5%",
      show: true,
      orient: "vertical",
      right: "20",
      textStyle: {
        color: "#fff",
      },
    },
    series: {
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "outside",
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: "60岁以上" },
        { value: 1048, name: "40-60岁" },
        { value: 735, name: "30-40岁" },
        { value: 580, name: "18-30岁" },
        { value: 484, name: "10-18岁" },
        { value: 300, name: "10岁以下" },
      ],
    },
  });
});
</script>
<script lang="ts">
export default {
  name: "Age",
};
</script>
<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  .top {
    .title {
      color: #fff;
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
    height: 260px;
  }
}
</style>
