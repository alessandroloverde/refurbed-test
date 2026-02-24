import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), eslintPlugin()],
  server: {
    proxy: {
      // Proxy Frankfurter API to avoid CORS and 522 from browser
      '/api/frankfurter': {
        target: 'https://api.frankfurter.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/frankfurter/, '/v1'),
      },
    },
  },
});
