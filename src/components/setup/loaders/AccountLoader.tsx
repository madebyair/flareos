import { BarLoader } from "react-spinners"
import { useTranslation } from "react-i18next"
import { useAtomState } from "@zedux/react"
import { setupComponent, /* setupComponent, */ setupNoPadding } from "../setupState.tsx"
import { useEffect } from "react"
import axios from "axios"
import { invoke } from "@tauri-apps/api/core"
import { removeSpecialCharacters } from "../../../helpers.ts"
import widgetList from "../../widgets/widgetList.tsx"
import { get, set } from "../../../manager/store_manager.ts"
// import { emit } from "@tauri-apps/api/event"
import { userState } from "../../../state/currentUserState.ts"
import { colorSchemeState } from "../../../state/themeState.ts"
import User from "../../../types/user.ts"
import EndOfSetup from "../end/EndOfSetup.tsx"

type SessionResponse = {
    status: string;
    uuid: string;
    first_name: string;
    last_name: string;
    email: string;
};

const AccountLoader = ({ uuid, secret, password }: { uuid: string, secret: string, password: string }) => {
    const { t } = useTranslation()
    const [, setNoPadding] = useAtomState(setupNoPadding)
    // const [, setComponent] = useAtomState(setupComponent)
    const [theme] = useAtomState(colorSchemeState)
    const [, setComponent] = useAtomState(setupComponent)
    const [, setUser] = useAtomState(userState)

    useEffect(() => {
        setNoPadding(true)

        axios.get<SessionResponse>("https://api.made-by-air.com/session", {
            headers: {
                "Session-UUID": uuid,
                "Session-Secret": secret,
            }
        }).then((r) => {
            invoke("encrypt", { content: password }).then((password) => {
                if (typeof password === "string") {
                    const unixUser: string = removeSpecialCharacters(r.data.first_name.toLowerCase() + r.data.last_name.toLowerCase())

                    invoke<string>("create_user", { name: unixUser, uuid: uuid, password }).then((unix) => {
                        if (unix !== "") {
                            const user: User = {
                                firstName: r.data.first_name,
                                lastName: r.data.last_name,
                                email: r.data.email,
                                uuid: r.data.uuid,
                                sessionUuid: uuid,
                                sessionSecret: secret,
                                password: password,
                                apps: [],
                                theme: theme,
                                language: "en",
                                unixUser: unix,
                                widgets: widgetList
                            }
                            setUser(user)
                            get("users").then((c) => {
                                const d = Array.isArray(c) ? c : []
                                set("users", [
                                    ...d,
                                    user
                                ])
                            })
                            setTimeout(() => {
                                setComponent(<EndOfSetup />)
                                setNoPadding(false)
                            }, 500)
                            // if (isFromAuth) {
                            //     emit("component", "fromauth");
                            // }
                        }
                    })
                }
            })
        })
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
                <span className="m-auto dark:text-white text-2xl font-bold">{t("Just one second")}</span>
            </div>
        </div>
    )
}

export default AccountLoader
