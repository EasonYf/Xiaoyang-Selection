//关于category的小仓库

import { defineStore } from "pinia";
//引入相关的请求方法
import { reqC1 , reqC2 , reqC3} from "@/api/product/attr/index";
//引入相关的数据类型
import type{ CategoryResponseData } from '@/api/product/attr/type'
import type {categoryState} from '../types/type'
const useCategoryStore = defineStore("Category", {
  state():categoryState {
    return {
      //获取的一级分类列表
      category1Arr: [],
      //选取的一级分裂id
      select_Category1_Id:'',
      //获取的二级分类列表
      category2Arr:[],
      //选取的二级分类id
      select_Category2_Id:'',
      //获取的三级分类列表
      category3Arr:[],
      //选取的三级分类id
      select_Category3_Id:'',
    };
  },
  actions: {
    //获取一级分类的方法
    async getCategory1() {
      //调用接口
      const result:CategoryResponseData = await reqC1();
      if (result.code == 200) {
        this.category1Arr = result.data;
      }
    },

    //获取二级分类的方法
    async getCategory2(){
      const result:CategoryResponseData = await reqC2((this.select_Category1_Id as number))
      if(result.code == 200)
      {
        this.category2Arr = result.data
      }
    },

    //获取三级分类的方法
    async getCategory3(){
      const result = await reqC3(this.select_Category2_Id as number)
      if(result.code == 200){
        this.category3Arr = result.data
      }
    }
  },
  getters: {},
});

export default useCategoryStore;
