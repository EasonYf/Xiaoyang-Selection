<template>
  <div>
    <el-card>
      <!-- 展示sku数据的列表 -->
      <el-table border :data="records">
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column
          tooltip-effect
          label="名称"
          width="300px"
          prop="skuName"
        ></el-table-column>
        <el-table-column
          tooltip-effect
          label="描述"
          width="350px"
          prop="skuDesc"
        ></el-table-column>
        <el-table-column label="图片" width="300px" align="center">
          <template #="{ row }">
            <img :src="row.skuDefaultImg" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column
          tooltip-effect
          label="重量"
          width="80px"
          prop="weight"
        ></el-table-column>
        <el-table-column
          tooltip-effect
          label="价格"
          width="80px"
          prop="price"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="250px"
          fixed="right"
          align="center"
        >
          <template #="{ row }">
            <el-button
              :type="row.isSale == 0 ? 'info' : 'success'"
              :icon="row.isSale == 0 ? 'Download' : 'Upload'"
              size="small"
              @click="updateSaleSku(row)"
            ></el-button>
            <el-button
              type="default"
              icon="InfoFilled"
              size="small"
              @click="getDetails(row)"
            ></el-button>
            <el-button type="success" icon="EditPen" size="small"></el-button>
            <el-popconfirm
              title="Are you sure to delete this?"
              @confirm="removeSku(row.id)"
            >
              <template #reference>
                <el-button type="danger" icon="Delete" size="small"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        style="margin: 20px 0"
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5, 20, 15, 20]"
        :background="true"
        layout=" prev, pager, next, jumper, ->,sizes,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />

      <!-- SKU详情的抽屉展示页面 -->
      <el-drawer v-model="drawer" direction="rtl">
        <template #header>
          <h4>SKU商品的详情展示</h4>
        </template>
        <template #default>
          <el-table>
            <el-table-column label="名称"></el-table-column>
          </el-table>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  reqSkuInfoList,
  reqRemoveSkuInfo,
  reqCancelSaleSku,
  reqOnSaleSku,
} from "@/api/product/sku/index";
import { SkuData } from "@/api/product/sku/type";
import { ElMessage } from "element-plus";

//SKU商品详情展示抽屉

//控制抽屉的显示
let drawer = ref<boolean>(false)

//分页器

//当前页
let pageNo = ref<number>(1);
//当前页显示条数
let pageSize = ref<number>(5);
//sku列表的所有条数
let total = ref<number>(0);
// 获取的SKU列表数据
let records = ref<SkuData[]>([]);
//当 当前页发送变化时的回调函数
const handleCurrentChange = (pager: number) => {
  pageNo.value = pager;
  getHasSpu(pageNo.value);
};
//当 当前页显示条数发生改变时的回调函数
const handleSizeChange = () => {
  getHasSpu();
};
//获取已有SKU列表的数据
const getHasSpu = async (pager = 1) => {
  pageNo.value = pager;
  const result = await reqSkuInfoList(pageNo.value, pageSize.value);
  if (result.code == 200) {
    records.value = result.data.records;
    total.value = result.data.total;
  }
};

//删除某一个SKU的业务回调函数
const removeSku = async (skuId: number) => {
  const result = await reqRemoveSkuInfo(skuId);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    //成功删除后重新获取已有sku的列表数据
    getHasSpu(records.value.length > 1 ? pageNo.value : pageNo.value - 1);
  } else {
    ElMessage({
      type: "error",
      message: "删除失败",
    });
  }
};

//上架与下架商品的回调函数
const updateSaleSku = async (row: SkuData) => {
  if (row.isSale == 1) {
    //如果isSale为1表示在售商品
    //可以下架操作
    const result = await reqCancelSaleSku(row.id as number);
    if (result.code == 200) {
      ElMessage({
        type: "success",
        message: "下架成功",
      });
      getHasSpu(pageNo.value);
    } else {
      ElMessage({
        type: "error",
        message: "下架失败",
      });
    }
  } else {
    //可以进行上架操作
    const result = await reqOnSaleSku(row.id as number);
    if (result.code == 200) {
      ElMessage({
        type: "success",
        message: "上架成功",
      });
      getHasSpu(pageNo.value);
    } else {
      ElMessage({
        type: "error",
        message: "上架失败",
      });
    }
  }
};

//进入SKU详情页面的回调函数
const getDetails = () => {
  //切换
  drawer.value = !drawer.value
}
//当组件挂载时发送一个获取已有SKU数据的请求
onMounted(() => {
  getHasSpu();
});
</script>

<script lang="ts">
export default {
  name: "SKU",
};
</script>
<style scoped></style>
