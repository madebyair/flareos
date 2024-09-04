import isOnline from "../../../functions/isOnline.ts"
import axios from "axios"
import { invoke } from "@tauri-apps/api/core"
import { useEffect, useState } from "react"

export default function useAvatar(user: string) {
    const [av, setAvatar] = useState("avatar://" + user)

    useEffect(() => {
        avatar(user).then((r) => {
            if (r == "") {
                setAvatar("avatar://" + user)
            } else {
                console.log("updated")
                setAvatar(r)
            }
        })
    }, [])


    return av
}

export async function avatar(user: string) {
    const online = await isOnline()

    if (online) {
        const res = await axios.get("https://api.made-by-air.com/avatar/" + user + "/sum")
        const current = res.data

        const isCurrent = await invoke("compare_avatars", { avatar: user, current })

        if (!isCurrent) {
            await invoke("update_avatar", { uuid: user })

            return "https://api.made-by-air.com/avatar/" + user
        }
    } else {
        return "avatars://" + user
    }

    return ""
}