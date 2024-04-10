import Taskbar from "../taskbar/Taskbar.tsx"
import { useAtomState } from "@zedux/react"
import { userState } from "../../state/currentUserState.ts"
import { useEffect, useState } from "react"
import DesktopContextMenu from "./DesktopContextMenu.tsx"
import { useDetectClickOutside } from "react-detect-click-outside"

const Desktop = () => {
    const [user] = useAtomState(userState)
    const [context, setContext] = useState({
        x: 0,
        y: 0,
        displayed: false
    })
    const ref = useDetectClickOutside({ allowAnyKey: true, onTriggered: () => setContext({x: 0, y: 0, displayed: false}) })

    useEffect(() => {
        window.addEventListener("contextmenu", e => {
            e.preventDefault()
            setContext({
                x: e.clientX,
                y: e.clientY,
                displayed: true
            })
        })
    }, [])

    return (
        <div className={"desktop-bg w-screen h-screen bg-black relative select-none overflow-hidden " + user.theme}>
            <div ref={ref}>
                {/* @ts-ignore */}
                <DesktopContextMenu context={context} />
            </div>
            <div className="absolute bottom-0">
                <Taskbar />
            </div>
        </div>
    )
}

export default Desktop