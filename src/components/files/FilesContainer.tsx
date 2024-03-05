import { useAtomState } from "@zedux/react"
import "../../assets/css/App.css"
import { currentDirState } from "./filesState.tsx"
import DirectoryExplorer from "./explorer/DirectoryExplorer.tsx"

const FilesContainer = () => {
    // @ts-ignore
    const [currentDir] = useAtomState(currentDirState)

    return (
        <div className="w-screen h-screen bg-slate-300 dark:bg-zinc-950 select-none dark:text-white flex">
            <div className="w-1/3 h-screen">
                Sidebar
            </div>
            <div className="w-2/3 h-screen">
                <DirectoryExplorer directory={currentDir} />
            </div>
        </div>
    )
}

export default FilesContainer