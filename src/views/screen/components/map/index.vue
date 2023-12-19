<template>
  <div class="box" ref="map"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
// 引入中国地图的json
import chinaJSON from "./china.json";
let map = ref();
echarts.registerMap("china", chinaJSON as any);
onMounted(() => {
  let myChart = echarts.init(map.value);

  myChart.setOption({
    geo: [
      {
        map: "china",
        roam: false, //鼠标调节缩放
        top: 200,
        // 缩放
        zoom: 1.5,
        //地图上的文字的设置
        label: {
          show: true, //文字显示出来
          color: "white",
          fontSize: 12,
        },
        // 地图图形的颜色
        itemStyle: {
          normal: {
            borderColor: "rgba(147, 235, 248, 1)",
            borderWidth: 1,
            areaColor: {
              type: "radial",
              x: 0.5,
              y: 0.5,
              r: 0.8,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(175,238,238, 0)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(	47,79,79, .2)", // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            },
            shadowColor: "rgba(128, 217, 248, 1)",
            shadowOffsetX: -2,
            shadowOffsetY: 2,
            shadowBlur: 10,
          },
          emphasis: {
            areaColor: "#389BB7",
            borderWidth: 0,
          },
        },
        //地图高亮的效果
        emphasis: {
          itemStyle: {
            color: "skyblue",
          },
          label: {
            fontSize: 20,
          },
        },
      },
    ],
    series: [
      {
        type: "lines", //航线的系列
        data: [
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [119.306239, 26.075302], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: "skyblue",
              width: 2,
              type: "dotted",
            },
          },
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [114.298572, 30.584355], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: "skyblue",
              width: 2,
              type: "dotted",
            },
          },
          {
            coords: [
              [117.190182, 39.125596], // 起点
              [111.670801, 40.818311], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: "skyblue",
              width: 2,
              type: "dotted",
            },
          },
          {
            coords: [
              [125.3245, 43.886841], // 起点
              [106.504962, 29.533155], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: "skyblue",
              width: 2,
              type: "dotted",
            },
          },
        ],
        //开启动画特效
        effect: {
          show: true,
          symbol:
            "path://M480.851711 510.053232v309.536122l-130.43346 128.486692-21.414449 75.923954 204.410647-132.380228 153.794676 132.380228 23.361217-75.923954-126.539924-128.486692V510.053232l336.790875 130.43346-3.893536-103.178707-332.897339-229.718631 27.254753-231.6654L510.053232 1.946768l-54.509506 73.977186 25.307985 231.6654L147.954373 537.307985 101.231939 640.486692l379.619772-130.43346z,M438.022814 510.053232v309.536122l-130.43346 128.486692 21.414448 75.923954 159.634981-132.380228 200.517111 132.380228-21.414449-75.923954-126.539924-128.486692V510.053232L899.406844 640.486692l-25.307985-103.178707-332.897338-229.718631 25.307985-231.6654L510.053232 0l-97.338403 75.923954 25.307985 231.6654L105.125475 537.307985 101.231939 640.486692l336.790875-130.43346z",
          color: "#fff",
          symbolSize: 20,
          roundTrip: true,

          trailLength: 0,
        },
      },
    ],
  });
});
</script>
<script lang="ts">
export default {
  name: "ChinaMap",
};
</script>
<style scoped></style>
