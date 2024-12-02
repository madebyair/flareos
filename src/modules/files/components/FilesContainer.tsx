import { useEffect, useState } from "react"
import { emit, listen } from "@tauri-apps/api/event"
import User, { defaultUser } from "../../../types/user.ts"
import { useTranslation } from "react-i18next"
import "../../../assets/css/App.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCog } from "@fortawesome/free-solid-svg-icons"
import "../../../i18n.ts"

const FilesContainer = () => {
    const [theme, setTheme] = useState("")
    const [t , i18n ] = useTranslation()
    const [user, setUser] = useState<User>(defaultUser)

    useEffect(() => {
        void emit("user-request")

        // @ts-ignore
        setTheme(localStorage.getItem("theme"))

        void listen<User>("user-response", (r) => {
            setUser(r.payload)
            void i18n.changeLanguage(r.payload.language)
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
            <div className="w-screen h-screen bg-slate-300 dark:bg-zinc-950 flex select-none dark:text-white flex">
                <div className="w-1/4 bg-white dark:bg-zinc-900 p-6 rounded-br-lg shadow-lg relative">
                    <div className="w-full h-8 flex">
                        <div className="m-auto text-lg font-semibold">
                            {t("Files")}
                        </div>
                    </div>
                    <div className="h-10 w-10 absolute bottom-4 right-4 hover:bg-stone-400/70 dark:hover:bg-zinc-800 flex transition-all duration-300 rounded-xl">
                        <div className="m-auto">
                            <FontAwesomeIcon icon={faCog} />
                        </div>
                    </div>
                </div>
                <div className="h-14 w-3/4 bg-white dark:bg-zinc-900 shadow-lg">

                </div>
            </div>
        </div>
    )
}

export default FilesContainer