//路由鉴权：用于判断路由是否应该跳转，或者跳转到某个路由
import router from "./router";
// 引入进度条插件nprogress

import nprogress from "nprogress";
// 引入进度条的样式
import "nprogress/nprogress.css";
//前置路由守卫
// 引入仓库
import pinia from "./store";
import useUserStore from "./store/modules/user";
import setting from "./setting";
//引入setting

let userStore = useUserStore(pinia);

router.beforeEach(async (to, from, next) => {
  // to and from are both route objects. must call `next`.
  let token = userStore.token;
  let username = userStore.username;
  // 判断是否登录
  if (token) {
    //已经处于登录态
    if (to.path == "/login") {
      next({ path: "/" });
    } else {
      //如果每次切换路由时username存在（即用户基本信息存在），就不用发送userInfo请求
      if (username) {
        next();
      } else {
        //如果没有用户信息
        try {
          //发送获取用户信息请求
          await userStore.userInfo();
          next();
        } catch (error) {
          //token过期：获取不到用户信息
          //用户手动修改本地token
          //退出登录
          userStore.userLoginOut()
          next({path:'/login',query:{redirect:to.path}})
        }
      }
    }
  } else {
    //处于未登录态
    if (to.path == "/login") {
      next();
    } else {
      next({ path: "/login", query: { redirect: to.path } });
    }
  }
  nprogress.start();
});
//后置路由守卫

router.afterEach((to, from) => {
  //设置成功后的页面title
  document.title = `${setting.title}-${to.meta.title}`
  nprogress.done();
  // to and from are both route objects.
});
