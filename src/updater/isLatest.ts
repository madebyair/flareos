import { invoke } from "@tauri-apps/api/core"

export default async function isLatest() {
    const platform = await invoke("get_platform")

    console.log(platform)
    console.log(canInstallVersion("1.0.0", "2.0.21"))
}

function canInstallVersion(userVersion: string, targetVersion: string): boolean {
    const userVersionNumbers = userVersion.split(".").map(Number)
    const targetVersionNumbers = targetVersion.split(".").map(Number)

    if (userVersionNumbers[0] !== targetVersionNumbers[0] || userVersionNumbers[1] !== targetVersionNumbers[1]) {
        return false
    }

    return userVersionNumbers[2] <= targetVersionNumbers[2]
}
