import { useEffect, useState } from "react"
import User, { defaultUser } from "../../../types/user.ts"
import { useTranslation } from "react-i18next"
import { emit, listen } from "@tauri-apps/api/event"
import { discoverComponent } from "../states/discoverComponent.tsx"
import { useAtomState } from "@zedux/react"

const DiscoverIndex = () => {
    const [user, setUser] = useState<User>(defaultUser)
    const [, i18n] = useTranslation()
    const [component] = useAtomState(discoverComponent)

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
        <div className={user.theme}>
            <div className="w-screen h-screen p-8 bg-slate-200 dark:bg-black dark:text-white select-none">
                {component}
            </div>
        </div>
    )
}

export default DiscoverIndex