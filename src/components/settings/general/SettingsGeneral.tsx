import SettingsSelection from "../SettingsSelection.tsx"
import { useState } from "react"
import LanguageChangePopup from "../popup/LanguageChangePopup.tsx"

const SettingsGeneral = () => {
    const [languageModal, setLanguageModal] = useState(false)

    return (
        <div className="w-full h-full">
            {languageModal &&
                <LanguageChangePopup />
            }
            <SettingsSelection name="Language" subtext="English" onClick={() => setLanguageModal(true)} />
            <SettingsSelection name="Date" onClick={() => { console.log("idk")}} />
        </div>
    )
}

export default SettingsGeneral