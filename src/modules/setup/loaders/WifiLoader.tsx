import { BarLoader } from "react-spinners"
import { useTranslation } from "react-i18next"
import { useAtomState } from "@zedux/react"
import { setupComponent, setupNoPadding } from "../setupState.tsx"
import { useEffect } from "react"
import AirPrivacyPolicy from "../law/AirPrivacyPolicy.tsx"

const WifiLoader = () => {
    const { t } = useTranslation()
    const [, setNoPadding] = useAtomState(setupNoPadding)
    const [, setComponent] = useAtomState(setupComponent)

    useEffect(() => {
        setNoPadding(true)

        fetch("https://api.made-by-air.com").then((r) => {
            if (r.status === 200) {
                console.log("air servers are up and internet connection is correct")

                setTimeout(() => {
                    setNoPadding(false)
                    setComponent(<AirPrivacyPolicy />)
                }, 700)
            } else {
                console.log("no network detected")
            }
        })
    }, [])

    return (
        <div className="w-full h-full rounded-xl relative">
            <div className="flex w-full rounded-xl">
                <BarLoader
                    height={8}
                    cssOverride={{
                        width: "99.62%",
                        borderTopLeftRadius: "25px",
                        borderTopRightRadius: "25px",
                        margin: "auto"
                    }}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    color="#2563eb"
                />
            </div>
            <div className="flex h-full absolute top-0 w-full">
                <span className="m-auto dark:text-white text-2xl font-bold">{t("Just one second")}</span>
            </div>
        </div>
    )
}

export default WifiLoader