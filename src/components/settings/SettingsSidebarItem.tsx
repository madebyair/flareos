import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { useAtomState } from "@zedux/react"
import { settingsComponent } from "./settingsState.tsx"

type SettingsSidebarItemType = {
    name: string,
    icon: IconDefinition,
    description: string,
    component: JSX.Element
}

const SettingsSidebarItem = ({ name, icon, description, component }: SettingsSidebarItemType) => {
    const [, setComponent] = useAtomState(settingsComponent)

    return (
        <div
            className="flex items-center bg-slate-200/40 dark:bg-zinc-800/90 backdrop-blur-md hover:bg-slate-200 dark:hover:bg-zinc-700/50 w-full p-4 rounded-lg shadow-md cursor-pointer mb-4"
            onClick={() => setComponent(component)}
        >
            <div className="flex items-center justify-center w-12 h-12 bg-slate-300 dark:bg-zinc-700 rounded-full shrink-0 mr-4 hover:transition-colors hover:duration-300">
                <FontAwesomeIcon icon={icon} className="text-2xl text-gray-700 dark:text-gray-300" />
            </div>
            <div className="flex flex-col min-w-0">
                <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate">{name}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate mt-1 leading-snug">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default SettingsSidebarItem
