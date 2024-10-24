import React from "react"
import ReactDOM from "react-dom/client"
import StoreComponent from "../components/store/StoreComponent.tsx"
import { getCurrentWindow } from "@tauri-apps/api/window"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <StoreComponent />
    </React.StrictMode>
)

void getCurrentWindow().show()