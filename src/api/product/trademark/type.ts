// 定义商品管理-品牌管理的相关类型

export interface ResponseData {
  code:number,
  message:string,
  ok:string
}

//已有品牌的数据类型

export interface Trademark {
  id?:number,
  tmName:string,
  logoUrl:string
}

//全部品牌的数据类型

export type Records = Trademark[]

//获取品牌的数据类型

export interface TrademarkResponseData extends ResponseData{
  data:{
    records:Records,
    total: number,
    size: number,
    current: number,
    orders: string[],
    optimizeCountSql: boolean,
    hitCount: boolean,
   
    searchCount: boolean,
    pages: number
  }
}