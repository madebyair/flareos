import Button from "../../../elements/Button.tsx"
import { Dispatch, SetStateAction } from "react"
import { BluetoothDevice } from "../../../types/bluetooth.ts"
import { useTranslation } from "react-i18next"

const BluetoothPopup = ({hide, device} : {hide: Dispatch<SetStateAction<boolean>>, device: BluetoothDevice}) => {
    const [ t ] = useTranslation()

    return (
        <>
            <div className="absolute top-0 w-screen h-screen bg-zinc-950/30 z-40 left-0"></div>
            <div className="z-50 absolute top-0 left-0 w-screen h-screen flex">
                <div className="bg-zinc-200 dark:bg-zinc-950 m-auto w-72 h-48 rounded-md p-4 relative">
                    <h1>{t("Bluetooth device")}</h1>
                    <b>{t("Name: ")} </b> {device.name} <br />
                    <b>{t("MAC address: ")} </b> {device.mac} <br />
                    <div className="absolute bottom-4">
                        <Button submit={() => hide(false)} label="Disconnect" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default BluetoothPopup