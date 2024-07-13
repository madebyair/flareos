import "./assets/css/App.css"
import Setup from "./modules/setup/Setup.tsx"
import { useAtomState } from "@zedux/react"
import { colorSchemeState } from "./state/themeState.ts"
import "./i18n"
import { useEffect, useState } from "react"
import { get, set } from "./manager/store_manager.ts"
import Auth from "./modules/auth/Auth.tsx"
import { emit, listen } from "@tauri-apps/api/event"
import { userState } from "./state/currentUserState.ts"
import User from "./types/user.ts"
import { install, uninstall } from "./manager/install_manager.ts"
import { storeApp } from "./types/storeApp.ts"
import { supportedLanguagesType } from "./types/supportedLanguages.ts"
import isLatest from "./modules/updater/isLatest.ts"
import Loading from "./components/Loading.tsx"
import AccountFromAuth from "./modules/setup/account/AccountFromAuth.tsx"
import Desktop from "./components/desktop/Desktop.tsx"
import AddPersonSetup from "./modules/setup/account/AddPersonSetup.tsx"
import { AccountFailed } from "./modules/setup/loaders/AccountLoader.tsx"
import AccountLoaderFromAuth from "./modules/setup/account/AccountLoaderFromAuth.tsx"

function App() {
    const [colorScheme] = useAtomState(colorSchemeState)
    const [component, setCompoment] = useState(<Loading />)
    const [user , setUser] = useAtomState(userState)

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

        if (window.location.port !== "1420") {
            window.addEventListener("contextmenu", e => e.preventDefault())
        }

        listen("component", (event) => {
            if (event.payload == "authlogin") {
                setCompoment(<AddPersonSetup />)
            }

            if (event.payload == "fromauth") {
                setCompoment(<AccountFromAuth />)
            }

            if (event.payload == "auth") {
                setCompoment(<Auth />)
            }

            if (event.payload == "desktop") {
                setCompoment(<Desktop />)
            }

            if (event.payload == "authlogin_failed") {
                setCompoment(<AccountFailed />)
            }

            if (event.payload == "authlogin_loader") {
                setCompoment(<AccountLoaderFromAuth />)
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

        listen<supportedLanguagesType>("language-change", (event) => {
            setUser(prevUser => {
                get("users").then((r) => {
                    const cur: unknown = r

                    if (Array.isArray(cur)) {
                        const indexToUpdate = cur.findIndex((key: User) => key.uuid === prevUser.uuid)
                        if (indexToUpdate !== -1) {
                            cur[indexToUpdate].language = event.payload
                            set("users", cur)
                        }
                    }
                })
                return {
                    ...prevUser,
                    language: event.payload
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

        listen<storeApp>("app-install", (e) => {
            const app = e.payload
            
            install(app, user.uuid).then(r => {
                if (r) {
                    setUser(prevUser => {
                        const state = {
                            ...prevUser,
                            apps: [...prevUser.apps, r]
                        }

                        get("users").then((r) => {
                            const cur: unknown = r

                            if (Array.isArray(cur)) {
                                const indexToUpdate = cur.findIndex((key: User) => key.uuid === prevUser.uuid)
                                if (indexToUpdate !== -1) {
                                    cur[indexToUpdate] = state
                                    set("users", cur)
                                }
                            }
                        })

                        return state
                    })
                }
            })
        })

        listen<storeApp>("app-uninstall", (e) => {
            const app = e.payload
            
            uninstall(app).then(() => {
                setUser(prevUser => {
                    // @ts-ignore
                    const filteredArray = prevUser.apps.filter(item => ![app.uuid].includes(item.uuid))

                    const state = {
                        ...prevUser,
                        apps: filteredArray
                    }

                    get("users").then((r) => {
                        const cur: unknown = r

                        if (Array.isArray(cur)) {
                            const indexToUpdate = cur.findIndex((key: User) => key.uuid === prevUser.uuid)
                            if (indexToUpdate !== -1) {
                                cur[indexToUpdate] = state
                                set("users", cur)
                            }
                        }
                    })

                    return state
                })
            })
        })

        isLatest()
    }, [])


    return (
        <div className={"text-black dark:text-white " + colorScheme}>
            {component}
        </div>
    )
}

export default App