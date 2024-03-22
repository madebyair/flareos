import { storeApp } from "../types/storeApp.ts"
import { invoke } from "@tauri-apps/api/core"
import axios from "axios"
import { emit, listen } from "@tauri-apps/api/event"

export const installing: string[] = []

export function isInstalling(uuid: string): boolean {
    return installing.includes(uuid)
}

export async function install(app: storeApp, user: string) {
    if (isInstalling(app.uuid)) return

    await axios.get("https://api.made-by-air.com/store/download?uuid=" + app.uuid)

    installing.push(app.uuid)
    console.log("Installing app", user)
    const icon = await invoke("download_icon", { icon: app.icon })

    if (app.source == "snap") {
        invoke("install_snap", { package: app.source_id })
        listen("install_complete__" + app.source_id, () => {
            console.log("install complete")
            emit("installed", app.uuid)
        })
    }

    console.log(icon)
}