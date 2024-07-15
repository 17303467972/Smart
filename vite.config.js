import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueSetupExtend()
  ],
  server: {
    proxy: {
      // 选项写法
      '/api': {
        target: 'http://localhost:3000',  // 接口地址
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/\/api/, '')
        }
      },
    }
  }
})

