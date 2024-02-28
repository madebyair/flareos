import "./assets/css/App.css"
import Setup from "./components/setup/Setup.tsx"
import { useAtomState } from "@zedux/react"
import { colorSchemeState } from "./state/themeState.ts"
import "./i18n"
import { useEffect, useState } from "react"
import { get, set } from "./store_manager.ts"
import Loading from "./components/Loading.tsx"
import Auth from "./components/auth/Auth.tsx"
import { emit, listen } from "@tauri-apps/api/event"
import { userState } from "./state/currentUserState.ts"
import User from "./types/user.ts"

function App() {
    const [colorScheme] = useAtomState(colorSchemeState)
    const [component, setCompoment] = useState(<Loading/>)
    const [, setUser] = useAtomState(userState)

    useEffect(() => {
        get("users").then(r => {
            if (r && Array.isArray(r)) {
                if (r.length > 0) {
                    setCompoment(<Auth/>)
                } else {
                    setCompoment(<Setup/>)
                }
            } else {
                setCompoment(<Setup/>)
            }
        })

        listen<"light" | "dark">("theme-change", (event) => {
            setUser(prevUser => {
                get("users").then((r) => {
                    const cur: unknown = r

                    if (Array.isArray(cur)) {
                        const indexToUpdate = cur.findIndex((key: User) => key.uuid === prevUser.uuid)
                        if (indexToUpdate !== -1) {
                            cur[indexToUpdate].theme = event.payload
                            set("users", cur)
                        }
                    }
                })
                return {
                    ...prevUser,
                    theme: event.payload
                }
            })
        })

        listen("user-request", () => {
            setUser(prevUser => {
                emit("user-response", prevUser)
                return {
                    ...prevUser
                }
            })
        })
    }, [])


    return (
        <div className={"text-black dark:text-white " + colorScheme}>
            {component}
        </div>
    )
}

export default App