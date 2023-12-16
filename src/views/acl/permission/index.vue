<template>
  <el-card>
    <!-- 菜单列表 -->
    <el-table
      :data="permissionList"
      border
      style="width=100%;margin-bottom: 20px;"
      row-key="id"
    >
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="权限值" prop="code"></el-table-column>
      <el-table-column label="修改时间" prop="updateTime"></el-table-column>
      <el-table-column label="操作" align="center">
        <template #="{ row }">
          <!-- <span>{{ row }}</span> -->
          <el-button
            type="primary"
            size="small"
            @click="addMenu(row)"
            :disabled="row.level == 4 ? true : false"
            >{{ row.level == 3 ? "添加功能" : "添加菜单" }}</el-button
          >
          <el-button
            type="primary"
            size="small"
            :disabled="row.level == 1 ? true : false"
            @click="updateMenu(row)"
            >编辑</el-button
          >
          <el-popconfirm title="Are you sure to delete this?" @confirm=" removeMenu(row)">
            <template #reference>
              <el-button
                type="primary"
                size="small"
                :disabled="row.level == 1 ? true : false"
                >删除</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加菜单的dialog -->
    <el-dialog
      v-model="menuDialogVisible"
      :title="''"
      width="30%"
      @close="closeMenu"
    >
      <el-form :model="menuArr" label-width="80px">
        <el-form-item label="名称"
          ><el-input placeholder="请输入名称" v-model="menuArr.name"></el-input
        ></el-form-item>
        <el-form-item label="权限值"
          ><el-input
            placeholder="请输入权限值"
            v-model="menuArr.code"
          ></el-input
        ></el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="menuDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addSave"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import {
  PermissionList,
  permissionResponseData,
  Menu,
} from "@/api/acl/permission/type";
import {
  reqAllPermissionList,
  reqAddOrupdateMenu,
  reqRemoveMenu
} from "@/api/acl/permission/index";
import { ElMessage } from "element-plus";
//permission列表的数据
const permissionList = ref<PermissionList>([]);
// 控制添加和修改菜单的dialog
const menuDialogVisible = ref<boolean>(false);
//定义菜单数组
const menuArr = reactive<Menu>({
  name: "",
  code: "",
  pid: 0,
  level: 0,
});
//获取permission列表的回调
const getHasPermission = async () => {
  //发送请求
  const result: permissionResponseData = await reqAllPermissionList();
  if (result.code == 200) {
    permissionList.value = result.data;
  }
};

// 添加菜单按钮的回调函数
const addMenu = (row: Menu) => {
  Object.assign(menuArr, {
    id: 0,
    code: "",
    level: 0,
    name: "",
    pid: 0,
  });
  // console.log(row);
  // 重置数据
  menuArr.pid = row.id as number;
  menuArr.level = (row.level as number) + 1;
  menuDialogVisible.value = true;
};
// 添加菜单或修改菜单的确定回调函数
const addSave = async () => {
  console.log(menuArr);
  //发送请求
  const result = await reqAddOrupdateMenu(menuArr);
  if (result.code == 200) {
    //提示消息
    ElMessage({
      type: "success",
      message: menuArr.id ? "更新成功" : "添加成功",
    });
    //关闭dialog
    menuDialogVisible.value = false;
    //重新获取menu列表
    getHasPermission();
  } else {
    ElMessage({
      type: "error",
      message: menuArr.id ? "更新失败" : "添加失败",
    });
  }
};
// 更新menu的回调函数
const updateMenu = async (row: any) => {
  Object.assign(menuArr, row);
  menuDialogVisible.value = true;
};
// 关闭menu dialog的回调函数
const closeMenu = () => {
  Object.assign(menuArr, {
    name: "",
    code: "",
    pid: "",
    level: "",
  });
};
// 删除菜单按钮的回调函数
const removeMenu = async(row:any) => {
  const result = await reqRemoveMenu(row.id)
  if(result.code == 200){
    ElMessage({
      type:'success',
      message:'删除成功'
    })
    //重新获取menu
    getHasPermission()
  }else{
    ElMessage({
      type:'error',
      message:'删除失败'
    })
  }
}
onMounted(() => {
  getHasPermission();
});
</script>
<script lang="ts">
export default {
  name: "Permission",
};
</script>
<style scoped></style>
