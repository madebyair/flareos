import { useEffect, useState } from "react"
import { emit, listen } from "@tauri-apps/api/event"
import User, { defaultUser } from "../../types/user.ts"
import { useTranslation } from "react-i18next"
import "../../assets/css/App.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome } from "@fortawesome/free-solid-svg-icons"

const StoreComponent = () => {
    const [user, setUser] = useState<User>(defaultUser)
    const [, i18n] = useTranslation()

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
            <div className="w-screen h-screen bg-slate-200 dark:bg-black dark:text-white select-none flex">
                <div className="w-1/3 h-screen">
                    <div className="w-full h-24 flex">
                        <img src="/src/assets/images/airstorewhite.png" alt=""/>
                    </div>
                    <div className="mt-8 w-10/12 text-xl font-bold ml-4">
                        <FontAwesomeIcon icon={faHome} />
                        <span className="ml-4">Home</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StoreComponent