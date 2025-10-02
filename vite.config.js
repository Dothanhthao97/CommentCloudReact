import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import mkcert from 'vite-plugin-mkcert'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), mkcert(), tailwindcss()],
  build: {
    // lib: {
    //   entry: 'src/index.js',
    //   name: 'MyReactLib',
    //   fileName: (format) => `my-react-lib.${format}.js`
    // },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  },
  server: {
    https: true,
    proxy: {
      '/api-social': {
        target: 'https://dpmclouduat.vuthao.com',
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: {
          'fniduat.vuthao.com': 'localhost',
          'dpmclouduat.vuthao.com': 'localhost',
          '.vuthao.com': 'localhost'
        },
        cookiePathRewrite: { '/': '/' },
        rewrite: p => p.replace(/^\/api-social/, ''),
      }
    }
  },
  define: {
    'global': 'window',
  },
  resolve: {
    alias: {
      timers: 'node-libs-browser/mock/timers',
    },
  },
  base: process.env.NODE_ENV !== 'development' ? '/_layouts/15/WorkflowReact' : '/',
});
