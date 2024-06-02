import { ChangeEvent, useEffect, useState } from "react"
import { invoke } from "@tauri-apps/api/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { useAtomState } from "@zedux/react"
import { actionsComponent } from "./actionsState.tsx"
import { parseStringToObject } from "../../../manager/speaker_manager.ts"
import FullMixer from "./FullMixer.tsx"

const ActionsMixer = () => {
    const [volume, setVolume] = useState(50)
    const [speaker, setSpeaker] = useState("")
    const [, setComponent] = useAtomState(actionsComponent)

    useEffect(() => {
        invoke<string>("get_current_volume").then((r) => {
            const i = Number(r.replace("%", ""))

            setVolume(i)
        })

        const interval = setInterval(() => {
            invoke<string>("list_sinks").then((r) => {
                const objects = parseStringToObject(r)
                let name = ""

                invoke("get_current_sink").then((r) => {
                    objects.forEach((sink) => {
                        if (sink.id == r) {
                            if (sink.node?.description) {
                                if (sink.node?.nick) {
                                    name = sink.node?.nick + " - " + sink.node?.description
                                } else {
                                    name = sink.node?.description
                                }
                            } else {
                                if (sink.node?.nick) {
                                    name = sink.node.nick
                                } else if (sink.node?.name) {
                                    name = sink.node?.name
                                }
                            }
                        }
                    })

                    setSpeaker(name)
                })
            })
        }, 500)

        return () => clearInterval(interval)
    }, [])

    function onChange(event : ChangeEvent<HTMLInputElement>) {
        // @ts-ignore
        setVolume(event.target.value)
        invoke("set_current_volume", { volume: event.target.value + "%" })
    }

    return (
        <div className="w-screen">
            <div className="mx-10">
                <h1 className="hover:bg-slate-300 dark:hover:bg-zinc-900 transition duration-300 max-w-max rounded-md flex" onClick={() => setComponent(<FullMixer />)}>{speaker} <div className="ml-4 mr-2"><FontAwesomeIcon icon={faArrowRight} /></div></h1>
                <input type="range" value={volume} onChange={(event) => onChange(event)}
                    className="h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 w-full"/>
            </div>
        </div>
    )
}

export default ActionsMixer