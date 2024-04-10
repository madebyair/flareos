import { useEffect, useState } from "react"
import User, { defaultUser } from "../../../types/user.ts"
import { useTranslation } from "react-i18next"
import { emit, listen } from "@tauri-apps/api/event"
import "../../../i18n.ts"
import "../../../assets/css/App.css"
import Button from "../../../elements/Button.tsx"

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
                { /* TODO widget list here */ }
                <Button submit={() => emit("widget-add")} label="Test add" />
            </div>
        </div>
    )
}

export default WidgetsMenu