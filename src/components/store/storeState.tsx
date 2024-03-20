import { atom } from "@zedux/react"
import StoreApps from "./StoreApps.tsx"

export const storeComponent = atom("component", <StoreApps channel="home" />)