type SettingsSelectionType = {
    name: string,
    subtext?: string,
    onClick: () => void
}

const SettingsSelection = ({ name, subtext, onClick }: SettingsSelectionType) => {
    return (
        <div
            className="w-full h-auto bg-slate-200/70 dark:bg-zinc-900 hover:bg-slate-300 dark:hover:bg-zinc-800 transition-colors duration-300 rounded-md shadow-sm cursor-pointer p-4 mt-2"
            onClick={onClick}
        >
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {name}
            </div>
            {subtext && (
                <div className="text-sm mt-1 text-gray-600 dark:text-gray-400 leading-tight">
                    {subtext}
                </div>
            )}
        </div>
    )
}

export default SettingsSelection
