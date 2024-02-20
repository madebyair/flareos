import airsmallBlack from "../../assets/images/airsmall-black.webp"
import airsmallWhite from "../../assets/images/airsmall-white.webp"

const Taskbar = () => {
    return (
        <div className="w-screen bg-zinc-300 dark:bg-zinc-950 h-10 z-50 flex">
            <div className="mx-6 flex h-8 my-auto">
                <div
                    className="flex mx-2 rounded-md hover:bg-zinc-400 dark:hover:bg-zinc-800 transition duration-300 h-8 w-8">
                    <img src={airsmallBlack} alt="" className="block dark:hidden"/>
                    <img src={airsmallWhite} alt="" className="hidden dark:block"/>
                </div>
            </div>
        </div>
    )
}

export default Taskbar