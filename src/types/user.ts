import { App, UserApp } from "./app.ts"
import { supportedLanguagesType } from "./supportedLanguages.ts"

type User = {
    "firstName": string,
    "lastName": string,
    "email": string,
    "uuid": string,
    "sessionUuid": string,
    "sessionSecret": string,
    "password": string,
    "apps": Array<App | UserApp>,
    "theme": "light"|"dark",
    "language": supportedLanguagesType,
    "unixUser": string
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
    "theme": "light",
    "language": "en",
    "unixUser": ""
}

export default User