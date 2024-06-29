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
            setBg("bg-blue-500/20")
        } else {
            setBg("bg-slate-400/30 dark:bg-zinc-950/20")
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
        <div className="transition">
            <div
                className={`flex h-12  mt-2 mb-2 rounded-md ${bg}`}
                onClick={handleSingleClick}
                onMouseOver={() => setBg("bg-blue-400/10")}
                onMouseOut={() => {
                    if (bg !== "bg-blue-500/20") {
                        setBg("bg-slate-400/30 dark:bg-zinc-950/20")
                    }
                }}
            >
                <div className="mt-auto mb-auto ml-2">
                    <FontAwesomeIcon icon={is_dir ? faFolder : faFile} />
                </div>
                <div className="mt-auto mb-auto ml-2">
                    {path.split("/").pop()}
                </div>
            </div>
        </div>
    )
}

export default FileEntry
