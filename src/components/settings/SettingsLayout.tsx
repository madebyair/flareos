import SettingsSidebarItem from "./SettingsSidebarItem.tsx"
import "../../assets/css/App.css"
import { faGear, faInfo, faPalette, faWifi } from "@fortawesome/free-solid-svg-icons"
import { settingsComponent } from "./settingsState.tsx"
import { useAtomState } from "@zedux/react"
import { useEffect, useState } from "react"
import { emit, listen } from "@tauri-apps/api/event"
import User, { defaultUser } from "../../types/user.ts"
import SettingsGeneral from "./general/SettingsGeneral.tsx"
import "../../i18n.ts"
import { useTranslation } from "react-i18next"
import SettingsInformation from "./information/SettingsInformation.tsx"
import SettingsThemes from "./themes/SettingsThemes.tsx"
import { getCurrent } from "@tauri-apps/api/window"

const SettingsLayout = () => {
    const [component] = useAtomState(settingsComponent)
    const [user, setUser] = useState<User>(defaultUser)
    const [t, i18n] = useTranslation()
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [currentComponent, setCurrentComponent] = useState(component)
    const [theme, setTheme] = useState("")

    useEffect(() => {
        // @ts-ignore
        setTheme(localStorage.getItem("theme"))

        void emit("user-request")

        void listen<User>("user-response", (r) => {
            setUser(r.payload)
            void i18n.changeLanguage(r.payload.language)
            setTimeout(() => {
                void getCurrent().show()
            }, 30)
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

    useEffect(() => {
        setIsTransitioning(true)
        const timeout = setTimeout(() => {
            setCurrentComponent(component)
            setIsTransitioning(false)
        }, 100)

        return () => clearTimeout(timeout)
    }, [component])

    return (
        <div className={theme}>
            <div className="w-screen h-screen bg-slate-300 dark:bg-zinc-950 flex select-none dark:text-white">
                <div className="w-1/3 bg-white dark:bg-zinc-900 p-6 rounded-r-lg shadow-lg">
                    <div className="mt-4 mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{t("Settings")}</h2>
                    </div>
                    <div className="space-y-4">
                        <SettingsSidebarItem
                            name={t("Connections")}
                            icon={faWifi}
                            description={t("Wifi ・ Bluetooth")}
                            component={<></>}
                        />
                        <SettingsSidebarItem
                            name={t("Themes")}
                            icon={faPalette}
                            description={t("Dark mode ・ Wallpaper")}
                            component={<SettingsThemes />}
                        />
                        <SettingsSidebarItem
                            name={t("General")}
                            icon={faGear}
                            description={t("Language ・ Date and time")}
                            component={<SettingsGeneral />}
                        />
                        <SettingsSidebarItem
                            name={t("Information")}
                            icon={faInfo}
                            description={t("FlareOS Version ・ Updates")}
                            component={<SettingsInformation />}
                        />
                    </div>
                </div>

                <div className="w-2/3 mt-2 mb-2 mx-2 transition-opacity duration-300" style={{ opacity: isTransitioning ? 0 : 1 }}>
                    {currentComponent}
                </div>
            </div>
        </div>
    )
}

export default SettingsLayout
