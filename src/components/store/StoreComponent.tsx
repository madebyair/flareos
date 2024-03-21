import { useEffect, useState } from "react"
import { emit, listen } from "@tauri-apps/api/event"
import User, { defaultUser } from "../../types/user.ts"
import { useTranslation } from "react-i18next"
import "../../assets/css/App.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons"
import { useAtomState } from "@zedux/react"
import { storeComponent } from "./storeState.tsx"
import StoreApps from "./StoreApps.tsx"

const StoreComponent = () => {
    const [user, setUser] = useState<User>(defaultUser)
    const [input, setInput] = useState("")
    const [, i18n] = useTranslation()
    const [component, setComponent] = useAtomState(storeComponent)
    const [t] = useTranslation()

    useEffect(() => {
        emit("user-request")

        listen<User>("user-response", (r) => {
            setUser(r.payload)
            i18n.changeLanguage(r.payload.language)
        })

        listen<"light" | "dark">("theme-change", (event) => {
            setUser(prevUser => ({
                ...prevUser,
                theme: event.payload
            }))
        })

        if (window.location.port !== "1420") {
            window.addEventListener("contextmenu", e => e.preventDefault())
        }

    }, [])

    return (
        <div className={user.theme}>
            {user.theme == "dark" &&
                <style>{" :root {\n" +
                    "        --base-color: #2b2929;\n" +
                    "        --highlight-color: #312f2f;\n" +
                    "    }"}</style>
            }
            <div className="w-screen h-screen bg-slate-200 dark:bg-black dark:text-white select-none ">
                <div className="w-full h-24">
                    <div className="h-24 w-full flex">
                        <div className="w-[200px] h-24 flex">
                            <div className="m-auto">
                                <img src="/src/assets/images/airstorewhite.png" alt=""/>
                            </div>
                        </div>
                        <div className="m-auto">
                            <div className="relative">
                                <div
                                    className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none fill-black dark:fill-white">
                                    <FontAwesomeIcon icon={faSearch}/>
                                </div>
                                <input
                                    type="text"
                                    placeholder={t("Search...")}
                                    className="outline-none bg-transparent border-b-gray-300 rounded-md py-2 px-10 focus:outline-none focus:border-purple-500"
                                    value={input}
                                    onChange={(event) => setInput(event.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex">
                    <div className="w-1/4">
                        <div className="mt-8 w-10/12 text-xl font-bold ml-4" onClick={() => setComponent(<StoreApps channel="home" />)}>
                            <FontAwesomeIcon icon={faHome}/>
                            <span className="ml-4">{t("Home")}</span>
                        </div>
                    </div>
                    <div className="w-3/4 h-scren overflow-auto">
                        <div style={{overflowX: "auto"}}>
                            {component}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StoreComponent
