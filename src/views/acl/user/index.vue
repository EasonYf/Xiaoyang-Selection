<template>
  <div>
    <!-- 搜索组件 -->
    <el-card>
      <el-form inline class="form">
        <el-form-item label="用户名:"
          ><el-input placeholder="请输入用户名" v-model="keyWord"></el-input
        ></el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="!keyWord" @click="seacrh">搜索</el-button>
          <el-button @click="resetSearch" >重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 用户数据展示 -->
    <el-card style="margin: 20px 0">
      <el-button type="primary" @click="addUser">添加</el-button>
      <el-button
        type="danger"
        :disabled="!bathDeleteUserId.length"
        @click="bathRemoveUser"
        >批量删除</el-button
      >
      <el-table
        border
        style="margin: 20px 0"
        :data="userList"
        @selection-change="selectUserChange"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column
          type="index"
          label="#"
          align="center"
        ></el-table-column>
        <el-table-column label="id" prop="id" width="80px"></el-table-column>
        <el-table-column
          label="用户名字"
          prop="name"
          width="120px"
        ></el-table-column>
        <el-table-column
          label="用户名称"
          prop="username"
          width="120px"
        ></el-table-column>
        <el-table-column
          label="用户角色"
          prop="roleName"
          width="120px"
        ></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="更新时间" prop="updateTime"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template #="{ row }">
            <el-button
              type="primary"
              icon="User"
              size="small"
              @click="assignRole(row)"
              >分配角色</el-button
            >
            <el-button
              type="primary"
              icon="Edit"
              size="small"
              @click="updateUser(row)"
              >编辑</el-button
            >
            <el-popconfirm
              title="Are you sure to delete this?"
              @confirm="removeUser(row)"
            >
              <template #reference>
                <el-button type="primary" icon="Delete" size="small"
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
      <!-- 新增用户和修改用户的抽屉 -->
      <el-drawer v-model="drawer" @close="closeDrawer">
        <template #header>
          <h4>{{ userParams.id ? "修改用户" : "添加用户" }}</h4>
        </template>
        <template #default>
          <el-form :model="userParams" :rules="ruleForm" ref="formRef">
            <el-form-item label="用户名字" prop="name"
              ><el-input
                v-model="userParams.name"
                placeholder="请输入用户名字"
              ></el-input
            ></el-form-item>
            <el-form-item label="用户名称" prop="username"
              ><el-input
                v-model="userParams.username"
                placeholder="请输入用户名称"
              ></el-input
            ></el-form-item>
            <el-form-item
              label="用户密码"
              prop="password"
              v-if="userParams.id ? false : true"
              ><el-input
                v-model="userParams.password"
                type="password"
                placeholder="请输入密码"
              ></el-input
            ></el-form-item>
          </el-form>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="save">确定</el-button>
          </div>
        </template>
      </el-drawer>

      <!-- 分配角色的抽屉 -->
      <el-drawer v-model="drawer1">
        <template #header>
          <h4>分配角色</h4>
        </template>
        <template #default>
          <el-form>
            <el-form-item label="用户昵称"
              ><el-input disabled v-model="userParams.username"></el-input
            ></el-form-item>
            <el-form-item label="职业角色">
              <el-checkbox
                v-model="checkAll"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
                >全选</el-checkbox
              >
              <el-checkbox-group
                v-model="userRole"
                @change="handleCheckedRoleChange"
              >
                <el-checkbox
                  v-for="item in allRole"
                  :key="item.id"
                  :label="item"
                  >{{ item.roleName }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="roleCancel">取消</el-button>
            <el-button type="primary" @click="roleSave">确定</el-button>
          </div>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  reqUser,
  reqRemoveUser,
  reqAddOrUpdateUser,
  reqUserRole,
  reqAssignRole,
  reqBathRemoveUser
} from "@/api/acl/user";
import {
  userData,
  userResponseData,
  RoleList,
  RoleResponseData,
} from "@/api/acl/user/type";
import { ElMessage, ElMessageBox } from "element-plus";

//搜索功能相关数据定义
let keyWord = ref<string>('')

//搜索按钮的回调函数
const seacrh = () => {
  //调用获取用户列表方法
  getUserList()
}
//搜索重置按钮的回调
const resetSearch = () => {
  //清空keyWord数据
  keyWord.value = ''
  getUserList()
}
//分页器

//当前页码
let pageNo = ref<number>(1);
//当前页显示条数
let pageSize = ref<number>(5);
//数据的总数
let total = ref<number>(0);

//用户列表数组
let userList = ref<userData[]>([]);
//当显示条数发生改变时的回调
const handleSizeChange = () => {
  getUserList();
};
//当页码改变时发生的回调
const handleCurrentChange = (pager: number) => {
  pageNo.value = pager;
  getUserList(pager);
};

