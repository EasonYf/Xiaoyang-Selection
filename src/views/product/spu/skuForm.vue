<template>
  <div>
    <el-form :label-position="labelPosition" label-width="100px" :data="SkuParams">
      <el-form-item label="SKU名称"
        ><el-input placeholder="SKU名称"  v-model="SkuParams.skuName"></el-input
      ></el-form-item>
      <el-form-item label="价格(元)" 
        ><el-input placeholder="价格(元)" type="number" v-model="SkuParams.price"></el-input
      ></el-form-item>
      <el-form-item label="重量(克)"
        ><el-input placeholder="重量(克)" type="number"  v-model="SkuParams.weight"></el-input
      ></el-form-item>
      <el-form-item label="SKU描述" 
        ><el-input placeholder="SKU描述" type="textarea" v-model="SkuParams.skuDesc"></el-input
      ></el-form-item>
      <el-form-item label="平台属性">
        <el-form inline>
          <el-form-item
            label-width="80px"
            v-for="(item, index) in attrList"
            :key="item.id"
            :label="item.attrName"
          >
            <el-select>
              <el-option
                v-for="el in item.attrValueList"
                :key="el.attrId"
                :label="el.valueName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form inline>
          <el-form-item
            v-for="item in saleAttr"
            :key="item.id"
            :label="item.saleAttrName"
            label-width="80px"
            ><el-select
              ><el-option
                v-for="el in item.spuSaleAttrValueList"
                :key="el.id"
                :label="el.saleAttrValueName"
                :value="el.id"
              ></el-option></el-select
          ></el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table border :data="imgList">
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="图片" align="center">
            <template #="{ row }">
              <img
                :src="row.imgUrl"
                :alt="row.imgName"
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"></el-table-column>
          <el-table-column label="操作" width="120px">
            <el-button type="warning">设置默认</el-button>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { reqAttrInfoList } from "@/api/product/attr/index";
import { reqSpuImage, reqSpuHasSaleAttList } from "@/api/product/spu/index";
//引入仓库
import useCategoryStore from "@/store/modules/category/category";
import { SaleAttr, SpuData, SpuImg } from "@/api/product/spu/type";

//使用仓库
let categoryStore = useCategoryStore();
const labelPosition = ref<string>("right");

//自定义指令
const $emit = defineEmits(["changeScene"]);

//照片墙数据数组
let imgList = ref<SpuImg[]>([]);

//平台的某个具体分类具有的属性
let attrList = ref<any>([]);

//SKU表单的收集数据
let SkuParams = ref({
  category3Id: "",
  id: 0,
  isSale: 0,
  price: 0,
  skuAttrValueList: [],
  skuDefaultImg: "",
  skuDesc: "",
  skuImageList: [],
  skuName: "",
  skuSaleAttrValueList: [],
  spuId: 0,
  tmId: 0,
  weight: 0,
});
//某spu下的销售属性
let saleAttr = ref<SaleAttr[]>([]);
//取消的回调函数
const cancel = () => {
  $emit("changeScene", 0);
};

//初始化skuform的数据
const initSkuData = async (row: SpuData) => {
  //获取照片
  const result1 = await reqSpuImage(row.id as number);
  imgList.value = result1.data;
  //获取平台的属性
  const result2 = await reqAttrInfoList(
    categoryStore.select_Category1_Id,
    categoryStore.select_Category2_Id,
    categoryStore.select_Category3_Id
  );
  attrList.value = result2.data;
  //获取某个spu下的销售属性
  const result3 = await reqSpuHasSaleAttList(row.id as number);
  saleAttr.value = result3.data;
};

//暴露函数
defineExpose({
  initSkuData,
});
</script>
<script lang="ts">
export default { name: "AddSku" };
</script>

<style scoped></style>
