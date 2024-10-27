import { useEffect, useState } from "react"
import User, { defaultUser } from "../../../types/user.ts"
import { useTranslation } from "react-i18next"
import { emit, listen } from "@tauri-apps/api/event"
import "../../../assets/css/App.css"
import { getCurrentWindow } from "@tauri-apps/api/window";


const LauncherContainer = () => {
    const [user, setUser] = useState<User>(defaultUser)
    const [theme, setTheme] = useState<string>("")
    const [, i18n] = useTranslation()


    useEffect(() => {
        // @ts-ignore
        setTheme(localStorage.getItem("theme"))
        void emit("user-request")

        void listen<User>("user-response", (r) => {
            setUser(r.payload)
            void i18n.changeLanguage(r.payload.language)
        })

        void listen("launcher-event", () => {
            getCurrentWindow().isVisible().then((v) => {
                if (v) {
                    void getCurrentWindow().hide()
                } else {
                    void getCurrentWindow().show()
                }
            })
        })

        void listen<"light" | "dark">("theme-change", (event) => {
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
        setTheme(user.theme)
    }, [user])
    
    return (
        <div className={theme}>
            <div className="launcher w-screen h-screen bg-zinc-200 dark:bg-zinc-800 rounded-md">
                <input
                    className="w-screen bg-zinc-300 dark:bg-zinc-900 rounded-t-md h-12 border-b-gray-700 border-b-2 dark:text-white indent-4 focus:outline-none border-transparent focus:ring-0"
                    type="text"  autoFocus />
            </div>
        </div>
    )
}

export default LauncherContainer