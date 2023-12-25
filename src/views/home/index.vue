<template>
  <div class="home">
    <!-- 欢迎栏 -->
    <el-card style="width: 70%">
      <div class="welcome_bar">
        <div class="bg"></div>
        <p>Welcome to the sample selection backend management platform!</p>
      </div>
    </el-card>
    <div class="home_container">
      <!-- 销售总额 -->
      <SalesVolume></SalesVolume>
      <!-- 访问量 -->
      <Visits></Visits>
      <Visits></Visits>
      <Visits></Visits>
    </div>
    <div class="box_container">
      <UserGrowth></UserGrowth>
      <Additional></Additional>
    </div>
  </div>
</template>

<script setup lang="ts">
import SalesVolume from "./components/sales_volume/index.vue";
import Visits from "./components/visits/index.vue";
import UserGrowth from "./components/users/index.vue";
import Additional from "./components/additional/index.vue";
</script>
<script lang="ts">
export default {
  name: "Home",
};
</script>
<style scoped lang="scss">
.home {
  width: 100%;
  height: 100%;
  // border: 1px solid red;
  .welcome_bar {
    width: 100%;
    height: 150px;
    display: flex;

    .bg {
      width: 25%;
      height: 100%;
      background: url(../../assets/images/homeui2.jpg) no-repeat;
      background-size: 100% 100%;
    }
    p {
      width: 50%;
      text-align: center;
      font-size: 20px;
      display: flex;
      letter-spacing: 2px;
      padding: 20px;
      justify-content: center;
      align-items: center;
    }
  }
  .home_container {
    display: flex;
  }
  .box_container {
    display: flex;
  }
}
</style>
