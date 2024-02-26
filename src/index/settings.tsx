import React from "react"
import ReactDOM from "react-dom/client"
import SettingsLayout from "../components/settings/SettingsLayout.tsx"
import { getCurrent } from "@tauri-apps/api/window"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <SettingsLayout />
    </React.StrictMode>
)

getCurrent().show()