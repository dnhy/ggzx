//登录接口需要携带的参数类型
export interface loginForm {
  username: string;
  password: string;
}

export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface loginResponseData extends ResponseData {
  data: string;
}

export interface userInfoResponseData extends ResponseData {
  data: {
    routes: string[];
    buttons: string[];
    roles: string[];
    name: string;
    avatar: string;
  };
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
  checkUser: userInfo;
}

//用户信息数据类型
export interface userResponseData {
  code: number;
  data: user;
}
