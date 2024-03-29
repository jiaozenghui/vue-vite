import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
  ],
  css: {
    preprocessorOptions:{
      less: {
        javascriptEnabled: true,
        additionalData:  `@import "${resolve(__dirname, 'src/assets/styles/base.less')}";`
      }
    }
  },
  server:{
    proxy:{
      '/api': 'https://api.*.com/',
      '/wecmdb/api/v1': 'http://119.91.78.168:8090/',
      '/wecmdb/fonts': 'http://119.91.78.168:8090/',
      '/admin': 'http://frontendlife.cn/',
      '/v1/topos/': 'http://10.121.13.80/'
    }
  }
})
