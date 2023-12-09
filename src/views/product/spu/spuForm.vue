<template>
  <!-- spu收集表单 -->
  <el-form>
    <el-form-item label="SPU名称"
      ><el-input
        placeholder="请你输入SPU名称"
        v-model="SpuParams.spuName"
      ></el-input
    ></el-form-item>
    <el-form-item label="SPU品牌"
      ><el-select placeholder="请你选择品牌" v-model="SpuParams.tmId">
        <el-option
          v-for="item in allTrademark"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        ></el-option> </el-select
    ></el-form-item>
    <el-form-item label="SPU描述"
      ><el-input
        placeholder="请你输入描述"
        type="textarea"
        v-model="SpuParams.description"
      ></el-input
    ></el-form-item>
    <el-form-item label="SPU照片">
      <el-upload
        v-model:file-list="spuImgs"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="beforeSpuImageUpload"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img style="width: 100%" :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select
        :placeholder="
          unSelectSaleAttr.length
            ? `还有${unSelectSaleAttr.length}个属性未选择`
            : '暂无可选属性'
        "
        v-model="selectSaleAttr"
        ><el-option
          v-for="item in unSelectSaleAttr"
          :key="item.id"
          :label="item.name"
          :value="`${item.id}:${item.name}`"
        ></el-option
      ></el-select>
      <el-button
        type="primary"
        icon="Plus"
        style="margin: 0 10px"
        :disabled="selectSaleAttr ? false : true"
        @click="addSaleAttr"
        >添加销售属性</el-button
      >
      <!-- table展示销售属性与属性值 -->
      <el-table border style="margin: 10px 0" :data="saleAttrs" size="small">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="属性名称"
          prop="saleAttrName"
          width="80px"
        ></el-table-column>
        <el-table-column label="属性值">
          <template #="{ row }">
            <el-tag
              style="margin: 5px"
              v-for="item in row.spuSaleAttrValueList"
              :key="item.id"
              >{{ item.saleAttrValueName }}</el-tag
            >
            <el-input
              v-model="row.saleAttrValue"
              placeholder="请输入属性值"
              v-if="row.flag == true"
              size="small"
              style="width: 100px"
              @blur="changeBlur(row)"
              ref="inputRef"
            ></el-input>
            <el-button
              v-else
              type="success"
              size="small"
              icon="Plus"
              @click="addSaleAttrValue(row)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80px">
          <template #="{ $index }">
            <!-- 删除的按钮 -->
            <el-button
              type="danger"
              icon="Delete"
              size="small"
              @click="removeSaleAttr($index)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save">保存</el-button>
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
import type {
  AllTrademark,
  SaleAttrResponseData,
  Trademark,
  SpuHasImg,
  SpuImg,
  SaleAttr,
  HasSaleAttrResponseData,
  HasSaleAttr,
  SpuData,
} from "@/api/product/spu/type";
import { ElMessage, UploadUserFile } from "element-plus";

import { ref, computed, nextTick } from "vue";
import { reqAddOrUpdateSpu } from "@/api/product/spu/index";
const $emit = defineEmits(["changeScene"]);

//存放所有品牌的数据
let allTrademark = ref<Trademark[]>([]);
//存放某一个spu下的所有在售商品图片的数据数组
let spuImgs = ref<SpuImg[] | UploadUserFile[]>([]);
//存放某一个spu下的所有销售属性的数组
let saleAttrs = ref<SaleAttr[]>([]);
//存放项目中所有的销售属性
let allSaleAttr = ref<HasSaleAttr[]>([]);
//定义接收Spu的对象
let SpuParams = ref<SpuData>({
  spuName: "",
  description: "",
  category3Id: "",
  tmId: "",
  spuSaleAttrList: [],
  spuImageList: [],
  spuPosterList: null,
});
//控制预览照片的dialog显示
let dialogVisible = ref<boolean>(false);
//控制预览的照片的url
let dialogImageUrl = ref<string>("");
//选择的spu销售属性
let selectSaleAttr = ref<string>("");
//获取input实例
let inputRef = ref();
//取消的回调
const cancel = () => {
  $emit("changeScene", 0);
};
//获取spu剩下完整的数据
const initHasSpuData = async (spu: SpuData) => {
  //接收父组件传递回来的spu
  SpuParams.value = spu;
  //获取所有品牌的数据
  const allTrademarks: AllTrademark = await reqAllTrademark();
  allTrademark.value = allTrademarks.data;
  //获取项目中所有的销售属性
  const allSaleAttrList: HasSaleAttrResponseData = await reqAllSaleAttr();
  allSaleAttr.value = allSaleAttrList.data;
  if (!spu.id) return;
  //获取某一个spu下的所有在售商品图片的请求接口
  const allSaleImg: SpuHasImg = await reqSpuImage(spu.id as number);
  spuImgs.value = allSaleImg.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    };
  });

  //获取某一个spu下的所有销售属性的请求
  const saleAttrList: SaleAttrResponseData = await reqSpuHasSaleAttList(
    spu.id as number
  );
  saleAttrs.value = saleAttrList.data;
};

