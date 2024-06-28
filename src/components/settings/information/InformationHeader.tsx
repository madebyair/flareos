import packageJson from "../../../../package.json"
import { useTranslation } from "react-i18next"
const InformationHeader = () => {
    const [ t ] = useTranslation()

    return (
        <div className="w-full h-32 rounded-md bg-slate-400/30 dark:bg-zinc-900 flex">
            <div className="h-32 w-32 flex">
                <div className="m-auto">
                    <img src="icons://FlareOS-white.webp" alt="" className="hidden dark:block" draggable={false}/>
                    <img src="icons://FlareOS-black.webp" alt="" className="dark:hidden" draggable={false} />
                </div>
            </div>
            <div className="mt-auto mb-auto ml-4">
                <h1 className="font-bold text-xl">The Air Operating System</h1>
                <h2>{t("Version")} {packageJson.version}</h2>
            </div>
        </div>
    )
}

export default InformationHeader