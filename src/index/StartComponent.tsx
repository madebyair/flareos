import "../assets/css/App.css"
import { useEffect } from "react"
import { listen } from "@tauri-apps/api/event"
import { getCurrent } from "@tauri-apps/api/window"

const StartComponent = () => {
    useEffect(() => {
        listen<boolean>("start-display-event", (display) => {
            if (!display.payload) {
                getCurrent().hide()
            } else {
                getCurrent().show()
            }
        })
    }, [])
    return (
        <div className="start bg-slate-200/95 dark:bg-zinc-950/95 w-screen h-screen rounded-xl">
            START COMPONENT
        </div>
    )
}

export default StartComponent