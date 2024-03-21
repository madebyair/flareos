import { useTranslation } from "react-i18next"

const NoInternet = () => {
    const [ t ] = useTranslation()

    return (
        <div className="absolute top-0 left-0 w-screen h-screen bg-slate-300 dark:bg-black flex z-50 dark:text-white">
            <div className="m-auto text-center">
                <h1 className="text-2xl font-bold">{t("No network connection")}</h1>
                <h2>{t("To use airstore, you need network.")}</h2>
            </div>
        </div>
    )
}

export default NoInternet