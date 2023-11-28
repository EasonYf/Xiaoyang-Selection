<template>
  <template v-for="item in menuList" :key="item.path">
    <template v-if="!item.children">
      <el-menu-item v-if="!item.meta.hidden" :index="item.path">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          {{ item.meta.title }}
        </template>
      </el-menu-item></template
    >
    <!-- 只有一个子路由的菜单 -->
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item
        v-if="!item.children[0].meta.hidden"
        :index="item.children[0].path"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有多个子路由的菜单 -->
    <template v-if="item.children && item.children.length > 1">
      <el-sub-menu v-if="!item.children[0].meta.hidden" :index="item.path">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
    </template>
  </template>
</template>

<script setup lang="ts">
// import { useRouter } from 'vue-router';

// const $route = useRouter()
defineProps(["menuList"]);
// console.log("新页面",menuList);
// const goRouter = (vc:any) => {
//   $route.push(vc.index)
// }
</script>
<script lang="ts">
export default {
  name: "Menu",
};
</script>
<style scoped></style>
