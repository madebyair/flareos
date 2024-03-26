import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useAtomState } from "@zedux/react"
import { actionsComponent } from "../actionsState.tsx"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"

const ActionsBluetooth = () => {
    const [, setComponent] = useAtomState(actionsComponent)
    const [ t ] = useTranslation()

    return (
        <div className="w-screen h-screen top-0 p-8 bg-slate-200 dark:bg-zinc-950/95 rounded-xl absolute top-0">
            <header className="flex h-10">
                <div className="h-10 w-10 flex hover:bg-slate-300 rounded-md transition duration-300 dark:hover:bg-zinc-900" onClick={() => setComponent(null)}>
                    <div className="m-auto">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </div>
                </div>
                <h1 className="my-auto ml-2">{t("Available devices")}</h1>
            </header>
            <Device name={"Idk"} id={1} />
        </div>
    )
}

const Device = ({name, id} : {name: string, id: number}) => {
    const [cls, setCls] = useState("w-full h-10 flex hover:bg-slate-200 relative rounded-md transition duration-300 dark:hover:bg-zinc-900 mt-4")

    useEffect(() => {
        // setCls("w-full h-10 flex hover:bg-slate-300 rounded-md transition duration-300 dark:hover:bg-zinc-900 mt-4 relative")
    }, [])

    return (
        <div className={cls} onClick={() => {
            // TODO connect device
        }}>
            <div className="h-10 w-10 flex">
                <div className="m-auto">
                    <BluetoothIcon/>
                </div>
            </div>
            <div className="mt-auto mb-auto">
                {name}
            </div>
            <div className="absolute right-4 flex h-full">
                <div className="mt-auto mb-auto">
                    Connected
                </div>
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

export default ActionsBluetooth