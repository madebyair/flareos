import InformationHeader from "./InformationHeader.tsx"
import SettingsSelection from "../SettingsSelection.tsx"
import { useTranslation } from "react-i18next"
import { useAtomState } from "@zedux/react"
import { setupComponent } from "../../../modules/setup/setupState.tsx"
import SoftwareInformation from "./SoftwareInformation.tsx"

const SettingsInformation = () => {
    const [ t ] = useTranslation()
    const [, setComponent] = useAtomState(setupComponent)

    return (
        <div className="w-full mt-6">
            <InformationHeader />
            <div className="mt-4">
                <SettingsSelection name={t("Software information")} onClick={() => setComponent(<SoftwareInformation />)} />
                <SettingsSelection name={t("Hardware information")} onClick={() => {}} />
                <SettingsSelection name={t("Updates")} onClick={() => {}} />
            </div>
        </div>
    )
}

export default SettingsInformation