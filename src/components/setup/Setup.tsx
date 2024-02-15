import { setupComponent, setupNoPadding } from "./setupState.tsx";
import { useAtomState } from "@zedux/react";

const Setup = () => {
    const [component] = useAtomState(setupComponent);
    const [noPadding] = useAtomState(setupNoPadding);

    return (
        <div className="w-screen h-screen flex select-none">
            <div className="setup-bg w-screen h-screen flex">
                <div
                    className={`w-[800px] h-[500px] bg-slate-200 dark:bg-black m-auto rounded-xl ${
                        noPadding ? "" : "p-16"
                    }`}
                >
                    {component}
                </div>
            </div>
        </div>
    );
};

export default Setup;