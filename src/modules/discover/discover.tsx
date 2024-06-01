import ReactDOM from "react-dom/client"
import DiscoverIndex from "./components/DiscoverIndex.tsx"
import { getCurrent } from "@tauri-apps/api/window"

getCurrent().show()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <DiscoverIndex />
)