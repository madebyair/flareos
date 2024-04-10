import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage, faPlus } from "@fortawesome/free-solid-svg-icons"
import { useTranslation } from "react-i18next"
import { WebviewWindow } from "@tauri-apps/api/webviewWindow"

type ContextType = {
    x: number,
    y: number,
    displayed: false
}

const DesktopContextMenu = ({context, hide} : {context: ContextType, hide: () => void}) => {
    const [ t ] = useTranslation()

    return (
        <>
            {context.displayed &&
                <div className="bg-slate-300 dark:bg-zinc-950 w-56 h-28 absolute rounded-md dark:text-white" style={{
                    top: context.y,
                    left: context.x
                }}>
                    <div className="m-4">
                        <div className="w-full h-10 hover:bg-slate-400/50 dark:hover:bg-zinc-900/95 rounded-md transition duration-300 flex" onClick={() => {
                            new WebviewWindow("widgets", {
                                url: "widgets.html",
                                title: "Widgets",
                                minWidth: 600,
                                minHeight: 500,
                                width: 600,
                                height: 500,
                                visible: false
                            })
                            hide()
                        }}>
                            <div className="h-10 w-10 flex">
                                <div className="m-auto">
                                    <FontAwesomeIcon icon={faPlus} />
                                </div>
                            </div>
                            <div className="my-auto">
                                {t("Add widget")}
                            </div>
                        </div>
                        <div className="w-full h-10 hover:bg-slate-400/50 dark:hover:bg-zinc-900/95 rounded-md transition duration-300 flex">
                            <div className="h-10 w-10 flex">
                                <div className="m-auto">
                                    <FontAwesomeIcon icon={faImage} />
                                </div>
                            </div>
                            <div className="my-auto">
                                {t("Change wallpaper")}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default DesktopContextMenu