<template>
  <div>
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      :data="SkuParams"
    >
      <el-form-item label="SKU名称"
        ><el-input placeholder="SKU名称" v-model="SkuParams.skuName"></el-input
      ></el-form-item>
      <el-form-item label="价格(元)"
        ><el-input
          placeholder="价格(元)"
          type="number"
          v-model="SkuParams.price"
        ></el-input
      ></el-form-item>
      <el-form-item label="重量(克)"
        ><el-input
          placeholder="重量(克)"
          type="number"
          v-model="SkuParams.weight"
        ></el-input
      ></el-form-item>
      <el-form-item label="SKU描述"
        ><el-input
          placeholder="SKU描述"
          type="textarea"
          v-model="SkuParams.skuDesc"
        ></el-input
      ></el-form-item>
      <el-form-item label="平台属性">
        <el-form inline>
          <el-form-item
            label-width="80px"
            v-for="item in attrList"
            :key="item.id"
            :label="item.attrName"
          >
            <el-select v-model="item.attrIdAndValueId">
              <el-option
                v-for="el in item.attrValueList"
                :key="el.id"
                :label="el.valueName"
                :value="`${item.id}:${el.id}`"
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
            ><el-select v-model="item.saleAttrIdAndValueId"
              ><el-option
                v-for="el in item.spuSaleAttrValueList"
                :key="el.id"
                :label="el.saleAttrValueName"
                :value="`${item.id}:${el.id}`"
              ></el-option></el-select
          ></el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table border :data="imgList" ref="table">
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
            <template #="{ row }">
              <el-button type="warning" @click="handler(row)"
                >设置默认</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { reqAttrInfoList } from "@/api/product/attr/index";
import {
  reqSpuImage,
  reqSpuHasSaleAttList,
  reqAddSku,
} from "@/api/product/spu/index";
//引入仓库
import useCategoryStore from "@/store/modules/category/category";
import { SaleAttr, SkuData, SpuData, SpuImg } from "@/api/product/spu/type";
import { ElMessage } from "element-plus";

//使用仓库
let categoryStore = useCategoryStore();
const labelPosition = ref<string>("right");

//自定义指令
const $emit = defineEmits(["changeScene"]);

//照片墙数据数组
let imgList = ref<SpuImg[]>([]);

//平台的某个具体分类具有的属性
let attrList = ref<any>([]);

//获取table的组件实列
let table = ref();
//SKU表单的收集数据
let SkuParams = ref<SkuData>({
  category3Id: "",
  price: 0,
  skuDefaultImg: "",
  skuDesc: "",
  skuName: "",
  spuId: 0,
  tmId: 0,
  weight: 0,
  isSale: 0,
});
//某spu下的销售属性
let saleAttr = ref<SaleAttr[]>([]);
//取消的回调函数
const cancel = () => {
  $emit("changeScene", 0);
};

//初始化skuform的数据
const initSkuData = async (row: SpuData) => {
  //初始化部分数据
  Object.assign(SkuParams.value, {
    category3Id: categoryStore.select_Category3_Id,
    price: 0,
    skuDefaultImg: "",
    skuDesc: "",
    skuName: "",
    spuId: row.id,
    tmId: row.tmId,
    weight: 0,
    isSale: 0,
  });
  // SkuParams.value.category3Id = categoryStore.select_Category3_Id;
  // SkuParams.value.spuId = row.id as number | string;
  // SkuParams.value.tmId = row.tmId;
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

//设置默认照片的回调函数
const handler = (row: any) => {
  //选择前先清空表格的选择状态
  table.value.clearSelection();
  //再将目标一行选中
  table.value.toggleRowSelection(row, true);
  //收集默认图片地址
  SkuParams.value.skuDefaultImg = row.imgUrl;
};
//暴露函数
defineExpose({
  initSkuData,
});

//保存并发送添加sku的请求
const save = async () => {
  //整理数据[]
  // let attrValues = attrList.value.map((item: any) => {
  //   if (item.attrIdAndValueId) {
  //     let [attrId, valueId] = item.attrIdAndValueId.split(":");
  //     return {
  //       attrId,
  //       valueId,
  //     };
  //   }
  // });
  SkuParams.value.skuAttrValueList = attrList.value.reduce(
    (pre: any, next: any) => {
      if (next.attrIdAndValueId) {
        let [attrId, valueId] = next.attrIdAndValueId.split(":");
        pre.push({
          attrId,
          valueId,
        });
      }
      return pre;
    },
    []
  );
  SkuParams.value.skuSaleAttrValueList = saleAttr.value.reduce(
    (pre: any, next: any) => {
      if (next.saleAttrIdAndValueId) {
        let [saleAttrId, saleAttrValueId] =
          next.saleAttrIdAndValueId.split(":");
        pre.push({
          saleAttrValueId,
          saleAttrId,
        });
      }
      return pre;
    },
    []
  );
  //发送添加sku请求
  const result: any = await reqAddSku(SkuParams.value);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "添加SKU成功",
    });
    //请求成功切换场景
    $emit("changeScene", 0);
  } else {
    ElMessage({
      type: "error",
      message: "添加SKU失败",
    });
  }
};
</script>
<script lang="ts">
export default { name: "AddSku" };
</script>

<style scoped></style>
