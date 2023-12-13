//用户管理相关的ts类型定义

export interface ResponseData {
  code: number;
  message: string;
  ok: string;
}

//用户对象的ts类型
export interface userData {
  createTime?: string;
  id?: string | number;
  name: string;
  password: string;
  phone?: null | string | number;
  roleName?: string;
  updateTime?: string;
  username: string;
}

//获取管理用户数据列表返回的ts类型
export interface userResponseData extends ResponseData {
  data: {
    total: number;
    records: userData[];
  };
}

//定义职位对象的ts类型
export interface roleData {
  createTime?: string;
  id: number;
  remark: null | string;
  roleName: string;
  updateTime?: string;
}
//定义职位角色列表的类型
export type RoleList = roleData[]

//定义获取用户职位角色请求的返回ts类型
export interface RoleResponseData extends ResponseData {
  data:{
    allRolesList:RoleList,
    assignRoles:RoleList
  }
}

//定义分配角色的ts类型
export interface RoleIdData {
  userId:number,
  roleIdList:number[]
}