import axios from "axios"

export default async function isOnline() {
    const response = await axios.get("https://api.made-by-air.com", {
        timeout: 3000
    })

    return response.status == 200
}