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
import { useTranslation } from "react-i18next"
const Taskbar = () => {
    const [isStartDisplayed, setIsStartDisplayed] = useState(false)
    const [user] = useAtomState(userState)
    const [, i18n] = useTranslation()

    useEffect(() => {
        currentMonitor().then((result) => {
            if (result?.size.height) {
                const height = result.size.height - 655

                const web = new WebviewWindow("start", {
                    title: "__airos_start_menu__",
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

    const [time, setTime] = useState(() => {
        const now = new Date()

        const timeFormat = new Intl.DateTimeFormat(undefined, {
            hour: "numeric",
            minute: "numeric",
            hour12: i18n.language === "en"
        })

        return timeFormat.format(now)
    })

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(() => {
                const now = new Date()
                const timeFormat = new Intl.DateTimeFormat(undefined, {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: i18n.language === "en"
                })

                return timeFormat.format(now)
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-screen bg-zinc-300 dark:bg-zinc-950 h-10 z-10 flex">
            <div className="mx-6 flex h-8 my-auto z-10">
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
            <div className="absolute mx-12 right-0 text-white h-10 flex">
                <div className="h-8 w-24 my-auto flex rounded-md hover:bg-zinc-400 dark:hover:bg-zinc-800 transition duration-300">
                    <span className="m-auto">{time}</span>
                </div>
            </div>
        </div>
    )
}

export default Taskbar