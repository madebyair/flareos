import { App, UserApp } from "./app.ts"
import { supportedLanguagesType } from "./supportedLanguages.ts"
import { Widget } from "./widget.ts"
import defaultWidgets from "../components/widgets/widgetList.tsx"

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
    "unixUser": string,
    widgets: Widget[]
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
    "unixUser": "",
    widgets: defaultWidgets
}

export default User