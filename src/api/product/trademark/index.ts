// 定义商品管理-品牌管理的请求接口
import request from "@/utlis/request";
//引入数据类型
import { TrademarkResponseData, Trademark } from "./type";
enum API {
  TRADEMARK_URL = "/admin/product/baseTrademark/",
  ADDTRADEMARK_URL = "/admin/product/baseTrademark/save",
  UPDATETRADEMARK_URL = "/admin/product/baseTrademark/update",
  DELETETRADEMARK_URL = "/admin/product/baseTrademark/remove/"
}

// 分页器数据请求的接口
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TrademarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`
  );

//新增品牌的请求接口
export const reqAddOrUpdateTrademark = (data: Trademark) => {
  if (data.id) {
    //如果id不为空，发送修改品牌请求
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data);
  } else {
    //如果品牌为空，发送新增品牌请求
    return request.post<any, any>(API.ADDTRADEMARK_URL, data);
  }
};

//删除某一品牌的请求接口
export const reqDeleteTrademark = (id:number) => request.delete<any,any>(API.DELETETRADEMARK_URL+`${id}`)
