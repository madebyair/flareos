import { storeApp } from "../../types/storeApp.ts"
import { useEffect, useState } from "react"
import axios from "axios"
import Skeleton from "react-loading-skeleton"
import "./../../assets/css/Skeleton.css"
import Button from "../../elements/Button.tsx"
import { useTranslation } from "react-i18next"

type StoreResponse = {
    status: "success" | "failed",
    app: storeApp
}

const StoreView = ({app} : {app: string}) => {
    const [appDetalis, setAppDetalis] = useState<storeApp>()
    const [loading, setLoading] = useState(true)
    const [t] = useTranslation()

    useEffect(() => {
        setLoading(true)
        axios.get<StoreResponse>("https://api.made-by-air.com/store/get?uuid=" + app).then(r => {
            setAppDetalis(r.data.app)
            setTimeout(() => setLoading(false), 300)
        })
    }, [app])
    return (
        <div className="mr-4 overflow-auto" style={{height: "calc(100vh - 96px)"}}>
            {loading &&
                <Skeleton
                    containerClassName="h-36 w-full"
                    height="144px"
                />
            }
            {!loading &&
                <div className="h-36 w-full bg-slate-300 dark:bg-zinc-900 flex relative rounded-md">
                    <div className="h-36 w-36 flex">
                        <img src={appDetalis?.icon} className="m-auto" draggable={false} width="80px" alt=""/>
                    </div>
                    <div className="mt-auto mb-auto ml-4 font-bold text-2xl">
                        {appDetalis?.name}
                    </div>
                    <div className="absolute h-36 right-8 flex">
                        <div className="mt-auto mb-auto">
                            <Button submit={() => console.log("install")} label={t("Install")} />
                        </div>
                    </div>
                </div>
            }
            {loading &&
                <Skeleton
                    containerClassName="mt-8"
                    height="384px"
                />
            }
            {!loading &&
                <div className="h-96 mt-8 bg-slate-300 dark:bg-zinc-900 rounded-md flex">
                    <div className="m-auto w-10/12 overflow-auto flex">
                        {appDetalis?.screenshots.map((image) => {
                            return (
                                <img src={image} alt="" draggable={false}
                                    className="rounded-md mx-4"/>
                            )
                        })}
                    </div>
                </div>
            }
        </div>
    )
}

export default StoreView