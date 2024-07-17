import { useTranslation } from "react-i18next"
import { emit } from "@tauri-apps/api/event"
import { useAtomState } from "@zedux/react"
import { colorSchemeState } from "../../../state/themeState.ts"
import { useEffect, useState } from "react"
import axios from "axios"
import { setupComponent } from "../setupState.tsx"
import AccountLoader from "../loaders/AccountLoader.tsx"
import { userState } from "../../../state/currentUserState.ts"
import embededApps from "../../../apps/embededApps.ts"
import defaultWidgets from "../../../components/widgets/widgetList.tsx"
import { BarLoader } from "react-spinners"

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

function AccountSetup({ isFromAuth }: { isFromAuth: boolean }) {
    const [ t ] = useTranslation()
    const [theme] = useAtomState(colorSchemeState)
    const [uuid, setUuid] = useState("")
    const [, setComponent] = useAtomState(setupComponent)
    const [, setUser] = useAtomState(userState)
    const [loading, setLoading] = useState(true)

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
                    if (isFromAuth) {
                        setUser({
                            firstName: "",
                            lastName: "",
                            email: "",
                            uuid: "",
                            sessionUuid: r.data.session_uuid,
                            sessionSecret: r.data.session_secret,
                            password: r.data.password,
                            apps: embededApps,
                            theme: "dark",
                            language: "en",
                            unixUser: "",
                            widgets: defaultWidgets
                        })
                        void emit("component", "authlogin_loader")
                    } else {
                        setComponent(<AccountLoader isFromAuth={false} uuid={r.data.session_uuid} secret={r.data.session_secret} password={r.data.password} />)
                    }
                }
            })
        }, 1000)

        setTimeout(() => setLoading(false), 1000)

        return () => clearInterval(inv)
    }, [uuid])

    return (
        <div className="container w-full h-full flex relative">
            {isFromAuth &&
                <div className="text-blue-500 hover:text-blue-400 text-[17px] h-min transition duration-300 mb-8 ml-8 absolute bottom-0" onClick={() => emit("component", "auth")}>{t("Go back")}</div>
            }
            {loading &&
                <div className="w-full h-full rounded-md absolute bg-black">
                    <div className="flex w-full rounded-xl">
                        <BarLoader
                            height={8}
                            cssOverride={{
                                width: "99.95%",
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
                        <span className="m-auto text-white text-2xl font-bold">{t("Just one second")}</span>
                    </div>
                </div>
            }
            {uuid !== "" &&
                <iframe id="auth"
                    src={"https://made-by-air.com/flare/01/auth/en/" + uuid + "/" + `${isFromAuth ? "dark" : theme}`}
                    width="100%" style={{colorScheme: "dark", borderRadius: "10px"}}></iframe>
            }
        </div>
    )
}

export default AccountSetup