import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,        // 이미 사용 중인 포트
    proxy: {
      // '/api' 로 시작하는 요청을 http://localhost:3000 으로 포워딩
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})