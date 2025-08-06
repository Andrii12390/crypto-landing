import { defineConfig } from 'vite'

export default defineConfig({
    base: '/crypto-landing/',
    build: {
        outDir: 'docs',
        emptyOutDir: true,
    }
})
