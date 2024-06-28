import { Key, useEffect, useState } from "react"
import { invoke } from "@tauri-apps/api/core"
import Window from "../../../types/window.ts"
import { useAtomState } from "@zedux/react"
import useActiveWindow from "../hooks/useActiveWindow.tsx"
import useWindows from "../hooks/useWindows.tsx"
import { userState } from "../../../state/currentUserState.ts"
import getIcon from "../../../manager/icon_manager.ts"

const TaskbarApps = () => {
    const windows = useWindows()
    const activeWindow = useActiveWindow()

    if (windows !== undefined) {
        return (
            <div className="flex">
                {windows.map((window: Window, index: Key | null | undefined) => (
                    <TaskbarApp key={index} name={window.name} className={window.className.split(".")[1]} active={activeWindow} />
                ))}
            </div>
        )
    } else {
        return <></>
    }
}

const TaskbarApp = ({name, className, active} : {name: string, className: string, active: string}) => {
    const [icon, setIcon] = useState("")
    const [user] = useAtomState(userState)


    function activate() {
        invoke("activate", { "name": name })
    }

    useEffect(() => {
        if (className) {
            setIcon(getIcon(user, className))
        }
    }, [className, user])

    if (name == "FlareOS" || name == "__FlareOS_start_menu__" || name == "__FlareOS_actions_menu__") {
        return
    }

    return (
        <div className="flex w-10 h-10 relative">
            <div className="w-8 h-8 flex m-auto dark:text-white rounded bg-slate-300 dark:bg-zinc-900" onClick={() => activate()}>
                <div className="m-auto">
                    {icon === "" && className && className.length > 0 &&
                        className.charAt(0).toUpperCase()
                    }
                    {icon !== "" &&
                        <img src={icon} alt=""/>
                    }
                </div>
            </div>
            {active === name &&
                <div className="absolute bottom-0 w-full h-1.5 flex">
                    <div className="mx-auto h-1.5 w-1.5 bg-black dark:bg-white rounded-full"><></></div>
                </div>
            }
        </div>
    )
}

export default TaskbarApps