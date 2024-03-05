import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons"

type Entry = {
    path: string,
    is_dir: boolean
}

const FileEntry = ({path, is_dir} : Entry) => {
    return (
        <div className="flex h-12 bg-slate-400/30 dark:bg-black mt-2 mb-2 rounded-md">
            <div className="mt-auto mb-auto ml-2">
                <FontAwesomeIcon icon={is_dir ? faFolder : faFile} />
            </div>
            <div className="mt-auto mb-auto ml-2">
                {path.split("/").pop()}
            </div>
        </div>
    )
}

export default FileEntry