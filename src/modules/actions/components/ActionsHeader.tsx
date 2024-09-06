import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faLock, faPowerOff, faSignOut } from "@fortawesome/free-solid-svg-icons";
import User from "../../../types/user.ts";

const ActionsHeader = ({user} : {user: User}) => {
    return (
        <div className="flex h-16 w-screen">
            <div className="w-10/12 m-auto h-12 flex relative">
                <div className="flex w-1/2">
                    <div className="m-1">
                        <img src={"avatar://" + user.uuid} className="rounded-full w-10 h-10"/>
                    </div>
                    <div className="mt-auto mb-auto ml-2 font-medium">{user.firstName} {user.lastName}</div>
                </div>
                <div className="flex h-12 w-12 absolute right-0">
                    <div
                        className="m-auto w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-900 hover:bg-zinc-300 dark:hover:bg-zinc-900/40 transition flex">
                        <div className="m-auto">
                            <FontAwesomeIcon icon={faPowerOff}/>
                        </div>
                    </div>
                </div>

                <div className="flex h-12 w-12 absolute right-12">
                    <div
                        className="m-auto w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-900 hover:bg-zinc-300 dark:hover:bg-zinc-900/40 transition flex">
                        <div className="m-auto">
                            <FontAwesomeIcon icon={faSignOut}/>
                        </div>
                    </div>
                </div>

                <div className="flex h-12 w-12 absolute right-24"> { /* TODO delete in future */}
                    <div
                        className="m-auto w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-900 hover:bg-zinc-300 dark:hover:bg-zinc-900/40 transition flex">
                        <div className="m-auto">
                            <FontAwesomeIcon icon={faLock}/>
                        </div>
                    </div>
                </div>

                <div className="flex h-12 w-12 absolute right-36">
                    <div
                        className="m-auto w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-900 hover:bg-zinc-300 dark:hover:bg-zinc-900/40 transition flex">
                        <div className="m-auto">
                            <FontAwesomeIcon icon={faGear}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActionsHeader