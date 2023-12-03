<template>
  <el-card>
    <el-form inline :disabled="scene">
      <!-- 一级分类 -->
      <el-form-item label="一级分类">
        <el-select
          v-model="categoryStore.select_Category1_Id"
          @change="selectChange1"
        >
          <el-option
            v-for="item in categoryStore.category1Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 二级分类 -->
      <el-form-item label="二级分类">
        <el-select
          v-model="categoryStore.select_Category2_Id"
          @change="selectChange2"
        >
          <el-option
            v-for="item in categoryStore.category2Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 三级分类 -->
      <el-form-item label="三级分类">
        <el-select v-model="categoryStore.select_Category3_Id">
          <el-option
            v-for="item in categoryStore.category3Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import useCategoryStore from "@/store/modules/category/category";
import { onMounted } from "vue";
//使用仓库
const categoryStore = useCategoryStore();
//接收父组件传递过来的值
defineProps(['scene'])
//当选中一级分类时触发的函数
const selectChange1 = () => {
  //清空二级、三级的选中id和数据
  categoryStore.select_Category2_Id = "";
  categoryStore.select_Category3_Id = "";
  categoryStore.category3Arr = [];
  //获取二级分类数据
  categoryStore.getCategory2();
};
//当选中二级分类时触发的函数
const selectChange2 = () => {
  //清空三级分类的id
  categoryStore.select_Category3_Id = "";
  //获取三级分类数据
  categoryStore.getCategory3();
};
onMounted(() => {
  //调用获取一级分类请求
  categoryStore.getCategory1();
});
</script>
<script lang="ts">
export default {
  name: "Category",
};
</script>
<style scoped></style>
