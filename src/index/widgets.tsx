import React from "react"
import ReactDOM from "react-dom/client"
import { getCurrent } from "@tauri-apps/api/window"
import WidgetsMenu from "../components/widgets/menu/WidgetsMenu.tsx"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <WidgetsMenu />
    </React.StrictMode>
)

getCurrent().show()