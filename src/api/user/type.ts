//定义用户相关数据的ts类型

//定义登录和获取用户信息请求的数据类型
export interface loginFormData {
  username: string;
  password: string;
}

//定义响应体的数据类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

//定义登录接口返回的数据类型
export interface loginResponseData extends ResponseData{
  data:string
}

//定义用户信息接口返回的数据类型
export interface userInfoResponseData extends ResponseData {
  data:{
    routes:string[],
    buttons:string[],
    roles:string[],
    name:string,
    avatar:string
  }
}