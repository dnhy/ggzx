import type { RouteRecordRaw } from 'vue-router'
export interface Userstate {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
}
