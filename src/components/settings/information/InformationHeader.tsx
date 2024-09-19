import packageJson from "../../../../package.json"
import { useTranslation } from "react-i18next"

const InformationHeader = () => {
    const [ t ] = useTranslation()

    return (
        <div className="w-full h-36 rounded-lg bg-slate-200/70 dark:bg-zinc-800/90 flex items-center shadow-lg p-4">
            <div className="h-28 w-28 flex items-center justify-center bg-slate-300/50 dark:bg-zinc-700/50 rounded-full p-2">
                <img
                    src="icons://FlareOS-white.webp"
                    alt="FlareOS Logo"
                    className="hidden dark:block w-20 h-20"
                    draggable={false}
                />
                <img
                    src="icons://FlareOS-black.webp"
                    alt="FlareOS Logo"
                    className="dark:hidden w-20 h-20"
                    draggable={false}
                />
            </div>

            <div className="ml-6">
                <h1 className="font-bold text-2xl text-gray-800 dark:text-gray-100">
                    The Flare Operating System
                </h1>
                <h2 className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                    {t("Version")} {packageJson.version}
                </h2>
            </div>
        </div>
    )
}

export default InformationHeader
