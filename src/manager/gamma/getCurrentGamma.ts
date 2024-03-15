import { invoke } from "@tauri-apps/api/core"

async function getCurrentGamma() {
    try {
        const r = await invoke<string>("get_current_gamma")
        const c = r.split(" ")

        let rt = ""

        c.forEach((key: string) => {
            if (key !== "\tGamma:" && key !== "") {
                rt = key
            }
        })

        return rt
    } catch (error) {
        console.error("Error while getting current gamma:", error)
        return null // or handle the error accordingly
    }
}

export default getCurrentGamma
