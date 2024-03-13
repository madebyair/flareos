import { useEffect, useState } from "react"
import User, { defaultUser } from "../../types/user.ts"
import { listen } from "@tauri-apps/api/event"
import { getCurrent } from "@tauri-apps/api/window"
import "../../assets/css/App.css"

type EventResponse = {
    user: User;
    current: boolean;
};

const ActionsMenu = () => {
    const [user, setUser] = useState<User>(defaultUser)

    useEffect(() => {
        listen<EventResponse>("actions-display-event", (event) => {
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
    return (
        <div className={user?.theme}>
            <div className="start bg-slate-200/95 dark:bg-zinc-950/95 w-screen h-screen rounded-xl dark:text-white">
                ACTIONS
            </div>
        </div>
    )
}

export default ActionsMenu