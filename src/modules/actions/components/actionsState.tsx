import { atom } from "@zedux/react"

export const actionsComponent = atom<JSX.Element | null>("component", null)