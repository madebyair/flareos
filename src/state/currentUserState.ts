import { atom } from "@zedux/react"
import User, { defaultUser } from "../types/user.ts"

export const userState = atom("user", <User>defaultUser)