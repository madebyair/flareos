import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"

const ActionsButtonSmall = ({icon, active} : {icon: IconDefinition, active: boolean}) => {
    let className = "w-16 h-16 bg-zinc-200 dark:bg-zinc-900 hover:bg-zinc-300 dark:hover:bg-zinc-900/40 rounded-md mt-2 flex"

    if (active) {
        className = "w-16 h-16 bg-blue-800/30 dark:bg-cyan-400/30 hover:bg-blue-700/25 dark:hover:bg-cyan-400/40 rounded-md mt-2 flex"
    }

    return (
        <div className={className}>
            <div className="m-auto">
                <FontAwesomeIcon icon={icon} size="xl" />
            </div>
        </div>
    )
}

export default ActionsButtonSmall