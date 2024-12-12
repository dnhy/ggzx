import { createApp } from 'vue';
import '@/style.css';
import App from '@/App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/styles/index.scss';
import router from './router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { createPinia } from 'pinia';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import 'element-plus/theme-chalk/dark/css-vars.css';
import 'virtual:svg-icons-register';
import gloabalComponent from './components';
import './permission';

NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3,
});

const app = createApp(App);

app.use(gloabalComponent);
app.use(router);
app.use(createPinia());

app
  .use(ElementPlus, {
    locale: zhCn,
  })
  .mount('#app');

//获取环境变量
console.log('import.meta.env', import.meta.env);

//测试mock接口
// import axios from 'axios'

// axios({
//   url: '/api/user/login',
//   method: 'post',
//   data: {
//     username: 'admin',
//     password: '111111',
//   },
// })
//路由监听
router.beforeEach((to, from, next) => {
  NProgress.start();
  // routerHooks.clear_token()
  next();
});

//路由跳转结束
router.afterEach(() => {
  NProgress.done();
});
