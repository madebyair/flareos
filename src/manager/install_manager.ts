export const installing: string[] = []

export function isInstalling(uuid: string): boolean {
    return installing.includes(uuid)
}

export function install(uuid: string, user: string) {
    installing.push(uuid)
    console.log("Installing app", user)
}