import { storeApp } from "../types/storeApp.ts"
import { invoke } from "@tauri-apps/api/core"

export const installing: string[] = []

export function isInstalling(uuid: string): boolean {
    return installing.includes(uuid)
}

export async function install(app: storeApp, user: string) {
    if (isInstalling(app.uuid)) return

    installing.push(app.uuid)
    console.log("Installing app", user)
    const icon = await invoke("download_icon", { icon: app.icon })

    console.log(icon)
}