import { invoke } from "@tauri-apps/api/core"

export default async function isLatest() {
    const platform = await invoke("get_platform")

    console.log(platform)
}