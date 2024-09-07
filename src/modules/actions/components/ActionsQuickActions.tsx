import ActionButton from "./ActionsButton.tsx"
import { BluetoothIcon, Wifi4Icon } from "./ActionsIcons.tsx"
import { useEffect, useState } from "react"
import { invoke } from "@tauri-apps/api/core"
import { useTranslation } from "react-i18next"
import ActionsButtonSmall from "./ActionsButtonSmall.tsx"
import { faDisplay, faMoon } from "@fortawesome/free-solid-svg-icons"
import isNightLight from "../../../manager/nightlight/isNightLight.ts";
import { disableNightLight, enableNightLight } from "../../../manager/nightlight/setNightLight.ts";

interface DeviceInfo {
    mac: string;
    name: string;
}

type BluetoothState = {
    available: boolean,
    enabled: boolean
    devices: DeviceInfo[]
}

const transformDevices = (devices: { device: string }[]): DeviceInfo[] => {
    return devices.map(item => {
        const parts = item.device.split(" ")
        const mac = parts[1]
        const name = parts.slice(2).join(" ")
        return { mac, name }
    })
}


const ActionsQuickActions = () => {
    const [bluetooth, setBluetooth] = useState<BluetoothState>({available: false, enabled: false, devices: []})
    const [nightLight, setIsNightLight] = useState(false)

    const [ t ] = useTranslation()

    useEffect(() => {
        const interval = setInterval(() => {
            invoke<boolean>("is_bluetooth_adapter_available").then((r) => {
                setBluetooth(prevState => {
                    return {
                        ...prevState,
                        available: r
                    }
                })
            })

            invoke<string>("get_bluetooth_adapter_status").then((r) => {
                setBluetooth(prevState => {
                    return {
                        ...prevState,
                        enabled: r == "yes"
                    }
                })
            })

            invoke<string>("get_connected_devices").then((r) => {
                const devices = transformDevices(JSON.parse(r))

                setBluetooth(prevState => {
                    return {
                        ...prevState,
                        devices: devices
                    }
                })
            })

            isNightLight().then((r) => {
                setIsNightLight(r)
            })
        }, 300)

        return () => clearInterval(interval)
    }, [])
    return (
        <div className="w-screen flex">
            <div className="mt-5 mx-auto w-10/12 flex flex-wrap">
                <div className="w-1/3 flex-grow-0">
                    <ActionButton icon={<Wifi4Icon/>} name={t("Network")} description="" active={true}/>
                </div>
                <div className="w-1/3 flex-grow-0">
                    {bluetooth.available &&
                        <ActionButton icon={<BluetoothIcon/>}
                            description={bluetooth.devices.length > 0 ? bluetooth.devices.length.toString() + " " + t("Connected") : t("Ready")}
                            name="Bluetooth" active={true}/>
                    }
                </div>
                <div className="w-1/6 flex-grow-0">
                    <ActionsButtonSmall icon={faDisplay} active={false}/>
                </div>

                <div className="w-1/6 flex-grow-0" onClick={() => {
                    if (nightLight) {
                        disableNightLight()
                        setIsNightLight(false)
                        return
                    }
                    enableNightLight()
                    setIsNightLight(true)
                }}>
                    <ActionsButtonSmall icon={faMoon} active={nightLight}/>
                </div>
            </div>
        </div>
    )
}

export default ActionsQuickActions
