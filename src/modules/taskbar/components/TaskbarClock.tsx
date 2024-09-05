import useTime from "../hooks/useTime.tsx"
import { useAtomState } from "@zedux/react"
import { userState } from "../../../state/currentUserState.ts"
import { useEffect, useState } from "react"
import { emit } from "@tauri-apps/api/event"

const TaskbarClock = () => {
    const time = useTime()
    const [user] = useAtomState(userState)
    const [isActionsDisplayed, setIsActionsDisplayed] = useState(false)

    useEffect(() => {
        void emit("components-display-event", {
            "user": user,
            "current": isActionsDisplayed
        })
    }, [isActionsDisplayed])

    function onActionsClick() {
        setIsActionsDisplayed(!isActionsDisplayed)
    }

    return (
        <div className="absolute mx-12 right-0 text-gray-500 font-medium hover:text-black hover:dark:text-gray-100 h-10 flex">
            <div
                className="h-8 w-24 my-auto flex rounded-md hover:bg-zinc-400 dark:hover:bg-zinc-800 transition"
                onClick={() => onActionsClick()}>
                <span className="m-auto">{time}</span>
            </div>
        </div>
    )
}

export default TaskbarClock