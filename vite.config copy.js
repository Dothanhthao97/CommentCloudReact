console.log("✅ Config has been exported");

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import mkcert from 'vite-plugin-mkcert'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths';

const logPlugin = () => {
  return {
    name: 'log-plugin',
    configResolved() {
      console.log('Vite config đã được resolved');
    }
  };
};

export default defineConfig({
  plugins: [logPlugin(), react(), mkcert(), tailwindcss(), tsconfigPaths()],
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
    },    
    
  },
  server: {
  https: true,
  proxy: {
    '/api-social': {
      target: 'https://dpmclouddev.vuthao.com',
      changeOrigin: true,
      secure: false,
      cookieDomainRewrite: { '*': 'localhost' },
      cookiePathRewrite: { '/': '/' },
      rewrite: (path) => {
          console.log('Proxy rewrite path:', path);
          return path.replace(/^\/api-social/, '');
        }
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

