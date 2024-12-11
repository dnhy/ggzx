import { defineStore } from 'pinia'
import { Canceler } from 'axios'
import type { RequestState } from './types/type'

export const useRequestStore = defineStore('request', {
  actions: {
    setCancelToken: function (c: Canceler) {
      this.cancelToken.push(c)
    },
    clearRequest: function () {
      this.cancelToken.forEach((f) => f())
    },
  },
  state(): RequestState {
    return {
      cancelToken: [],
    }
  },
  getters: {},
})
