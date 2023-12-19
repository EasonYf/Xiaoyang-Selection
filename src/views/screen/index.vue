<template>
  <div class="container">
    <!-- 数据大屏 -->
    <!-- 上下结构 -->
    <div class="screen" ref="screen">
      <div class="top"><Top></Top></div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist"></Tourist>

          <Sex class="sex"></Sex>
          <Age class="age"></Age>
        </div>
        <div class="center">
          <ChinaMap class="map"></ChinaMap>
          <Line class="line"></Line>
        </div>
        <div class="right">
          <ScenicRank class="ScenicRank"></ScenicRank>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Top from "./components/top/index.vue";
import Tourist from "./components/tourist/index.vue";
import Age from "./components/age/index.vue";
import Sex from "./components/sex/index.vue";
import ChinaMap from "./components/map/index.vue";
import Line from "./components/line/index.vue";
import ScenicRank from "./components/rank/index.vue";
// 获取screen组件实例
let screen = ref();

let getRatio = (w = 1920, h = 1080) => {
  let ww = window.innerWidth / w;
  let hh = window.innerHeight / h;
  return ww < hh ? ww : hh;
};
window.onresize = () => {
  screen.value.style.transform = `scale(${getRatio()}) translate(-50%,-50%)`;
};

onMounted(() => {
  screen.value.style.transform = `scale(${getRatio()}) translate(-50%,-50%)`;
});
</script>
<script lang="ts">
export default {
  name: "DataScreen",
};
</script>
<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  //
  background: url("./images/bg.png") no-repeat;
  background-size: cover;
  .screen {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 1920px;
    height: 1080px;
    transform-origin: left top;
    .bottom {
      display: flex;
      .left {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 1040px;

        .tourist {
          flex: 1.2;
        }
        .age {
          flex: 1;
        }
        .sex {
          flex: 1;
        }
      }
      .center {
        flex: 2;
        display: flex;
        flex-direction: column;
        .map {
          flex: 3;
        }
        .line {
          flex: 1.2;
        }
      }
      .right {
        flex: 1;
        display: flex;
        .ScenicRank {
          flex:1;
          background-color: red;
        }
      }
    }
  }
}
</style>
