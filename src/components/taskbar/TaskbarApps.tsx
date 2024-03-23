import { useEffect, useState } from "react"
import { invoke } from "@tauri-apps/api/core"
import Window from "../../types/window.ts"
import getIcon from "../../manager/icon_manager.ts"
import { useAtomState } from "@zedux/react"
import { userState } from "../../state/currentUserState.ts"

type InvokeResponse = {
    windows: Array<Window>
}

const TaskbarApps = () => {
    const [windowsState, setWindows] = useState<Array<Window>>()
    const [activeWindow, setActiveWindow] = useState<string>("")

    useEffect(() => {
        const interval = setInterval(() => {
            invoke<string>("get_windows").then((r) => {
                const json : InvokeResponse = JSON.parse(r)

                const windows : Array<Window> = json.windows

                setWindows(windows)
            })

            invoke<string>("get_active_window").then((r) => {
                setActiveWindow(r.replace(/\s/g, ""))
            })
        }, 100)

        return () => {
            clearInterval(interval)
        }

    }, [])
    if (windowsState !== undefined) {
        return (
            <div className="flex">
                {windowsState.map((window, index) => (
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

    if (name == "airos" || name == "__airos_start_menu__" || name == "__airos_actions_menu__") {
        return
    }

    function activate() {
        invoke("activate", { "name": name })
    }

    useEffect(() => {
        setIcon(getIcon(user, className))
    }, [className])

    return (
        <div className="flex w-10 h-10 relative">
            <div className="w-8 h-8 flex m-auto dark:text-white rounded bg-slate-300 dark:bg-zinc-900" onClick={() => activate()}>
                <div className="m-auto">
                    {icon == "" &&
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