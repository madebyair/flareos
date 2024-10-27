import { register, unregisterAll } from "@tauri-apps/plugin-global-shortcut"
import { WebviewWindow } from "@tauri-apps/api/webviewWindow"
import { emit } from "@tauri-apps/api/event"

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

void register("Alt+S", (event) => {
    if (event.state == "Released") return

    void emit("launcher-event")
})

void register("Super+S", (event) => {
    if (event.state == "Released") return

    void emit("launcher-event")
})


