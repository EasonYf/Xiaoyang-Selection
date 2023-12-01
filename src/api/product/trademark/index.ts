// 定义商品管理-品牌管理的请求接口
import request from "@/utlis/request";
//引入数据类型
import {TrademarkResponseData} from './type'
enum API{
  TRADEMARK_URL = "/admin/product/baseTrademark/"
}

// 分页器数据请求的接口
export const reqHasTrademark = (page:number,limit:number) => request.get<any,TrademarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`)