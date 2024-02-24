import { atom } from "@zedux/react"
import User from "../types/user.ts"

export const userState = atom("user", <User>{
    "firstName": "",
    "lastName": "",
    "email": "",
    "uuid": "",
    "sessionUuid": "",
    "sessionSecret": "",
    "password": ""
})