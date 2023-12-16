//角色相关的ts类型

export interface ResponseData {
  code: number;
  message: string;
  ok: string;
}

//定义角色的ts类型

export interface Role {
  createTime?: string;
  id?: number|string;
  remark?: null;
  roleName: string;
  updateTime?: string;
}

//定义角色列表的类型
export type RoleList = Role[];

//定义获取角色列表返回的ts类型
export interface RoleInfoResponseData extends ResponseData {
  data: {
    records: RoleList;
    total: number;
  };
}

//定义角色权限的对象ts类型
export interface MenuData {
  id: number|string;
  createTime?: string;
  updateTime?: string;
  pid: number|string;
  name: string;
  code: null;
  toCode: null;
  type: number;
  status: null;
  level: number;
  children: MenuList;
  select: boolean;
}

//定义子类型
export type MenuList = MenuData[];

//定义返回的角色权限的ts类型
export interface MenuRepsonseData extends ResponseData {
  data: MenuList;
}
