// @ts-ignore
import airBlack from "../../../assets/images/air-black.webp"
// @ts-ignore
import airWhite from "../../../assets/images/air-white.webp"
import { useTranslation } from "react-i18next"
import Button from "../../../elements/Button.tsx"
import { useAtomState } from "@zedux/react"
import { setupComponent } from "../setupState.tsx"
import AirPrivacyPolicy from "./AirPrivacyPolicy.tsx"

const AirTermsOfService = () => {
    const [ t ] = useTranslation()
    const [, setComponent] = useAtomState(setupComponent)

    return (
        <div className="w-full h-full flex">
            <div className="w-1/3 h-full relative">
                <img src={airBlack} width="50px" alt="" className="dark:hidden"/>
                <img src={airWhite} width="50px" alt="" className="hidden dark:block"/>
                <h1 className="text-5xl dark:text-white mt-8">{t("Terms of Service")}</h1>
                <p className="absolute bottom-16 dark:text-white">{t("Reading and accepting this document is required to proceed.")}</p>
                <div className="absolute bottom-0">
                    <Button submit={() => setComponent(<AirPrivacyPolicy />)} label={t("I agree")} />
                </div>
            </div>
            <div className="w-2/3 h-full">
                <iframe src="https://made-by-air.com/tos.pdf" className="w-full h-full" height="700"></iframe>
            </div>
        </div>
    )
}

export default AirTermsOfService