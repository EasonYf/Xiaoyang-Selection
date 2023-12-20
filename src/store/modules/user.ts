import { defineStore } from "pinia";
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user";
import { GET_TOKEN, SET_TOKEN, CLEAR_TOKEN } from "@/utlis/token";
import { constantRoute, anyRoute, asyncRoute } from "@/router/routes";
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from "@/api/user/type";
import { UserState } from "./types/type";
import router from "@/router";
//引入深拷贝方法
//@ts-expect-error
import cloneDeep from "lodash/cloneDeep";
// 筛选菜单路由方法
function filterAsyncRoute(asyncRoute: any, routes: any) {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes);
      }
      return true;
    }
  });
}
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
      roles: [],
      buttons: [],
    };
  },

  //异步|逻辑
  actions: {
    //发送登录请求
    async userLogin(data: loginFormData) {
      const result: loginResponseData = await reqLogin(data);
      if (result.code == 200) {
        //本地存储持久化一份 存储token
        // console.log('这是user信息',result);
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
        this.roles = result.data.roles;
        this.buttons = result.data.buttons;
        // 设置菜单路由
        let userAsyncRoute = filterAsyncRoute(
          cloneDeep(asyncRoute),
          result.data.routes
        );
        // 更新菜单路由
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute];
        // console.log(this.menuRoutes);

        // 注册异步路由
        [...userAsyncRoute, anyRoute].forEach((item: any) => {
          router.addRoute(item);
        });
        // console.log(router.getRoutes());
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
        this.roles = [];
        CLEAR_TOKEN();
        // 清空注册的所有异步路由
        let hasRoute = router.getRoutes();
        let constantRouteName = [
          "Login",
          "layout",
          "Home",
          "Screen",
          "404",
          "Any",
        ];

        hasRoute.forEach((item: any) => {
          if (!constantRouteName.includes(item.name)) {
            router.removeRoute(item.name);
          }
        });
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
