//分类相关的ts数据类型

export interface ResponseData {
  code: number;
  message: string;
  ok: string;
}

//分类ts类型
export interface CategoryObj {
  id: number | string;
  name: string;
  category1Id?: number;
  category2Id?: number;
}

//相应的分类接口返回的ts数据类型
export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[];
}

//定义属性与属性值的类型

//属性值对象的ts类型
export interface AttrValue {
  id: number;
  valueName: string;
  attrId: number;
}

//存储每一个属性值的数组类型
export type AttrValueList = AttrValue[];

//属性的data的数据类型
export interface Attr {
  id: number;
  categoryId: number;
  categoryLevel: number;
  attrName: string;
  attrValueList: AttrValueList;
}

//获取属性与属性值请求接口的返回值类型
export interface AttResponseData extends ResponseData {
  data: Attr[];
}
