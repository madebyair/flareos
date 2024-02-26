import Taskbar from "../taskbar/Taskbar.tsx"
import { useAtomState } from "@zedux/react"
import { userState } from "../../state/currentUserState.ts"

const Desktop = () => {
    const [user] = useAtomState(userState)

    return (
        <div className={"desktop-bg w-screen h-screen bg-black relative select-none " + user.theme}>
            <div className="absolute bottom-0">
                <Taskbar />
            </div>
        </div>
    )
}

export default Desktop