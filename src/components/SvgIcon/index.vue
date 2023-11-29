<template>
  <div >
    <!-- svg图标组件二次封装 -->
    <svg :width="width" :height="height">
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps({
  //svg图标的前缀
  prefix: {
    type: String ,
    default: "#icon-",
  },
  name: String,
  color: {
    type: String,
    default: "",
  },
  //svg的宽度和高度
  //接收父组件传递过来的宽度
  width:{
    type:String,
    default:'16px'
  },
  //接收父组件传递归来的高度
  height:{
    type:String,
    default:"16px"
  }
});
</script>
<script lang="ts">
export default {
  name:'Svg'
}
</script>
<style scoped></style>
