<template>
  <div>
    <!-- category组件 -->
    <Category :scene="scene == 0 ? false : true"></Category>
    <!-- 展示SPU表格及添加spu表格 -->
    <el-card style="margin: 20px 0">
      <!-- 展示已有的SPU数据表格 -->
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="Plus"
          @click="addSpu()"
          :disabled="categoryStore.select_Category3_Id ? false : true"
          >添加SPU</el-button
        >
        <!-- 展示已有的SPU数据表格 -->
        <el-table border style="margin: 15px 0" :data="records">
          <el-table-column
            label="序号"
            width="80px"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述 " prop="description">
          </el-table-column>
          <el-table-column label="操作" width="240px">
            <template #="{ row }">
              <el-button
                type="primary"
                icon="Plus"
                size="small"
                title="添加sku"
                @click="addSku(row)"
              ></el-button>
              <el-button
                type="warning"
                icon="Edit"
                size="small"
                title="更新spu"
                @click="updateSpu(row)"
              ></el-button>
              <el-button
                type="info"
                icon="InfoFilled"
                size="small"
                @click="viewSku(row.id)"
              ></el-button>
              <!-- 删除功能的气泡弹窗 -->
              <el-popconfirm
                title="Are you sure to delete this?"
                @confirm="removeSpu(row.id)"
              >
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
        <!-- 分页器 -->
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]"
          :background="true"
          layout=" prev, pager, next, jumper,->, sizes,total"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <!-- sku展示的dialog -->
      <el-dialog v-model="skuDialogVisible" title="SKU展示列表">
        <el-table border :data="skuList">
          <el-table-column label="SKU名字" prop="skuName"></el-table-column>
          <el-table-column label="SKU描述" prop="skuDesc"></el-table-column>
          <el-table-column label="SKU价格" prop="price"></el-table-column>
          <el-table-column label="SKU重量" prop="weight"></el-table-column>
          <el-table-column label="SKU图片">
            <template #="{ row }">
              <img
                :src="row.skuDefaultImg"
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
      <!-- 添加SPU和修改spu的组件 -->
      <AddSpu
        v-show="scene == 1"
        ref="addSpuRef"
        @changeScene="changeScene"
      ></AddSpu>
      <!-- 添加sku的组件 -->
      <AddSku
        v-show="scene == 2"
        @changeScene="changeScene"
        ref="addSkuRef"
      ></AddSku>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import Category from "@/components/Category/index.vue";
//引入类型
import { HasSpuResponseData, Records, SpuData } from "@/api/product/spu/type";
import {
  reqSPUList,
  reqSkuInfoList,
  reqRemoveSpu,
} from "@/api/product/spu/index";
import { ref, watch } from "vue";
import AddSpu from "./spuForm.vue";
import AddSku from "./skuForm.vue";

//引入仓库
import useCategoryStore from "@/store/modules/category/category";
import { ElMessage } from "element-plus";
//使用仓库
let categoryStore = useCategoryStore();
//控制切换已有的SPU展示表格和添加SPU表格
let scene = ref<number>(0);

//分页器当前页
let pageNo = ref<number>(1);
//分页器每页的展示条数
let pageSize = ref<number>(3);
//分页器所有的条数total
let total = ref<number>(0);
//已有spu的数据数组
let records = ref<Records>([]);

//获取AddSpu组件的组件实例vc
let addSpuRef = ref();
//获取AddSku组件的组件实例vc
let addSkuRef = ref();
//控制sku的dialog的显示
let skuDialogVisible = ref<boolean>(false);

//获取的sku数据
let skuList = ref([]);
//当当前页面发生改变时的回调
const handleSizeChange = () => {
  //调用获取已有spu数据的方法
  getSpu();
};
//当显示条数发生改变时的回调
const handleCurrentChange = () => {
 
  //调用获取已有spu数据的方法
  getSpu();
};

//监听categoryStore仓库中的三级分类id是否被选中
watch(
  () => categoryStore.select_Category3_Id,
  () => {
    if (!categoryStore.select_Category3_Id) return;
    //发送请求
    getSpu();
  }
);
//获取已有的spu数据的回调
const getSpu = async () => {

  //调用请求
  const result: HasSpuResponseData = await reqSPUList(
    pageNo.value,
    pageSize.value,
    categoryStore.select_Category3_Id
  );
  if (result.code == 200) {
    records.value = result.data.records;
    //赋值所有的数据条数
    total.value = result.data.total;
  }
};

//控制场景的切换的函数
const changeScene = (temp: number) => {
  //切换场景
  scene.value = temp;
};

//修改spu的回调
const updateSpu = (row: SpuData) => {
  //调用子组件中的方法，获取完整的spu数据
  addSpuRef.value.initHasSpuData(row);
  //切换显示AddSpu组件
  changeScene(1);
};

//添加一个新的spu
const addSpu = () => {
  //调用spuForm中的添加新spu的初始化函数
  addSpuRef.value.initAddSpu();
  changeScene(1);
  getSpu();
};

//添加Sku
const addSku = (row: any) => {
  //初始化sku模块的所有数据
  addSkuRef.value.initSkuData(row);
  //切换场景
  changeScene(2);
};
//查看某个spu下已有的sku数据
const viewSku = async (spuId: number) => {
  skuDialogVisible.value = true;

  //发送请求获取sku列表
  const result = await reqSkuInfoList(spuId);
  if (result.code == 200) {
    skuList.value = result.data;
  }
};
//删除一个spu的回调
const removeSpu = async (spuId: number) => {
  //发送请求
  const result = await reqRemoveSpu(spuId);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    //删除成功后重新获取spu列表数据
    getSpu();
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
  name: "Spu",
};
</script>
<style scoped></style>
