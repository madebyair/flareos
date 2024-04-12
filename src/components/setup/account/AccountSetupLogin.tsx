import AccountSetupLayout from "./AccountSetupLayout.tsx"
// @ts-expect-error type script bug
import airBlack from "../../../assets/images/air-black.webp"
// @ts-expect-error type script bug
import airWhite from "../../../assets/images/air-white.webp"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import Button from "../../../elements/Button.tsx"
import { isValidEmail, removeSpecialCharacters } from "../../../helpers.ts"
import exists from "../../../api/auth/exists.ts"
import { BarLoader } from "react-spinners"
import useBlobUrl from "../../../functions/useBlobUrl.ts"
import login from "../../../api/auth/login.ts"
import { useAtomState } from "@zedux/react"
import { userState } from "../../../state/currentUserState.ts"
import { get, set } from "../../../manager/store_manager.ts"
import { invoke } from "@tauri-apps/api/core"
import { colorSchemeState } from "../../../state/themeState.ts"
import widgetList from "../../widgets/widgetList.tsx"
import { emit } from "@tauri-apps/api/event"

const AccountSetupLogin = ({isFromAuth} : {isFromAuth?: boolean}) => {
    const { t } = useTranslation()
    const [value, setValue] = useState("")
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [uuid, setUuid] = useState("")
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState("")
    const [first, setFirst] = useState("")
    const [last, setLast] = useState("")
    const [, setUser] = useAtomState(userState)
    const avatarBlob = useBlobUrl(avatar)
    const [theme] = useAtomState(colorSchemeState)

    function next() {
        if (uuid !== "") {
            next_password()
            return
        }

        if (value === "") {
            setError(t("Provide the e-mail address for your account, it really doesn't hurt."))

            return
        }

        if (!isValidEmail(value)) {
            setError(t("This doesn't look like an email address."))

            return
        }

        setLoading(true)

        exists(value).then((r) => {
            setTimeout(() => {
                if (r.data.result === "taken") {
                    setUuid(r.data.user.uuid)
                    setEmail(r.data.user.email)
                    setName(r.data.user.first_name + " " + r.data.user.last_name)
                    setAvatar("https://api.made-by-air.com/avatar/" + r.data.user.uuid)
                    setLoading(false)
                    setValue("")
                    setFirst(r.data.user.first_name)
                    setLast(r.data.user.last_name)
                } else {
                    setError(t("It looks like you don't have an account yet. It's time to change that!"))
                    setLoading(false)
                }
            }, 500)
        })
    }

    function next_password() {
        if (value === "") {
            setError(t("Hmm, maybe it would be a good idea to provide the password?"))

            return
        }

        setLoading(true)

        login(email, value).then((r) => {
            invoke("encrypt", { content: value }).then((password) => {
                if (typeof password === "string") {
                    const unixUser : string = removeSpecialCharacters(first.toLowerCase() + last.toLowerCase())

                    invoke("create_user", { name: unixUser, uuid: uuid, password: value }).then(() => {
                        if (unixUser !== "") {
                            setUser({
                                "firstName": first,
                                "lastName": last,
                                "email": email,
                                "uuid": uuid,
                                "sessionUuid": r?.data.uuid,
                                "sessionSecret": r?.data.secret,
                                "password": password,
                                "apps": [],
                                "theme": theme,
                                "language": "en",
                                "unixUser": unixUser,
                                "widgets": widgetList
                            })
                            get("users").then((c) => {
                                const d = Array.isArray(c) ? c : []
                                set("users", [
                                    // @ts-ignore
                                    ...(d),
                                    {
                                        "firstName": first,
                                        "lastName": last,
                                        "email": email,
                                        "uuid": uuid,
                                        "sessionUuid": r?.data.uuid,
                                        "sessionSecret": r?.data.secret,
                                        "password": password,
                                        "apps": [],
                                        "theme": theme,
                                        "language": "en",
                                        "unixUser": unixUser,
                                        "widgets": widgetList
                                    },
                                ])
                            })
                            if (isFromAuth) {
                                emit("component", "fromauth")
                            }
                        }
                    })
                }
            })
        }).catch(function () {
            setError(t("We think that's not your password."))
            setLoading(false)
        })
    }

    // tbh that's almost 1 to 1 code from made-by-air.com website I'm just lazy :)
    return (
        <AccountSetupLayout isFromAuth={isFromAuth}>
            <>
                <div
                    className="w-full h-full rounded-xl text-center relative">
                    <div className="absolute w-full">
                        <BarLoader
                            height={8}
                            cssOverride={{
                                width: "100%",
                                borderRadius: "10px",
                            }}
                            loading={loading}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                            color="#2563eb"
                        />
                    </div>
                    <div className="h-[20px]"></div>
                    <div className="w-full h-[70px] flex">
                        <div className="m-auto">
                            <img src={airWhite} alt="" width="90px" className="hidden dark:block" />
                            <img src={airBlack} alt="" width="90px" className="block dark:hidden" />
                        </div>
                    </div>
                    <h1 className="text-2xl dark:text-white poppins">{t("Sign in")}</h1>
                    <span className="text-md dark:text-white poppins">{t("to air account.")}</span>
                    {!uuid && (
                        <div className="h-[20px]"></div>
                    )}
                    {uuid && (
                        <div className="flex w-full mt-2">
                            <div className="m-auto text-white flex">
                                <img src={avatarBlob} alt="" className="rounded-full w-[40px] h-[40px] mt-auto mb-auto" />
                                <div className="mt-auto mb-auto ml-4">{name}</div>
                            </div>
                        </div>
                    )}
                    <div className="w-full flex mt-2">
                        <div className="block m-auto w-[70%]">
                            <label htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">{uuid ? t("Your password") : t("Your email")}</label>
                            <input id="email" type={uuid ? "password" : "text"} value={value} onChange={(e) => {
                                setValue(e.target.value)
                                setError("")
                            }}
                            className="w-full h-[50px] outline-none m-auto border text-sm rounded-lg block p-2.5 bg-slate-300 dark:bg-[#252525] border-gray-600 placeholder-gray-400 dark:text-white focus:border-indigo-500 focus:border-2"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    next()
                                }
                            }}
                            />
                            <div className="text-left">
                                <span className="mt-2 text-xs text-red-600 dark:text-red-400">{error}</span>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-2 right-4 flex">
                        <Button submit={() => next()} label={t("Continue")} disabled={loading}></Button>
                    </div>
                </div>
            </>
        </AccountSetupLayout>
    )
}

const AuthLogin = () => {
    return (
        <div className="w-screen h-screen auth-bg select-none absolute top-0 z-20 dark">
            <div className="w-screen h-screen backdrop-blur-md flex">
                <div className="w-[800px] h-[500px] bg-slate-200 dark:bg-black m-auto rounded-xl" >
                    <AccountSetupLogin isFromAuth />
                </div>
            </div>
        </div>
    )
}

export { AuthLogin }
export default AccountSetupLogin