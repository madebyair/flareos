import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { useAtomState } from "@zedux/react"
import { currentDirState } from "./filesState.tsx"

type FilesTabType = {
    path: string,
    active: boolean
}

const FilesTab = ({active, path} : FilesTabType) => {
    const [ownPath, setOwnPath] = useState("")
    const [, setCurrentDir] = useAtomState(currentDirState)

    useEffect(() => {
        if (active) {
            console.log("active")
            setOwnPath(path)
        }
        if (ownPath == "") {
            setOwnPath(path)
        }
    }, [path])

    return (
        <div className="w-32 h-10 bg-zinc-950/70 flex rounded-md" onClick={() => {
            setCurrentDir(ownPath)
        }}>
            <div className="h-10 w-10 flex">
                <div className="m-auto">
                    <FontAwesomeIcon icon={faFolder} />
                </div>
            </div>
            {ownPath.split("/").pop()}
        </div>
    )
}

export default FilesTab