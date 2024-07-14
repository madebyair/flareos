import { register, unregisterAll } from "@tauri-apps/plugin-global-shortcut"
import { WebviewWindow } from "@tauri-apps/api/webviewWindow"

void unregisterAll()

void register("Super+S", () => {
    new WebviewWindow("settings", {
        url: "settings.html",
        title: "Settings",
        minWidth: 800,
        minHeight: 600,
        visible: false
    })
})
