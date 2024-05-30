import { useEffect, useState } from "react"
import { invoke } from "@tauri-apps/api/core"
import Window from "../../../types/window.ts"

type InvokeResponse = {
    windows: Array<Window>
}

export default function useWindows() {
    const [windows, setWindows] = useState<Window[]>([])

    useEffect(() => {
        const interval = setInterval(() => {
            invoke<string>("get_windows").then((r) => {
                const json : InvokeResponse = JSON.parse(r)

                const wins : Array<Window> = json.windows

                setWindows(wins)
            })
        }, 100)

        return () => {
            clearInterval(interval)
        }

    }, [])

    return windows
}