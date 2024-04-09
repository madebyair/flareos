import { invoke } from "@tauri-apps/api/core"
import axios, { AxiosResponse } from "axios"
import packageJson from "../../package.json"

type Response = {
    status: string,
    patches: Version[]
}

type Version = {
    download: string,
    beta: string,
    public: string,
    platform: string,
    released: string,
    version: string
}

export default async function isLatest() {
    const platform = await invoke("get_platform")
    const response : AxiosResponse<Response> = await axios.get("https://api.made-by-air.com/updates/" + platform + "/patches")
    // @ts-ignore
    const versions = response.data.patches.sort((a, b) => new Date(a.released) - new Date(b.released))
    let version : Version | null = null

    versions.forEach((key: Version) => {
        if (key.beta == "false" && key.public == "true" && canInstallVersion(packageJson.version, key.version)) {
            version = key
        }
    })

    console.log(version)
}

function canInstallVersion(userVersion: string, targetVersion: string): boolean {
    const userVersionNumbers = userVersion.split(".").map(Number)
    const targetVersionNumbers = targetVersion.split(".").map(Number)

    if (userVersionNumbers[0] !== targetVersionNumbers[0] || userVersionNumbers[1] !== targetVersionNumbers[1]) {
        return false
    }

    return userVersionNumbers[2] <= targetVersionNumbers[2]
}
