import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useUserStore } from './store/modules/user'
import setting from './setting'

NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3,
})

//路由监听
router.beforeEach(async (to: any, from: any, next: any) => {
  var userStore = useUserStore()

  document.title = setting.title + '-' + to.meta.title
  NProgress.start()
  var token = userStore.token
  var username = userStore.username

  if (token) {
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      if (username) {
        next()
      } else {
        try {
          await userStore.getUserInfo()
          next()
        } catch (error) {
          //收集前端抛出的错误
          //token过期或用户手动修改token
          userStore.userLogout()
          next({
            path: '/login',
            query: {
              redirect: to.path,
            },
          })
        }
      }
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.path,
        },
      })
    }
  }
})

//路由跳转结束
router.afterEach(() => {
  NProgress.done()
})
