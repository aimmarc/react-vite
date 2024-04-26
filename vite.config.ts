import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vitePluginForArco } from '@arco-plugins/vite-react';
import path from 'path';
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		vitePluginForArco(),
		viteMockServe({
			mockPath: './mock', // 设置模拟.ts 文件的存储文件夹
			localEnabled: true,
			supportTs: true,
			watchFiles: true, // 监视⽂件更改，并重新加载 mock 数据
			// eslint-disable-next-line no-useless-escape
			ignore: /^\_/,
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@components': path.resolve(__dirname, './src/components'),
			'@styles': path.resolve(__dirname, './src/styles'),
			'@utils': path.resolve(__dirname, './src/utils'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@common': path.resolve(__dirname, './src/common'),
			'@services': path.resolve(__dirname, './src/services'),
			'@router': path.resolve(__dirname, './src/router'),
		},
	},
	build: {
		sourcemap: true,
	},
});
