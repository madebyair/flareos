import { Key, useEffect, useState } from "react"
import Window from "../../../types/window.ts"
import { useAtomState } from "@zedux/react"
import useActiveWindow from "../hooks/useActiveWindow.tsx"
import useWindows from "../hooks/useWindows.tsx"
import { userState } from "../../../state/currentUserState.ts"
import getIcon from "../../../manager/icon_manager.ts"
import { invoke } from "@tauri-apps/api/core"

const TaskbarApps = () => {
    const windows = useWindows()
    const activeWindow = useActiveWindow()
    const [visibleWindows, setVisibleWindows] = useState<Window[]>([])
    const [closingWindows, setClosingWindows] = useState<string[]>([])

    useEffect(() => {
        setVisibleWindows((prevWindows) => {
            const newWindows = windows.map(window => window.name)
            const windowsToRemove = prevWindows.filter(window => !newWindows.includes(window.name))

            windowsToRemove.forEach((removedWindow) => {
                if (!closingWindows.includes(removedWindow.name)) {
                    setClosingWindows(prev => [...prev, removedWindow.name])
                }
            })

            return windows
        })
    }, [windows])

    return (
        <div className="flex space-x-2 px-2 py-1 bg-slate-100 dark:bg-zinc-800 rounded-lg shadow-md">
            <style>{styles}</style>
            {visibleWindows.map((window: Window, index: Key | null | undefined) => (
                <TaskbarApp
                    key={index}
                    name={window.name}
                    className={window.className.split(".")[1]}
                    active={activeWindow}
                    onRemove={() => setClosingWindows(closingWindows.filter(name => name !== window.name))}
                    isClosing={closingWindows.includes(window.name)}
                />
            ))}
        </div>
    )
}

const TaskbarApp = ({ name, className, active, onRemove, isClosing }: { name: string, className: string, active: string, onRemove: () => void, isClosing: boolean }) => {
    const [icon, setIcon] = useState("")
    const [user] = useAtomState(userState)

    useEffect(() => {
        if (className) {
            setIcon(getIcon(user, className))
        }
    }, [className, user])

    useEffect(() => {
        if (isClosing) {
            setTimeout(onRemove, 300)
        }
    }, [isClosing, onRemove])

    function activate() {
        void invoke("activate", { "name": name })
    }

    if (name === "FlareOS" || name === "__FlareOS_start_menu__" || name === "__FlareOS_actions_menu__" || name === "__FlareOS_launcher__") {
        return null
    }

    return (
        <div
            id={`taskbar-app-${name}`}
            onClick={activate}
            className={`relative w-12 h-12 flex justify-center items-center cursor-pointer rounded-lg hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors duration-200 ${isClosing ? "animate-fade-out" : "animate-fade-in"}`}
        >
            <div className={`w-10 h-10 flex items-center justify-center ${active.toLowerCase() === name.toLowerCase() ? "bg-slate-400 dark:bg-zinc-600" : "bg-slate-300 dark:bg-zinc-900"} rounded-md`}>
                {icon === "" && className && className.length > 0 && (
                    <span className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                        {className.charAt(0).toUpperCase()}
                    </span>
                )}
                {icon !== "" && (
                    <img src={icon} alt={name} className="w-6 h-6" />
                )}
            </div>
            {active == name.replaceAll(" ", "") && (
                <div className="absolute bottom-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-md animate-pulse"></div>
            )}
        </div>
    )
}

const styles = `
@keyframes scale-in {
    from {
        transform: scale(0);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes scale-out {
    from {
        transform: scale(1);
        opacity: 1;
    }
    to {
        transform: scale(0);
        opacity: 0;
    }
}

.animate-fade-in {
    animation: scale-in 0.3s ease-out forwards;
}

.animate-fade-out {
    animation: scale-out 0.3s ease-out forwards;
}
`

export default TaskbarApps
