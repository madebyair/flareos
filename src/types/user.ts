import { App } from "./app.ts"

type User = {
    "firstName": string,
    "lastName": string,
    "email": string,
    "uuid": string,
    "sessionUuid": string,
    "sessionSecret": string,
    "password": string,
    "apps": Array<App>,
    "theme": "light"|"dark"
}

export const defaultUser : User = {
    "firstName": "",
    "lastName": "",
    "email": "",
    "uuid": "",
    "sessionUuid": "",
    "sessionSecret": "",
    "password": "",
    "apps": [],
    "theme": "light"
}

export default User