//定义小仓库里面的数据类型
import type { RouteRecordRaw } from "vue-router";
import type { CategoryObj } from "@/api/product/attr/type";
//定义user 中 state数据中返回的类型
export interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
  username: string;
  avatar: string;
}

//定义catagory中的state数据类型
export interface categoryState {
  category1Arr: CategoryObj[];
  select_Category1_Id: string | number;
  category2Arr: CategoryObj[];
  select_Category2_Id: string | number;
  category3Arr: CategoryObj[];
  select_Category3_Id: string | number;
}
