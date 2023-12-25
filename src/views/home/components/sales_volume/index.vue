<template>
  <el-card>
    <div class="container">
      <p class="title">
        <span style="opacity: .5;">年总销售额</span><el-icon color="yellowgreen"><Comment /></el-icon>
      </p>
      <p class="year_money"><span>￥</span><i style="color:skyblue">1289999</i></p>
      <p>
        <span>周同比 56.67% </span
        ><el-icon color="red"><BottomRight /></el-icon>
        <hr>
        <span>周年比 12.99% </span>
        <el-icon color="green"><TopRight /></el-icon>
      </p>
      <hr>
      <p class="week_money"><span>周销售额</span><span>￥</span><i>18723 </i></p>
    </div>
  </el-card>
</template>

<script setup lang="ts"></script>
<script lang="ts">
export default {
  name: "SalesVolume",
};
</script>
<style scoped lang="scss">
.el-card {
  margin: 10px 10px 10px 0px;
  width: 25%;
  height: 250px;
}
.container {
  .title {
    display: flex;
    justify-content: space-between;
    width: 100%;
    
    padding: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    // color: rgba(0, 0, 0, 0.2);
  }
  .year_money {
    vertical-align: top;
    text-align: center;
    font-size: 40px;
    margin: 20px 0;
  }
}
</style>
