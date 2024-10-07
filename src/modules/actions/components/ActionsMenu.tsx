import { useEffect, useState } from "react"
import { listen } from "@tauri-apps/api/event"
import { getCurrentWindow } from "@tauri-apps/api/window"
import { useTranslation } from "react-i18next"
import User, { defaultUser } from "../../../types/user.ts"
import "../../../i18n.ts"
import "../../../assets/css/App.css"
import ActionsHeader from "./ActionsHeader.tsx"
import ActionsQuickActions from "./ActionsQuickActions.tsx"


type EventResponse = {
    user: User;
    current: boolean;
}

const ActionsMenu = () => {
    const [user, setUser] = useState<User>(defaultUser)
    // const [component, setComponent] = useAtomState(actionsComponent)
    const [, i18n] = useTranslation()

    
    useEffect(() => {
        void listen<EventResponse>("components-display-event", (event) => {
            setUser(event.payload.user)
            void i18n.changeLanguage(event.payload.user.language)

            if (!event.payload.current) {
                void getCurrentWindow().hide()
            } else {
                void getCurrentWindow().show()
            }
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
        <div className={user?.theme}>
            <div className="bg-slate-200/90 dark:bg-zinc-950/90 w-screen h-screen rounded-xl dark:text-white select-none fill-black dark:fill-white">
                <ActionsHeader user={user} />
                <ActionsQuickActions />
            </div>
        </div>
    )
}
export default ActionsMenu
