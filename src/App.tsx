import "./assets/css/App.css";
import Setup from "./components/setup/Setup.tsx";
import { useAtomState } from "@zedux/react";
import { colorSchemeState } from "./state/themeState.ts";
import "./i18n"
import { useEffect, useState } from "react";
import { get } from "./store_manager.ts";
import Loading from "./components/Loading.tsx";
import Auth from "./components/auth/Auth.tsx";

function App() {
    const [colorScheme] = useAtomState(colorSchemeState)
    const [component, setCompoment] = useState(<Loading />)

    useEffect(() => {
        get("users").then(r => {
            if (r && Array.isArray(r)) {
                if (r.length > 0) {
                    setCompoment(<Auth />)
                } else {
                    setCompoment(<Setup />)
                }
            } else {
                setCompoment(<Setup />)
            }
        })
    }, [])

    return (
        <div className={"text-black dark:text-white " + colorScheme}>
            {component}
        </div>
    )
}

export default App;