export function isValidEmail(email : string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function removeSpecialCharacters(input: string): string {
    const withoutDiacritics = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    return withoutDiacritics.replace(/[^\w\s]/gi, "")
}
