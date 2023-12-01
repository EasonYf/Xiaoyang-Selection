<template>
  <!-- 卡片视图 -->
  <el-card class="box-card">
    <!-- 添加品牌按钮 -->
    <el-button type="primary" icon="Plus">添加品牌</el-button>
    <!-- table表格区域 -->
    <el-table border style="margin: 20px 0" :data = "tableData">
      <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
      <el-table-column label="品牌名称" prop="tmName" align="center"></el-table-column>
      <el-table-column label="品牌LOGO" align="center">
        <template #="{row}">
          <el-image :src="row.logoUrl" lazy style="width: 100px; height: 100px"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <!-- 修改按钮 -->
        <el-button icon="Edit" type="warning"></el-button>
        <!-- 删除按钮 -->
        <el-button icon="Delete" type="danger"></el-button>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 15, 20]"
      background="background"
      layout="prev, pager, next, jumper,->, sizes,total"
      :total="total"
      @current-change="getHasTrademark"
      @size-change = "getHasTrademark"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref ,onMounted} from "vue";
import { reqHasTrademark } from '@/api/product/trademark/index'
import { Records , TrademarkResponseData} from "@/api/product/trademark/type";
//当前页
let currentPage = ref<number>(1)
let total = ref<number>(0)
let tableData = ref<Records>([])
//页面展示多少条数据
let pageSize = ref<number>(5)
const getHasTrademark = async () => {
  let result:TrademarkResponseData= await reqHasTrademark(currentPage.value,pageSize.value)
  if(result.code == 200)
  {
    total.value = result.data.total
    tableData.value = result.data.records
    console.log('这是tabledata',tableData.value);
    
  }
  console.log('这是分页器获取的数据',result);
  
}

onMounted(()=>{
  getHasTrademark()
})
</script>
<script lang="ts">
export default {
  name: "Trademark",
};
</script>

<style scoped></style>
