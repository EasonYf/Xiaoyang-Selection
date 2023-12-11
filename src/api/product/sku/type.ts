//sku业务相关的数据类型

export interface ResponseData {
  code: number;
  message: string;
  ok: string;
}

//SKU对象的ts类型
export interface SkuData {
  category3Id?: string | number;
  id?: number | string;
  isSale?: number | string;
  price?: number;
  skuAttrValueList?: skuAttr[];
  skuDefaultImg?: string;
  skuDesc?: string;
  skuName?: string;
  skuImageList?: skuImg[];
  skuSaleAttrValueList?: saleAttr[];
  spuId?: number | string;
  tmId?: number | string;
  weight?: number;
}
//sku相关图片的ts类型
export interface skuImg {
  id:number;
  imgName: string;
  imgUrl: string;
}

//sku相关的销售属性值对象的ts类型
export interface saleAttr {
  id: number|string;
  saleAttrValueName:string;
}
//平台属性的ts类型
export interface skuAttr {
  attrId: string | number;
  valueId: string | number;
  valueName:string;
  id:number;
  attrName:string;
}
//销售属性的ts类型
export interface skuSale {}

//获取已有的SKU的数据的返回ts类型
export interface SkuDataResponseData extends ResponseData {
  data: {
    records: SkuData[];
    total: number;
    size: number;
    current: number;
    orders: [];
    pages: number;
  };
}

//获取SKU的详情数据返回的ts类型
export interface SkuInfoResponseData extends ResponseData {
  data:SkuData[]
}