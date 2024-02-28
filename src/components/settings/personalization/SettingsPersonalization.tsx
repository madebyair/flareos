import { emit } from "@tauri-apps/api/event"

const SettingsPersonalization = () => {
    return (
        <div className="w-full h-full">
            <div className="bg-slate-400/60 w-full dark:bg-zinc-800 rounded h-20 flex" onClick={() => emit("theme-change", "light")}>
                <div className="mt-auto mb-auto ml-2">
                    Light mode
                    <p className="text-xs">Perfect looking airos</p>
                </div>
            </div>
            <div className="bg-slate-400/60 dark:bg-zinc-800 w-full mt-4 rounded h-20 flex" onClick={() => emit("theme-change", "dark")}>
                <div className="mt-auto mb-auto ml-2">
                    Dark mode
                    <p className="text-xs">Saving planet, cause your display needs less power</p>
                </div>
            </div>
        </div>
    )
}

export default SettingsPersonalization