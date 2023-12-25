<template>
  <el-card>
    <div class="container">
      <p class="title">
        <span style="opacity: 0.5">用户增长量</span
        ><el-icon color="pink"><Avatar /></el-icon>
      </p>
      <hr />
      <div class="charts" ref="charts"></div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

let charts = ref();

onMounted(() => {
  let myChart = echarts.init(charts.value);

  myChart.setOption({
    title: {
      text: "用户年增长",
      show:false
    },
    color: [ '#FF0087', '#FFBF00'],
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: [
          "周一",
          "周二",
          "周三",
          "周四",
          "周五",
          "周六",
          "周日",
          
        ],
      },
    ],
    yAxis: [
      {
        type: "value",
        show: true,
      },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
   
    grid:{
      top:20,
      left:30,
      right:20,
      bottom:30
    },
    series: [
      {
        name: "visits",
        type: "line",
        stack: "value",
        areaStyle: {},
        smooth: true,
        emphasis: {
          focus: "series",
        },
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: "Union Ads",
        type: "line",
        stack: "Total",
        areaStyle: {},
        smooth: true,
        emphasis: {
          focus: "series",
        },
        data: [25, 182, 111, 34, 290, 100, 150],
      },
    ],
  });
});
</script>
<script lang="ts">
export default {
  name: "UserGrowth",
};
</script>
<style scoped lang="scss">
.el-card {
  width: 50%;
  height: 400px;
}
.container {
  .title {
    display: flex;
    justify-content: space-between;
  }
  .charts {
    width: 100%;
    height: 350px;
  }
}
</style>
