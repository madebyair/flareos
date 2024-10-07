import ReactDOM from "react-dom/client"
import DiscoverIndex from "./components/DiscoverIndex.tsx"
import { getCurrentWindow } from "@tauri-apps/api/window"

void getCurrentWindow().show()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <DiscoverIndex />
)