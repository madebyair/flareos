// @ts-ignore
import airsmallBlack from "../../assets/images/airsmall-black.webp"
// @ts-ignore
import airsmallWhite from "../../assets/images/airsmall-white.webp"
import { useEffect, useState } from "react"
import { WebviewWindow } from "@tauri-apps/api/webviewWindow"
import { emit } from "@tauri-apps/api/event"
import { currentMonitor } from "@tauri-apps/api/window"
const Taskbar = () => {
    const [isStartDisplayed, setIsStartDisplayed] = useState(false)

    useEffect(() => {
        currentMonitor().then((result) => {
            if (result?.size.height) {
                const height = result.size.height - 655

                console.log(height)

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

                web.once("tauri://error", (e) => { console.log(e)})
                web.once("tauri://success", (e) => { console.log(e)})
            }
        })
    }, [])

    useEffect(() => {
        emit("start-display-event", isStartDisplayed)
    }, [isStartDisplayed])


    function onClick() {
        setIsStartDisplayed(!isStartDisplayed)
    }

    return (
        <div className="w-screen bg-zinc-300 dark:bg-zinc-950 h-10 z-50 flex">
            <div className="mx-6 flex h-8 my-auto">
                <div
                    className="flex mx-2 rounded-md hover:bg-zinc-400 dark:hover:bg-zinc-800 transition duration-300 h-8 w-8" onClick={() => onClick()}>
                    <img src={airsmallBlack} alt="" className="block dark:hidden"/>
                    <img src={airsmallWhite} alt="" className="hidden dark:block"/>
                </div>
            </div>
        </div>
    )
}

export default Taskbar