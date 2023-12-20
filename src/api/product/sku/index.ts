//SKU管理业务相关的所有ts和请求定义
import request from "@/utlis/request";

import type { SkuDataResponseData } from "./type";
enum API {
  //获取已有的所有SKU数据(分页器获取数据的请求接口)
  SKUINFOLIST_URL = "/admin/product/list/",
  //删除某一个sku
  DELETESKUINFO_URL = "/admin/product/deleteSku/",
  //上架一个sku商品
  ONSALE_URL = "/admin/product/onSale/",
  //下架一个sku商品
  CANCELSALE_URL = "/admin/product/cancelSale/",
  //获取SKU详情数据
  GETSKUINFO_URL = "/admin/product/getSkuInfo/",
}

//获取已有的所有SKU数据的请求接口
export const reqSkuInfoList = (page: number, limit: number) => {
  return request.get<any, SkuDataResponseData>(
    API.SKUINFOLIST_URL + `${page}/${limit}`
  );
};

//删除某一个SKU的请求接口
export const reqRemoveSkuInfo = (skuId: number) =>
  request.delete<any, any>(API.DELETESKUINFO_URL + skuId);

//上架sku的请求接口
export const reqOnSaleSku = (skuId: number) =>
  request.get<any, any>(API.ONSALE_URL + skuId);

//下架sku的请求接口
export const reqCancelSaleSku = (skuId: number) =>
  request.get<any, any>(API.CANCELSALE_URL + skuId);

//获取sku详情数据的请求接口
export const reqGetSkuInfo = (skuId: number) =>
  request.get<any, any>(API.GETSKUINFO_URL + skuId);
