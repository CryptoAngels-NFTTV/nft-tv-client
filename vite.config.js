import react from '@vitejs/plugin-react'

const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env

export default {
    plugins:
        [
            react()
        ],
    root: 'src/',
    publicDir: "../public/",
    base: './',
    server:
    {
        open: !isCodeSandbox, // Open if it's not a CodeSandbox
        host: '0.0.0.0',
        watch: {
            usePolling: true
        }
    },
    build:
    {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true
    }
}