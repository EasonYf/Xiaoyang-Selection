//定义小仓库里面的数据类型
import type { RouteRecordRaw } from "vue-router"
//state数据中返回的类型
export interface UserState {
  token:string | null,
  menuRoutes:RouteRecordRaw[],
  username:string,
  avatar:string
}