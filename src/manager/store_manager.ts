import { Store } from "@tauri-apps/plugin-store"

export const store = new Store("/usr/airos/data.dat")

export function get(key: string) {
    return store.get(key)
}

export function set(key: string, value : Array<never>|string) {
    return store.set(key, value).then(() => {
        save()
    })
}

export function save() {
    store.save()

    return
}