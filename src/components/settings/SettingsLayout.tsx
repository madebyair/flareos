import SettingsSidebarItem from "./SettingsSidebarItem.tsx"
import "../../assets/css/App.css"
import { faDownload, faGear, faPalette, faWifi } from "@fortawesome/free-solid-svg-icons"
import { settingsComponent } from "./settingsState.tsx"
import { useAtomState } from "@zedux/react"
import SettingsPersonalization from "./personalization/SettingsPersonalization.tsx"
import { useEffect, useState } from "react"
import { emit, listen } from "@tauri-apps/api/event"
import User, { defaultUser } from "../../types/user.ts"
import SettingsGeneral from "./general/SettingsGeneral.tsx"
import "../../i18n.ts"
import { useTranslation } from "react-i18next"

const SettingsLayout = () => {
    const [component] = useAtomState(settingsComponent)
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
            <div className={"w-screen h-screen bg-slate-300 dark:bg-zinc-950 flex select-none dark:text-white"}>
                <div className="w-1/2 p-4">
                    <div className="mt-2 mb-2">
                        <SettingsSidebarItem name="Connections" icon={faWifi} description="Wifi ・ Bluetooth"
                            component={<></>}/>
                        <SettingsSidebarItem name="Personalization" icon={faPalette}
                            description="Dark mode ・ Wallpaper"
                            component={<SettingsPersonalization/>}/>
                        <SettingsSidebarItem name="General" icon={faGear}
                            description="Language ・ Date and time"
                            component={<SettingsGeneral />}/>
                        <SettingsSidebarItem name="Information" icon={faDownload} description="Airos Version ・ Updates"
                            component={<></>}/>
                    </div>
                </div>
                <div className="w-1/2 mt-2 mb-2 mx-2">
                    {component}
                </div>
            </div>
        </div>
    )
}

export default SettingsLayout