import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faVolumeLow } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "react-i18next"
import { useAtomState } from "@zedux/react"
import { isFullMixer } from "./actionsState.ts"
import { useEffect, useState } from "react"
import { invoke } from "@tauri-apps/api/core"
import { MediaObject, parseStringToObject } from "../../manager/speaker_manager.ts"

const FullMixer = () => {
    const [ t ] = useTranslation()
    const [, setFullMixer] = useAtomState(isFullMixer)
    const [sinks, setSinks] = useState<MediaObject[]>([])

    useEffect(() => {
        invoke<string>("list_sinks").then((r) => {
            const objects = parseStringToObject(r)
            setSinks(objects)
        })
    }, [])

    return (
        <div className="w-screen h-screen top-0 p-8 bg-slate-200 dark:bg-zinc-950/95 rounded-xl">
            <header className="flex h-10">
                <div className="h-10 w-10 flex hover:bg-slate-200 rounded-md transition duration-300 dark:hover:bg-zinc-900" onClick={() => setFullMixer(false)}>
                    <div className="m-auto">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </div>
                </div>
                <h1 className="my-auto ml-2">{t("Available speakers")}</h1>
            </header>
            {sinks.map((sink) => {
                let name = "Speaker"

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

                return (
                    <Speaker name={name} id={sink.id} key={name} />
                )
            })}
        </div>
    )
}

const Speaker = ({name, id} : {name: string, id: number}) => {
    const [cls, setCls] = useState("w-full h-10 flex hover:bg-slate-200 rounded-md transition duration-300 dark:hover:bg-zinc-900 mt-4")

    useEffect(() => {
        invoke("get_current_sink").then((r) => {
            if (r == id) {
                setCls("w-full h-10 flex bg-slate-200 rounded-md transition duration-300 dark:bg-zinc-900 mt-4")
            }
        })
    }, [])

    return (
        <div className={cls} onClick={() => {
            invoke("set_current_sink", { id: String(id) })
        }}>
            <div className="h-10 w-10 flex">
                <div className="m-auto">
                    <FontAwesomeIcon icon={faVolumeLow}/>
                </div>
            </div>
            <div className="mt-auto mb-auto">
                {name}
            </div>
        </div>
    )
}

export default FullMixer