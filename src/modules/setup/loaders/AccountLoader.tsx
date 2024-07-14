import { BarLoader } from "react-spinners"
import { useTranslation } from "react-i18next"
import { useAtomState } from "@zedux/react"
import { setupComponent, setupNoPadding } from "../setupState.tsx"
import { useEffect } from "react"
import axios from "axios"
import { invoke } from "@tauri-apps/api/core"
import { removeSpecialCharacters } from "../../../helpers.ts"
import widgetList from "../../../components/widgets/widgetList.tsx"
import { get, set } from "../../../manager/store_manager.ts"
import { emit } from "@tauri-apps/api/event"
import { userState } from "../../../state/currentUserState.ts"
import { colorSchemeState } from "../../../state/themeState.ts"
import User from "../../../types/user.ts"
import EndOfSetup from "../end/EndOfSetup.tsx"
import Button from "../../../elements/Button.tsx"

type SessionResponse = {
    status: string;
    uuid: string;
    first_name: string;
    last_name: string;
    email: string;
};

const AccountLoader = ({ uuid, secret, password, isFromAuth }: { uuid: string, secret: string, password: string, isFromAuth: boolean }) => {
    const { t } = useTranslation()
    const [, setNoPadding] = useAtomState(setupNoPadding)
    const [theme] = useAtomState(colorSchemeState)
    const [, setComponent] = useAtomState(setupComponent)
    const [, setUser] = useAtomState(userState)

    useEffect(() => {
        setNoPadding(true)

        async function create() {
            try {
                const response = await axios.get<SessionResponse>("https://api.made-by-air.com/session", {
                    headers: {
                        "Session-UUID": uuid,
                        "Session-Secret": secret,
                    }
                })

                if (isFromAuth) {
                    // @ts-ignore
                    const users = await get("users")

                    // @ts-ignore
                    users.forEach(u => {
                        if (u.uuid == response.data.uuid) {
                            emit("component", "authlogin_failed")

                            throw 1
                        }
                    })
                }

                const encryptedPassword = await invoke<string>("encrypt", { content: password })
                const unixUser = removeSpecialCharacters(response.data.first_name.toLowerCase() + response.data.last_name.toLowerCase())
                const unix = await invoke<string>("create_user", {
                    name: unixUser,
                    uuid: response.data.uuid,
                    password: encryptedPassword
                })

                void invoke("update_avatar", { uuid: response.data.uuid })

                if (unix !== "") {
                    const user: User = {
                        firstName: response.data.first_name,
                        lastName: response.data.last_name,
                        email: response.data.email,
                        uuid: response.data.uuid,
                        sessionUuid: uuid,
                        sessionSecret: secret,
                        password: encryptedPassword,
                        apps: [],
                        theme: theme,
                        language: "en",
                        unixUser: unix,
                        widgets: widgetList,
                    }

                    setUser(user)

                    const currentUsers = await get("users")
                    const updatedUsers = Array.isArray(currentUsers) ? currentUsers : []
                    await set("users", [...updatedUsers, user])

                    setTimeout(() => {
                        if (isFromAuth) {
                            emit("component", "fromauth")
                        } else {
                            setComponent(<EndOfSetup/>)
                            setNoPadding(false)
                        }
                    }, 1000)
                }
            } catch (error) {
                console.error("Error creating account:", error)
            }
        }

        void create()
    }, [])

    return (
        <div className={`w-full h-full rounded-xl relative ${isFromAuth ? "dark bg-black" : ""}`}>
            <div className="flex w-full rounded-xl">
                <BarLoader
                    height={8}
                    cssOverride={{
                        width: "99.62%",
                        borderTopLeftRadius: "25px",
                        borderTopRightRadius: "25px",
                        margin: "auto",
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

const AccountFailed = () => {
    const { t } = useTranslation()

    return (
        <div className="w-screen h-screen auth-bg select-none absolute top-0 z-20 dark">
            <div className="w-screen h-screen auth-bg select-none absolute top-0 z-20 dark:text-white">
                <div className="w-screen h-screen backdrop-blur-md flex">
                    <div className="w-[800px] h-[500px] bg-slate-200 dark:bg-black m-auto rounded-xl p-16 relative">
                        <h1 className="text-4xl font-bold">{t("Something went wrong")}</h1>
                        <h2>{t("Account creation failed because you already have one account.")}</h2>
                        <div className="absolute bottom-16 right-16">
                            <Button label={t("Go back")} submit={() => emit("component", "auth")} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { AccountFailed }
export default AccountLoader
