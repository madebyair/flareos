import { useAtomState } from "@zedux/react"
import { userState } from "../../state/currentUserState.ts"
import Draggable from "react-draggable"
import ClockWidget from "../widgets/clock/ClockWidget.tsx"

const DesktopWidgets = () => {
    const [user] = useAtomState(userState)

    return (
        <div className="w-screen h-screen absolute top-0 z-50">
            {user.widgets.map((w) => {
                let component: JSX.Element = <ClockWidget />

                if (w.component == "clockwidget") {
                    component = <ClockWidget />
                }
                return (
                    <Draggable
                        key={w.name + w.x}
                        position={{x: w.x, y: w.y}}
                        onStop={(e) => {
                            console.log(e)
                            console.log(window.innerHeight)
                        }}
                        scale={1}
                    >
                        <div>{component}</div>
                    </Draggable>
                )
            })}
        </div>
    )
}

export default DesktopWidgets