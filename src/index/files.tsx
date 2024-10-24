import React from "react"
import ReactDOM from "react-dom/client"
import { getCurrentWindow } from "@tauri-apps/api/window"
import FilesContainer from "../components/files/FilesContainer.tsx"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <FilesContainer />
    </React.StrictMode>
)

void getCurrentWindow().show()