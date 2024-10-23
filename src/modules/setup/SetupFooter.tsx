import { BlurButton } from "../../elements/Button.tsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPowerOff } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "react-i18next"
import { useAtomState } from "@zedux/react"
import { setupComponent } from "./setupState.tsx"
import { useEffect, useState } from "react"
import WifiLoader from "../setup/loaders/WifiLoader.tsx"
import EndOfSetup from "./end/EndOfSetup.tsx"
import AirPrivacyPolicy from "./law/AirPrivacyPolicy.tsx"
import AirTermsOfService from "./law/AirTermsOfService.tsx"
import WelcomeSetup from "./welcome/WelcomeSetup.tsx"
import AccountLoader from "./loaders/AccountLoader.tsx"

const SetupFooter = () => {
    const [t] = useTranslation()

    const [component, setComponent] = useAtomState(setupComponent)
    const [backButtonAvailable, setBackButtonAvailable] = useState<boolean>(false)

    useEffect(() => {
        if (
            component.type === WelcomeSetup ||
            component.type === WifiLoader ||
            component.type === EndOfSetup ||
            component.type === AccountLoader
        ) {
            setBackButtonAvailable(false)
        } else {
            setBackButtonAvailable(true)
        }
    }, [component])

    function goBack() {
        if (component.type === AirPrivacyPolicy) {
            setComponent(<WelcomeSetup />)
        } else if (component.type === AirTermsOfService) {
            setComponent(<AirPrivacyPolicy />)
        }
    }

    return (
        <div className="absolute bottom-5 w-screen">
            <div className="relative flex w-screen h-12">
                <div className="ml-8 z-40">
                    {backButtonAvailable &&
                        <BlurButton submit={() => goBack()} label={t("Go back")}/>
                    }
                </div>
                <div
                    className="right-8 absolute h-12 w-12 hover:bg-gray-800 transition duration-300 rounded-md flex z-40">
                    <div className="m-auto text-white">
                        <FontAwesomeIcon icon={faPowerOff} size="lg" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SetupFooter
