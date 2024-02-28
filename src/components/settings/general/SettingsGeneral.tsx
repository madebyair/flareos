import SettingsSelection from "../SettingsSelection.tsx"

const SettingsGeneral = () => {
    return (
        <div className="w-full h-full">
            <SettingsSelection name="Language" subtext="English" onClick={() => { console.log("idk")}} />
            <SettingsSelection name="Date" onClick={() => { console.log("idk")}} />
        </div>
    )
}

export default SettingsGeneral