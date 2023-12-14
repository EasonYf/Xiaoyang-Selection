//角色相关的ts类型

export interface ResponseData {
  code: number;
  message: string;
  ok: string;
}

//定义角色的ts类型

export interface Role {
  createTime?: string;
  id?:number;
  remark?:null;
  roleName:string;
  updateTime?:string
}

//定义角色列表的类型
export type RoleList = Role[]

//定义获取角色列表返回的ts类型
export interface RoleInfoResponseData extends ResponseData{
  data:{
    records:RoleList;
    total:number
  }
}
