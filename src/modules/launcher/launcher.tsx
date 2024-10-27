import React from "react"
import ReactDOM from "react-dom/client"
import LauncherContainer from "./components/LauncherContainer.tsx"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <LauncherContainer />
    </React.StrictMode>
)