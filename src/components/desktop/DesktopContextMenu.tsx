type ContextType = {
    x: number,
    y: number,
    displayed: false
}

const DesktopContextMenu = ({context} : {context: ContextType}) => {
    return (
        <>
            {context.displayed &&
                <div className="bg-slate-300 w-32 h-48 absolute" style={{
                    top: context.y,
                    left: context.x
                }}>
                    Add widget
                </div>
            }
        </>
    )
}

export default DesktopContextMenu