//添加和修改用户的抽屉
//控制抽屉显示
let drawer = ref<boolean>(false);
//获取抽屉的表单组件实例
let formRef = ref();
//控制职业角色是否全选
//记录批量删除用户的数组
let bathDeleteUserId = ref<number[]>([]);
//添加或修改用户的参数
let userParams = ref<userData>({
  name: "",
  password: "",
  username: "",
});
//获取管理用户分页列表
const getUserList = async (pager = 1) => {
  pageNo.value = pager;
  const result: userResponseData = await reqUser(pageNo.value, pageSize.value,keyWord.value);
  if (result.code == 200) {
    userList.value = result.data.records;
    total.value = result.data.total;
  }
};
//删除某一个用户的回调函数
const removeUser = async (row: any) => {
  const result = await reqRemoveUser(row.id as number);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    //成功后重新获取用户分页列表
    getUserList();
  } else {
    ElMessage({
      type: "error",
      message: "删除失败",
    });
  }
};

//新增用户的回调
const addUser = () => {
  drawer.value = true;
  //清空数据
  Object.assign(userParams.value, {
    id: 0,
    name: "",
    password: "",
    username: "",
  });
};
//更新用户的回调
const updateUser = (row: userData) => {
  drawer.value = true;
  //
  Object.assign(userParams.value, {
    id: row.id,
    name: row.name,
    username: row.username,
    password: row.password,
  });

  //清空上一次表单验证
};

//保存添加用户信息并发送请求的回调
const save = async () => {
  //表单验证
  await formRef.value.validate();
  //发送请求
  const result = await reqAddOrUpdateUser(userParams.value);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: userParams.value.id ? "更新成功" : "添加成功",
    });
    //关闭抽屉
    drawer.value = false;
    //重新获取用户列表分页
    getUserList(userParams.value.id ? pageNo.value : 1);
    //让浏览器自动刷新一次
    window.location.reload();
  } else {
    ElMessage({
      type: "error",
      message: userParams.value.id ? "更新失败" : "添加失败",
    });
  }
};
//添加或修改用户的表单验证
const ruleForm = ref({
  name: [
    { required: true, message: "Please input name", trigger: "blur" },
    { min: 3, max: 20, message: "Length should be 3 to 20", trigger: "blur" },
  ],
  username: [
    { required: true, message: "Please input username", trigger: "blur" },
    { min: 3, max: 20, message: "Length should be 3 to 20", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Please input Password", trigger: "blur" },
    { min: 6, max: 18, message: "Length should be 6 to 18", trigger: "blur" },
  ],
});

//关闭添加用户和修改用户drawer的回调
const closeDrawer = () => {
  //清空表单验证
  formRef.value.resetFields();
};
//取消的回调
const cancel = () => {
  drawer.value = false;
};

//分配角色的抽屉
//控制分配角色抽屉的显示
let drawer1 = ref<boolean>(false);
const checkAll = ref(false);
//全选的中间状态
const isIndeterminate = ref(true);
//所有的职位角色
const allRole = ref<RoleList>([]);
//用户已有的角色
const userRole = ref<RoleList>([]);
//分配角色按钮的回调
const assignRole = async (row: userData) => {
  Object.assign(userParams.value, row);
  //显示抽屉
  drawer1.value = true;
  //发送请求->获取职位角色
  const result: RoleResponseData = await reqUserRole(row.id as number);
  if (result.code == 200) {
    allRole.value = result.data.allRolesList;
    userRole.value = result.data.assignRoles;
  }
};

//当选中的角色发生改变时触发的回调
const handleCheckedRoleChange = (value: RoleList) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === allRole.value.length;
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRole.value.length;
};
//当全选按钮点击的回调
const handleCheckAllChange = (val: boolean) => {
  userRole.value = val ? allRole.value : [];
  isIndeterminate.value = false;
};
//职位角色分配的保存按钮的回调
const roleSave = async () => {
  //整理数据
  let data = {
    userId: userParams.value.id as number,
    roleIdList: userRole.value.map((item) => item.id),
  };
  //发送分配角色请求
  const result = await reqAssignRole(data);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "分配角色成功",
    });
    //关闭抽屉
    drawer1.value = false;
    //重新获取用户数据
    getUserList(pageNo.value);
  } else {
    ElMessage({
      type: "error",
      message: "分配角色失败",
    });
  }
};
//职位角色分配的取消按钮的回调
const roleCancel = () => {
  drawer1.value = false;
};

//当多选用户发生改变时的回调
const selectUserChange = (value: userData[]) => {
  //每次选择时将更新需要批量删除的用户id
  bathDeleteUserId.value = value.map((item) => item.id as number);
};

//批量删除用户按钮的点击回调
const bathRemoveUser = async () => {
  ElMessageBox.confirm(
    "确定要批量删除用户吗?",
    "Warning",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }
  )
    .then(async() => {
      //发送删除请求
      const result:any = await reqBathRemoveUser(bathDeleteUserId.value)
      
      if(result.code == 200){
        ElMessage({
          type:'success',
          message:'删除成功'
        })
        //删除成功后重新获取用户列表
        getUserList(pageNo.value)
      }
      else{
        ElMessage({
          type:'error',
          message:'删除失败'
        })
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
};
//当组件挂载时发送获取用户页面列表
onMounted(() => {
  getUserList();
});
</script>
<script lang="ts">
export default {
  name: "User",
};
</script>
<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
}
</style>
