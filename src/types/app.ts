type AppTranslation = {
    "pl"?: string,
    "bg"?: string,
    "zh"?: string,
    "cs"?: string,
    "da"?: string,
    "nl"?: string,
    "fr"?: string,
    "de"?: string,
    "is"?: string,
    "it"?: string,
    "ja"?: string,
    "pt"?: string,
    "sl"?: string,
    "es"?: string,
    "sv"?: string,
    "uk"?: string,
}

type App = {
    "name": string,
    "name_translations"?: AppTranslation,
    "description": string,
    "description_translations"?: AppTranslation,
    "exec": string,
    "icon": string
}

export type { AppTranslation, App }