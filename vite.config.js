import { defineConfig } from 'vite'

export default defineConfig({
    base: '/crypto-web/',
    build: {
        outDir: 'docs',
        emptyOutDir: true,
    }
})
