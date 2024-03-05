import { useAtomState } from "@zedux/react"
import { filesComponent } from "./filesState.tsx"
import "../../assets/css/App.css"

const FilesContainer = () => {
    // @ts-ignore
    const [component] = useAtomState(filesComponent)

    return (
        <div className="w-screen h-screen bg-slate-300 dark:bg-zinc-950 select-none dark:text-white flex">
            <div className="w-1/3 h-screen">
                Sidebar
            </div>
            <div className="w-2/3 h-screen">
                {component.component}
            </div>
        </div>
    )
}

export default FilesContainer