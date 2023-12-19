<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">可预约总量<span>99999</span>人</p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
// 引入echarts
import * as echarts from "echarts";
import "echarts-liquidfill";
let people = ref<string>("216932人");
// 获得charts的dom
let charts = ref();

//初始化echarts实例

//绘制图表
onMounted(() => {
  let myChart = echarts.init(charts.value);
  myChart.setOption({
    title: {
      text: "水球图",
    },
    // x|y轴
    xAxis: {
      show: false,
    },
    yAxis: {
      show: false,
    },
    series: [
      {
        type: "liquidFill",
        data: [0.5, 0.5, 0.4, 0.3],
        // color: ["red", "#0f0", "rgb(0, 0, 255)"],
        radius: '90%',
        backgroundStyle: {
          borderWidth: 5,
          borderColor: "green",
          color: "skyblue",
        },
        // 边框
        outline: {
        show: true,
        borderDistance: 8,
        itemStyle: {
            color: 'none',
            borderColor: 'greenyellow',
            borderWidth: 8,
            shadowBlur: 20,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
    },
      },
    ],
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  });
});
</script>
<script lang="ts">
export default {
  name: "Tourist",
};
</script>
<style scoped lang="scss">
.box {
  background: url("../../images/dataScreen-main-lt.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  .top {
    margin-left: 10px;
    color: #fff;
    .title {
      font-size: 20px;
    }
    .bg {
      width: 68px;
      height: 7px;
      margin-top: 10px;
      background: url("../../images/dataScreen-title.png") no-repeat;
    }
    .right {
      float: right;
      span {
        color: orange;
      }
    }
  }
  .number {
    display: flex;
    margin-top: 20px;
    padding: 10px;
    span {
      flex: 1;
      text-align: center;
      margin: 20px 1px 0px;
      color: #29fcff;
      font-size: 30px;
      display: inline-block;
      height: 40px;
      width: 40px;
      line-height: 40px;
      background: url("../../images/total.png") no-repeat;
      background-size: 100% 100%;
    }
    span:first-child {
      margin-left: 13px;
    }
    span:last-child {
      margin-right: 13px;
    }
  }
  .charts {
    width: 100%;
    height: 270px;
  }
}
</style>
