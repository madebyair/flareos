import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST

// https://vitejs.dev/config/
export default defineConfig(async () => ({
    plugins: [react()],

    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    //
    // 1. prevent vite from obscuring rust errors
    clearScreen: false,
    // 2. tauri expects a fixed port, fail if that port is not available
    server: {
        port: 1420,
        strictPort: true,
        host: host || false,
        hmr: host
            ? {
                protocol: "ws",
                host,
                port: 1421,
            }
            : undefined,
        watch: {
            // 3. tell vite to ignore watching `src-tauri`
            ignored: ["**/src-tauri/**"],
        },
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                start: resolve(__dirname, "start.html"),
                terminal: resolve(__dirname, "terminal.html"),
                settings: resolve(__dirname, "settings.html"),
                files: resolve(__dirname, "files.html"),
                actions: resolve(__dirname, "actions.html"),
                store: resolve(__dirname, "store.html"),
                widgets: resolve(__dirname, "widgets.html"),
                discover: resolve(__dirname, "discover.html"),
                calculator: resolve(__dirname, "calculator.html"),
                launcher: resolve(__dirname, "launcher.html")
            },
        },
    },
}))
