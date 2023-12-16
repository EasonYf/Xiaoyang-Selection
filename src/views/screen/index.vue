<template>
  <div class="container">
    <!-- 数据大屏 -->
    <!-- 上下结构 -->
    <div class="screen" ref="screen">
      <div class="top"><Top></Top></div>
      <div class="buttom">
        <div class="left">left</div>
        <div class="center">center</div>
        <div class="right">right</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref , onMounted} from 'vue';
import Top from './components/top/index.vue'
// 获取screen组件实例
let screen = ref()


let getRatio = (w=1920,h=1080) => {
  let ww = window.innerWidth / w
  let hh = window.innerHeight / h
  return ww < hh ? ww : hh
}
window.onresize = () => {
  screen.value.style.transform =`scale(${getRatio()}) translate(-50%,-50%)`
}

onMounted(()=>{
  screen.value.style.transform =`scale(${getRatio()}) translate(-50%,-50%)`
})
</script>
<script lang="ts">
export default {
  name:'DataScreen'
}
</script>
<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url("./images/bg.png") no-repeat;
  background-size: cover;
  .screen{
    position: fixed;
    top: 50%;
    left: 50%;
    width: 1920px;
    height: 1080px;
    transform-origin: left top;
  }
}
</style>