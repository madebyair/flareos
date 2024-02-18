import { Store } from "@tauri-apps/plugin-store";

export const store = new Store("/usr/airos/data.dat");

export function get(key: string) {
    return store.get(key)
}

export function set(key: string, value : Array<any>|string|{}) {
    store.set(key, value).then(() => {
        save()
    })

    return
}

export function save() {
    store.save()

    return
}