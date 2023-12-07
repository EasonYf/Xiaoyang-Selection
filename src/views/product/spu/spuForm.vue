<template>
  <!-- spu收集表单 -->
  <el-form>
    <el-form-item label="SPU名称"
      ><el-input placeholder="请你输入SPU名称"></el-input
    ></el-form-item>
    <el-form-item label="SPU品牌"
      ><el-select placeholder="请你选择品牌"></el-select
    ></el-form-item>
    <el-form-item label="SPU描述"
      ><el-input placeholder="请你输入描述" type="textarea"></el-input
    ></el-form-item>
    <el-form-item label="SPU照片">
      <el-upload
        v-model:file-list="fileList"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select></el-select>
      <el-button type="primary" icon="Plus" style="margin: 0 10px"
        >添加销售属性</el-button
      >
      <!-- table展示销售属性与属性值 -->
      <el-table border style="margin: 10px 0">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column label="属性名称"></el-table-column>
        <el-table-column label="属性值"></el-table-column>
        <el-table-column label="操作" width="80px">
          <template #="{ row }">
            <!-- 删除的按钮 -->
            <el-button type="danger" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {
  reqAllTrademark,
  reqSpuImage,
  reqSpuHasSaleAttList,
  reqAllSaleAttr,
} from "@/api/product/spu/index";
import {
  AllTrademark,
  TrademarkData,
  SaleAttrResponseData,
  Trademark,
  SpuHasImg,
  SpuImg,
  SaleAttr,
} from "@/api/product/spu/type";
import { ref, reactive } from "vue";
const $emit = defineEmits(["changeScene"]);

//存放所有品牌的数据
let trademarks = ref<Trademark[]>([]);
//存放某一个spu下的所有在售商品图片的数据数组
let spuImgs = ref<SpuImg[]>([]);
//存放某一个spu下的所有销售属性的数组
let saleAttrs = ref<SaleAttr[]>([]);
//取消的回调
const cancel = () => {
  $emit("changeScene", 0);
};
//获取spu剩下完整的数据
const getAllSpu = async (row: any) => {
  //获取所有品牌的数据
  const allTrademark: AllTrademark = await reqAllTrademark();
  if (allTrademark.code == 200) {
    trademarks.value = allTrademark.data;
  }
  //获取某一个spu下的所有在售商品图片的请求接口
  const allSaleImg: SpuHasImg = await reqSpuImage(row.id);
  if (allSaleImg.code == 200) {
    spuImgs.value = allSaleImg.data;
  }
  //获取某一个spu下的所有销售属性的请求
  const allSaleAttrs: SaleAttrResponseData = await reqSpuHasSaleAttList(row.id);
  if (allSaleAttrs.code == 200) {
    saleAttrs.value = allSaleAttrs.data
  }
  console.log("所有品牌", allSaleAttrs);
};
defineExpose({
  getAllSpu,
});
</script>
<script lang="ts">
export default {
  name: "AddSpu",
};
</script>
<style scoped></style>
