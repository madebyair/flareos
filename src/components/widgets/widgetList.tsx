import { Widget } from "../../types/widget.ts"
import ClockWidget from "./clock/ClockWidget.tsx"

const defaultWidgets: Widget[] = [
    {
        name: "Clock",
        component: <ClockWidget />,
        x: 10,
        y: 20,
        default: "clock"
    }
]

export default defaultWidgets