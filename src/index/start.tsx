import React from "react";
import ReactDOM from "react-dom/client";
import StartComponent from "./StartComponent.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <StartComponent />
    </React.StrictMode>
);