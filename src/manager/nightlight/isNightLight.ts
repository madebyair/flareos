import getCurrentGamma from "../gamma/getCurrentGamma.ts"

async function isNightLight() {
    const gamma = await getCurrentGamma()

    if (gamma === "1.3:1.3:1.3") {
        return true
    }

    return false
}

export default isNightLight