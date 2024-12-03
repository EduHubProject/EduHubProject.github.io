import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import url from 'rollup-plugin-url';
import replace from '@rollup/plugin-replace';
import html from 'rollup-plugin-html';
export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    entryFileNames: 'bundle.js', 
    chunkFileNames: '[name]-[hash].js',
    format: 'esm',
    name: 'eduhubproject'
  },
  preserveEntrySignatures: true,
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: ['@babel/plugin-transform-runtime']
    }),
    resolve(),
    commonjs(),
    replace({
      'use client': '',
      preventAssignment: true,
    }),
    postcss({
      extract: true,
      minimize: true,
      sourceMap: true
    }),
   url({
     // Опции для плагина url
      limit: 10 * 1024, // Файлы меньше 10kb будут встроены как base64
      include: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp'], // Укажите форматы изображений
      emitFiles: true // Выводить файлы в выходной каталог
    }),
    html({
      template: 'public/index.html', // Убедитесь, что путь правильный
      filename: 'index.html', // Имя выходного файла
      inject: {
        injectTo: 'body', // Или 'head', в зависимости от того, где вы хотите вставить скрипты
        tags: [
          { tag: 'link', attrs: { rel: 'stylesheet', href: 'bundle.css' } },
          { tag: 'script', attrs: { src: 'bundle.js' } }
        ]
      }
    }),
  ]
};
