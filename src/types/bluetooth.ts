export type BluetoothDevice = {
    name?: string,
    mac: string,
    state: "connected" | "paired" | "available"
}

export const transformBluetooth = (devices: { device: string }[], state: "connected" | "paired" | "available"): BluetoothDevice[] => {
    return devices.map(item => {
        const parts = item.device.split(" ")
        const mac = parts[1]
        const name = parts.slice(2).join(" ")
        return { mac, name, state }
    })
}