import { invoke } from "@tauri-apps/api/core"

function setCurrentGamma(gamma : string) {
    void invoke("set_current_gamma", { gamma: gamma })
}

export default setCurrentGamma