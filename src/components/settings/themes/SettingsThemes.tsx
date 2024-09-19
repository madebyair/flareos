import { emit } from "@tauri-apps/api/event"
import { useTranslation } from "react-i18next"

const SettingsThemes = () => {
    const [ t ] = useTranslation()

    return (
        <div className="w-full h-full space-y-4">
            <div
                className="bg-slate-100 dark:bg-zinc-900 w-full rounded-lg h-20 flex items-center cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-200"
                onClick={() => emit("theme-change", "light")}
            >
                <div className="ml-4">
                    <h3 className="text-lg font-semibold">{t("Light Mode")}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("Bright and clear interface.")}</p>
                </div>
            </div>

            <div
                className="bg-slate-100 dark:bg-zinc-900 w-full rounded-lg h-20 flex items-center cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-200"
                onClick={() => emit("theme-change", "dark")}
            >
                <div className="ml-4">
                    <h3 className="text-lg font-semibold">{t("Dark Mode")}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t("Subtle and easy on the eyes.")}</p>
                </div>
            </div>
        </div>
    )
}

export default SettingsThemes
