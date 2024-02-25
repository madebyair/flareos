import { App } from "./app.ts"

type User = {
    "firstName": string,
    "lastName": string,
    "email": string,
    "uuid": string,
    "sessionUuid": string,
    "sessionSecret": string,
    "password": string,
    "apps": Array<App>
}

export default User