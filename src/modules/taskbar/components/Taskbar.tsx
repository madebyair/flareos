import TaskbarClock from "./TaskbarClock.tsx"
import TaskbarAirButton from "./TaskbarFlareButton.tsx"
import { useEffect } from "react"
import { currentMonitor } from "@tauri-apps/api/window"
import { WebviewWindow } from "@tauri-apps/api/webviewWindow"
import TaskbarApps from "./TaskbarApps.tsx"

const Taskbar = () => {
    useEffect(() => {
        currentMonitor().then((result) => {
            if (result?.size.height && result?.size.width) {
                const height = result.size.height - 655

                new WebviewWindow("start", {
                    title: "__FlareOS_start_menu__",
                    url: "start.html",
                    x: 50,
                    y: height,
                    width: 700,
                    height: 600,
                    decorations: false,
                    alwaysOnTop: true,
                    transparent: true,
                    visible: false,
                    resizable: false
                })

                new WebviewWindow("actions", {
                    title: "__FlareOS_actions_menu__",
                    url: "actions.html",
                    x: result?.size.width - 580,
                    y: height + 200,
                    width: 550,
                    height: 400,
                    decorations: false,
                    alwaysOnTop: true,
                    transparent: true,
                    resizable: false,
                    visible: false,
                })
            }
        })
    }, [])

    return (
        <div className="w-screen bg-zinc-300 dark:bg-zinc-950 h-10 z-10 flex">
            <TaskbarAirButton />
            <TaskbarApps />
            <TaskbarClock />
        </div>
    )
}

export default Taskbar