import Taskbar from "../taskbar/Taskbar.tsx"
import { useAtomState } from "@zedux/react"
import { userState } from "../../state/currentUserState.ts"
import { useEffect, useState } from "react"
import DesktopContextMenu from "./DesktopContextMenu.tsx"
import { useDetectClickOutside } from "react-detect-click-outside"
import { listen } from "@tauri-apps/api/event"
import { getCurrent } from "@tauri-apps/api/window"
import DesktopWidgets from "./DesktopWidgets.tsx"
import { Widget } from "../../types/widget.ts"
import { get, set } from "../../manager/store_manager.ts"
import User from "../../types/user.ts"

const Desktop = () => {
    const [user, setUser] = useAtomState(userState)
    const [context, setContext] = useState({
        x: 0,
        y: 0,
        displayed: false
    })
    const ref = useDetectClickOutside({ allowAnyKey: true, onTriggered: () => setContext({x: 0, y: 0, displayed: false}) })

    useEffect(() => {
        // @ts-ignore
        document.getElementById("desktop").addEventListener("contextmenu", e => {
            e.preventDefault()
            setContext({
                x: e.clientX,
                y: e.clientY,
                displayed: true
            })
        })

        listen<Widget>("widget-add", (event) => {
            const payload = event.payload
            getCurrent().setFocus()
            setUser(prev => {
                get("users").then((r) => {
                    const cur: unknown = r

                    if (Array.isArray(cur)) {
                        const indexToUpdate = cur.findIndex((key: User) => key.uuid === prev.uuid)
                        if (indexToUpdate !== -1) {
                            cur[indexToUpdate].widgets.push(payload)
                            set("users", cur)
                        }
                    }
                })
                prev.widgets.push(payload)
                return prev
            })
        })
    }, [])

    return (
        <div className={"desktop-bg w-screen h-screen bg-black relative select-none overflow-hidden " + user.theme} id="desktop">
            <DesktopWidgets />
            <div ref={ref}>
                {/* @ts-ignore */}
                <DesktopContextMenu context={context} hide={() => setContext({x: 0, y: 0, displayed: false})}/>
            </div>
            <div className="absolute bottom-0">
                <Taskbar/>
            </div>
        </div>
    )
}

export default Desktop