//定义关于属性管理的所有请求接口

import request from "@/utlis/request";
//引入类型
import { CategoryResponseData , AttResponseData} from "./type";
enum API {
  CT1_URL = "/admin/product/getCategory1",
  CT2_URL = "/admin/product/getCategory2/",
  CT3_URL = "/admin/product/getCategory3/",
  ATTRINFOLIST_URL = "/admin/product/attrInfoList/",
}

//获取一级分类的请求接口
export const reqC1 = () => request.get<any, CategoryResponseData>(API.CT1_URL);

//获取二级分类的请求接口
export const reqC2 = (category1: number | string) =>
  request.get<any, CategoryResponseData>(API.CT2_URL + category1);

//获取三级分类的请求接口
export const reqC3 = (category2: number | string) =>
  request.get<any, CategoryResponseData>(API.CT3_URL + category2);

//获取属性与属性值的请求接口
export const reqAttrInfoList = (
  category1: number | string,
  category2: number | string,
  category3: number | string
) => request.get<any, AttResponseData>(API.ATTRINFOLIST_URL + `${category1}/${category2}/${category3}`);
