import { useTranslation } from "react-i18next"
import { useRef } from "react"

const StartSearchComponent = () => {
    const inputRef = useRef(null)
    const [ t ] = useTranslation()

    return (
        <header>
            <div className="content">
                <input className="w-screen bg-slate-200 dark:bg-black rounded-t-md h-12 border-b-gray-700 border-b-2 dark:text-white indent-4 focus:outline-none border-transparent focus:ring-0" type="text" ref={inputRef} placeholder={t("What are you looking for?")} autoFocus/>
            </div>
        </header>
    )
}

export default StartSearchComponent