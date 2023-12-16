//角色相关的请求接口
import request from "@/utlis/request";
import type { MenuRepsonseData, RoleInfoResponseData } from "./type";
enum API {
  //获取角色分页列表数据
  ROLELIST_URL = "/admin/acl/role/",
  //更新某个角色
  UPDATEROLE_URL = "/admin/acl/role/update",
  //新增某个角色
  ADDROLE_URL = "/admin/acl/role/save",
  //删除某个角色
  DELETEROLE_URL = "/admin/acl/role/remove/",
  //获取全部的角色权限数据
  ASSIGNROLE_URL = "/admin/acl/permission/toAssign/",
  //给角色分配权限
  TODOASSIGNROLE_URL = "/admin/acl/permission/doAssign?",
}

//获取角色分页列表数据
export const reqRoleList = (page: number, limit: number, keyword: string) =>
  request.get<any, RoleInfoResponseData>(
    API.ROLELIST_URL + `${page}/${limit}?roleName=${keyword}`
  );

//新增某个角色或者修改某个角色的请求接口
export const reqAddOrUpdateRole = (data: any) => {
  if (data.id) {
    //如果有id可以操作修改
    return request.put<any, any>(API.UPDATEROLE_URL, data);
  } else {
    //如果没有id可以新增
    return request.post<any, any>(API.ADDROLE_URL, data);
  }
};

//删除某个角色的请求接口
export const reqRemoveRole = (roleId: number) =>
  request.delete<any, any>(API.DELETEROLE_URL + roleId);

//获取角色的全部权限信息的接口
export const reqRoleLimit = (roleId: number) =>
  request.get<any, MenuRepsonseData>(API.ASSIGNROLE_URL + roleId);

//给角色分配权限的请求接口
export const reqAssignRole = (roleId: number, permissionId: number[]) =>
  request.post<any, any>(
    API.TODOASSIGNROLE_URL + `roleId=${roleId}&permissionId=${permissionId}`
  );
