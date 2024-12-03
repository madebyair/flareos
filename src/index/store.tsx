import React from "react"
import ReactDOM from "react-dom/client"
import StoreComponent from "../components/store/StoreComponent.tsx"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <StoreComponent />
    </React.StrictMode>
)