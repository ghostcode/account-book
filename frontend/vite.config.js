import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "dashesOnly",
    },
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        // 当遇到 /api 路径时，将其转换成 target 的值
        target: "http://api.chennick.wang/api/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // 将 /api 重写为空
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // src 路径
      utils: path.resolve(__dirname, "src/utils"), // src 路径
    },
  },
});
