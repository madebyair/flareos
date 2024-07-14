import { Widget as WidgetType } from "../../types/widget.ts"
import ClockWidget from "../widgets/clock/ClockWidget.tsx"
import Draggable from "react-draggable"
import { get, set } from "../../manager/store_manager.ts"
import User from "../../types/user.ts"
import { useAtomState } from "@zedux/react"
import { userState } from "../../state/currentUserState.ts"
import { useState } from "react"

const Widget = ({ w }: { w: WidgetType }) => {
    const [, setUser] = useAtomState(userState)
    const [x, setX] = useState(w.x)
    const [y, setY] = useState(w.y)

    // @ts-ignore
    const handle = (event, dragElement: { x: number; y: number }) => {
        setX(dragElement.x)
        setY(dragElement.y)
        setUser((prevUser: User) => {
            get("users").then((r) => {
                const cur: unknown = r

                if (Array.isArray(cur)) {
                    const indexToUpdate = cur.findIndex((key: User) => key.uuid === prevUser.uuid)
                    if (indexToUpdate !== -1) {
                        const widgetIndex = cur[indexToUpdate].widgets.findIndex((key: WidgetType) => key.component === w.component)
                        cur[indexToUpdate].widgets[widgetIndex].x = dragElement.x
                        cur[indexToUpdate].widgets[widgetIndex].y = dragElement.y
                        set("users", cur)
                    }
                }
            })
            return { ...prevUser }
        })
    }

    let component: JSX.Element = <ClockWidget />

    if (w.component === "clockwidget") {
        component = <ClockWidget />
    }
    return (
        <Draggable
            key={w.name + w.x}
            position={{ x: x, y: y }}
            scale={1}
            onStop={handle}
            bounds="parent"
            onMouseDown={(event) => {
                if (event.button == 1) {
                    // @ts-ignore
                    setUser((prevUser: User) => {
                        get("users").then((r) => {
                            const cur: unknown = r

                            if (Array.isArray(cur)) {
                                const indexToUpdate = cur.findIndex((key: User) => key.uuid === prevUser.uuid)
                                if (indexToUpdate !== -1) {
                                    const widgetIndex = cur[indexToUpdate].widgets.findIndex((key: WidgetType) => key.component === w.component)
                                    const widgets = cur[indexToUpdate].widgets
                                    const fixed: WidgetType[] = []
                                    delete widgets[widgetIndex]
                                    widgets.forEach((widget: WidgetType) => {
                                        if (widget !== null) {
                                            fixed.push(widget)
                                        }
                                    })
                                    cur[indexToUpdate].widgets = fixed
                                    set("users", cur)
                                }
                            }
                        })
                        const index = prevUser.widgets.findIndex((key: WidgetType) => key.component === w.component)
                        delete prevUser.widgets[index]
                        if (!prevUser) {
                            return []
                        }
                        return prevUser
                    })
                }
            }}
            defaultClassName="w-max"
        >
            <div>{component}</div>
        </Draggable>
    )
}

export default Widget
