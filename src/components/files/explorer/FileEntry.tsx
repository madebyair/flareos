import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons"
import { useAtomState } from "@zedux/react"
import { currentActiveState, currentDirState } from "../filesState.tsx"
import { push } from "../files_history.ts"
import { useEffect, useState } from "react"

type Entry = {
    path: string,
    is_dir: boolean
};

const FileEntry = ({ path, is_dir }: Entry) => {
    const [, setDirectory] = useAtomState(currentDirState)
    const [active, setActive] = useAtomState(currentActiveState)
    const [bg, setBg] = useState("")

    useEffect(() => {
        if (active == path) {
            setBg("bg-slate-300 dark:bg-neutral-700/50")
        } else {
            setBg("bg-slate-200/70 dark:bg-zinc-900")
        }
    }, [active])

    const handleSingleClick = () => {
        if (active == path) {
            if (is_dir) {
                setDirectory(path)
                push(path)
            }
        } else {
            setActive(path)
        }
    }

    return (
        <div className="transition-colors duration-300">
            <div
                className={`flex h-16  mt-2 mb-2 rounded-md ${bg}`}
                onClick={handleSingleClick}
                onMouseOver={() => setBg("bg-slate-300/70 dark:bg-zinc-800")}
                onMouseOut={() => {
                    if (bg !== "bg-slate-300 dark:bg-neutral-700/50") {
                        setBg("bg-slate-200/70 dark:bg-zinc-900")
                    }
                }}
            >
                <div className="h-16 w-16 flex ml-6">
                    <div className="w-12 h-12 m-auto rounded-md flex bg-slate-400/70 dark:bg-zinc-800">
                        <div className="m-auto">
                            <FontAwesomeIcon icon={is_dir ? faFolder : faFile} />
                        </div>
                    </div>
                </div>
                <div className="mt-auto mb-auto ml-2 font-semibold">
                    {path.split("/").pop()}
                </div>
            </div>
        </div>
    )
}

export default FileEntry
