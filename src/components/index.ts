//引入项目中的全局组件
import SvgIcon from "./SvgIcon/index.vue";
//引入全局的elements-plus Icon
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
//全局对象
const allGloablComponent = { SvgIcon };

//对外暴露插件对象
// console.log(allGloablComponent);

export default {
  //务必使用install
  install(app: any) {
    //注册项目全部的全局组件
    Object.keys(allGloablComponent).forEach((key) => {
      //@ts-ignore
      app.component(key, allGloablComponent[key]);
    });
    //将element-plus图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
