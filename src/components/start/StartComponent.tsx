import "../../assets/css/App.css"
import { useEffect, useState } from "react"
import { emit, listen } from "@tauri-apps/api/event"
import { getCurrent } from "@tauri-apps/api/window"
import User from "../../types/user"
import { useAtomState } from "@zedux/react"
import { userState } from "../../state/currentUserState"
import { WebviewWindow } from "@tauri-apps/api/webviewWindow"
import { App } from "../../types/app"
import embededApps from "../../apps/embededApps"
import { invoke } from "@tauri-apps/api/core"
import StartSearchComponent from "./StartSearchComponent.tsx"

type EventResponse = {
    user: User;
    current: boolean;
};

const StartComponent = () => {
    const [user, setUser] = useAtomState(userState)
    const [apps, setApps] = useState<Array<App>>([])

    useEffect(() => {
        listen<EventResponse>("start-display-event", (event) => {
            setUser(event.payload.user)

            if (!event.payload.current) {
                getCurrent().hide()
            } else {
                getCurrent().show()
            }
        })

        listen<"light" | "dark">("theme-change", (event) => {
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

    function run(command: string) {
        switch (command) {
        case "__airos_emebed_app_terminal__":
            new WebviewWindow("terminal", {
                url: "terminal.html",
                title: "Terminal",
                minWidth: 300,
                minHeight: 200,
                visible: false
            })
            break
        case "__airos_emebed_app_settings__":
            new WebviewWindow("settings", {
                url: "settings.html",
                title: "Settings",
                minWidth: 800,
                minHeight: 600,
                visible: false
            })
            break
        case "__airos_emebed_app_files__":
            new WebviewWindow("files", {
                url: "files.html",
                title: "Files",
                minWidth: 900,
                minHeight: 530,
                width: 900,
                height: 530,
                visible: false
            })
            break

        case "__airos_emebed_app_store__":
            new WebviewWindow("store", {
                url: "store.html",
                title: "Store",
                minWidth: 800,
                minHeight: 600,
                visible: false
            })
            break
        default:
            invoke("run_app", { command: command, user: user.unixUser })

            break
        }

        emit("start-hide-request")
    }

    return (
        <div className={user?.theme}>
            <div className="start bg-slate-200/95 dark:bg-zinc-950/95 w-screen h-screen rounded-xl select-none">
                <StartSearchComponent />
                <div className="mx-4 pt-2 grid grid-cols-4 gap-4 justify-items-center">
                    {apps.map(app => (
                        <div key={app.name} onClick={() => run(app.exec)} className="hover:bg-slate-300 dark:hover:bg-zinc-800 transition duration-300 rounded-md w-20 h-24 flex flex-col items-center justify-center"> {/* Modified */}
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
