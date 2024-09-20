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
import User, { defaultUser } from "./types/user.ts"
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
import { invoke } from "@tauri-apps/api/core"

function App() {
    const [colorScheme] = useAtomState(colorSchemeState)
    const [component, setComponent] = useState(<Loading />)
    const [user , setUser] = useAtomState(userState)

    useEffect(() => {
        get("users").then(r => {
            if (r && Array.isArray(r)) {
                if (r.length > 0) {
                    setComponent(<Auth/>)
                } else {
                    setComponent(<Setup/>)
                }
            } else {
                setComponent(<Setup/>)
            }
        })

        if (window.location.port !== "1420") {
            window.addEventListener("contextmenu", e => e.preventDefault())
        }

        void listen("logout", () => {
            void invoke("remove_permissions", { user: user.unixUser })
            void emit("auth")
            setUser(defaultUser)
        })

        void listen("component", (event) => {
            if (event.payload == "authlogin") {
                setComponent(<AddPersonSetup />)
            }

            if (event.payload == "fromauth") {
                setComponent(<AccountFromAuth />)
            }

            if (event.payload == "auth") {
                setComponent(<Auth />)
            }

            if (event.payload == "desktop") {
                setComponent(<Desktop />)
            }

            if (event.payload == "authlogin_failed") {
                setComponent(<AccountFailed />)
            }

            if (event.payload == "authlogin_loader") {
                setComponent(<AccountLoaderFromAuth />)
            }
        })

        void listen<"light" | "dark">("theme-change", (event) => {
            localStorage.setItem("theme", user.theme)

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

        void listen<supportedLanguagesType>("language-change", (event) => {
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

        void listen("user-request", () => {
            setUser(prevUser => {
                void emit("user-response", prevUser)
                return {
                    ...prevUser
                }
            })
        })

        void listen<storeApp>("app-install", (e) => {
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

        void listen<storeApp>("app-uninstall", (e) => {
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

        void isLatest()
    }, [])

    useEffect(() => {
        localStorage.setItem("theme", user.theme)
    }, [user])


    return (
        <div className={"text-black dark:text-white " + colorScheme}>
            {component}
        </div>
    )
}

export default App