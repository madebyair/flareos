import { useTranslation } from "react-i18next"
import { emit } from "@tauri-apps/api/event"
import { useAtomState } from "@zedux/react"
import { colorSchemeState } from "../../../state/themeState.ts"
import { useEffect, useState } from "react"
import axios from "axios"
import { setupComponent } from "../setupState.tsx"
import AccountLoader from "../loaders/AccountLoader.tsx"

type ResponseType = {
    status: string // status: "success" hehe
    uuid: string
}

type ChallengeType = {
    state: "awaiting" | "resolved"
    session_uuid: string
    session_secret: string
    password: string
}

function AccountSetup({ isFromAuth }: { isFromAuth?: boolean }) {
    const [ t ] = useTranslation()
    const [theme] = useAtomState(colorSchemeState)
    const [uuid, setUuid] = useState("")
    const [, setComponent] = useAtomState(setupComponent)

    useEffect(() => {
        axios.post<ResponseType>("https://api.made-by-air.com/challenge").then((r) => {
            setUuid(r.data.uuid)
        })
    }, [])

    useEffect(() => {
        const inv = setInterval(() => {
            axios.get<ChallengeType>("https://api.made-by-air.com/challenge", {
                params: { uuid }
            }).then((r) => {
                if (r.data.state == "resolved") {
                    setComponent(<AccountLoader uuid={r.data.session_uuid} secret={r.data.session_secret} password={r.data.password} />)
                }
            })
        }, 1000)

        return () => clearInterval(inv)
    }, [uuid])

    return (
        <div className="container w-full h-full flex relative">
            {isFromAuth &&
                <div className="text-blue-500 hover:text-blue-400 text-[17px] h-min transition duration-300 mb-8 ml-8 absolute bottom-0" onClick={() => emit("component", "auth")}>{t("Go back")}</div>
            }
            {uuid !== "" &&
                <iframe id="auth" src={"https://made-by-air.com/airos/01/auth/en/" + uuid + "/" + theme}
                    width="100%" style={{colorScheme: "dark", borderRadius: "10px"}}></iframe>
            }
        </div>
    )
}

export default AccountSetup