import Button from "../../../elements/Button.tsx"
import Toggle from "../../../elements/Toggle.tsx"
import { useState } from "react"
import { useAtomState } from "@zedux/react"
import { colorSchemeState } from "../../../state/themeState.ts"
import { useTranslation } from "react-i18next"
import BetaWarning from "./BetaWarning.tsx"

const WelcomeSetup = () => {
    const [enabled, setEnabled] = useState(false)
    const [, setThemeScheme] = useAtomState(colorSchemeState)
    const [betaWarning, setBetaWarning] = useState(false)

    const { t } = useTranslation()

    function trigger() {
        if (!enabled) {
            setThemeScheme("dark")
        } else {
            setThemeScheme("light")
        }
    }

    return (
        <>
            {betaWarning && <BetaWarning />}
            <div className="relative h-full">
                <h1 className="text-5xl dark:text-white">{t("Welcome!")}</h1>
                <h2 className="text-zinc-700 dark:text-zinc-300 mt-4 w-72">
                    {t(
                        "Welcome to FlareOS! Before we begin, let's connect to the network and log in to your air account.",
                    )}
                </h2>
                <div className="absolute bottom-0 w-full">
                    <div className="flex">
                        <Toggle
                            onChange={trigger}
                            enabled={enabled}
                            setEnabled={setEnabled}
                        />
                        <span className="text-zinc-700 dark:text-zinc-300 ml-3 mt-[4px]">
                            {t("Dark mode")}
                        </span>
                    </div>
                    <div className="absolute top-0 right-0">
                        <Button label={t("Continue")} submit={() => setBetaWarning(true)} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default WelcomeSetup
