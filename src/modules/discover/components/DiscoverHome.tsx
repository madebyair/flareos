import { useTranslation } from "react-i18next"

const DiscoverHome = () => {
    const [ t ] = useTranslation()
    return (
        <div className="w-full h-full p-4">
            <h1 className="text-2xl font-bold">{t("Discover your computer in your way")}</h1>
            <div className="bg-gradient-to-br from-zinc-700 to-indigo-600 w-full h-52 mt-6 rounded-md relative">
                <div className="absolute right-2 bottom-2 p-4 bg-zinc-900/70 rounded-md">
                    Something will be here. Soon
                </div>
            </div>
        </div>
    )
}

export default DiscoverHome