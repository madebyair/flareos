import { atom } from "@zedux/react"

export const colorSchemeState = atom<"light" | "dark">("colorScheme", "light")