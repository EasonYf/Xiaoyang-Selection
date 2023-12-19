<template>
  <div class="box">
    <div class="top">
      <p class="title">未来30天游客趋势图</p>
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
  let myChart = echarts.init(charts.value);
  myChart.setOption({
   
    // x,y轴
    xAxis: {
      type: "category",
      //两侧不留白
      boundaryGap: false,
      //分割线不要
      splitLine: {
        show: false,
      },
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      //轴线的设置
      axisLine: {
        show: true,
      },
      //刻度
      axisTick: {
        show: true,
      },
    },
    yAxis: {
      splitLine: {
        show: false,
      },
      //轴线的设置
      axisLine: {
        show: true,
      },
      //刻度
      axisTick: {
        show: true,
      },
    },
    grid: {
      left: 70,
      top: 25,
      right: 20,
      bottom: 20,
    },

    series: [
      {
        type: "line",
        data: [120, 1240, 66, 2299, 321, 890, 1200],
        //平滑曲线的设置
        smooth: true,
        //区域填充样式
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "red", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "blue", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
  });
});
</script>
<script lang="ts">
export default {
  name: "LineMap",
};
</script>
<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  color: #fff;
  .top {
    .title {
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
    height: calc(100% - 40px);
  }
}
</style>
