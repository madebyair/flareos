import { useEffect, useState } from "react"
import User, { defaultUser } from "../../../types/user.ts"
import { useTranslation } from "react-i18next"
import { emit, listen } from "@tauri-apps/api/event"
import "../../../assets/css/App.css"

const CalculatorContainer = () => {
    const [user, setUser] = useState<User>(defaultUser)
    const [, i18n] = useTranslation()


    useEffect(() => {
        void emit("user-request")

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

    return (
        <div className={user.theme}>
            <div className="w-screen h-screen bg-slate-200 dark:bg-black">
                <div className="transition w-screen h-screen select-none dark:text-white">
                    <div className="h-2/6 bg-slate-300 dark:bg-zinc-800 flex justify-end items-center">
                        <div className="mr-4 text-2xl font-bold">
                            256
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CalculatorContainer