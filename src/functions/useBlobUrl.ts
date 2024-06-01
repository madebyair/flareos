import { useEffect, useState } from "react"
import axios from "axios"

// SOURCE https://codesandbox.io/p/sandbox/load-image-as-blob-410uq?file=%2Fsrc%2FImageBlob%2FuseBlobUrl.js%3A1%2C1-28%2C1
const useBlobUrl = (imageUrl: string) => {
    const [blobUrl, setBlobUrl] = useState("")

    useEffect(() => {
        // get the blob URL for this image URL (or null)
        let url = sessionStorage.getItem(imageUrl)

        async function fetchData() {
            if (!url) {
                // skip load if we have a URL previously stored in sessionStorage
                const { data } = await axios.get(imageUrl, { responseType: "blob" })
                url = URL.createObjectURL(data) // create a "blob URL" (lasts per session)
                sessionStorage.setItem(imageUrl, url) // save in session storage
            }
            setBlobUrl(url) // set in states
        }

        fetchData()
    }, [imageUrl]) // only execure if imageUrl changes

    return blobUrl
}

export default useBlobUrl
