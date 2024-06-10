//登录接口需要携带的参数类型
export interface loginForm {
  username: string
  password: string
}

interface datatype {
  token: string
}

export interface loginResponseData {
  code: number
  data: datatype
}

interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}

interface user {
  checkUser: userInfo
}

//用户信息数据类型
export interface userResponseData {
  code: number
  data: user
}
