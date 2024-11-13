import ReactDOM from "react-dom/client"
import { getCurrentWindow } from "@tauri-apps/api/window"
import FilesContainer from "./components/FilesContainer.tsx"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <FilesContainer />
)

void getCurrentWindow().show()