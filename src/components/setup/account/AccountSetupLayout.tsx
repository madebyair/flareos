import { useTranslation } from "react-i18next"
import { emit } from "@tauri-apps/api/event"

function AccountSetupLayout({ children, isFromAuth }: { children: JSX.Element, isFromAuth?: boolean }) {
    const [ t ] = useTranslation()

    return (
        <div className="container w-full h-full flex relative">
            {isFromAuth &&
                <div className="text-blue-500 hover:text-blue-400 text-[17px] h-min transition duration-300 mb-8 ml-8 absolute bottom-0" onClick={() => emit("component", "auth")}>{t("Go back")}</div>
            }
            <div className="m-auto w-[400px] h-[400px]">
                {children}
            </div>
        </div>
    )
}

export default AccountSetupLayout