import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

let router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
