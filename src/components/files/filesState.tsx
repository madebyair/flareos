import { atom } from "@zedux/react"

export const currentDirState = atom<string>("currentDir", "/home")
export const currentActiveState = atom<string>("currentActive", "")
