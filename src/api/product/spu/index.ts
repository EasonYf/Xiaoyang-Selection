//spu模块相关的请求接口定义
import request from "@/utlis/request";
//引入类型
import type {
  HasSpuResponseData,
  AllTrademark,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  SpuData,
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
  ALLSALEATTR_URL = "/admin/product/baseSaleAttrList",
  //添加一个spu
  ADDSPU_URL = "/admin/product/saveSpuInfo",
  //更新一个spu
  UPDATESPU_URL = "/admin/product/updateSpuInfo",
  //添加一个SKU
  ADDSKU_URL = "/admin/product/saveSkuInfo",
  //获取某个SPU下的所有SKU
  SKUINFO_URL = "/admin/product/findBySpuId/",
  //删除一个spu
  DELETESPU_URL = "/admin/product/deleteSpu/",
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
export const reqAllSaleAttr = () =>
  request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL);

//添加一个spu
//更新一个spu的共用接口
export const reqAddOrUpdateSpu = (data: SpuData) => {
  if (data.id) {
    //如果id存在即更新一个spu
    return request.post<any, any>(API.UPDATESPU_URL, data);
  } else {
    //如果不存在id即新增一个spu
    return request.post<any, any>(API.ADDSPU_URL, data);
  }
};

//添加一个sku的接口
export const reqAddSku = (data: any) => {
  return request.post<any, any>(API.ADDSKU_URL, data);
};

//获取某个SPU下的所有SKU
export const reqSkuInfoList = (spuId: number | string) => {
  return request.get<any, any>(API.SKUINFO_URL + spuId);
};
//删除某个SPU的请求接口
export const reqRemoveSpu = (spuId: number | string) => {
  return request.delete<any, any>(API.DELETESPU_URL + spuId);
};
