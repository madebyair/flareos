import TaskbarClock from "./TaskbarClock.tsx"
import TaskbarAirButton from "./TaskbarFlareButton.tsx"
import { useEffect } from "react"
import { currentMonitor } from "@tauri-apps/api/window"
import { WebviewWindow } from "@tauri-apps/api/webviewWindow"
import TaskbarApps from "./TaskbarApps.tsx"
import { emit } from "@tauri-apps/api/event";
import { useAtomState } from "@zedux/react";
import { userState } from "../../../state/currentUserState.ts";

const Taskbar = () => {
    const [user] = useAtomState(userState)

    useEffect(() => {
        currentMonitor().then((result) => {
            if (result?.size.height && result?.size.width) {
                const height = result.size.height - 680

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

                setTimeout(() => {
                    void emit("start-display-event", {
                        user: user,
                        current: false
                    })
                }, 500)
            }
        })
    }, [])

    return (
        <div className="w-screen bg-zinc-300 dark:bg-zinc-950 h-14 z-10 flex">
            <TaskbarAirButton />
            <TaskbarApps />
            <TaskbarClock />
        </div>
    )
}

export default Taskbar