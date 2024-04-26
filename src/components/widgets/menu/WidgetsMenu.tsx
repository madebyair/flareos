import { useEffect, useState } from "react"
import User, { defaultUser } from "../../../types/user.ts"
import { useTranslation } from "react-i18next"
import { emit, listen } from "@tauri-apps/api/event"
import "../../../i18n.ts"
import "../../../assets/css/App.css"
import { getCurrent } from "@tauri-apps/api/window"

const WidgetsMenu = () => {
    const [user, setUser] = useState<User>(defaultUser)
    const [t, i18n] = useTranslation()

    useEffect(() => {
        emit("user-request")

        listen<User>("user-response", (r) => {
            setUser(r.payload)
            i18n.changeLanguage(r.payload.language)
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

    return (
        <div className={user?.theme}>
            <div className="w-screen h-screen p-8 bg-slate-200 dark:bg-black dark:text-white select-none">
                <h1 className="text-3xl font-bold">{t("Widgets")}</h1>
                <div className="w-full relative flex mt-6">
                    <div
                        className="absolute left-0 w-5/12 p-2 hover:bg-slate-400/50 dark:hover:bg-zinc-900/95 rounded-md transition duration-300" onClick={() => {
                            emit("widget-add", {
                                name: "Clock",
                                component: "clockwidget",
                                x: 10,
                                y: 20,
                                default: "clock"
                            })

                            getCurrent().close()
                        }}>
                        <div
                            className="bg-gradient-to-r from-purple-900/70 via-purple-700/70 to-purple-500/70 h-24 rounded-xl flex">
                            <div className="bg-slate-300 dark:bg-zinc-950 rounded-md w-32 h-12 flex m-auto">
                                <h1 className="m-auto text-xl font-bold">21:37</h1>
                            </div>
                        </div>
                        <h1 className="text-center mt-2">{t("Clock")}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WidgetsMenu