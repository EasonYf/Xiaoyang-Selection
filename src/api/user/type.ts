//登录接口需要携带的数据类型
export interface loginForm {
  username: string;
  password: string;
}

interface dataType {
  message: string | undefined;
  token: string;
}

//获取用户信息接口返回数据类型

export interface loginResponseData {
  code: number;
  data: dataType;
}

interface userInfo {
  userId: number;
  avatar: string;
  username: string;
  password: string;
  desc: string;
  roles: string[];
  buttons: string[];
  routes: string[];
  token: string;
}


interface user {
  checkUser:userInfo
}

//定义从服务器返回用户相关信息的数据类型
export interface userResponseData {
  code:number,
  data:user
}