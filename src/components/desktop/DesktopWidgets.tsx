import { useAtomState } from "@zedux/react"
import { userState } from "../../state/currentUserState.ts"
import Widget from "./Widget.tsx"

const DesktopWidgets = () => {
    const [user] = useAtomState(userState)


    return (
        <div className="w-screen h-screen absolute top-0 z-10">
            {user.widgets.map((k) => {
                return (
                    <Widget w={k} key={k.component} />
                )
            })}
        </div>
    )
}

export default DesktopWidgets