//照片墙

//当点击预览照片时的回调
const handlePictureCardPreview = (uploadFile: any) => {
  dialogVisible.value = true;

  dialogImageUrl.value = uploadFile.url;
};

//删除照片后的回调
const handleRemove = () => {};

//上传图片前的钩子
const beforeSpuImageUpload = (rawFile: any) => {
  //要求上传的图片格式为PNG|JPG|GIF，大小为小4M
  if (
    rawFile.type == "image/png" ||
    rawFile.type == "image/jpeg" ||
    rawFile.type == "image/gif"
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true;
    } else {
      ElMessage({
        type: "error",
        message: "上传文件应小于4M",
      });
      return false;
    }
  } else {
    ElMessage({
      type: "error",
      message: "上传图片必须以png|jpg|gif结尾",
    });
    return false;
  }
};
//删除一个属性的回调
const removeSaleAttr = (index: number) => {
  saleAttrs.value.splice(index, 1);
};
//添加一个SPU下的属性的回调
const addSaleAttr = () => {
  //需要添加一个对象：
  // baseSaleAttrId: number;
  // id: Number;
  // saleAttrName: string;
  // spuId: number;
  // spuSaleAttrValueList: spuSaleAttrValueList;
  const [baseSaleAttrId, saleAttrName] = selectSaleAttr.value.split(":");
  const newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  };
  //给spu的属性对象添加一个属性
  saleAttrs.value.push(newSaleAttr);
  //清空选中的属性
  selectSaleAttr.value = "";
};

//添加一个属性的属性值的回调
const addSaleAttrValue = (row: any) => {
  row.flag = true;
  row.saleAttrValue = "";
  //获取焦点
  nextTick(() => {
    inputRef.value.focus();
  });
};

//添加属性值后input的失去焦点时的回调
const changeBlur = (row: SaleAttr) => {
  row.flag = false;
  const { baseSaleAttrId, saleAttrValue } = row;
  const newAttr = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  };

  //非法情况1 -> 输入为空
  if ((saleAttrValue as string).trim() == "") {
    ElMessage({
      type: "warning",
      message: "输入属性值不能为空",
    });
    return;
  }

  //非法情况2 -> 不能有重复情况
  let repat = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName == saleAttrValue;
  });
  if (repat) {
    ElMessage({
      type: "warning",
      message: "属性值不能重复",
    });
    return;
  }
  //向spuSaleAttrValueList数组中添加一个属性值对象
  row.spuSaleAttrValueList.push(newAttr);
  //清空输入的属性值
  row.saleAttrValue = "";
};
//计算属性
//计算出SPU还没有选中的属性
let unSelectSaleAttr = computed(() => {
  let unSelectAttr = allSaleAttr.value.filter((item1) => {
    return saleAttrs.value.every((item2) => {
      return item1.name != item2.saleAttrName;
    });
  });

  return unSelectAttr;
});
//保存按钮的回调 -> 发送更新请求或者添加请求
const save = async () => {
  //整理最后的spu数据

  //整理照片墙数据，统一
  SpuParams.value.spuImageList = spuImgs.value.map((item: any) => {
    return {
      id: item.uid,
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url,
    };
  });
  //整理最后的销售属性数据
  SpuParams.value.spuSaleAttrList = saleAttrs.value;

  //发送请求
  const result = await reqAddOrUpdateSpu(SpuParams.value);
  console.log(result);
  
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: SpuParams.value.id ? "更新成功" : "添加成功",
    });
  } else {
    ElMessage({
      type: "error",
      message: SpuParams.value.id ? "更新失败" : "添加失败",
    });
  }
  //切换场景
  $emit("changeScene", 0);
  //重新获取展示已有spu列表的请求
};
//暴露
defineExpose({
  initHasSpuData,
});
</script>
<script lang="ts">
export default {
  name: "AddSpu",
};
</script>
<style scoped></style>
