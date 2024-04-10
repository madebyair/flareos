import Taskbar from "../taskbar/Taskbar.tsx"
import { useAtomState } from "@zedux/react"
import { userState } from "../../state/currentUserState.ts"
import { useEffect, useState } from "react"
import DesktopContextMenu from "./DesktopContextMenu.tsx"
import { useDetectClickOutside } from "react-detect-click-outside"
import { listen } from "@tauri-apps/api/event"
import { getCurrent } from "@tauri-apps/api/window"
import Button from "../../elements/Button.tsx"
import Draggable, { DraggableEvent } from "react-draggable"
import ClockWidget from "../widgets/clock/ClockWidget.tsx"
import { useTranslation } from "react-i18next"

const Desktop = () => {
    const [user] = useAtomState(userState)
    const [context, setContext] = useState({
        x: 0,
        y: 0,
        displayed: false
    })
    const [ t ] = useTranslation()
    const [selectPlace, setSelectPlace] = useState(false)
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

        listen("widget-add", () => {
            getCurrent().setAlwaysOnTop(true)
            setSelectPlace(true)
        })
    }, [])

    function event(e: DraggableEvent) {
        if ("screenY" in e) {
            console.log(e.screenY)
        }
    }

    return (
        <div className={"desktop-bg w-screen h-screen bg-black relative select-none overflow-hidden " + user.theme}>
            {selectPlace &&
                <div className="w-screen h-screen z-[100] bg-zinc-950/40 absolute top-0 dark:text-white">
                    <div className="flex w-screen">
                        <div className="mx-auto flex">
                            <h1 className="text-center mt-2 text-lg">{t("Select place for Widget")} {/* TODO get widget name */}</h1>
                            <div className="mt-1 ml-4">
                                <Button submit={() => {
                                    getCurrent().setAlwaysOnTop(false)
                                    setSelectPlace(false)
                                }} label={t("Close")} />
                            </div>
                        </div>
                    </div>
                    <Draggable
                        defaultPosition={{x: 0, y: 0}}
                        onStop={(e) => event(e)}
                        scale={1}>
                        <div>
                            { /* TODO get widget from payload */ }
                            <ClockWidget />
                        </div>
                    </Draggable>
                </div>
            }
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