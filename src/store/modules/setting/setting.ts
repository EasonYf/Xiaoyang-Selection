//这是Layout的小仓库

import { defineStore } from "pinia";

let useLayOutSettingStore = defineStore('SettingStore',{
  state(){
    return {
      fold:false, //用于控制菜单是否折叠 类型为布尔值
      refresh:false,//用于控制main是否刷新
    }
  }
})

export default useLayOutSettingStore