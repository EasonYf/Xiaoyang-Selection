<template>
  <div class="box">
    <p class="bg"></p>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  // background-color: #ccc;
  .bg {
    width: 500px;
    height: 500px;
    background: url(../../assets/images/error_images/404.png) no-repeat;
    background-size: 100% 100%;
  }
}
</style>