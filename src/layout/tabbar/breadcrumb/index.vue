<template>
  <div
    class="new_breadcrumb"
    :class="{ mydark: settingStore.dark ? true : false }"
  >
    <el-icon @click="controlMenu" class="menuIcon">
      <component :is="settingStore.fold ? 'Expand' : 'Fold'"></component>
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-for="item in $router.matched"
        :key="item.meta.path"
        v-show="item.meta.title"
        :to="item.path"
      >
        <!-- 图标 -->
        <el-icon style="vertical-align: middle">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span style="margin: 0 5px">{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import useLayOutSettingStore from "@/store/modules/setting/setting";
import { useRoute } from "vue-router";

let $router = useRoute();
let settingStore = useLayOutSettingStore();
const controlMenu = () => {
  settingStore.fold = !settingStore.fold;
};
</script>
<script lang="ts">
export default {
  name: "BreadCrumb",
};
</script>
<style scoped lang="scss">
.new_breadcrumb {
  background-color: $base-menu-bg-color;
  box-shadow: 1px 1px 2px 1px rgba($color: #000000, $alpha: 0.2);

  margin-top: 20px;
  padding: 15px 10px;
  border-radius: 5px;
  display: flex;
  .menuIcon {
    margin: 0 20px;
  }
  .el-icon {
    cursor: pointer;
  }
}
</style>
