// SOURCE https://github.com/marc2332/tauri-terminal/blob/main/src/main.ts

import { Terminal } from "xterm"
import { FitAddon } from "xterm-addon-fit"
import { invoke } from "@tauri-apps/api/core"

const root = document.getElementById("root") as HTMLElement
const body = document.getElementById("body") as HTMLElement

body.style.margin = "0px"
body.style.background = "#000"
root.style.height = "100vh"

const term = new Terminal({
    fontFamily: "Jetbrains Mono",
    theme: {
        background: "#000"
    },
})

const fit = new FitAddon()

term.loadAddon(fit)
term.open(root)

async function fitTerminal() {
    fit.fit()
    void invoke<string>("async_resize_pty", {
        rows: term.rows,
        cols: term.cols,
    })
}

// Write data from pty into the terminal
function writeToTerminal(data: string) {
    return new Promise<void>((r) => {
        term.write(data, () => r())
    })
}

// Write data from the terminal to the pty
function writeToPty(data: string) {
    void invoke("async_write_to_pty", {
        data,
    })
}
function initShell() {
    invoke("async_create_shell").catch((error) => {
        // on linux it seem to to "Operation not permitted (os error 1)" but it still works because echo $SHELL give /bin/bash
        console.error("Error creating shell:", error)
    })
}

initShell()
term.onData(writeToPty)
addEventListener("resize", fitTerminal)
fitTerminal()

async function readFromPty() {
    const data = await invoke<string>("async_read_from_pty")

    if (data) {
        await writeToTerminal(data)
    }

    window.requestAnimationFrame(readFromPty)
}

window.requestAnimationFrame(readFromPty)
