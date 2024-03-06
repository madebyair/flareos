import { useAtomState } from "@zedux/react"
import "../../assets/css/App.css"
import { currentDirState } from "./filesState.tsx"
import DirectoryExplorer from "./explorer/DirectoryExplorer.tsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faX } from "@fortawesome/free-solid-svg-icons"
import { history, get_back } from "./files_history.ts"
import { getCurrent } from "@tauri-apps/api/window"

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
                            setCurrentDir(back)
                        }
                    }}>
                        <FontAwesomeIcon icon={faArrowLeft}/>
                    </div>
                }
            </div>
            <div className="w-2/3">
                <div data-tauri-drag-region={true} className="h-9 w-full relative" onDoubleClick={() => {
                    getCurrent().toggleMaximize()
                }} onMouseDown={(event) => {
                    if( event.button === 1 ) {
                        getCurrent().minimize()
                    }
                }}>
                    <div className="absolute right-0 h-9 w-9 flex" onClick={() => {
                        getCurrent().close()
                    }}>
                        <div className="m-auto">
                            <FontAwesomeIcon icon={faX} size={"sm"} />
                        </div>
                    </div>
                </div>
                <div className="w-full mr-2" style={{
                    height: "calc(100% - 45px)"
                }}>
                    <DirectoryExplorer directory={currentDir}/>
                </div>
            </div>
        </div>
    )
}

export default FilesContainer