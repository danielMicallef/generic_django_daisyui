import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    build: {
        outDir: './src/static/dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'src/static/src/main.js'),
            },
            output: {
                assetFileNames: 'assets/[name].[ext]',
                entryFileNames: 'assets/[name].js',
            },
        },
    },
    server: {
        port: 3000,
    },
});