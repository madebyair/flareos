import { BarLoader } from "react-spinners";
import { useTranslation } from "react-i18next";
import { useAtomState } from "@zedux/react";
import { setupNoPadding } from "../setupState.tsx";
import { useEffect } from "react";

const WifiLoader = () => {
    const { t } = useTranslation()
    const [, setNoPadding] = useAtomState(setupNoPadding)

    useEffect(() => {
        setNoPadding(true)
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
                <span className="m-auto dark:text-white text-2xl font-bold">{t("Just one secound")}</span>
            </div>
        </div>
    )
}

export default WifiLoader