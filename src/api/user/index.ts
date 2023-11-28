//统一管理项目的用户相关的接口
import request from "@/utlis/request";
import type { loginForm, loginResponseData, userResponseData } from "./type";
//项目用户相关的请求地址

enum API {
  LOGIN_URL = "/user/login",

  USERINFO_URL = "/user/info",

  LOGOUT_URL = "/admin/acl/index/logout",
}

//登录接口
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data);

//获取用户信息接口
export const reqUserInfo = () =>
  request.get<any, userResponseData>(API.USERINFO_URL);
