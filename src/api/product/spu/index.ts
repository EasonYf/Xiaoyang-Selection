//spu模块相关的请求接口定义
import request from "@/utlis/request";
//引入类型
import {
  HasSpuResponseData,
  AllTrademark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData
} from "./type";
enum API {
  //获取已有spu的数据
  SPU_URL = "/admin/product/",
  //获取全部品牌的数据
  ALLTRADEMARK_URL = "/admin/product/baseTrademark/getTrademarkList",
  //获取某个spu下的全部售卖商品的图片数据
  SPUIMAGE_URL = "/admin/product/spuImageList/",
  //获取某一个spu下全部已有的销售属性的数据
  SPUHASSALETTR_URL = "/admin/product/spuSaleAttrList/",
  //获取整个项目的销售属性的数据
  ALLSALEATTR_URL="/admin/product/baseSaleAttrList"
}

//获取spu列表数据的请求接口
export const reqSPUList = (
  page: number,
  limit: number,
  category3Id: string | number
) => {
  return request.get<any, HasSpuResponseData>(
    API.SPU_URL + `${page}/${limit}?category3Id=${category3Id}`
  );
};

//定义获取所有品牌数据的请求接口
export const reqAllTrademark = () =>
  request.get<any, AllTrademark>(API.ALLTRADEMARK_URL);

////定义获取某一个spu下的所有在售商品图片的请求接口
export const reqSpuImage = (spuId: number) =>
  request.get<any, SpuHasImg>(API.SPUIMAGE_URL + spuId);

//定义获取某一个spu下的所有销售属性的请求接口
export const reqSpuHasSaleAttList = (spuId: number) =>
  request.get<any, SaleAttrResponseData>(API.SPUHASSALETTR_URL + spuId);

//获取整个项目的销售属性的请求接口
export const reqAllSaleAttr = () => request.get<any,HasSaleAttrResponseData>(API.ALLSALEATTR_URL)