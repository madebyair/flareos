import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome } from "@fortawesome/free-solid-svg-icons"

const DiscoverSidebar = () => {
    return (
        <div className="h-full w-full mt-8 mb-8">
            <div className="hover:bg-blue-500/60 rounded-lg transition duration-300 w-1/2 h-12 flex">
                <div className="h-12 w-12 flex">
                    <FontAwesomeIcon icon={faHome} className="m-auto" size="xl" />
                </div>
                <div className="mt-auto mb-auto">
                    Home
                </div>
            </div>
        </div>
    )
}

export default DiscoverSidebar