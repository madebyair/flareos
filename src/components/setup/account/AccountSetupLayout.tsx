import { useAtomState } from "@zedux/react"
import { componentState } from "../../../state/componentState.tsx"
import Auth from "../../auth/Auth.tsx"
import { useTranslation } from "react-i18next"

function AccountSetupLayout({ children, isFromAuth }: { children: JSX.Element, isFromAuth?: boolean }) {
    const [, setComponent] = useAtomState(componentState)
    const [ t ] = useTranslation()

    return (
        <div className="container w-full h-full flex relative">
            {isFromAuth &&
                <div className="text-blue-500 hover:text-blue-400 text-[17px] h-min transition duration-300 mb-8 ml-8 absolute bottom-0" onClick={() => setComponent(<Auth />)}>{t("Go back")}</div>
            }
            <div className="m-auto w-[400px] h-[400px]">
                {children}
            </div>
        </div>
    )
}

export default AccountSetupLayout