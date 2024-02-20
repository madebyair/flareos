import Taskbar from "../taskbar/Taskbar.tsx";

const Desktop = () => {
    return (
        <div className="desktop-bg w-screen h-screen bg-black relative">
            <div className="absolute bottom-0">
                <Taskbar />
            </div>
        </div>
    )
}

export default Desktop