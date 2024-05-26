import { useAtomState } from "@zedux/react"
import "../../assets/css/App.css"
import { currentDirState } from "./filesState.tsx"
import DirectoryExplorer from "./explorer/DirectoryExplorer.tsx"
import { useEffect, useState } from "react"
import { emit, listen } from "@tauri-apps/api/event"
import User, { defaultUser } from "../../types/user.ts"
import "../../i18n.ts"
import { useTranslation } from "react-i18next"
import FilesSidebar from "./FilesSidebar.tsx"

const FilesContainer = () => {
    // @ts-ignore
    const [currentDir] = useAtomState(currentDirState)
    const [user, setUser] = useState<User>(defaultUser)
    const [ , i18n ] = useTranslation()

    useEffect(() => {
        emit("user-request")

        listen<User>("user-response", (r) => {
            setUser(r.payload)
            i18n.changeLanguage(r.payload.language)
        })

        listen<"light" | "dark">("theme-change", (event) => {
            setUser(prevUser => ({
                ...prevUser,
                theme: event.payload
            }))
        })

        if (window.location.port !== "1420") {
            window.addEventListener("contextmenu", e => e.preventDefault())
        }

    }, [])

    return (
        <div className={user.theme}>
            <div className="w-screen h-screen bg-slate-300 dark:bg-zinc-900 select-none dark:text-white flex">
                <div className="w-1/4 h-screen" data-tauri-drag-region={true}>
                    <FilesSidebar />
                </div>
                <div className="w-3/4">
                    <div className="w-full p-4 h-full">
                        <DirectoryExplorer directory={currentDir}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilesContainer