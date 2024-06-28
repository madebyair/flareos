import { useEffect, useState } from "react"
import { emit, listen } from "@tauri-apps/api/event"
import { useAtomState } from "@zedux/react"
import { userState } from "../../../state/currentUserState.ts"

const TaskbarFlareButton = () => {
    const [isStartDisplayed, setIsStartDisplayed] = useState(false)
    const [user] = useAtomState(userState)

    useEffect(() => {
        listen<undefined>("start-hide-request", () => {
            setIsStartDisplayed(false)
        })
    }, [])

    useEffect(() => {
        emit("start-display-event", {
            "user": user,
            "current": isStartDisplayed
        })
    }, [isStartDisplayed])

    function onStartClick() {
        setIsStartDisplayed(!isStartDisplayed)
    }

    return (
        <div className="mx-6 flex h-8 my-auto z-10">
            <div
                className="flex mx-2 rounded-md hover:bg-zinc-400 dark:hover:bg-zinc-800 transition duration-300 h-8 w-8 flex"
                onClick={() => onStartClick()}>
                <div className="border-4 w-5 h-5 rounded-md m-auto border-gray-700 hover:border-gray-100 transition"></div>
            </div>
        </div>
    )
}

export default TaskbarFlareButton