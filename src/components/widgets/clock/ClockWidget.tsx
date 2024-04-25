import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

const ClockWidget = () => {
    const [, i18n] = useTranslation()

    const [time, setTime] = useState(() => {
        const now = new Date()

        const timeFormat = new Intl.DateTimeFormat(undefined, {
            hour: "numeric",
            minute: "numeric",
            hour12: i18n.language === "en"
        })

        return timeFormat.format(now)
    })

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(() => {
                const now = new Date()
                const timeFormat = new Intl.DateTimeFormat(undefined, {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: i18n.language === "en"
                })

                return timeFormat.format(now)
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="bg-slate-300 dark:bg-black rounded-md w-48 h-16 flex">
            <h1 className="m-auto text-xl font-bold dark:text-white">{time}</h1>
        </div>
    )
}

export default ClockWidget