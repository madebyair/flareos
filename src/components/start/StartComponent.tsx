import "../../assets/css/App.css"
import { useEffect, useState } from "react"
import { emit, listen } from "@tauri-apps/api/event"
import { getCurrentWindow, Window } from "@tauri-apps/api/window"
import User from "../../types/user"
import { useAtomState } from "@zedux/react"
import { userState } from "../../state/currentUserState"
import { WebviewWindow } from "@tauri-apps/api/webviewWindow"
import { App } from "../../types/app"
import embededApps from "../../apps/embededApps"
import { invoke } from "@tauri-apps/api/core"
import StartSearchComponent from "./StartSearchComponent.tsx"
import "../../i18n.ts"
import { useTranslation } from "react-i18next";

type EventResponse = {
    user: User;
    current: boolean;
};

const StartComponent = () => {
    const [user, setUser] = useAtomState(userState)
    const [apps, setApps] = useState<Array<App>>([])
    const [, i18n] = useTranslation()

    useEffect(() => {
        void listen<EventResponse>("start-display-event", (event) => {
            setUser(event.payload.user)
            i18n.changeLanguage(event.payload.user.language)

            if (!event.payload.current) {
                void getCurrentWindow().hide()
            } else {
                void getCurrentWindow().show()
            }
        })

        void listen<"light" | "dark">("theme-change", (event) => {
            localStorage.setItem("theme", user.theme)

            setUser(prevUser => ({
                ...prevUser,
                theme: event.payload
            }))
        })

        if (window.location.port !== "1420") {
            window.addEventListener("contextmenu", e => e.preventDefault())
        }
    }, [])

    useEffect(() => {
        const updatedApps = [...user.apps, ...embededApps]
        setApps(updatedApps)
    }, [user])

    async function run(command: string) {
        const appDetails = {
            "__FlareOS_embed_app_terminal__": { id: "terminal", url: "terminal.html", title: "Terminal", minWidth: 300, minHeight: 200 },
            "__FlareOS_embed_app_settings__": { id: "settings", url: "settings.html", title: "Settings", minWidth: 1000, minHeight: 650, resizable: false },
            "__FlareOS_embed_app_files__": { id: "files", url: "files.html", title: "Files", minWidth: 900, minHeight: 530, width: 900, height: 530, visible: false },
            "__FlareOS_embed_app_store__": { id: "store", url: "store.html", title: "Store", minWidth: 800, minHeight: 600 },
            "__FlareOS_embed_app_discover__": { id: "discover", url: "discover.html", title: "Discover", minWidth: 800, minHeight: 600 },
            "__FlareOS_embed_app_calculator__": { id: "calculator", url: "calculator.html", title: "Calculator", width: 400, height: 550, resizable: false }
        }

        // @ts-ignore
        const appConfig = appDetails[command]

        if (appConfig) {
            localStorage.setItem("theme", user.theme)

            const allWindows = await WebviewWindow.getAll()
            let existingWindow: string | false = false

            allWindows.forEach(win => {
                if (win.label == appConfig.id) {
                    existingWindow = win.label
                }
            })


            if (existingWindow) {
                try {
                    await Window.getByLabel(existingWindow).then((w) => {
                        w?.setFocus()
                    })
                } catch (error) {
                    console.error(error)
                }
            } else {
                try {
                    const webview = new WebviewWindow(appConfig.id, {
                        url: appConfig.url,
                        title: appConfig.title,
                        minWidth: appConfig.minWidth,
                        minHeight: appConfig.minHeight,
                        width: appConfig.width,
                        height: appConfig.height,
                        resizable: appConfig.resizable !== undefined ? appConfig.resizable : true,
                        visible: false
                    })

                    listen("user-response", () => {
                        setTimeout(() => webview.show(), 100)
                    })
                } catch (error) {
                    console.error(error)
                }
            }
        } else {
            try {
                await invoke("run_app", { command: command, user: user.unixUser })
            } catch (error) {
                console.error(error)
            }
        }

        void emit("start-hide-request")
    }

    return (
        <div className={user?.theme}>
            <div className="start bg-slate-200/95 dark:bg-zinc-950/95 w-screen h-screen rounded-xl select-none">
                <StartSearchComponent />
                <div className="mx-4 pt-2 grid grid-cols-4 gap-4 justify-items-center">
                    {apps.map(app => (
                        <div key={app.name} onClick={() => run(app.exec)} className="hover:bg-slate-300 dark:hover:bg-zinc-800 transition duration-300 rounded-md w-20 h-24 flex flex-col items-center justify-center">
                            <div className="flex justify-center w-full">
                                <img src={app.icon} alt="" width="60px" height="60px" className="rounded-md"/>
                            </div>
                            <div className="text-center w-full dark:text-white">
                                {app.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default StartComponent
