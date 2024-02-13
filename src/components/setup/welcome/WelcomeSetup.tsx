import Button from "../../../elements/Button.tsx";
import Toggle from "../../../elements/Toggle.tsx";
import { useState } from "react";

const WelcomeSetup = () => {
    const [enabled, setEnabled] = useState(false)
    return (
        <div className="">
            <h1 className="text-5xl dark:text-white">Welcome!</h1>
            <h2 className="text-zinc-700 dark:text-zinc-300 mt-4 w-72">Welcome to Airos! Before we begin, let's connect to the network and log in to your air account.</h2>
            <Toggle enabled={enabled} setEnabled={setEnabled} />
            <Button label="Continue" submit={() => {
                console.log("Button works")
            }} />
        </div>
    )
}

export default WelcomeSetup