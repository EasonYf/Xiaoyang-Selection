<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <!-- 登录表单 -->
        <el-form class="login_form" :model = "loginForm" :rules = "loginRule" ref="loginFormRef">
          <h1>Hello</h1>
          <h2>欢迎</h2>
          <el-form-item prop = "username">
            <el-input :prefix-icon ="User" v-model="loginForm.username" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item prop = "password">
            <el-input :prefix-icon ="Lock" v-model="loginForm.password" type="password" autocomplete="off" show-password />
          </el-form-item>
          <el-form-item>
            <el-button :loading = "loading" type="primary" @click = "Login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User,Lock} from '@element-plus/icons-vue'
import { reactive , ref} from 'vue';
import { useRouter , useRoute} from 'vue-router';
import useUserStore from '@/store/modules/user'
import { ElNotification } from 'element-plus'
import {getTime} from '@/utlis/getTime'

const loginForm = reactive({username:'admin',password:'atguigu123'})
let userStore = useUserStore();
//获取路由器对象
let $router = useRouter()
//获取路由对象
let $route = useRoute()
const redirect:any = $route.query.redirect
let loading = ref(false)
let loginFormRef = ref()
//用户登录
const Login = async() => {
  //先验证登陆表单数据是否符合
  await loginFormRef.value.validate()
  //点击登录出现loading加载效果
  loading.value = true
  try {
   
    //发送登录请求
    await userStore.userLogin(loginForm)
    //编程导航跳转路由
    //判断是否有之前的页面需要重定向
    $router.push({path:redirect || '/'})
    ElNotification({
      type:'success',
      message:'登录成功',
      title:`hello ${getTime()}`
    })
     //登录成功后加载效果取消
     loading.value = false
  } catch (error) {
   
    ElNotification({
      type:'error',
      message:(error as Error).message
    })
     //登陆失败后加载效果取消
     loading.value = false
  }
}
// 表单验证规则
const loginRule = {
  username:[
  { required: true, message: 'Please input username', trigger: 'blur' },
  { min: 3, max: 10, message: 'Length should be 3 to 10', trigger: 'blur' },
  ],
  password:[
  { required: true, message: 'Please input password', trigger: 'blur' },
  { min: 6, max: 18, message: 'Length should be 6 to 18', trigger: 'blur' },
  ]
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url(@/assets/images/background.jpg) no-repeat;
  background-size: cover;
  overflow: hidden;
  margin: 0;

  .login_form {
    width: 60%;
    border: 1px solid #ccc;
    box-shadow: 2px 3px 5px #ccc;
    border-radius: 10px;
    padding: 15px;
    position: relative;
    top: 100%;

    color: #fff;
    h1 {
      font-size: 40px;
      margin: 10px;
    }
    h2 {
      font-size: 26px;
      margin: 10px;
    }
    // .el-form-item {
    //   margin: 20px;
    // }
    .el-button {
      width: 100%;
    }
  }
}
</style>
