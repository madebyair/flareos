export const history: Array<string> = ["/home"]
let currentIndex = 0

export function push(path: string) {
    if (currentIndex < history.length - 1) {
        // If we're not at the latest history entry, remove future entries
        history.splice(currentIndex + 1)
    }
    history.push(path)
    currentIndex = history.length - 1
}

export function get_back(): string | null {
    if (currentIndex > 0) {
        currentIndex--
        return history[currentIndex]
    } else {
        return null // No more history to go back
    }
}
