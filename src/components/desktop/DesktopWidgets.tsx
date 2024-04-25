import { useAtomState } from "@zedux/react"
import { userState } from "../../state/currentUserState.ts"
import Widget from "./Widget.tsx"
import { listen } from "@tauri-apps/api/event"
import { useEffect } from "react"
import { getCurrent } from "@tauri-apps/api/window"
import { get, set } from "../../manager/store_manager.ts"
import User from "../../types/user.ts"
import { Widget as WidgetType } from "../../types/widget.ts"

const DesktopWidgets = () => {
    const [user, setUser] = useAtomState(userState)

    useEffect(() => {
        listen<WidgetType>("widget-add", (event) => {
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
        <div className="w-screen absolute top-0 z-10" style={{height: "calc(100vh - 40px)",}}>
            {user.widgets.map((k) => {
                if (k == null) return

                return (
                    <Widget w={k} key={k.component} />
                )
            })}
        </div>
    )
}

export default DesktopWidgets