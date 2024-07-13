import AccountLoader from "../loaders/AccountLoader.tsx"
import { useAtomState } from "@zedux/react"
import { userState } from "../../../state/currentUserState.ts"

const AccountLoaderFromAuth = () => {
    const [user] = useAtomState(userState)

    return (
        <div className="w-screen h-screen flex select-none">
            <div className="setup-bg w-screen h-screen flex">
                <div
                    className="w-[800px] h-[500px] bg-slate-200 dark:bg-black m-auto rounded-xl"
                >
                    <AccountLoader uuid={user.sessionUuid} secret={user.sessionSecret} password={user.password} isFromAuth />
                </div>
            </div>
        </div>
    )
}

export default AccountLoaderFromAuth