import { invoke } from "@tauri-apps/api/core"

const onLoginHook = (unixUser: string) => {
    console.log("Logging user ", unixUser)
    void invoke("run_pipewire", {name: unixUser})
}

const onLogoutHook = (unixUser: string) => {
    console.log("Logging user ", unixUser)
    void invoke("stop_pipewire", {name: unixUser})
}

export { onLoginHook, onLogoutHook }