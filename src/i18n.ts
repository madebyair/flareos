import { initReactI18next } from "react-i18next"
import i18n from "i18next"
import en from "../resources/locales/en.json"

void i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en }
        },
        lng: "en",
        fallbackLng: "en",
        debug: true,
        interpolation: {
            escapeValue: false
        }
    })