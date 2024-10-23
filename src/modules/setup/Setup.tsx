import { setupComponent, setupNoPadding } from "./setupState.tsx"
import { useAtomState } from "@zedux/react"
import { colorSchemeState } from "../../state/themeState.ts"
import SetupFooter from "./SetupFooter.tsx";

const Setup = () => {
    const [component] = useAtomState(setupComponent)
    const [noPadding] = useAtomState(setupNoPadding)
    const [colorScheme] = useAtomState(colorSchemeState)


    return (
        <div className="w-screen h-screen flex select-none">
            <div className="setup-bg-light w-screen h-screen flex transition-all duration-300">
                {colorScheme == "dark" && <div className="bg-zinc-950/80 absolute top-0 bottom-0 w-screen h-screen"></div>}
                <div
                    className={`w-[800px] h-[500px] bg-slate-200 absolute dark:bg-black m-auto inset-0 rounded-xl shadow-black shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),_0_2px_4px_-1px_rgba(0,0,0,0.06)] ${
                        noPadding ? "" : "p-16"
                    } transition-colors duration-300`}
                >
                    {component}
                </div>
                <SetupFooter />
            </div>
        </div>
    )
}

export default Setup
