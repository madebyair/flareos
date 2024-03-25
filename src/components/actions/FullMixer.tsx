import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faVolumeLow } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "react-i18next"
import { useAtomState } from "@zedux/react"
import { isFullMixer } from "./actionsState.ts"
import { useEffect, useState } from "react"
import { invoke } from "@tauri-apps/api/core"

interface MediaObject {
    id: number;
    node?: {
        nick?: string;
        description?: string;
        name?: string;
    };
    media: {
        class: string;
        role?: string;
    };
}


const parseStringToObject = (input: string): MediaObject[] => {
    const lines: string[] = input.split("\n").map(line => line.trim())
    const objects: MediaObject[] = []
    let currentObject: Partial<MediaObject> = {}

    lines.forEach(line => {
        if (line.startsWith("id")) {
            if (currentObject.media && currentObject.media.class === "Audio/Sink") {
                const mediaObject: MediaObject = {
                    id: currentObject.id || -1,
                    media: { class: "Audio/Sink" },
                    node: {}
                }
                if (currentObject.node) {
                    mediaObject.node = {
                        nick: currentObject.node.nick,
                        description: currentObject.node.description,
                        name: currentObject.node.name
                    }
                }
                if (currentObject.media.role) {
                    mediaObject.media.role = currentObject.media.role
                }
                objects.push(mediaObject)
            }
            currentObject = {}
            currentObject.id = parseInt(line.split(" ")[1])
        } else if (line.startsWith("node.")) {
            const [key, value] = line.split(" = ")
            const nodeKey = key.slice(5)
            if (!currentObject.node) {
                currentObject.node = {}
            }
            // @ts-ignore
            currentObject.node[nodeKey] = value.slice(1, -1)
        } else if (line.startsWith("media.")) {
            const [key, value] = line.split(" = ")
            const mediaKey = key.slice(6)
            if (!currentObject.media) {
                currentObject.media = { class: "" }
            }
            if (mediaKey === "class") {
                currentObject.media.class = value.slice(1, -1)
            } else {
                // @ts-ignore
                currentObject.media[mediaKey] = value.slice(1, -1)
            }
        }
    })

    // Add the last object
    if (currentObject.media && currentObject.media.class === "Audio/Sink") {
        const mediaObject: MediaObject = {
            id: currentObject.id || -1,
            media: { class: "Audio/Sink" },
            node: {}
        }
        if (currentObject.node) {
            mediaObject.node = {
                nick: currentObject.node.nick,
                description: currentObject.node.description,
                name: currentObject.node.name
            }
        }
        if (currentObject.media.role) {
            mediaObject.media.role = currentObject.media.role
        }
        objects.push(mediaObject)
    }

    return objects
}

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
    return (
        <div className="w-full h-10 flex hover:bg-slate-200 rounded-md transition duration-300 dark:hover:bg-zinc-900 mt-4" onClick={() => {
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