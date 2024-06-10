import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'
import router from './router'
import './permission'
import { createPinia } from 'pinia'

//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import 'virtual:svg-icons-register'

import gloabalComponent from './components'

const app = createApp(App)

app.use(gloabalComponent)
app.use(router)
app.use(createPinia())

app
  .use(ElementPlus, {
    locale: zhCn,
  })
  .mount('#app')

//获取环境变量
console.log(import.meta.env)

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
