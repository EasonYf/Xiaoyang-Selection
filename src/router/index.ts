//引入vue-router
import { createRouter, createWebHashHistory } from "vue-router";
import { constantRoute } from "./routes";
const router = createRouter({
  //路由模式
  history: createWebHashHistory(),
  routes: constantRoute,
  //滚动行为
  //@ts-ignore
  scrollBehavior (to, from, savedPosition) {
    return {
      left:0,
      top:0
    }
  }
});

export default router;
