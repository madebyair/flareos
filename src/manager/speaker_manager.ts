export interface MediaObject {
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


export const parseStringToObject = (input: string): MediaObject[] => {
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