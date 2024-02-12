//使用插件注册全局组件
import SvgIcon from './SvgIcon/index.vue'

import { App, Component } from 'vue'

const components: { [name: string]: Component } = { SvgIcon }
console.log('components :', components);

export default {
  install(app: App) {
    Object.keys(components).forEach((key) => {
      app.component(key, components[key])
    })
  },
}
