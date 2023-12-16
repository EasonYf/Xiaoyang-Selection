//定义permission相关的ts类型

export interface ResponseData {
  code: number;
  message: string;
  ok: string;
}

//定义permission的对象ts类型
export interface Permission {
  id: number | string;
  createTime?: string;
  updateTime?: string;
  pid: number;
  name: string;
  code: string;
  toCode: string;
  type: number;
  status: null;
  level: number | string;
  children?: PermissionList;
  select: boolean;
}

export type PermissionList = Permission[];

//定义请求返回的ts类型
export interface permissionResponseData extends ResponseData {
  data: PermissionList;
}

// 定义菜单对象的ts类型
export interface Menu {
  code: string | string;
  id?: number | string;
  level: number | string;
  name: string;
  pid: number | string;
}
