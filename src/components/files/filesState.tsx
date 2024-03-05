import { atom } from "@zedux/react"
import DirectoryExplorer from "./explorer/DirectoryExplorer.tsx"

export const filesComponent = atom("component", {
    component: <DirectoryExplorer directory="/home/oskar" />
})
