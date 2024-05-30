import { useEffect, useState } from "react"
import { invoke } from "@tauri-apps/api/core"

export default function useActiveWindow() {
    const [activeWindow, setActiveWindow] = useState("")

    useEffect(() => {
        const interval = setInterval(() => {
            invoke<string>("get_active_window").then((r) => {
                setActiveWindow(r.replace(/\s/g, ""))
            })
        }, 100)

        return () => {
            clearInterval(interval)
        }

    }, [])

    return activeWindow
}