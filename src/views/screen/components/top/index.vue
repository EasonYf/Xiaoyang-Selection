<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="goHome">首页</span>
    </div>
    <div class="center"><span>智慧旅游可视化大数据平台</span></div>
    <div class="right">
      <span class="rbtn">数据报告</span><span class="times">当前时间:{{ time }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import moment from "moment";
//获得路由器的组件实例
let $router = useRouter();
//设置时间变量
let time = ref(moment().format("YYYY年MM月DD日 hh:mm:ss"));
let timer = ref(0);

//获取当前时间

//跳转首页按钮的回调函数
const goHome = () => {
  $router.push("/home");
};

onMounted(() => {
  timer.value = setInterval(() => {
    time.value = moment().format("YYYY年MM月DD日 hh:mm:ss");
  }, 1000);
});

onBeforeUnmount(()=>{
  clearInterval(timer.value)
})
</script>
<script lang="ts">
export default {
  name: "ScreenTop",
};
</script>
<style scoped lang="scss">
.top {
  display: flex;
  width: 100%;
  height: 40px;
  color: #29fcff;
  .left {
    flex: 1.5;
    display: flex;
    flex-direction: row-reverse;
    background: url("../../images/dataScreen-header-left-bg.png") no-repeat;
    background-size: cover;
    .lbtn {
      width: 150px;
      height: 40px;
      line-height: 40px;
      font-size: 20px;
      text-align: center;
      cursor: pointer;
      background: url("../../images/dataScreen-header-btn-bg-l.png") no-repeat;
    }
  }
  .right {
    flex: 1.5;
    display: flex;
    justify-content: space-between;
    background: url("../../images/dataScreen-header-right-bg.png") no-repeat;
    text-align: center;
    background-size: cover;
    .rbtn {
      width: 150px;
      height: 40px;
      line-height: 40px;
      font-size: 20px;
      cursor: pointer;
      background: url("../../images/dataScreen-header-btn-bg-r.png") no-repeat;
    }
    .times {
      height: 40px;
      line-height: 40px;
      font-size: 20px;
    }
  }
  .center {
    width: 100%;
    height: 72px;
    flex: 2;
    text-align: center;
    font-size: 40px;
    background: url("../../images/dataScreen-header-center-bg.png") no-repeat;
    background-size: 100% 100%;
    vertical-align: bottom;
  }
}
</style>
