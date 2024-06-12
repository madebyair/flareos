import { useTranslation } from "react-i18next"
// @ts-ignore
import l1 from "../../../assets/images/il1.png"

const DiscoverHome = () => {
    const [ t ] = useTranslation()
    return (
        <div className="w-full h-full p-4">
            <h1 className="text-2xl font-bold">{t("Discover your computer in your way")}</h1>
            <div className="bg-gradient-to-br from-zinc-700 to-indigo-600 w-full h-52 mt-6 rounded-md relative">
                <div className="absolute right-2 bottom-2 p-4 bg-zinc-900/70 rounded-md text-xl font-bold">
                    Something will be here. Soon
                </div>
            </div>
            <h1 className="text-lg font-bold mt-6">{t("Worth seeing")}</h1>
            <div className="flex mt-4">
                <div className="bg-gradient-to-br from-fuchsia-600 to-purple-600 rounded-md w-44 h-40">
                    <div className="w-full h-full rounded-md bg-slate-300/70 dark:bg-zinc-900/70 p-4">
                        <div className="h-1/2 w-full flex">
                            <img src={l1} alt="" className="opacity-80 brightness-150 rounded-[5px]" />
                        </div>
                        <div className="h-1/2 w-full">
                            <p className="mt-2 font-bold">{t("Welcome to Airos")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiscoverHome