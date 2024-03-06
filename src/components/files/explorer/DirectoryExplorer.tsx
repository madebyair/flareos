import { useEffect, useState } from "react"
import { invoke } from "@tauri-apps/api/core"
import FileEntry from "./FileEntry.tsx"

type DirectoryExplorerType = {
    directory: string
}

type Entry = {
    path: string,
    is_dir: boolean
}

const DirectoryExplorer = ({directory} : DirectoryExplorerType) => {
    const [entries, setEntries] = useState<Array<Entry>>([])

    useEffect(() => {
        invoke<string>("read_dir", { dir: directory }).then((r) => {
            const json = JSON.parse(r)

            setEntries(json.files)
        })
    }, [directory])

    return (
        <div className="w-full overflow-y-auto h-full">
            {entries.map((entry) => {
                return (
                    <FileEntry key={entry.path} path={entry.path} is_dir={entry.is_dir} />
                )
            })}
        </div>
    )
}

export default DirectoryExplorer