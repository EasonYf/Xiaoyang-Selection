import useUserStore from "@/store/modules/user";
import axios from "axios";
import { ElMessage } from "element-plus";

//创建axios实例

const request = axios.create({
  //基地址
  baseURL: import.meta.env.VITE_APP_BASE_API,
  //请求限制事件，超过这个时间请求失败
  timeout: 5000,
});

//请求拦截器
request.interceptors.request.use((config) => {
  //登录成功后将获取的token值加到请求头中，获取用户信息
  let userStore = useUserStore()
  if(userStore.token){
    config.headers.token = userStore.token
  }
  return config;
});

//响应拦截器
request.interceptors.response.use(
  (response) => {
    //简化Axios的数据
    return response.data;
  },
  (error) => {
    //处理网络错误
    let msg = "";
    //返回的http状态码
    let status = error.response.status;

    switch (status) {
      case 401:
        msg = "TOKEN过期";
        break;
      case 403:
        msg = "无效权限";
        break;
      case 404:
        msg = "请求地址错误";
        break;
      case 500:
        msg = "服务器出现问题";
        break;
      default:
        msg = "无网络";
    }

    ElMessage({
      type: error,
      message: msg,
    });
    return Promise.reject(error);
  }
);

export default request;
