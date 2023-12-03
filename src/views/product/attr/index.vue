<template>
  <div>
    <!-- Category -->

    <Category :scene="scene"></Category>

    <!-- 数据列表 -->
    <el-card style="margin: 20px 0">
      <div v-show="scene == false">
        <el-button
          type="primary"
          icon="Plus"
          :disabled="categoryStore.select_Category3_Id ? false : true"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table border style="margin: 15px 0" :data="attrData">
          <el-table-column
            label="序号"
            width="80px"
            type="index"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            prop="attrName"
            width="120px"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row }">
              <el-tag v-for="item in row.attrValueList" :key="item.id">{{
                item.valueName
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template #="{ row }">
              <el-button type="warning" icon="Edit" size="small"></el-button>
              <el-button type="danger" icon="Delete" size="small"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性和修改属性区域 -->
      <div v-show="scene == true">
        <el-form inline>
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名称"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="Plus">添加属性值</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
        <!-- 属性值展示table -->
        <el-table style="margin: 20px 0;" border>
          <el-table-column
            label="序号"
            type="index"
            width="80px"
            align="center"
          ></el-table-column>
          <el-table-column label="属性名称"></el-table-column>
          <el-table-column label="属性操作"></el-table-column>
        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import Category from "@/components/Category/index.vue";
import { reqAttrInfoList } from "@/api/product/attr/index";
import { AttResponseData, Attr } from "@/api/product/attr/type";
import { watch, ref } from "vue";
import useCategoryStore from "@/store/modules/category/category";

//使用仓库
const categoryStore = useCategoryStore();

//属性数据
let attrData = ref<Attr[]>([]);

//控制添加属性和展示列表的切换
let scene = ref<boolean>(false);
watch(
  () => categoryStore.select_Category3_Id,
  () => {
    //清空列表
    attrData.value = [];
    //发送获取属性与属性值
    if (!categoryStore.select_Category3_Id) return;
    getAttr();
  }
);

//获取属性与属性值的函数
const getAttr = async () => {
  //获取三层id
  const { select_Category1_Id, select_Category2_Id, select_Category3_Id } =
    categoryStore;
  const result: AttResponseData = await reqAttrInfoList(
    select_Category1_Id,
    select_Category2_Id,
    select_Category3_Id
  );
  if (result.code == 200) {
    attrData.value = result.data;
  }
};

//添加属性按钮的回调函数
const addAttr = () => {
  scene.value = !scene.value;
};
//取消的回调
const cancel = () => {
  scene.value = !scene.value
}
</script>

<style scoped></style>
