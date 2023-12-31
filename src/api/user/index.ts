//统一管理项目的用户相关的接口
import request from "@/utlis/request";
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from "./type";
//项目用户相关的请求地址

// enum API {
//   LOGIN_URL = "/user/login",

//   USERINFO_URL = "/user/info",

//   LOGOUT_URL = "/admin/acl/index/logout",
// }
enum API {
  LOGIN_URL = "/admin/acl/index/login",

  USERINFO_URL = "/admin/acl/index/info",

  LOGOUT_URL = "/admin/acl/index/logout",
}
//登录接口
export const reqLogin = (data: loginFormData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data);
//获取用户信息接口
export const reqUserInfo = () =>
  request.get<any, userInfoResponseData>(API.USERINFO_URL);
//用户退出登录接口
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL);
