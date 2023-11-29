import { defineStore } from "pinia";
import type { loginForm, loginResponseData } from "@/api/user/type.ts";
import { reqLogin, reqUserInfo } from "@/api/user";
import { GET_TOKEN, SET_TOKEN, CLEAR_TOKEN } from "@/utlis/token";
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
    };
  },

  //异步|逻辑
  actions: {
    //发送登录请求
    async userLogin(data: loginForm) {
      const result: loginResponseData = await reqLogin(data);

      if (result.code == 200) {
        //本地存储持久化一份 存储token
        this.token = result.data.token
        SET_TOKEN(result.data.token);
        return "ok";
      } else {
        return Promise.reject(new Error(result.data.message));
      }
    },

    //获取用户信息
    async userInfo() {
      let result = await reqUserInfo();
      if (result.code == 200) {
        this.username = result.data.checkUser.username;
        this.avatar = result.data.checkUser.avatar;
        return 'ok';
      }
      else {
        return Promise.reject('获取用户信息失败')
      }
    },
    //退出登录
    userLoginOut() {
      this.token = "";
      this.username = "";
      this.avatar = "";
      CLEAR_TOKEN();
    },
  },
  //读取数据
  getters: {},
});

export default useUserStore;
