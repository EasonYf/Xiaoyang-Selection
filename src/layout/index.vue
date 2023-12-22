<template>
  <div class="layout_container">
    <div
      class="layout_slider"
      :class="{
        flod: settingStore.fold ? true : false,
        mydark: settingStore.dark ? true : false,
      }"
    >
      <logo></logo>
      <!-- 菜单 -->
      <el-scrollbar class="scrollbar">
        <el-menu
          :default-active="$route.path"
          router
          :collapse="settingStore.fold"
          :collapse-transition="true"
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
    height: calc(100vh - 20px);
    background-color:$base-menu-bg-color;
    box-shadow: 1px 1px 2px 1px rgba($color: #000000, $alpha: 0.2);
    margin: 10px 10px 0px 10px;
    border-radius: 10px;
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
    left: calc($base-menu-width + 20px);
    width: calc(100% - $base-menu-width - 40px);
    height: $base-nav-height;
    transition: all 0.5s;

    &.flod {
      width: calc(100vw - $base-menu-min-width - 40px);
      left: calc($base-menu-min-width + 20px);
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
