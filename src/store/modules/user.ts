// 引入 defineStore 用于创建 store
import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
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
  },
  // 状态
  state(): Userstate {
    return {
      token: localStorage.getItem('token'),
      menuRoutes: constantRoute,
    }
  },
  // 计算
  getters: {},
})
