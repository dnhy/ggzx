// 引入 defineStore 用于创建 store
import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user'
import type { loginResponseData, userResponseData, loginForm } from '@/api/type'
import { constantRoute } from '@/router/routes'
import type { Userstate } from './types/type'

// 定义并暴露一个 store
export const useUserStore = defineStore('User', {
  // 动作
  actions: {
    userLogin: async function (data: loginForm) {
      let res: loginResponseData = await reqLogin(data)
      if (res.code == '201') {
        return Promise.reject(new Error(res.data.message))
      } else if (res.code == '200') {
        this.token = res.data.token
        localStorage.setItem('token', res.data.token)
        return 'ok'
      }
    },
    async getUserInfo() {
      var res = await reqUserInfo()
      if (res.code == 200) {
        console.log('%c [ res ]-25', 'font-size:px;', res)
        this.username = res.data.checkUser.username
        this.avatar = res.data.checkUser.avatar
        return 'ok'
      } else {
        //收集后端抛出的错误
        return Promise.reject(new Error('Failed to get userInfo!'))
      }
    },
    userLogout() {
      this.username = ''
      this.avatar = ''
      this.token = ''
      localStorage.removeItem('token')
    },
  },
  // 状态
  state(): Userstate {
    return {
      token: localStorage.getItem('token'),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
    }
  },
  // 计算
  getters: {},
})
