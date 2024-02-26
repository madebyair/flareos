import SettingsSidebarItem from "./SettingsSidebarItem.tsx"
import "../../assets/css/App.css"
import { faWifi } from "@fortawesome/free-solid-svg-icons"

const SettingsLayout = () => {
    return (
        <div className="w-screen h-screen bg-slate-300 flex select-none">
            <div className="w-1/2 p-4">
                <div className="mt-2 mb-2">
                    <SettingsSidebarItem name="Connections" icon={faWifi} description="Wifi ・ Bluetooth"/>
                </div>
            </div>
        </div>
    )
}

export default SettingsLayout