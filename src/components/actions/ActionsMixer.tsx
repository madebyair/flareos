import { ChangeEvent, useEffect, useState } from "react"
import { invoke } from "@tauri-apps/api/core"

const ActionsMixer = () => {
    const [volume, setVolume] = useState(50)

    useEffect(() => {
        invoke<string>("get_current_volume").then((r) => {
            const i = Number(r.replace("%", ""))

            setVolume(i)
        })
    }, [])

    function onChange(event : ChangeEvent<HTMLInputElement>) {
        // @ts-ignore
        setVolume(event.target.value)
        invoke("set_current_volume", { volume: event.target.value + "%" })
    }

    return (
        <div className="w-screen">
            <div className="mx-10">
                <h1>Speaker {/* TODO */}</h1>
                <input type="range" value={volume} onChange={(event) => onChange(event)}
                    className="h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 w-full"/>
            </div>
        </div>
    )
}

export default ActionsMixer