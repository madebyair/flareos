import { useState } from "react"

const ActionsMixer = () => {
    const [volume, setVolume] = useState(50)

    // TODO implement current volume

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