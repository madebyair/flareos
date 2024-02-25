import "../../assets/css/App.css"
import { useEffect } from "react"
import { listen } from "@tauri-apps/api/event"
import { getCurrent } from "@tauri-apps/api/window"
import User from "../../types/user.ts"
import { useAtomState } from "@zedux/react"
import { userState } from "../../state/currentUserState.ts"
import { WebviewWindow } from "@tauri-apps/api/webviewWindow"

type EventResponse = {
    user: User,
    current: boolean
}

const StartComponent = () => {
    const [user, setUser] = useAtomState(userState)

    useEffect(() => {
        listen<EventResponse>("start-display-event", (event) => {
            setUser(event.payload.user)

            console.log(event.payload.user)

            if (!event.payload.current) {
                getCurrent().hide()
            } else {
                getCurrent().show()
            }
        })
    }, [])

    function run(command : string) {
        switch (command) {
        case "__airos_emebed_app_terminal__":
            new WebviewWindow("terminal", {
                "url": "terminal.html",
                "title": "Terminal"
            })
        }
    }

    return (
        <div className="start bg-slate-200/95 dark:bg-zinc-950/95 w-screen h-screen rounded-xl">
            <div>
                <div className="mx-4 pt-2">
                    {user.apps.map(function (app) {
                        return (
                            <div key={app.name} onClick={() => run(app.exec)} className="mx-8 mt-2 hover:bg-slate-300 dark:hover:bg-black transition duration-300 rounded-md w-20 h-24">
                                <div className="flex w-20">
                                    <img src={app.icon} alt="" width="60px" height="60px" className="m-auto"/>
                                </div>
                                <div className="text-center w-20">
                                    {app.name}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default StartComponent