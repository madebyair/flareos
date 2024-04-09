import Loading from "../components/Loading.tsx"
import { atom } from "@zedux/react"

export const componentState = atom("component", <Loading />)