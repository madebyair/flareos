import { BlurButton } from "../../../elements/Button.tsx"
import { useTranslation } from "react-i18next"
import { emit } from "@tauri-apps/api/event"
import { getAll } from "@tauri-apps/api/window"

const ActionPower = () => {
    const [ t ] = useTranslation()

    return (
        <div className="w-full flex mt-6 w-">
            <div className="flex w-11/12 mx-auto">
                <BlurButton submit={() => {
                    void emit("logout")
                    getAll().forEach((w) => {
                        if (w.label !== "main") {
                            void w.close()
                        }
                    })
                }} label={t("Logout")} />
            </div>
        </div>
    )
}

export default ActionPower