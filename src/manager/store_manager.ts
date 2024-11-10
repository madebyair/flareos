import { LazyStore } from "@tauri-apps/plugin-store"

const storePromise = new LazyStore("/usr/flareos/data,dat")

export async function get(key: string) {
    return storePromise.get(key)
}

export async function set(key: string, value: unknown) {
    await storePromise.set(key, value)
    await save()
}

export async function save() {
    await storePromise.save()
}
