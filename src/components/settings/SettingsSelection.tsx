type SettingsSelectionType = {
    name: string,
    subtext?: string,
    onClick: () => void
}

const SettingsSelection = ({name, subtext, onClick} : SettingsSelectionType) => {
    return (
        <div className="w-full h-16 bg-slate-400/60 dark:bg-zinc-800 hover:bg-slate-400 dark:hover:bg-zinc-900 transition duration-300 rounded-md" onClick={() => onClick()}>
            {subtext == undefined &&
                <div className="h-16 w-full flex">
                    <span className="ml-2 mt-auto mb-auto">
                        {name}
                    </span>
                </div>
            }
            {subtext !== undefined &&
                <>
                    <div className="h-10 w-full flex">
                        <span className="ml-2 mt-auto mb-auto">
                            {name}
                        </span>
                    </div>
                    <div className="h-6 w-full flex">
                        <span className="ml-2 mt-auto mb-auto text-blue-400/80">
                            {subtext}
                        </span>
                    </div>
                </>
            }
        </div>
    )
}

export default SettingsSelection