import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { visualizer } from 'rollup-plugin-visualizer'
import compression from 'vite-plugin-compression'

export default defineConfig({
  base: '/', // Оставить как есть
  build: {
    outDir: 'dist'
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      
      // Минимальная конфигурация манифеста
      manifest: {
        name: 'EduHub',
        short_name: 'EduHub',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/logo192.webp',
            sizes: '192x192',
            type: 'image/webp'
          },
          {
            src: '/logo512.webp',
            sizes: '512x512',
            type: 'image/webp'
          }
        ]
      },
      
      // Явное указание путей для кэширования
      workbox: {
        globPatterns: ['**/*.{js,css,html,json,ico,png,webp,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/[^/]+\/api\//,
            handler: 'NetworkFirst'
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst'
          }
        ]
      }
    }),
    visualizer({
      filename: './stats.html',
      open: false
    }),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      deleteOriginFile: false
    })
  ],
  
  // Настройки разрешения
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@utils': '/src/utils'
    }
  }
})