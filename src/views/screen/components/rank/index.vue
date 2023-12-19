<template>
  <div class="box">
    <div class="top">
      <p class="title">热门景区排名</p>
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

  // 配置项
  myChart.setOption({
    title: {
      //主标题
      text: "景区排行",
      link: "http://www.baidu.com",
      //标题的位置
      left: "50%",
      //主标题文字样式
      textStyle: {
        color: "yellowgreen",
        fontSize: 20,
      },
      //子标题
      subtext: "各大景区排行",
      //子标题的样式
      subtextStyle: {
        color: "yellowgreen",
        fontSize: 16,
      },
    },
    //x|y轴组件
    xAxis: {
      type: "category", //图形图标在x轴均匀分布展示
    },
    yAxis: {},
    //布局组件
    grid: {
      left: 20,
      bottom: 20,
      right: 20,
    },
    series: [
      {
        type: "bar",
        data: [10, 20, 30, 40, 50, 60, 70],
        //柱状图的:图形上的文本标签，
        label: {
          show: true,
          //文字的位置
          position: "insideTop",
          //文字颜色
          color: "yellowgreen",
        },
        showBackground: true,
        backgroundStyle: {
          //底部背景的颜色
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "black", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "blue", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        //柱条的样式
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          //柱条颜色
          color: function (data: any) {
            //给每一个柱条这是背景颜色
            let arr = [
              "red",
              "orange",
              "yellowgreen",
              "green",
              "purple",
              "hotpink",
              "skyblue",
            ];
            return arr[data.dataIndex];
          },
        },
      },
      {
        type: "line",
        data: [10, 20, 30, 40, 50, 60, 90],
        smooth: true, //平滑曲线
      },
    ],
    tooltip: {
      backgroundColor: '#fff',
    },
  });
});
</script>
<script lang="ts">
export default {
  name: "ScenicRank",
};
</script>
<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-rt.png) no-repeat;
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
