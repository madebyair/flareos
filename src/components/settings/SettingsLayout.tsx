import SettingsSidebarItem from "./SettingsSidebarItem.tsx"
import "../../assets/css/App.css"

const SettingsLayout = () => {
    return (
        <div className="w-screen h-screen bg-slate-300 flex">
            <div className="w-1/2 p-4">
                <div className="mt-2 mb-2">
                    <SettingsSidebarItem />
                </div>
            </div>
        </div>
    )
}

export default SettingsLayout