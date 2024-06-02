import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useAtomState } from "@zedux/react"
import { actionsComponent } from "../actionsState.tsx"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import BluetoothPopup from "./BluetoothPopup.tsx"
import { invoke } from "@tauri-apps/api/core"
import { BluetoothDevice, transformBluetooth } from "../../../../types/bluetooth.ts"
import "./spinner.css"

const ActionsBluetooth = () => {
    const [, setComponent] = useAtomState(actionsComponent)
    const [ t ] = useTranslation()
    const [paired, setPaired] = useState<BluetoothDevice[]>()
    const [connected, setConnected] = useState<BluetoothDevice[]>()
    const [devices, setDevices] = useState<BluetoothDevice[]>()

    useEffect(() => {
        invoke("scan_on")

        invoke<string>("get_connected_devices").then((r) => {
            setConnected(transformBluetooth(JSON.parse(r), "connected"))
        })

        invoke<string>("get_paired_devices").then((r) => {
            setPaired(transformBluetooth(JSON.parse(r), "paired"))
        })

        invoke<string>("get_devices").then((r) => {
            setDevices(transformBluetooth(JSON.parse(r), "available"))
        })

        const interval = setInterval(() => {
            invoke<string>("get_connected_devices").then((r) => {
                setConnected(transformBluetooth(JSON.parse(r), "connected"))
            })

            invoke<string>("get_paired_devices").then((r) => {
                setPaired(transformBluetooth(JSON.parse(r), "paired"))
            })

            invoke<string>("get_devices").then((r) => {
                setDevices(transformBluetooth(JSON.parse(r), "available"))
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-screen h-screen top-0 p-8 bg-slate-200 dark:bg-zinc-950/95 rounded-xl absolute top-0">
            <header className="flex h-10">
                <div
                    className="h-10 w-10 flex hover:bg-slate-300 rounded-md transition duration-300 dark:hover:bg-zinc-900"
                    onClick={() => setComponent(null)}>
                    <div className="m-auto">
                        <FontAwesomeIcon icon={faArrowLeft}/>
                    </div>
                </div>
                <h1 className="my-auto ml-2">{t("Available devices")}</h1>
            </header>
            <main className="overflow-auto" style={{height: "calc(100vh - 104px)"}}>
                <h1 className="mt-2">{t("Connected")} - {connected?.length.toString()}</h1>
                {connected && connected.map((key) => {
                    return (
                        <Device device={key} key={key.mac}/>
                    )
                })}
                <h1 className="mt-2">{t("Paired")} - {paired?.filter(pairedDevice => !connected?.some(connectedDevice => connectedDevice.mac === pairedDevice.mac)).length.toString()}</h1>
                {paired && paired
                    .filter(pairedDevice => !connected?.some(connectedDevice => connectedDevice.mac === pairedDevice.mac))
                    .map((key) => {
                        return (
                            <Device device={key} key={key.mac}/>
                        )
                    })}

                <h1 className="mt-2">{t("Available")} - {devices?.filter(pairedDevice => !paired?.some(connectedDevice => connectedDevice.mac === pairedDevice.mac)).length.toString()}</h1>
                {devices && devices
                    .filter(pairedDevice => !paired?.some(connectedDevice => connectedDevice.mac === pairedDevice.mac))
                    .map((key) => {
                        return (
                            <Device device={key} key={key.mac}/>
                        )
                    })}
            </main>
        </div>
    )
}

const Device = ({device}: { device: BluetoothDevice }) => {
    const [popup, setPopup] = useState(false)
    const [connecting, setConnecting] = useState(false)
    const [ t ] = useTranslation()

    return (
        <>
            {popup &&
                <BluetoothPopup hide={setPopup} device={device} />
            }
            <div className="w-full h-10 flex hover:bg-slate-300 relative rounded-md transition duration-300 dark:hover:bg-zinc-900 mt-4" onClick={() => {
                if (device.state == "connected") {
                    setPopup(true)
                    return
                }

                setConnecting(true)
            }}>
                <div className="h-10 w-10 flex">
                    <div className="m-auto">
                        <BluetoothIcon/>
                    </div>
                </div>
                <div className="mt-auto mb-auto">
                    {device.name}
                </div>
                <div className="absolute right-4 flex h-full">
                    <div className="mt-auto mb-auto">
                        {connecting && <div><Spinner /></div>}
                        {device.state == "connected" && t("Connected")}
                        {device.state == "paired" && !connecting && t("Disconnected")}
                    </div>
                </div>
            </div>
        </>
    )
}

function BluetoothIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style={{msFilter: ""}}
        >
            <path
                d="M4.41 16.192l1.18 1.615L10 14.584V21a1 1 0 001.541.841l7-4.5a.999.999 0 00.049-1.649L13.537 12l5.053-3.692a1.002 1.002 0 00-.049-1.65l-7-4.5a1.002 1.002 0 00-1.021-.037c-.32.176-.52.513-.52.879v6.416L5.59 6.192 4.41 7.808 10 11.893v.215l-5.59 4.084zM12 4.832l4.232 2.721L12 10.646V4.832zm0 8.522l4.232 3.093L12 19.168v-5.814z"></path>
        </svg>
    )
}

function Spinner() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/>
            <path
                d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
                className="spinner_ajPY"
            />
        </svg>
    )
}

export default ActionsBluetooth