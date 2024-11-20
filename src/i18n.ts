import { initReactI18next } from "react-i18next"
import i18n from "i18next"

import main from "../locales/main.json"
import bg from "../locales/bg.json"
import cs from "../locales/cs.json"
import da from "../locales/da.json"
import de from "../locales/de.json"
import el from "../locales/el.json"
import es from "../locales/es.json"
import et from "../locales/et.json"
import fi from "../locales/fi.json"
import fil from "../locales/fil.json"
import fr from "../locales/fr.json"
import ga from "../locales/ga.json"
import hr from "../locales/hr.json"
import is from "../locales/is.json"
import it from "../locales/it.json"
import ja from "../locales/ja.json"
import ko from "../locales/ko.json"
import lt from "../locales/lt.json"
import lo from "../locales/lo.json"
import mk from "../locales/mk.json"
import nl from "../locales/nl.json"
import pl from "../locales/pl.json"
import ro from "../locales/ro.json"
import sk from "../locales/sk.json"
import sl from "../locales/sl.json"
import sv from "../locales/sv.json"
import uk from "../locales/uk.json"
import zh from "../locales/zh.json"

void i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: main },
            bg: { translation: bg },
            cs: { translation: cs },
            da: { translation: da },
            de: { translation: de },
            el: { translation: el },
            es: { translation: es },
            et: { translation: et },
            fi: { translation: fi },
            fil: { translation: fil },
            fr: { translation: fr },
            ga: { translation: ga },
            hr: { translation: hr },
            is: { translation: is },
            it: { translation: it },
            ja: { translation: ja },
            ko: { translation: ko },
            lt: { translation: lt },
            lo: { translation: lo },
            mk: { translation: mk },
            nl: { translation: nl },
            pl: { translation: pl },
            ro: { translation: ro },
            sk: { translation: sk },
            sl: { translation: sl },
            sv: { translation: sv },
            uk: { translation: uk },
            zh: { translation: zh },
        },
        lng: "en",
        fallbackLng: "en",
        debug: true,
        interpolation: {
            escapeValue: false,
        },
    })
