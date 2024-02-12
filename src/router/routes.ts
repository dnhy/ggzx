export default [
  {
    //登录
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登录', //菜单标题
    },
  },
  {
    //404
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
    },
  },
  {
    //404
    path: '/home',
    component: () => import('@/views/home/index.vue'),
    name: 'home',
    meta: {
      title: '首页',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]
