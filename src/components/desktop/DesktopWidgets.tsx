import { useAtomState } from "@zedux/react"
import { userState } from "../../state/currentUserState.ts"
import Widget from "./Widget.tsx"

const DesktopWidgets = () => {
    const [user] = useAtomState(userState)


    return (
        <div className="w-screen absolute top-0 z-10" style={{height: "calc(100vh - 40px)",}}>
            {user.widgets.map((k) => {
                return (
                    <Widget w={k} key={k.component} />
                )
            })}
        </div>
    )
}

export default DesktopWidgets