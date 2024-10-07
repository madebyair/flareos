import React from "react"
import ReactDOM from "react-dom/client"
import { getCurrentWindow } from "@tauri-apps/api/window"
import CalculatorContainer from "./components/CalculatorContainer.tsx"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <CalculatorContainer />
    </React.StrictMode>
)

void getCurrentWindow().show()