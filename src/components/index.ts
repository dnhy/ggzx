//使用插件注册全局组件
import SvgIcon from './SvgIcon/index.vue'
import { App, Component } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const components: { [name: string]: Component } = { SvgIcon }

export default {
  install(app: App) {
    Object.keys(components).forEach((key) => {
      app.component(key, components[key])
    })

    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
