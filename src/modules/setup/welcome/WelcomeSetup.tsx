import Button from "../../../elements/Button.tsx"
import Toggle from "../../../elements/Toggle.tsx"
import { useState } from "react"
import { useAtomState } from "@zedux/react"
import { colorSchemeState } from "../../../state/themeState.ts"
import { useTranslation } from "react-i18next"
import BetaWarning from "./BetaWarning.tsx"
import languages from "../../../assets/languages.ts"
import { isBeta } from "../../../helpers.ts"
import { setupComponent } from "../setupState.tsx"
import WifiLoader from "../loaders/WifiLoader.tsx"

const WelcomeSetup = () => {
    const [themeScheme, setThemeScheme] = useAtomState(colorSchemeState)
    const [betaWarning, setBetaWarning] = useState(false)
    const [, setComponent] = useAtomState(setupComponent)

    const { t, i18n } = useTranslation()

    function trigger() {
        if (themeScheme !== "dark") {
            setThemeScheme("dark")
        } else {
            setThemeScheme("light")
        }
    }

    return (
        <>
            {betaWarning && <BetaWarning />}
            <div className="relative h-full">
                <div className="flex w-full h-full">
                    <div className="w-1/2">
                        <h1 className="text-5xl dark:text-white">{t("Welcome!")}</h1>
                        <h2 className="text-zinc-700 dark:text-zinc-300 mt-4 w-72">
                            {t(
                                "Welcome to FlareOS! Start by selecting your preferred language, then connect to the network and set up your account.",
                            )}
                        </h2>
                    </div>
                    <div className="w-1/2 h-full overflow-auto">
                        {Object.entries(languages).map(([iso, name]) => (
                            <div className="w-full h-16 flex" key={iso}>
                                <div
                                    className="w-10/12 h-14 m-auto text-white bg-gray-800 backdrop-blur-3xl hover:bg-gray-900 rounded-md flex transition-all"
                                    onClick={() => i18n.changeLanguage(iso)}>
                                    <div className="text-lg my-auto ml-4 font-medium">
                                        {name}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute bottom-0 w-full">
                    <div className="flex">
                        <Toggle
                            onChange={trigger}
                            enabled={themeScheme == "dark"}
                        />
                        <span className="text-zinc-700 dark:text-zinc-300 ml-3 mt-[4px]">
                            {t("Dark mode")}
                        </span>
                    </div>
                    <div className="absolute -top-1 left-52">
                        <Button label={t("Continue")} submit={() => {
                            if (isBeta()) {
                                setBetaWarning(true)
                            } else {
                                setComponent(<WifiLoader />)
                            }
                        }} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default WelcomeSetup
