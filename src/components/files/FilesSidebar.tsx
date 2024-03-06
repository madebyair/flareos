import { useTranslation } from "react-i18next"
import { get_back } from "./files_history.ts"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useAtomState } from "@zedux/react"
import { currentDirState } from "./filesState.tsx"

const FilesSidebar = () => {
    const [ t ] = useTranslation()
    const [, setCurrentDir] = useAtomState(currentDirState)

    return (
        <div className="w-full h-screen">
            <div className="w-full h-10 flex">
                <div className="m-auto font-bold">
                    {t("Files")}
                </div>
            </div>
            <div className="flex h-10 w-full">
                <div onClick={() => {
                    const back = get_back()
                    if (back !== null) {
                        setCurrentDir(back)
                    }
                }}>
                    <div className="h-10 w-10 hover:bg-slate-400/70 dark:hover:bg-zinc-950 flex rounded-md transition duration-300">
                        <FontAwesomeIcon icon={faArrowLeft} size="lg" className="m-auto"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilesSidebar