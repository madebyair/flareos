import SettingsSelection from "../SettingsSelection.tsx"
import { useState } from "react"
import LanguageChangePopup from "../popup/LanguageChangePopup.tsx"
import { useTranslation } from "react-i18next"

const SettingsGeneral = () => {
    const [languageModal, setLanguageModal] = useState(false)
    const [ t ] = useTranslation()

    return (
        <div className="w-full h-full">
            {languageModal &&
                <LanguageChangePopup />
            }
            <SettingsSelection name={t("Language")} subtext="English" onClick={() => setLanguageModal(true)} />
            <SettingsSelection name={t("Date")} onClick={() => { console.log("idk")}} />
        </div>
    )
}

export default SettingsGeneral