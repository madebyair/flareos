import User from "../../types/user.ts"
import { useTranslation } from "react-i18next"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { invoke } from "@tauri-apps/api/core"
import useAvatar from "./hooks/useAvatar.tsx"

const AuthCurrentUser = ({ user, onDesktop }: { user: User, onDesktop: () => void }) => {
    const { t } = useTranslation()
    const [error, setError] = useState("")
    const [value, setValue] = useState("")
    const [shake, setShake] = useState("")
    const avatar = useAvatar(user.uuid)
    const [avatarUrl, setAvatarUrl] = useState("")

    function next() {
        if (value == "") {
            setShake("shake")
            setError(t("Enter the password to your air account."))
            setTimeout(() => {
                setShake("")
            }, 300)

            return
        }

        invoke("decrypt", { content: value, challenge: user.password }).then(result => {
            if (!result) {
                setShake("shake")
                setError(t("We think that's not your password."))
                setTimeout(() => {
                    setShake("")
                }, 300)
            } else {
                onDesktop()
            }
        })
    }

    useEffect(() => {
        setAvatarUrl(avatar)
    }, [avatar])

    return (
        <div className="w-96 h-32 flex relative">
            <img
                src={avatarUrl}
                alt=""
                key={avatarUrl}
                id="avatar"
                className="w-32 h-32 rounded-full"
            />
            <div className="h-32 ml-4 mt-4">
                <h1 className="dark:text-white text-2xl font-bold">{user.firstName} {user.lastName}</h1>
                <h2 className="dark:text-white -mt-2">{user.email}</h2>
                <div className="h-14 flex">
                    <div className="m-auto">
                        {user.password == null ?
                            <h1 className="dark:text-white">Error</h1>
                            :
                            <div className="relative">
                                <input type="password"
                                    className="w-full pr-[35px] h-[40px] outline-none m-auto border text-sm rounded-lg block p-2.5 bg-slate-300 dark:bg-[#252525] border-gray-600 placeholder-gray-400 dark:text-white focus:border-indigo-500 focus:border-2"
                                    placeholder={t("Password")} autoFocus={true}
                                    value={value} onChange={(e) => {
                                        setValue(e.target.value)
                                        setError("")
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            next()
                                        }
                                    }}
                                />
                                <div className="absolute right-0 top-0 w-[40px] h-[40px] rounded-full flex">
                                    <div className="m-auto h-6 w-6 bg-slate-400 hover:bg-slate-500 rounded-full flex relative transition duration-300" onClick={() => next()}>
                                        <div className="m-auto top-2">
                                            <FontAwesomeIcon icon={faPaperPlane} size="xs" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            {error !== null &&
                <div className={"absolute -bottom-8 text-center text-red-500 w-full " + shake}>{error}</div>
            }
        </div>
    )
}

export default AuthCurrentUser