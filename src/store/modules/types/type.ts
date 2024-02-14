import type { RouteRecordRaw } from 'vue-router'
export interface Userstate {
  token: string | null
  menuRoutes: RouteRecordRaw[]
}
