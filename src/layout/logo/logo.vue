<template>
  <div class="logo_container" v-show="setting.logoHidden">
    <img :src = "setting.url" alt="">
    <p v-show="!LayOutSettingStore.fold">{{setting.title}}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting';
import useLayOutSettingStore from '@/store/modules/setting/setting';

let LayOutSettingStore = useLayOutSettingStore()
</script>

<style scoped lang="scss">
.logo_container {
 
  display: flex;
  color: #fff;
  position: relative;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 40px;
  
  font-size: 26px;
  white-space: nowrap;
  position: relative;
  img {
    position: fixed;
    left: 10px;
    width: 40px;
    height: 40px;
    background-size: cover;
  }
  .textHidden {
    transform: translateX(-400px);
  }
}
</style>