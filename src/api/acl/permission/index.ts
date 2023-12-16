//定义permission相关的请求接口
import request from "@/utlis/request";
import type { permissionResponseData, Menu } from "./type";
enum API {
  // 获取全部的permission数据
  ALLPERMISSION_URL = "/admin/acl/permission",
  // 新增菜单
  ADDMENU_URL = "/admin/acl/permission/save",
  // 更新菜单
  UPDATEMENU_URL = "/admin/acl/permission/update",
  // 删除某个菜单
  DELETEMENU_URL = "/admin/acl/permission/remove/",
}

//获取全部的permission数据列表的请求接口
export const reqAllPermissionList = () =>
  request.get<any, permissionResponseData>(API.ALLPERMISSION_URL);

//新增菜单或者修改菜单的请求接口
export const reqAddOrupdateMenu = (data: Menu) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEMENU_URL, data);
  } else {
    return request.post<any, any>(API.ADDMENU_URL, data);
  }
};

// 删除某个菜单的请求接口
export const reqRemoveMenu = (menuId: number) =>
  request.delete<any, any>(API.DELETEMENU_URL + menuId);
