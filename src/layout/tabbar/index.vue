<template>
  <div class="tabbar" id="tabbar">
    <div class="tabbar_left">
      <BreadCrumb></BreadCrumb>
    </div>
    <div class="tabbar_right">
      <Settings></Settings>
    </div>
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from "@/layout/tabbar/breadcrumb/index.vue"
import Settings from "@/layout/tabbar/setting/index.vue"
</script>
<script lang="ts">
export default {
  name:'Setting'
}
</script>
<style scoped lang="scss">
.tabbar {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .tabbar_left {
    display: flex;
  }
}
</style>
