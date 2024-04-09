import InformationHeader from "./InformationHeader.tsx"
import SettingsSelection from "../SettingsSelection.tsx"
import { useTranslation } from "react-i18next"

const SettingsInformation = () => {
    const [ t ] = useTranslation()
    return (
        <div className="w-full mt-6">
            <InformationHeader />
            <div className="mt-4">
                <SettingsSelection name={t("Software information")} onClick={() => {}} />
                <SettingsSelection name={t("Hardware information")} onClick={() => {}} />
                <SettingsSelection name={t("Updates")} onClick={() => {}} />
            </div>
        </div>
    )
}

export default SettingsInformation