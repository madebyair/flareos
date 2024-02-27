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

const SettingsSidebarItem = ({name, icon, description, component} : SettingsSidebarItemType) => {
    const [, setComponent] = useAtomState(settingsComponent)

    return (
        <div className="bg-slate-400/30 hover:bg-slate-400/80 transition duration-300
         w-full h-28 rounded-xl mt-4 mb-4" onClick={() => {
             setComponent(component)
        }}>
            <div className="flex w-full h-14">
                <div className="flex mt-auto mb-auto mx-6">
                    <div className="flex">
                        <div className="mb-auto mt-auto">
                            <FontAwesomeIcon icon={icon} />
                        </div>
                        <h1 className="mt-auto mb-auto ml-2">{name}</h1>
                    </div>
                </div>
            </div>
            <div className="h-14 flex w-10/12">
                <div className="mt-auto mb-auto mx-8 text-sm text-gray-700">
                    {description}
                </div>
            </div>
        </div>
    )
}

export default  SettingsSidebarItem