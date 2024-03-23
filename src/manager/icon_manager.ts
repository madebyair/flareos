import User from "../types/user.ts"
import { App, UserApp } from "../types/app.ts"

function getIcon(user : User, app: string) {
    let icon = ""
    user.apps.forEach((appp : App | UserApp) => {
        if ("class" in appp && appp?.class == app.toLowerCase()) {
            icon = appp?.icon
        }
    })

    return icon
}

export default getIcon