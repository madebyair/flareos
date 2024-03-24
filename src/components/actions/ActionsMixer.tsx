import { ChangeEvent, useEffect, useState } from "react"
import { invoke } from "@tauri-apps/api/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

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
                <h1 className="hover:bg-gray-500 transition duration-300 w-32 rounded-md">Speaker {/* TODO */} <FontAwesomeIcon icon={faArrowRight} /></h1>
                <input type="range" value={volume} onChange={(event) => onChange(event)}
                    className="h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 w-full"/>
            </div>
        </div>
    )
}

export default ActionsMixer