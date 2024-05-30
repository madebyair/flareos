// @ts-ignore
import airsmallBlack from "../../../assets/images/airsmall-black.webp"
// @ts-ignore
import airsmallWhite from "../../../assets/images/airsmall-white.webp"
import { useEffect, useState } from "react"
import { emit, listen } from "@tauri-apps/api/event";
import { useAtomState } from "@zedux/react";
import { userState } from "../../../state/currentUserState.ts";

const TaskbarAirButton = () => {
    const [isStartDisplayed, setIsStartDisplayed] = useState(false)
    const [user] = useAtomState(userState)

    useEffect(() => {
        listen<undefined>("start-hide-request", () => {
            setIsStartDisplayed(false)
        })
    }, []);

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
                className="flex mx-2 rounded-md hover:bg-zinc-400 dark:hover:bg-zinc-800 transition duration-300 h-8 w-8"
                onClick={() => onStartClick()}>
                <img src={airsmallBlack} alt="" className="block dark:hidden"/>
                <img src={airsmallWhite} alt="" className="hidden dark:block"/>
            </div>
        </div>
    )
}

export default TaskbarAirButton