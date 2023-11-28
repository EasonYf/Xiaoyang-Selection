<template>
  <div>
    <router-view v-slot="{ Component }">
      <component :is="Component" v-if="flag"></component>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import useLayOutSettingStore from "@/store/modules/setting/setting";
import { watch , nextTick , ref} from "vue";
let LayOutSettingStore = useLayOutSettingStore();

let flag = ref(true)
//监听refresh，看看是否需要刷新，只要pinia中refresh改变就触发销毁组件
watch(() => LayOutSettingStore.refresh,()=>{
  flag.value = false
  nextTick(() => {
    flag.value = true
    console.log(111);
    
  })
})
</script>
<script lang="ts">
export default {
  name: "Main",
};
</script>
<style scoped></style>
