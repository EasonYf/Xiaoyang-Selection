import { defineStore } from "pinia";
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user";
import { GET_TOKEN, SET_TOKEN, CLEAR_TOKEN } from "@/utlis/token";
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from "@/api/user/type";
import { UserState } from "./types/type";
import { constantRoute } from "../../router/routes";
//创建user仓库
let useUserStore = defineStore("user", {
  //user所用到的数据
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      //用户唯一的token值
      menuRoutes: constantRoute,
      username: "", //用户名称
      avatar: "", //用户的头像
      roles:[]
    };
  },

  //异步|逻辑
  actions: {
    //发送登录请求
    async userLogin(data: loginFormData) {
      const result: loginResponseData = await reqLogin(data);
      if (result.code == 200) {
        //本地存储持久化一份 存储token
        console.log('这是user信息',result);
        //mock登录时
        // this.token = result.data.token
        this.token = result.data as string;
        SET_TOKEN(result.data as string);
        return "ok";
      } else {
        return Promise.reject(new Error(result.data));
      }
    },

    //获取用户信息
    async userInfo() {
      let result: userInfoResponseData = await reqUserInfo();
      // console.log('用户信息',result);

      if (result.code == 200) {
        this.username = result.data.name;
        this.avatar = result.data.avatar;
        this.roles = result.data.roles
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    //退出登录
    async userLoginOut() {
      //发送退出登录请求
      const result: any = await reqLogout();
      if (result.code == 200) {
        this.token = "";
        this.username = "";
        this.avatar = "";
        this.roles = []
        CLEAR_TOKEN();
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
  },
  //读取数据
  getters: {},
});

export default useUserStore;
