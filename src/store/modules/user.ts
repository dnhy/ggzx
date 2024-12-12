// 引入 defineStore 用于创建 store
import { defineStore } from 'pinia';
import { reqLogin, reqLogOut, reqUserInfo } from '@/api/user';
import { constantRoute } from '@/router/routes';
import type { Userstate } from './types/type';
import type {
  loginForm,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type';

// 定义并暴露一个 store
export const useUserStore = defineStore('User', {
  // 动作
  actions: {
    userLogin: async function (data: loginForm) {
      const res: loginResponseData = await reqLogin(data);
      if (res.code == 201) {
        return Promise.reject(new Error(res.message));
      } else if (res.code == 200) {
        this.token = res.data;
        localStorage.setItem('token', res.data);
        return 'ok';
      }
    },
    async getUserInfo() {
      var res: userInfoResponseData = await reqUserInfo();
      if (res.code == 200) {
        this.username = res.data.name;
        this.avatar = res.data.avatar;
        return 'ok';
      } else {
        //收集后端抛出的错误
        return Promise.reject(new Error(res.message));
      }
    },
    async userLogout() {
      var res: any = await reqLogOut();
      if (res.code == 200) {
        this.username = '';
        this.avatar = '';
        this.token = '';
        localStorage.removeItem('token');

        return 'ok';
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
  },
  // 状态
  state(): Userstate {
    return {
      token: localStorage.getItem('token'),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
    };
  },
  // 计算
  getters: {},
});
