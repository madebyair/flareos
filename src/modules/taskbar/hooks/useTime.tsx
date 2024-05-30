import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

export default function useTime() {
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

    return time
}