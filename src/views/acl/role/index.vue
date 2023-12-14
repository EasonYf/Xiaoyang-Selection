<template>
  <!-- 搜索区域 -->
  <el-card>
    <el-form class="form">
      <el-form-item label="角色名称"
        ><el-input placeholder="角色名称"  v-model="keyWord"></el-input
      ></el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="!keyWord" @click="seacrh" >搜索</el-button>
        <el-button @click="resetSearch">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <!-- 展示列表区域 -->
  <el-card style="margin: 20px 0">
    <!-- 添加角色按钮 -->
    <el-button type="primary" icon="Plus" @click="addRole">添加角色</el-button>
    <!-- 展示已有的角色表格 -->
    <el-table border style="margin: 20px 0" :data="roleList">
      <el-table-column
        type="index"
        label="#"
        align="center"
        width="80px"
      ></el-table-column>
      <el-table-column label="id" width="80px" prop="id"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="创建时间" prop="updateTime"></el-table-column>
      <el-table-column label="更新时间" prop="createTime"></el-table-column>
      <el-table-column label="操作" width="300px" align="center">
        <template #="{ row }">
          <el-button icon="User" type="primary" size="small"
            >分配权限</el-button
          >
          <el-button icon="Edit" type="primary" size="small" @click="updateRole(row)">编辑</el-button>
          <el-popconfirm
            title="确定要删除该角色吗?"
            @confirm="removeRole(row.id)"
          >
            <template #reference>
              <el-button icon="Delete" type="primary" size="small"
                >删除</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 15, 20]"
      :background="true"
      layout=" prev, pager, next, jumper,->, sizes,total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
  <!-- 新增角色的dialog -->
  <el-dialog
    v-model="dialogVisible"
    :title="roleInfo.id ? '更新用户' : '新增用户'"
    width="30%"
    @close="closeDialog"
  >
    <el-form :model="roleInfo" :rules="addRoleRule" ref="roleFormRef">
      <el-form-item label="角色名：" prop="roleName"
        ><el-input
          placeholder="请输入角色名"
          v-model="roleInfo.roleName"
        ></el-input
      ></el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addCancel">取消</el-button>
        <el-button type="primary" @click="addSave"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { reqRoleList, reqRemoveRole ,reqAddOrUpdateRole} from "@/api/acl/role/index";
import type { RoleInfoResponseData, RoleList, Role } from "@/api/acl/role/type";
import { ElMessage } from "element-plus";
//当前的页码
let pageNo = ref<number>(1);
//当前页显示条数
let pageSize = ref<number>(5);
//所有数据的总数
let total = ref<number>(0);
//角色信息
let roleInfo = ref<Role>({
  roleName: "",
});
//获取添加角色表单的组件实例
let roleFormRef = ref()
//控制新增角色的dialog
const dialogVisible = ref<boolean>(false);
//已有角色的数据列表
const roleList = ref<RoleList>([]);
// 添加角色的表单验证
const addRoleRule = ref({
  id:0,
  roleName: [
    { required: true, message: "Please input roleName", trigger: "blur" },
  ],
});
//当页码改变时的回调
const handleCurrentChange = (pager: number) => {
  pageNo.value = pager;
  getHasRoleList(pageNo.value);
};
//当显示条数改变时的回调
const handleSizeChange = () => {
  getHasRoleList();
};
//搜索功能相关数据定义
let keyWord = ref<string>('')

//搜索按钮的回调函数
const seacrh = () => {
  //调用获取用户列表方法
 getHasRoleList()
}
//搜索重置按钮的回调
const resetSearch = () => {
  //清空keyWord数据
  keyWord.value = ''
  getHasRoleList()
}

//获取角色列表的数据
const getHasRoleList = async (pager = 1) => {
  pageNo.value = pager;
  const result: RoleInfoResponseData = await reqRoleList(
    pageNo.value,
    pageSize.value,
    keyWord.value
  );
  console.log(result);

  if (result.code == 200) {
    roleList.value = result.data.records;
    total.value = result.data.total;
  }
};
//删除某个角色按钮的回调
const removeRole = async (id: number) => {
  const result = await reqRemoveRole(id);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    //重新获取角色数据
    getHasRoleList(pageNo.value);
  } else {
    ElMessage({
      type: "error",
      message: "删除失败",
    });
  }
};

//新增角色按钮的回调函数
const addRole = () => {
  //显示dialog
  dialogVisible.value = true;
};
//新增角色的保存按钮回调函数
const addSave = () => {
  roleFormRef.value.validate(async(val:boolean) => {
    // 如果表单验证没有通过
    if(!val) return
    //通过则发送添加角色的请求
    const result = await reqAddOrUpdateRole(roleInfo.value)
    if(result.code == 200){
      ElMessage({
        type:'success',
        message:roleInfo.value.id?'更新成功':'添加成功'
      })
      //关闭dialog
      dialogVisible.value = false
      //成功后重新获取角色页面
      getHasRoleList(1)
    }else{
      ElMessage({
        type:'error',
        message:roleInfo.value.id?'更新失败':'添加失败'
      })
    }
  })
};
// 关闭添加页面或者修改页面清空dialog的回调
const closeDialog = () => {
  // 重置表单验证
  roleFormRef.value.resetFields()
  // 清空roleInfo的数据
  Object.assign(roleInfo.value,{
    id:'',
    roleName:''
  })
}
//新增角色的取消按钮回调函数
const addCancel = () => {
  dialogVisible.value = false;
};

//更新角色按钮的回调
const updateRole = (row:Role) => {
  Object.assign(roleInfo.value,{
    id:row.id,
    roleName:row.roleName
  })
  dialogVisible.value = true
}
onMounted(() => {
  getHasRoleList();
});
</script>
<script lang="ts">
export default {
  name: "ROLES",
};
</script>
<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
