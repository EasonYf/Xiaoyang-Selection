import { createApp } from "vue";
import App from "@/App.vue";
import ElementPlus from "element-plus";
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "element-plus/dist/index.css";
//svg需要的配置代码
import "virtual:svg-icons-register";
import GloablComponent from "@/components/index";
//暗黑模式的样式
import "element-plus/theme-chalk/dark/css-vars.css";
//引入全局的样式
import "@/styles/index.scss";
import router from "./router";
import pinia from "./store";
// 引入路由鉴权
import "@/permission";
// 引入全局自定义指令-判断按钮权限

//引入pinia仓库
//引入router
const app = createApp(App);

//使用elementPlus组件库
//配置elementplus国际化为中国
app.use(ElementPlus, {
  locale: zhCn,
});
//使用pinia
app.use(pinia);
app.use(GloablComponent);
app.use(router);
import { isHasButton } from "@/direactive/has";
isHasButton(app);
app.mount("#app");
