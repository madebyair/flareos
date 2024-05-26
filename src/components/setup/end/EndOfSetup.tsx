// @ts-ignore
import success from "./success.png"
import { useTranslation } from "react-i18next"
import Button from "../../../elements/Button.tsx"
import { emit } from "@tauri-apps/api/event"

const EndOfSetup = () => {
    const [ t ] = useTranslation()

    return (
        <div className="h-full w-full relative">
            <img src={success} alt="" width="30px"/>
            <h1 className="text-5xl dark:text-white mt-4">{t("That's All!")}</h1>
            <h2 className="text-zinc-700 dark:text-zinc-300 mt-4 w-72">
                {t("You read that right, that's all! Click the button to go to the desktop.")}
            </h2>
            <div className="absolute bottom-0 right-0">
                <Button submit={() => emit("component", "desktop")} label={t("Go to desktop")} />
            </div>
        </div>
    )
}

export default EndOfSetup