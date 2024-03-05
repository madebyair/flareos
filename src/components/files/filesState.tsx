import { atom } from "@zedux/react"

export const currentDirState = atom<string>("currentDir", "/home")
