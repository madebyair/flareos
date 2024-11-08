import { createStore } from "@tauri-apps/plugin-store"

let storePromise = createStore("/usr/flareos/data.dat")

export async function get(key: string) {
    const store = await storePromise
    return store.get(key)
}

export async function set(key: string, value: unknown) {
    const store = await storePromise
    await store.set(key, value)
    await save()
}

export async function save() {
    const store = await storePromise
    await store.save()
}
