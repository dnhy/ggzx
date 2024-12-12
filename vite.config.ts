import { ConfigEnv, UserConfigExport, defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';
import { viteMockServe } from 'vite-plugin-mock';
import DefineOptions from 'unplugin-vue-define-options/vite';
import vueSetupExtend from 'unplugin-vue-setup-extend-plus/vite';

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//     createSvgIconsPlugin({
//       // Specify the icon folder to be cached
//       iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
//       // Specify symbolId format
//       symbolId: 'icon-[dir]-[name]',
//     }),
//   ],
//   resolve: {
//     alias: {
//       '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
//     },
//   },
//   css: {
//     preprocessorOptions: {
//       scss: {
//         javascriptEnabled: true,
//         additionalData: '@import "./src/styles/variable.scss";',
//       },
//     },
//   },
// })

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  let env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      DefineOptions(),
      vueSetupExtend({
        enableAutoExpose: true,
      }),
      viteMockServe({
        enable: command === 'serve',
      }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    //配置跨域服务器
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
};
