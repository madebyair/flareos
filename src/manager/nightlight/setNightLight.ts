import setCurrentGamma from "../gamma/setCurrentGamma.ts"

function enableNightLight() {
    setCurrentGamma("0.8:0.8:0.8")
}

function disableNightLight() {
    setCurrentGamma("1:1:1")
}

export { enableNightLight, disableNightLight }