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
              <el-tag
                style="margin: 5px 5px"
                v-for="item in row.attrValueList"
                :key="item.id"
                >{{ item.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template #="{ row }">
              <el-button
                type="warning"
                icon="Edit"
                size="small"
                @click="updateAttr(row)"
              ></el-button>
              <!-- 删除功能的气泡弹窗 -->
              <el-popconfirm title="Are you sure to delete this?" @confirm="removeAttr(row.id)">
                <template #reference>
                  <el-button
                    type="danger"
                    icon="Delete"
                    size="small"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性和修改属性区域 -->
      <div v-show="scene == true">
        <el-form inline>
          <el-form-item label="属性名称">
            <el-input
              placeholder="请输入属性名称"
              v-model="attrParams.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="Plus"
          @click="addAttrValue"
          :disabled="attrParams.attrName ? false : true"
          >添加属性值</el-button
        >
        <el-button type="primary" @click="cancel">取消</el-button>
        <!-- 属性值展示table -->
        <el-table
          style="margin: 20px 0"
          border
          :data="attrParams.attrValueList"
        >
          <el-table-column
            label="序号"
            type="index"
            width="80px"
            align="center"
          ></el-table-column>
          <el-table-column label="属性名称" align="center">
            <template #="{ row, $index }">
              <el-input
                placeholder="请输入属性"
                v-model="row.valueName"
                v-if="row.flag"
                @blur="toLook(row, $index)"
                :ref="(vc: any) => (inputArr[$index] = vc)"
              ></el-input>
              <div v-else @click="toDiv(row, $index)">
                {{ row.valueName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="属性操作" align="center">
            <template #="{ $index }">
              <!-- 删除按钮 -->
              <el-button
                type="danger"
                icon="Delete"
                @click="removeAttrValue($index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="save"
          :disabled="
            attrParams.attrValueList.length > 0 &&
            attrParams.attrValueList[0].valueName != ''
              ? false
              : true
          "
          >保存</el-button
        >
        <el-button type="primary" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import Category from "@/components/Category/index.vue";
import {
  reqAttrInfoList,
  reqAddOrUpdateAttr,
  reqRemoveAttr,
} from "@/api/product/attr/index";
import type {
  AttResponseData,
  Attr,
  AttrValue,
  ResponseData,
} from "@/api/product/attr/type";
import { watch, ref, reactive, nextTick } from "vue";
import useCategoryStore from "@/store/modules/category/category";
import { ElMessage } from "element-plus";

//使用仓库
const categoryStore = useCategoryStore();

//定义存储el-input实例的数组
let inputArr = ref<any>([]);
//属性数据
let attrData = ref<Attr[]>([]);

//控制添加属性和展示列表的切换
let scene = ref<boolean>(false);

//新增属性的数据对象

let attrParams = reactive<Attr>({
  attrName: "", //新增属性的名称
  attrValueList: [], //新增属性的属性值数组
  categoryId: "", //三级分类的id
  categoryLevel: 3, //代表是几级分类
});
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
  //每次点击先清空之前的数据
  Object.assign(attrParams, {
    attrName: "", //新增属性的名称
    attrValueList: [], //新增属性的属性值数组
    categoryId: "", //三级分类的id
    categoryLevel: 3, //代表是几级分类
  });
  // 保存选中的三级分类id
  attrParams.categoryId = categoryStore.select_Category3_Id;
  scene.value = !scene.value;
};
//取消的回调
const cancel = () => {
  scene.value = !scene.value;
};
//添加一个属性
const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: "",
    flag: true,
  });
  //让最后一个input聚焦
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus();
  });
};
//保存属性与属性值的回调
const save = async () => {
  //发送添加属性的请求
  if (!attrParams.attrName) return;
  const result = await reqAddOrUpdateAttr(attrParams);
  if (result.code == 200) {
    //关闭新增属性界面
    scene.value = !scene.value;
    //重新发送获取属性与属性值的请求
    getAttr();
    ElMessage({
      type: "success",
      message: attrParams.id ? "修改成功" : "添加成功",
    });
  } else {
    ElMessage({
      type: "error",
      message: attrParams.id ? "修改失败" : "添加失败",
    });
  }
};

//属性值输入的blur切换
const toLook = (row: AttrValue, $index: number) => {
  //非法情况1
  if (row.valueName.trim() == "") {
    //删除属性值为空的元素
    attrParams.attrValueList.splice($index, 1);
    ElMessage({
      type: "warning",
      message: "属性值不能为空",
    });
    return;
  }

  //非法情况2
  let rpeat = attrParams.attrValueList.find((item) => {
    if (item != row) {
      return item.valueName === row.valueName;
    }
  });

  if (rpeat) {
    //如果属性值存在重复不进行后续操作
    attrParams.attrValueList.splice($index, 1);
    ElMessage({
      type: "warning",
      message: "属性值不能重复",
    });
    return;
  }
  row.flag = !row.flag;
};

//展示div
const toDiv = (row: AttrValue, $index: number) => {
  // 模式切换
  row.flag = !row.flag;
  //nextTick：响应式数据发生变化时，获取更新后的DOM
  nextTick(() => {
    //input聚焦
    inputArr.value[$index].focus();
  });
};
//删除某一个属性值的回调
const removeAttrValue = ($index: number) => {
  attrParams.attrValueList.splice($index, 1);
};

//修改属性的回调
const updateAttr = (row: Attr) => {
  //模式切换
  scene.value = !scene.value;
  //将某一个属性的数据赋值给attrParams
  //使用Objec中的assign方法合并数组
  //利用JSON.parse(JSON.stringify())实现深拷贝
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)));
  console.log(row);
};

//删除属性的回调
const removeAttr = async (id: number) => {
  const result: ResponseData = await reqRemoveAttr(id);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    //重新获取属性列表
    getAttr();
  } else {
    ElMessage({
      type: "error",
      message: "删除失败",
    });
  }
};
</script>
<script lang="ts">
export default {
  name: "Attr",
};
</script>
<style scoped></style>
