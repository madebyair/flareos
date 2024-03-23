import { storeApp } from "../types/storeApp.ts"
import { invoke } from "@tauri-apps/api/core"
import axios from "axios"
import { emit, listen } from "@tauri-apps/api/event"
import { UserApp } from "../types/app.ts"

export const installing: string[] = []
export const uninstalling: string[] = []

export function isInstalling(uuid: string): boolean {
    return installing.includes(uuid)
}

export function isUnInstalling(uuid: string): boolean {
    return uninstalling.includes(uuid)
}

export async function install(app: storeApp, user: string) : Promise<UserApp | null> {
    await axios.get("https://api.made-by-air.com/store/download?uuid=" + app.uuid)

    installing.push(app.uuid)
    console.log("Installing app", user)
    const icon = await invoke("download_icon", { icon: app.icon })

    if (app.source == "snap") {
        invoke("install_snap", { package: app.source_id })
        await listen("install_complete__" + app.source_id, () => {
            console.log("install complete")
            emit("installed", app.uuid)
        })
    } else if (app.source == "deb") {
        invoke("install_deb", { package: app.source_id })

        await listen("install_complete_deb", (r) => {
            if (r.payload == app.source_id) {
                console.log("install complete")
                emit("installed", app.uuid)
            }
        })
    }

    //const index = installing.indexOf(app.uuid)
    //installing.slice(index, 1)

    console.log(installing)

    return <UserApp>{
        name: app.name,
        description: app.description,
        exec: app.exec ? app.exec : "snap run " + app.source_id,
        icon: "icons://" + icon,
        source: app.source,
        source_id: app.source_id,
        version: app.latest_version,
        uuid: app.uuid,
        class: app.class
    }
}

export async function uninstall(app: storeApp){
    uninstalling.push(app.uuid)

    console.log("Uninstalling " + app.name)

    if (app.source == "snap") {
        invoke("uninstall_snap", { package: app.source_id })
        await listen("uninstall_complete__" + app.source_id, () => {
            console.log("uninstall complete")
            emit("uninstalled", app.uuid)
        })
    } else if (app.source == "deb") {
        // TODO implement deb uninstalling
        return null
    }

    //const index = uninstalling.indexOf(app.uuid)
    //uninstalling.splice(index, 1)

    console.log(uninstalling)

    return null
}