import { useEffect, useState } from "react"
import User, { defaultUser } from "../../../types/user.ts"
import { useTranslation } from "react-i18next"
import { emit, listen } from "@tauri-apps/api/event"
import "../../../assets/css/App.css"

const CalculatorContainer = () => {
    const [user, setUser] = useState<User>(defaultUser)
    const [, i18n] = useTranslation()


    useEffect(() => {
        void emit("user-request")

        void listen<User>("user-response", (r) => {
            setUser(r.payload)
            void i18n.changeLanguage(r.payload.language)
        })

        void listen<"light" | "dark">("theme-change", (event) => {
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
            <div className="w-screen h-screen bg-slate-200 dark:bg-black">
                <div className="transition w-screen h-screen select-none dark:text-white">
                    <div className="h-2/6 bg-slate-300 dark:bg-zinc-800 flex justify-end items-center">
                        <div className="mr-4 text-2xl font-bold">
                            256
                        </div>
                    </div>
                    <div className="h-[66%] w-screen flex">
                        <div className="w-11/12 h-[96%] m-auto">
                            <div className="w-full h-16 flex justify-between mt-7">
                                <div
                                    className="w-1/6 h-12 bg-slate-300 dark:bg-zinc-800 hover:bg-slate-300/60 hover:dark:bg-zinc-800/70 rounded-md flex">
                                    <h1 className="font-medium text-lg m-auto">CLR</h1>
                                </div>
                                <div
                                    className="w-1/6 h-12 bg-slate-300 dark:bg-zinc-800 hover:bg-slate-300/60 hover:dark:bg-zinc-800/70 rounded-md flex">
                                    <h1 className="font-medium text-lg m-auto">(</h1>
                                </div>
                                <div
                                    className="w-1/6 h-12 bg-slate-300 dark:bg-zinc-800 hover:bg-slate-300/60 hover:dark:bg-zinc-800/70 rounded-md flex">
                                    <h1 className="font-medium text-lg m-auto">)</h1>
                                </div>
                                <div
                                    className="w-1/6 h-12 bg-slate-300 dark:bg-zinc-800 hover:bg-slate-300/60 hover:dark:bg-zinc-800/70 rounded-md flex">
                                    <h1 className="font-medium text-lg m-auto">mod</h1>
                                </div>
                                <div
                                    className="w-1/6 h-12 bg-slate-300 dark:bg-zinc-800 hover:bg-slate-300/60 hover:dark:bg-zinc-800/70 rounded-md flex">
                                    <h1 className="font-medium text-lg m-auto">π</h1>
                                </div>
                            </div>
                            <div className="w-full h-16 flex justify-between">
                                <div
                                    className="w-1/6 h-12 bg-slate-300 dark:bg-zinc-800 hover:bg-slate-300/60 hover:dark:bg-zinc-800/70 rounded-md flex">
                                    <h1 className="font-medium text-lg m-auto">7</h1>
                                </div>
                                <div
                                    className="w-1/6 h-12 bg-slate-300 dark:bg-zinc-800 hover:bg-slate-300/60 hover:dark:bg-zinc-800/70 rounded-md flex">
                                    <h1 className="font-medium text-lg m-auto">8</h1>
                                </div>
                                <div
                                    className="w-1/6 h-12 bg-slate-300 dark:bg-zinc-800 hover:bg-slate-300/60 hover:dark:bg-zinc-800/70 rounded-md flex">
                                    <h1 className="font-medium text-lg m-auto">9</h1>
                                </div>
                                <div
                                    className="w-1/6 h-12 bg-slate-300 dark:bg-zinc-800 hover:bg-slate-300/60 hover:dark:bg-zinc-800/70 rounded-md flex">
                                    <h1 className="font-medium text-lg m-auto">÷</h1>
                                </div>
                                <div
                                    className="w-1/6 h-12 bg-slate-300 dark:bg-zinc-800 hover:bg-slate-300/60 hover:dark:bg-zinc-800/70 rounded-md flex">
                                    <h1 className="font-medium text-lg m-auto">√</h1>
                                </div>
                            </div>
                            <div className="w-full h-16 flex justify-between">
                                <div
                                    className="w-1/6 h-12 bg-slate-300 dark:bg-zinc-800 hover:bg-slate-300/60 hover:dark:bg-zinc-800/70 rounded-md flex">
                                    <h1 className="font-medium text-lg m-auto">4</h1>
                                </div>
                                <div
                                    className="w-1/6 h-12 bg-slate-300 dark:bg-zinc-800 hover:bg-slate-300/60 hover:dark:bg-zinc-800/70 rounded-md flex">
                                    <h1 className="font-medium text-lg m-auto">5</h1>
                                </div>
                                <div
                                    className="w-1/6 h-12 bg-slate-300 dark:bg-zinc-800 hover:bg-slate-300/60 hover:dark:bg-zinc-800/70 rounded-md flex">
                                    <h1 className="font-medium text-lg m-auto">6</h1>
                                </div>
                                <div
                                    className="w-1/6 h-12 bg-slate-300 dark:bg-zinc-800 hover:bg-slate-300/60 hover:dark:bg-zinc-800/70 rounded-md flex">
                                    <h1 className="font-medium text-lg m-auto">×</h1>
                                </div>
                                <div
                                    className="w-1/6 h-12 bg-slate-300 dark:bg-zinc-800 hover:bg-slate-300/60 hover:dark:bg-zinc-800/70 rounded-md flex">
                                    <h1 className="font-medium text-lg m-auto">x²</h1>
                                </div>
                            </div>
                            <div className="w-full h-16 flex justify-between">
                                <div
                                    className="w-1/6 h-12 bg-slate-300 dark:bg-zinc-800 hover:bg-slate-300/60 hover:dark:bg-zinc-800/70 rounded-md flex">
                                    <h1 className="font-medium text-lg m-auto">1</h1>
                                </div>
                                <div
                                    className="w-1/6 h-12 bg-slate-300 dark:bg-zinc-800 hover:bg-slate-300/60 hover:dark:bg-zinc-800/70 rounded-md flex">
                                    <h1 className="font-medium text-lg m-auto">2</h1>
                                </div>
                                <div
                                    className="w-1/6 h-12 bg-slate-300 dark:bg-zinc-800 hover:bg-slate-300/60 hover:dark:bg-zinc-800/70 rounded-md flex">
                                    <h1 className="font-medium text-lg m-auto">3</h1>
                                </div>
                                <div
                                    className="w-1/6 h-12 bg-slate-300 dark:bg-zinc-800 hover:bg-slate-300/60 hover:dark:bg-zinc-800/70 rounded-md flex">
                                    <h1 className="font-medium text-lg m-auto">-</h1>
                                </div>
                                <div
                                    className="w-1/6 h-[112px] bg-slate-300 dark:bg-zinc-800 hover:bg-slate-300/60 hover:dark:bg-zinc-800/70 rounded-md flex">
                                    <h1 className="font-medium text-2xl m-auto">\=</h1>
                                </div>
                            </div>
                            <div className="w-full h-16 flex justify-between">
                                <div
                                    className="w-1/6 h-12 bg-slate-300 dark:bg-zinc-800 hover:bg-slate-300/60 hover:dark:bg-zinc-800/70 rounded-md flex">
                                    <h1 className="font-medium text-lg m-auto">0</h1>
                                </div>
                                <div
                                    className="w-1/6 h-12 bg-slate-300 dark:bg-zinc-800 hover:bg-slate-300/60 hover:dark:bg-zinc-800/70 rounded-md flex">
                                    <h1 className="font-medium text-lg m-auto">.</h1>
                                </div>
                                <div
                                    className="w-1/6 h-12 bg-slate-300 dark:bg-zinc-800 hover:bg-slate-300/60 hover:dark:bg-zinc-800/70 rounded-md flex">
                                    <h1 className="font-medium text-lg m-auto">%</h1>
                                </div>
                                <div
                                    className="w-1/6 h-12 bg-slate-300 dark:bg-zinc-800 hover:bg-slate-300/60 hover:dark:bg-zinc-800/70 rounded-md flex">
                                    <h1 className="font-medium text-lg m-auto">+</h1>
                                </div>
                                <div
                                    className="w-1/6 h-12">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CalculatorContainer