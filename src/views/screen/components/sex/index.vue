<template>
  <div class="box">
    <div class="top">
      <p class="title">男女比例</p>
      <p class="bg"></p>
    </div>
    <div class="sex">
      <div class="man">
        <span>男</span>
        <img src="../../images/man.png" alt="" />
      </div>
      <div class="women">
        <span>女</span>
        <img src="../../images/woman.png" alt="" />
      </div>
    </div>
    <div class="rate">
      <p class="rate_man">男士<i>58</i>%</p>
      <p class="rate_woman">女士<i>42</i>%</p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
// 引入echarts
import * as echarts from "echarts";
import "echarts-liquidfill";

let charts = ref();

onMounted(() => {
  let myChart = echarts.init(charts.value);

  // 配置项
  myChart.setOption({
    title: {
      text: "男女比例", //主标题
      textStyle: {
        //主标题颜色
        color: "skyblue",
      },
      left: "40%",
    },
    // x|y轴
    xAxis: {
      show: false,
    },
    yAxis: {
      show: false,
      type: "category",
    },
    grid: {
      top: 0,
      bottom: 0,
      left: 10,
      right: 10,
    },
    series: [
      {
        type: "bar",
        data: [58],
        barWidth: 20,
        z: 100,
        itemStyle: {
          color: "skyblue",
          borderRadius: 20,
        },
      },
      {
      type: "bar",
      data: [100],
      barWidth: 20,
      barGap:'-100%',
      itemStyle: {
        color: "pink",
        borderRadius: 20,
      },
     
    },
    ],
  });
});
</script>
<script lang="ts">
export default {
  name: "Sex",
};
</script>
<style scoped lang="scss">
.box {
  margin: 20px 0;
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
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
      background-size: 100% 100%;
    }
  }
  .sex {
    display: flex;
    justify-content: space-evenly;

    color: #29fcff;
    .man {
      margin-left: 35px;
      flex-direction: column;
      width: 111px;
      height: 116px;
      padding-bottom: 20px;
      background: url(../../images/man-bg.png) no-repeat;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .women {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 20px;
      width: 111px;
      height: 116px;
      background: url(../../images/woman-bg.png) no-repeat;
    }
  }
  .rate {
    color: #fff;
    display: flex;
    justify-content: space-evenly;
  }
  .charts {
    width: 100%;
    height: 100px;
  }
}
</style>
