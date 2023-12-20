<template>
  <!-- 卡片视图 -->
  <el-card class="box-card">
    <!-- 添加品牌按钮 -->
    <el-button type="primary" icon="Plus" @click="addTrademark" v-has="'btn.Trademark.add'"
      >添加品牌</el-button
    >
    <!-- table表格区域 -->
    <el-table border style="margin: 20px 0" :data="tableData">
      <el-table-column
        label="序号"
        width="80px"
        type="index"
        align="center"
      ></el-table-column>
      <el-table-column
        label="品牌名称"
        prop="tmName"
        align="center"
      ></el-table-column>
      <el-table-column label="品牌LOGO" align="center">
        <template #="{ row }">
          <el-image
            :src="row.logoUrl"
            lazy
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #="{ row }">
          <!-- 修改按钮 -->
          <el-button
            icon="Edit"
            type="warning"
            @click="updateTrademark(row)"
          ></el-button>
          <!-- 删除按钮 -->
          <el-popconfirm
            title="Are you sure to delete this?"
            width="180px"
            icon="Delete"
            @confirm="deleteTrademark(row)"
          >
            <template #reference>
              <el-button icon="Delete" type="danger"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 10, 20]"
      background="background"
      layout="prev, pager, next, jumper,->, sizes,total"
      :total="total"
      @current-change="getHasTrademark"
      @size-change="getHasTrademark"
    />
    <!-- 添加品牌对话框 -->
    <el-dialog
      v-model="trademarkDialog"
      width="50%"
      :title="trademarkForm.id ? '修改品牌' : '添加品牌'"
      @close="clearFormData"
    >
      <!-- 收集品牌数据的表单 -->
      <el-form
        :model="trademarkForm"
        :rules="rules"
        label-width="80px"
        style="width: 80%"
        ref="ruleFormRef"
      >
        <el-form-item label="品牌名称" prop="tmName">
          <el-input
            placeholder="请输入品牌的名称"
            width="80%"
            v-model="trademarkForm.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌Logo" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkForm.logoUrl"
              :src="trademarkForm.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">Cancel</el-button>
          <el-button type="primary" @click="confirm"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from "@/api/product/trademark/index";
import {
  Records,
  TrademarkResponseData,
  Trademark,
} from "@/api/product/trademark/type";
import { ElMessage, FormRules, UploadProps } from "element-plus";
//当前页
let currentPage = ref<number>(1);
let total = ref<number>(0);
let tableData = ref<Records>([]);
// 控制显示添加品牌对话框
let trademarkDialog = ref<boolean>(false);
//页面展示多少条数据
let pageSize = ref<number>(3);
//收集新增品牌的表单数据
let trademarkForm = reactive<Trademark>({
  tmName: "",
  logoUrl: "",
});
//ref获取表单
let ruleFormRef = ref();
//dialog对话框的取消按钮
const cancel = () => {
  trademarkDialog.value = false;
};
//dialog对话框的确定按钮
const confirm = async () => {
  await ruleFormRef.value.validate();

  const result = await reqAddOrUpdateTrademark(trademarkForm);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "操作成功",
    });
    getHasTrademark(trademarkForm.id ? currentPage.value : 1);
  } else {
    ElMessage({
      type: "error",
      message: "操作失败",
    });
  }
  //关闭对话框
  trademarkDialog.value = false;
};
const getHasTrademark = async (pageNo = 1) => {
  currentPage.value = pageNo;
  let result: TrademarkResponseData = await reqHasTrademark(
    currentPage.value,
    pageSize.value
  );
  if (result.code == 200) {
    total.value = result.data.total;
    tableData.value = result.data.records;
  }
};

// 添加品牌按钮的回调
const addTrademark = () => {
  trademarkDialog.value = true;
};

//修改品牌的信息
const updateTrademark = (row: Trademark) => {
  trademarkDialog.value = true;
  //ES6合并对象
  Object.assign(trademarkForm, row);
  // trademarkForm.id = row.id
  // trademarkForm.tmName = row.tmName
  // trademarkForm.logoUrl = row.logoUrl
};
//上传图片组件钩子-> 上传文件成功后
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response: any,
) => {
  //保存上传成功后的图片地址
  trademarkForm.logoUrl = response.data;
  //图片上传成功后清除相应的表单验证提示信息
  ruleFormRef.value.clearValidate("logoUrl");
  // imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};
//上传图片组件-> 上传之前对上传的文件进行格式和大小控制
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile: any) => {
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

//表单验证
const logoRule = (value: any, callback: any) => {
  //如果图片上传
  console.log("这是图片的表单验证", value);

  if (value) {
    callback();
  } else {
    callback(new Error("Logo图片务必上传成功"));
  }
};
const rules = reactive<FormRules>({
  tmName: [{ required: true, message: "请输入品牌的名称", trigger: "blur" }],
  logoUrl: [{ required: true, validator: logoRule }],
});

//当dialog关闭时，清除trademark表单的所有数据和表单验证
const clearFormData = () => {
  //清空数据
  trademarkForm.id = 0;
  trademarkForm.tmName = "";
  trademarkForm.logoUrl = "";
  //重置表单验证信息
  ruleFormRef.value?.resetFields();
};

//删除品牌功能

//确认删除品牌的回调函数
const deleteTrademark = async (row: Trademark) => {
  const result = await reqDeleteTrademark(row.id as number);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    //删除成功后重新发起数据列表请求，刷新table数据
    getHasTrademark(
      tableData.value.length > 1 ? currentPage.value : currentPage.value - 1
    );
  } else {
    ElMessage({
      type: "error",
      message: "删除失败",
    });
  }
};
onMounted(() => {
  getHasTrademark();
});
</script>
<script lang="ts">
export default {
  name: "Trademark",
};
</script>

<style scoped>
.avatar-uploader {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  background-size: cover;
}
</style>
