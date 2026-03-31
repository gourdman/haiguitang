import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            // 开发环境将 /api 转发到后端服务，避免浏览器跨域
            '/api': {
                target: process.env.VITE_BACKEND_URL || 'http://localhost:3001',
                changeOrigin: true,
            },
        },
    },
});
