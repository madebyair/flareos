import { App } from "../types/app.ts"

const embededApps : Array<App> = [
    {
        "name": "Terminal",
        "description": "Terminal. For real Developers :D",
        "exec": "__FlareOS_embed_app_terminal__",
        "icon": "icons://terminal.webp"
    },
    {
        "name": "Files",
        "description": "File Manager",
        "exec": "__FlareOS_embed_app_files__",
        "icon": "icons://files.webp"
    },
    {
        "name": "Settings",
        "description": "Here you can manage with all settings",
        "exec": "__FlareOS_embed_app_settings__",
        "icon": "icons://settings.webp"
    },
    {
        "name": "Store",
        "description": "airstore is app which allows you to download any app.",
        "exec": "__FlareOS_embed_app_store__",
        "icon": "icons://store.webp"
    },
    {
        "name": "Discover",
        "description": "Discover your computer.",
        "exec": "__FlareOS_embed_app_discover__",
        "icon": "icons://discover.webp"
    },
    {
        "name": "Calculator",
        "description": "Calculator",
        "exec": "__FlareOS_embed_app_calculator__",
        "icon": "icons://calculator.webp"
    }
]

export default embededApps