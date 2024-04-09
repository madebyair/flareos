import { BlurButton } from "../../elements/Button.tsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPowerOff } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "react-i18next"

const AuthFooter = () => {
    const [ t ] = useTranslation()

    return (
        <div className="absolute bottom-5 w-full">
            <div className="relative flex w-full">
                <div className="ml-8">
                    <BlurButton submit={() => {}} label={t("Add person")} />
                </div>
                <div className="right-8 absolute h-12 w-12 hover:bg-gray-800 transition duration-300 rounded-md flex">
                    <div className="m-auto text-white">
                        <FontAwesomeIcon icon={faPowerOff} size="lg" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthFooter