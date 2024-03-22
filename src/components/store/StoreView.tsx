import { storeApp } from "../../types/storeApp.ts"
import { useEffect, useState } from "react"
import axios from "axios"
import Skeleton from "react-loading-skeleton"
import "./../../assets/css/Skeleton.css"
import Button from "../../elements/Button.tsx"
import { useTranslation } from "react-i18next"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBox, faCode, faDownload } from "@fortawesome/free-solid-svg-icons"
import { BarLoader } from "react-spinners"
import { isInstalling } from "../../manager/install_manager.ts"
import { emit } from "@tauri-apps/api/event"

type StoreResponse = {
    status: "success" | "failed",
    app: storeApp
}

const StoreView = ({app} : {app: string}) => {
    const [appDetalis, setAppDetalis] = useState<storeApp>()
    const [loading, setLoading] = useState(true)
    const [t] = useTranslation()
    const [installing, setIsInstalling] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get<StoreResponse>("https://api.made-by-air.com/store/get?uuid=" + app).then(r => {
            setAppDetalis(r.data.app)
            setTimeout(() => setLoading(false), 300)
        })
        setIsInstalling(isInstalling(app))
    }, [app])
    return (
        <div className="mr-4 overflow-auto" style={{height: "calc(100vh - 96px)"}}>
            {loading &&
                <Skeleton
                    containerClassName="h-36 w-full"
                    height="144px"
                />
            }
            {!loading && appDetalis &&
                <div className="h-36 w-full bg-slate-300 dark:bg-zinc-900 flex relative rounded-md">
                    <div className="h-36 w-36 flex">
                        <img src={appDetalis?.icon} className="m-auto" draggable={false} width="80px" alt=""/>
                    </div>
                    <div className="mt-auto mb-auto ml-4 font-bold text-2xl">
                        {appDetalis?.name}
                        <p className="text-lg font-normal text-zinc-700 dark:text-zinc-500">{appDetalis?.author}</p>
                    </div>
                    <div className="absolute h-36 right-8 flex">
                        <div className="mt-auto mb-auto">
                            {!installing &&
                                <Button submit={() => {
                                    setIsInstalling(true)
                                    emit("app-install", appDetalis)
                                }} label={t("Install")} />
                            }
                            {installing &&
                                <>
                                    <BarLoader
                                        height={8}
                                        cssOverride={{
                                            borderRadius: "10px"
                                        }}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                        color="#2563eb"
                                    />
                                    <div className="w-full text-center mt-2">
                                        {t("Installing")}
                                    </div>
                                </>
                            }
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
                    <div className="m-auto w-10/12 h-80 overflow-auto flex">
                        {appDetalis?.screenshots.map((image) => {
                            if (image.startsWith("YTVID")) {
                                return (
                                    <iframe width="100%" height="315" key={image}
                                        src={image.replace("YTVID ", "") + "?autoplay=1&mute=1"}>
                                    </iframe>
                                )
                            }
                            return (
                                <img src={image} alt="" draggable={false} key={image}
                                    className="rounded-md mx-4"/>
                            )
                        })}
                    </div>
                </div>
            }
            {loading &&
                <Skeleton
                    containerClassName="h-36 w-full"
                    height="144px"
                />
            }
            {!loading &&
                <div className="h-36 w-full bg-slate-300 dark:bg-zinc-900 flex rounded-md mt-8">
                    <div className="w-1/3 h-full flex">
                        <div className="m-auto flex h-10">
                            <div className="flex h-full">
                                <FontAwesomeIcon icon={faBox} size="xl" className="m-auto"/>
                            </div>
                            <div className="mt-auto mb-auto ml-3 text-sm">
                                {t("Latest release")}
                                <br/>
                                <p className="text-zinc-700 dark:text-zinc-500">{appDetalis?.latest_version}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 h-full flex">
                        <div className="m-auto flex h-10">
                            <div className="flex h-full">
                                <FontAwesomeIcon icon={faCode} size="xl" className="m-auto"/>
                            </div>
                            <div className="mt-auto mb-auto ml-3 text-sm">
                                {t("Developer")}
                                <br/>
                                <p className="text-zinc-700 dark:text-zinc-500">{appDetalis?.author}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 h-full flex">
                        <div className="m-auto flex h-10">
                            <div className="flex h-full">
                                <FontAwesomeIcon icon={faDownload} size="xl" className="m-auto"/>
                            </div>
                            <div className="mt-auto mb-auto ml-3 text-sm">
                                {t("Downloads")}
                                <br/>
                                <p className="text-zinc-700 dark:text-zinc-500">{appDetalis?.downloads.toString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default StoreView