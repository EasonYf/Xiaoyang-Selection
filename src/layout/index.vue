<template>
  <div class="layout_container">
    <div
      class="layout_slider"
      :class="{ flod: settingStore.fold ? true : false }"
    >
      <logo></logo>
      <!-- 菜单 -->
      <el-scrollbar class="scrollbar">
        <el-menu
          :default-active="$route.path"
          background-color="#001529"
          text-color="#fff"
          router
          :collapse="settingStore.fold"
          :collapse-transition="false"
        >
          <Menu :menuList="userStore.menuRoutes" style="height: 50px"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_nav" :class="{ flod: settingStore.fold ? true : false }">
      <Tabbar></Tabbar>
    </div>
    <div
      class="layout_main"
      :class="{ flod: settingStore.fold ? true : false }"
    >
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from "./logo/logo.vue";
import { ElScrollbar } from "element-plus";
import Menu from "@/layout/menu/index.vue";
import useUserStore from "@/store/modules/user";
import Main from "@/layout/main/index.vue";
import Tabbar from "@/layout/tabbar/index.vue";
import { useRoute } from "vue-router";
import useLayOutSettingStore from "@/store/modules/setting/setting";
let settingStore = useLayOutSettingStore();

let $route = useRoute();
let userStore = useUserStore();


</script>
<script lang="ts">
export default {
  name: "Layout",
};
</script>
<style scoped lang="scss">
.layout_container {
  position: relative;
  width: 100%;
  height: 100vh;

  .layout_slider {
    position: absolute;
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-bg-color;
    color: #fff;
    transition: all 0.5s;
    word-break: keep-all;
    &.flod {
      width: $base-menu-min-width;
    }
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-logo-width);
      .el-menu {
        border-right: 0;
      }
    }
  }
  .layout_nav {
    position: fixed;
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: $base-nav-height;
    transition: all 0.5s;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    &.flod {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    position: absolute;
    left: $base-menu-width;
    top: $base-nav-height;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-nav-height);

    padding: 20px;
    overflow: auto;
    transition: all 0.5s;
    &.flod {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
