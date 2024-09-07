import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import React from "react"

type ActionsButtonProps = {
    name: string,
    description: string,
    icon: IconDefinition | JSX.Element,
    active: boolean
};

const ActionButton = ({ name, description, icon, active }: ActionsButtonProps) => {
    let className = "w-36 h-16 bg-zinc-200 dark:bg-zinc-900 hover:bg-zinc-300 dark:hover:bg-zinc-900/40 rounded-md mt-2 flex"

    if (active) {
        className = "w-36 h-16 bg-blue-800/30 dark:bg-cyan-400/30 hover:bg-blue-700/25 dark:hover:bg-cyan-400/40 rounded-md mt-2 flex"
    }

    return (
        <div className={className}>
            <div className="h-16 w-11 flex">
                <div className="m-auto">
                    {React.isValidElement(icon) ? (
                        icon
                    ) : (
                        <FontAwesomeIcon icon={icon as IconDefinition} />
                    )}
                </div>
            </div>
            <div className="h-16 ml-2 flex">
                <div className="m-auto">
                    <h1 className="font-medium">{name}</h1>
                    {description &&
                        <h2 className="-mt-2 text-sm font-[350]">{description}</h2>
                    }
                </div>
            </div>
        </div>
    )
}

export default ActionButton
