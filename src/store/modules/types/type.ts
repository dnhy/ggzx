import type { RouteRecordRaw } from 'vue-router'
import { Canceler } from 'axios'

export interface Userstate {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
}

export interface RequestState {
  cancelToken: Canceler[]
}
