//定义spu相关的数据类型

//所有请求返回的信息接口数据类型
export interface ResponseData {
  code: number;
  massage: string;
  ok: string;
}

//返回的spu数据的类型
export interface SpuData {
  id: number;
  spuName: string;
  description: string;
  category3Id: number;
  tmId: number;
  spuSaleAttrList: null;
  spuImageList: null;
  spuPosterList: null;
}

//数组：元素已有的spu数据数组
export type Records = SpuData[];

//定义获取已有spu请求接口返回的数据类型
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    orders: [];
    optimizeCountSql: boolean;
    hitCount: boolean;
    countId: null;
    maxLimit: null;
    searchCount: boolean;
    pages: number;
  };
}

//定义品牌相关的数据类型
export interface Trademark {
  id: number;
  logoUrl: string;
  tmName: string;
  createTime: string | null;
  updateTime: string | null;
}

//定义品牌数组的类型
export type TrademarkData = Trademark[];

//定义获取所有品牌请求的返回数据的类型
export interface AllTrademark extends ResponseData {
  data: TrademarkData[];
}

//商品图片的ts类型
export interface SpuImg {
  createTime: string;
  id: number;
  imgName: string;
  imgUrl: string;
  spuId: number;
  updateTime: string;
}
//已有SPU照片墙的数据类型
export interface SpuHasImg extends ResponseData {
  data: SpuImg[];
}
//定义销售属性的属性值的对象ts类型
export interface SaleAttrValue {
  baseSaleAttrId: number;
  createTime: null;
  id?: number;
  isChecked: null;
  saleAttrName: string;
  saleAttrValueName: string;
  spuId: number;
  updateTime: null;
}

//定义销售属性的属性值数组类型
export type spuSaleAttrValueList = SaleAttrValue[];

//定义某一个spu下销售属性的类型
export interface SaleAttr {
  baseSaleAttrId: number;
  createTime: null;
  updateTime: null;
  id?: Number;
  saleAttrName: string;
  spuId: number;
  spuSaleAttrValueList: spuSaleAttrValueList;
}
//定义获取销售属性请求的返回值数据ts类型
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[];
}

//定义销售属性对象的ts类型
export interface HasSaleAttr {
  id: number;
  name: string;
}

//定义请求销售属性对象的返回数据类型
export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[];
}
