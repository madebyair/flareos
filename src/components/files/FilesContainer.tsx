import { useAtomState } from "@zedux/react"
import "../../assets/css/App.css"
import { currentDirState } from "./filesState.tsx"
import DirectoryExplorer from "./explorer/DirectoryExplorer.tsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { history, get_back } from "./files_history.ts"

const FilesContainer = () => {
    // @ts-ignore
    const [currentDir, setCurrentDir] = useAtomState(currentDirState)

    return (
        <div className="w-screen h-screen bg-slate-300 dark:bg-zinc-950 select-none dark:text-white flex">
            <div className="w-1/3 h-screen">
                Sidebar
                {history.length !== 0 &&
                    <div onClick={() => {
                        const back = get_back()
                        if (back !== null) {
                            console.log(back)
                            setCurrentDir(back)
                        }
                    }}>
                        <FontAwesomeIcon icon={faArrowLeft}/>
                    </div>
                }
            </div>
            <div className="w-2/3 h-screen">
                <DirectoryExplorer directory={currentDir}/>
            </div>
        </div>
    )
}

export default FilesContainer