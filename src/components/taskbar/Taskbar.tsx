// @ts-ignore
import airsmallBlack from "../../assets/images/airsmall-black.webp"
// @ts-ignore
import airsmallWhite from "../../assets/images/airsmall-white.webp"
import { useEffect, useState } from "react"
import { WebviewWindow } from "@tauri-apps/api/webviewWindow"
import { emit, listen } from "@tauri-apps/api/event"
import { currentMonitor } from "@tauri-apps/api/window"
import { useAtomState } from "@zedux/react"
import { userState } from "../../state/currentUserState.ts"
import TaskbarApps from "./TaskbarApps.tsx"
const Taskbar = () => {
    const [isStartDisplayed, setIsStartDisplayed] = useState(false)
    const [user] = useAtomState(userState)

    useEffect(() => {
        currentMonitor().then((result) => {
            if (result?.size.height) {
                const height = result.size.height - 655

                const web = new WebviewWindow("start", {
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

                web.once("tauri://error", (e) => { console.error(e) })
            }
        })
    }, [])

    useEffect(() => {
        emit("start-display-event", {
            "user": user,
            "current": isStartDisplayed
        })

        listen<undefined>("start-hide-request", () => {
            setIsStartDisplayed(false)
        })
    }, [isStartDisplayed])


    function onClick() {
        setIsStartDisplayed(!isStartDisplayed)
    }

    return (
        <div className="w-screen bg-zinc-300 dark:bg-zinc-950 h-10 z-30 flex">
            <div className="mx-6 flex h-8 my-auto z-40">
                <div
                    className="flex mx-2 rounded-md hover:bg-zinc-400 dark:hover:bg-zinc-800 transition duration-300 h-8 w-8" onClick={() => onClick()}>
                    <img src={airsmallBlack} alt="" className="block dark:hidden"/>
                    <img src={airsmallWhite} alt="" className="hidden dark:block"/>
                </div>
            </div>
            <div className="absolute w-screen flex">
                <div className="m-auto">
                    <TaskbarApps />
                </div>
            </div>
        </div>
    )
}

export default Taskbar