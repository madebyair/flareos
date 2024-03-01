import { useEffect, useState } from "react"
import { invoke } from "@tauri-apps/api/core"
import Window from "../../types/window.ts"

type InvokeResponse = {
    windows: Array<Window>
}

const TaskbarApps = () => {
    const [windowsState, setWindows] = useState<Array<Window>>()

    useEffect(() => {
        invoke<string>("get_windows").then((r) => {
            const json : InvokeResponse = JSON.parse(r)
            const windows : Array<Window> = json.windows

            setWindows(windows)
        })
    }, [])
    if (windowsState !== undefined) {
        return (
            <div className="flex">
                {windowsState.map((window, index) => (
                    <TaskbarApp key={index} name={window.name} className={window.className.split(".")[0]} />
                ))}
            </div>
        )
    } else {
        return <></>
    }
}

const TaskbarApp = ({className} : Window) => {
    if (className == "airos") {
        return
    }

    return (
        <div className="flex w-10 h-10">
            <div className="w-8 h-8 flex m-auto dark:text-white rounded bg-slate-300 dark:bg-zinc-900">
                <div className="m-auto">
                    {className.charAt(0).toUpperCase()}
                </div>
            </div>
        </div>
    )
}

export default TaskbarApps