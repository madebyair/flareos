import { useEffect, useState } from "react"
import { invoke } from "@tauri-apps/api/core"

const ActionsMixer = () => {
    const [volume, setVolume] = useState(50)

    useEffect(() => {
        invoke<string>("get_current_volume").then((r) => {
            const i = Number(r.replace("%", ""))

            setVolume(i)
        })
    }, [])

    return (
        <div className="w-screen">
            <div className="mx-10">
                <h1>Speaker {/* TODO */}</h1>
                { /* @ts-ignore */ }
                <input type="range" value={volume} onChange={(event) => setVolume(event.target.value)}
                    className="h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 w-full"/>
            </div>
        </div>
    )
}

export default ActionsMixer