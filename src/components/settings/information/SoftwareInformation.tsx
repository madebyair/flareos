import packageJSON from "../../../../package.json"
import { useEffect, useState } from "react"
import { invoke } from "@tauri-apps/api/core"
import { useTranslation } from "react-i18next"

const SoftwareInformation = () => {
    const [kernelVersion, setKernel] = useState<string>()
    const [ t ] = useTranslation()

    useEffect(() => {
        invoke<string>("run_command", { command: "uname -r" }).then((r) => {
            setKernel(r)
        })
    }, [])

    return (
        <div className="grid grid-cols-2 gap-4 mt-8 mx-8 text-lg">
            <div>
                <div className="font-bold">{t("Kernel Version")}</div>
                <div className="font-bold">{t("FlareOS Version")}</div>
            </div>
            <div>
                <div>{kernelVersion}</div>
                <div>{packageJSON.version}</div>
            </div>
        </div>
    )
}

export default SoftwareInformation
