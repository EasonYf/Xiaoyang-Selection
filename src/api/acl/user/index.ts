//用户相关的请求接口

import request from "@/utlis/request";
import type { userData, userResponseData , RoleResponseData, RoleIdData} from "./type";
enum API {
  //获取管理用户分页列表
  GETUSERLIST_URL = "/admin/acl/user/",
  //删除某一个用户
  DELETEUSER_URL = "/admin/acl/user/remove/",
  //批量删除用户
  BATHDELETEUSER_URL = "/admin/acl/user/batchRemove",
  //新增一个用户
  ADDUSER_URL = "/admin/acl/user/save",
  //更新一个用户
  UPDATEUSER_URL = "/admin/acl/user/update",
  // 获取用户的数据
  USERROLE_URL="/admin/acl/user/toAssign/",
  //分配职位角色
  ASSIGNROLE_URL = "/admin/acl/user/doAssignRole"
}

//获取管理用户分页列表
export const reqUser = (page: number, limit: number) =>
  request.get<any, userResponseData>(API.GETUSERLIST_URL + `${page}/${limit}`);

//删除一个用户的请求接口
export const reqRemoveUser = (userId: number) =>
  request.delete<any, any>(API.DELETEUSER_URL + userId);

//批量删除多个用户的请求接口
export const reqBathRemoveUser = (idList:any) => request.delete(API.BATHDELETEUSER_URL,{data:idList})
//添加一个用户或更新一个用户
export const reqAddOrUpdateUser = (data: userData) => {
  if (data.id) {
    //如果存在id则需要更新用户
    return request.put<any, any>(API.UPDATEUSER_URL, data);
  } else {
    //不存在id需要新增用户
    return request.post<any, any>(API.ADDUSER_URL, data);
  }
};

//获取用户的角色数据的请求接口
export const reqUserRole = (adminId:number) => request.get<any,RoleResponseData>(API.USERROLE_URL + adminId) 

//分配角色的请求接口
export const reqAssignRole = (data:RoleIdData) => request.post<any,any>(API.ASSIGNROLE_URL,data)