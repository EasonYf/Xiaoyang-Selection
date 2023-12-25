<template>
  <el-card>
    <div class="container">
      <p class="title"><span>访问量</span><el-icon><InfoFilled /></el-icon></p>
      <p class="box"><el-icon size="50" color="green"><Promotion /></el-icon><span>25478</span></p>
    </div>
  </el-card>
</template>

<script setup lang="ts">

</script>
<script lang="ts">
export default {
  name:'Visits'
}
</script>
<style scoped lang="scss">
.el-card {
  margin: 10px 10px 10px 0px;
  width: 25%;
  height: 250px;
}
.container {
  position: relative;
  .title {
    display: flex;
  }
  .box {
    position: absolute;
    // top: 50%;
    // left: 50%;
    top: 80px;
    left: 30px;
    // transform: translate(-50%,-50%);
    display: flex;
    align-items: center;
    span{
      font-size: 40px;
      letter-spacing: 2px;
    }
  }
}
</style>