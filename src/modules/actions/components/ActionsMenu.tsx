import { useEffect, useState } from "react"
import { listen } from "@tauri-apps/api/event"
import { getCurrent } from "@tauri-apps/api/window"
import isNightLight from "../../../manager/nightlight/isNightLight.ts"
import { invoke } from "@tauri-apps/api/core"
import { useTranslation } from "react-i18next"
import { useAtomState } from "@zedux/react"
import User, { defaultUser } from "../../../types/user.ts"
import { actionsComponent } from "../actionsState.tsx"
import "../../../i18n.ts"
import "../../../assets/css/App.css"

const transformDevices = (devices: { device: string }[]): DeviceInfo[] => {
    return devices.map(item => {
        const parts = item.device.split(" ")
        const mac = parts[1]
        const name = parts.slice(2).join(" ")
        return { mac, name }
    })
}

type EventResponse = {
    user: User;
    current: boolean;
};

type BluetoothState = {
    available: boolean,
    enabled: boolean
    devices: DeviceInfo[]
}

interface DeviceInfo {
    mac: string;
    name: string;
}

const ActionsMenu = () => {
    const [user, setUser] = useState<User>(defaultUser)
    const [nightLight, setIsNightLight] = useState(false)
    const [component, setComponent] = useAtomState(actionsComponent)
    const [bluetooth, setBluetooth] = useState<BluetoothState>({available: false, enabled: false, devices: []})
    const [, i18n] = useTranslation()

    
    useEffect(() => {
        void listen<EventResponse>("components-display-event", (event) => {
            setUser(event.payload.user)
            void i18n.changeLanguage(event.payload.user.language)

            if (!event.payload.current) {
                void getCurrent().hide()
            } else {
                void getCurrent().show()
            }
        })

        void listen<"light" | "dark">("theme-change", (event) => {
            setUser(prevUser => ({
                ...prevUser,
                theme: event.payload
            }))
        })

        if (window.location.port !== "1420") {
            window.addEventListener("contextmenu", e => e.preventDefault())
        }

        const interval = setInterval(() => {
            isNightLight().then((r) => {
                setIsNightLight(r)
            })

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
        }, 300)

        return () => clearInterval(interval)
    }, [])
    return (
        <div className={user?.theme}>
            <div className="bg-slate-200/90 dark:bg-zinc-950/90 w-screen h-screen rounded-xl dark:text-white select-none fill-black dark:fill-white">
                <div className="flex h-16 w-screen">
                    <div className="w-10/12 m-auto h-12 flex">
                        <div className="flex w-1/2">
                            <div className="m-1">
                                <img src={"avatar://" + user.uuid} className="rounded-full w-10 h-10"/>
                            </div>
                            <div className="mt-auto mb-auto ml-2 font-medium">{user.firstName} {user.lastName}</div>
                        </div>
                    </div>
                </div>
                <div className="w-9/12 h-3/4 bg-sky-300/55 hover:bg-sky-500 dark:bg-zinc-900 dark:hover:bg-zinc-900/60 m-auto rounded-md transition duration-100 flex">

                </div>
            </div>
        </div>
    )}
export default ActionsMenu
