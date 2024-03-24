import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faVolumeLow } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "react-i18next"
import { useAtomState } from "@zedux/react"
import { isFullMixer } from "./actionsState.ts"

const FullMixer = () => {
    const [ t ] = useTranslation()
    const [, setFullMixer] = useAtomState(isFullMixer)

    return (
        <div className="w-screen h-screen top-0 p-8 bg-slate-200 dark:bg-zinc-950/95 rounded-xl">
            <header className="flex h-10">
                <div className="h-10 w-10 flex hover:bg-slate-200 rounded-md transition duration-300 dark:hover:bg-zinc-900" onClick={() => setFullMixer(false)}>
                    <div className="m-auto">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </div>
                </div>
                <h1 className="my-auto ml-2">{t("Available speakers")}</h1>
            </header>
            <Speaker/>
        </div>
    )
}

const Speaker = () => {
    return (
        <div className="w-full h-10 flex hover:bg-slate-200 rounded-md transition duration-300 dark:hover:bg-zinc-900 mt-4">
            <div className="h-10 w-10 flex">
                <div className="m-auto">
                    <FontAwesomeIcon icon={faVolumeLow}/>
                </div>
            </div>
            <div className="mt-auto mb-auto">
                Speaker
            </div>
        </div>
    )
}

export default FullMixer