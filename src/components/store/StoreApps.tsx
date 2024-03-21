import { Key, useEffect, useState } from "react"
import axios from "axios"
import GenericSixRow from "./rows/GenericSixRow.tsx"
import { storeApp } from "../../types/storeApp.ts"
import GenericFourRow from "./rows/GenericFourRow.tsx"

const StoreApps = ({ channel }: { channel: string }) => {
    const [rows, setRows] = useState([])

    useEffect(() => {
        axios.get("https://api.made-by-air.com/store/channel/" + channel).then(r => {
            console.log(r.data)
            setRows(r.data.recomendations)
        })
    }, [channel])

    return (
        <div className="h-screen overflow-auto" style={{height: "calc(100vh - 96px)"}}>
            {rows ? (
                <div className="flex flex-col">
                    {rows.map(function (data: { apps: storeApp[]; key: Key | null | undefined; title?: string, name?: string }) {
                        if (data.apps.length == 4) {

                            return <GenericFourRow apps={data.apps} key={data.key} name={data.title ? data.title : data.name} />
                        }

                        return <GenericSixRow apps={data.apps} key={data.key} name={data.title ? data.title : data.name} />
                    })}
                </div>
            ) : (
                <h1>Loading</h1>
            )}
        </div>
    )
}

export default StoreApps
