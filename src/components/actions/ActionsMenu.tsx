import { useEffect, useState } from "react"
import User, { defaultUser } from "../../types/user.ts"
import { listen } from "@tauri-apps/api/event"
import { getCurrent } from "@tauri-apps/api/window"
import "../../assets/css/App.css"
import { faMoon, faPalette, faPlane, faShare, faWifi } from "@fortawesome/free-solid-svg-icons"
import ActionsButton from "./ActionsButton.tsx"
import { disableNightLight, enableNightLight } from "../../manager/nightlight/setNightLight.ts"
import isNightLight from "../../manager/nightlight/isNightLight.ts"
import ActionsMixer from "./ActionsMixer.tsx"
import { useAtomState } from "@zedux/react"
import { isFullMixer } from "./actionsState.ts"
import FullMixer from "./FullMixer.tsx"
import { invoke } from "@tauri-apps/api/core"

type EventResponse = {
    user: User;
    current: boolean;
};

type BluetoothState = {
    available: boolean,
    enabled: boolean
}

const ActionsMenu = () => {
    const [user, setUser] = useState<User>(defaultUser)
    const [nightLight, setIsNightLight] = useState(false)
    const [fullMixer] = useAtomState(isFullMixer)
    const [bluetooth, setBluetooth] = useState<BluetoothState>({available: false, enabled: false})

    useEffect(() => {
        listen<EventResponse>("actions-display-event", (event) => {
            setUser(event.payload.user)

            if (!event.payload.current) {
                getCurrent().hide()
            } else {
                getCurrent().show()
            }
        })

        listen<"light" | "dark">("theme-change", (event) => {
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
        }, 100)

        return () => clearInterval(interval)
    }, [])
    return (
        <div className={user?.theme}>
            <div className="start bg-slate-200/95 dark:bg-zinc-950/95 w-screen h-screen rounded-xl dark:text-white select-none">
                {fullMixer &&
                    <div className="absolute top-0">
                        <FullMixer />
                    </div>
                }
                <div className="w-screen h-3/4 flex">
                    <div className="w-11/12 h-5/6 m-auto">
                        <div className="w-full h-1/3 flex">
                            <ActionsButton text="Wifi" subtext="Connected" icon={faWifi} enabled onClick={() => {}}/>
                            {bluetooth.available &&
                                <ActionsButton text="Bluetooth" subtext="Ready" iconSvg={<BluetoothIcon/>} enabled={bluetooth.enabled} onClick={() => {}}/>
                            }
                            <ActionsButton text="Plane mode" icon={faPlane} enabled={false} onClick={() => {}}/>
                        </div>
                        <div className="w-full h-1/3 flex">
                            <ActionsButton text="Blue light" icon={faPalette} enabled={false} onClick={() => {}} />
                            <ActionsButton text="Night light" icon={faMoon} enabled={nightLight} onClick={() => {
                                if (nightLight) {
                                    disableNightLight()
                                    setIsNightLight(false)
                                    return
                                }
                                enableNightLight()
                                setIsNightLight(true)
                            }} />
                            <ActionsButton text="Hotspot" icon={faShare} enabled={false} onClick={() => {}} />
                        </div>
                    </div>
                </div>
                <ActionsMixer />
            </div>
        </div>
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
            fill="rgba(255, 255, 255, 1)"
        >
            <path
                d="M4.41 16.192l1.18 1.615L10 14.584V21a1 1 0 001.541.841l7-4.5a.999.999 0 00.049-1.649L13.537 12l5.053-3.692a1.002 1.002 0 00-.049-1.65l-7-4.5a1.002 1.002 0 00-1.021-.037c-.32.176-.52.513-.52.879v6.416L5.59 6.192 4.41 7.808 10 11.893v.215l-5.59 4.084zM12 4.832l4.232 2.721L12 10.646V4.832zm0 8.522l4.232 3.093L12 19.168v-5.814z"></path>
        </svg>
    )
}

export default ActionsMenu