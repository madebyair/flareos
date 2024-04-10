import { useAtomState } from "@zedux/react"
import { userState } from "../../../state/currentUserState.ts"
import Button from "../../../elements/Button.tsx"
import Desktop from "../../desktop/Desktop.tsx"
import { useState } from "react"
import { useTranslation } from "react-i18next"

const AccountFromAuth = () => {
    const [user] = useAtomState(userState)
    const [hide, setHide] = useState(false)
    const [inDesktop, setInDesktop] = useState(false)
    const [ t ] = useTranslation()

    return (
        <>
            {inDesktop && <Desktop />}
            {!hide && (
                <div className={`w-screen h-screen auth-bg select-none absolute top-0 z-20 ${inDesktop ? "fadeout" : ""}`}>
                    <div className="w-screen h-screen auth-bg select-none absolute top-0 z-20 dark text-white">
                        <div className="w-screen h-screen backdrop-blur-md flex">
                            <div className="w-[800px] h-[500px] bg-slate-200 dark:bg-black m-auto rounded-xl p-16 relative">
                                <h1 className="text-4xl font-bold">{t("Welcome")} {user.firstName}</h1>
                                <h2>{t("Welcome to Airos! Below we provide you with a list of things you can do at the beginning of your Airos adventure. Clicking Continue will take you to the Airos desktop.")}</h2>
                                <div className="absolute bottom-16 right-16">
                                    <Button label="Continue" submit={() => {
                                        setInDesktop(true)
                                        setTimeout(() => setHide(true), 800)
                                    }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default AccountFromAuth
