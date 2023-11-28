<template>
  <div class="logo_container" v-show="setting.logoHidden">
    <img :src = "setting.url" alt="">
    <p>{{setting.title}}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting';
</script>

<style scoped lang="scss">
.logo_container {
  width: $base-menu-width;
  display: flex;
  color: #fff;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-size: 26px;
  white-space: nowrap;
  img {
    width: 40px;
    height: 40px;
    transform: translateX(-50%);
  }
}
</style>