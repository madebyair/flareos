import User from "../../types/user.ts"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import useAvatar from "./hooks/useAvatar.tsx"

const AuthUsers = ({users, current, setCurrent} : {users: User[], current: number, setCurrent: Dispatch<SetStateAction<number>>}) => {
    const [avatar, setAvatar] = useState("")
    const [shownUser, setShownUser] = useState(1)
    const avatar0 = useAvatar(users[0].uuid)
    const avatar1 = useAvatar(users[1].uuid)

    useEffect(() => {
        if (current == 0) {
            setShownUser(1)
            setAvatar(avatar1)
        } else {
            setShownUser(0)
            setAvatar(avatar0)
        }
    }, [current])

    return (
        <div className="absolute bottom-4 flex w-screen z-20">
            <div className="relative mx-auto">
                {users.length > 1 &&
                    <div className="w-64 mx-auto z-50" onClick={() => {
                        if (shownUser == 1) {
                            setCurrent(1)
                        } else {
                            setCurrent(0)
                        }
                    }}>
                        <div
                            className="w-full h-16 flex rounded-md backdrop-blur-2xl hover:bg-gray-800/70 transition duration-300">
                            <div className="h-16 w-16 flex">
                                <img src={avatar} alt=""
                                    className="m-auto rounded-full w-[45px] h-[45px]" width="45px" height="45px" />
                            </div>
                            <div className="mt-auto mb-auto">
                                <h1 className="text-white font-medium">{users[shownUser].firstName} {users[shownUser].lastName}</h1>
                            </div>
                        </div>
                    </div>
                }
                {users.length > 2 &&
                    <div className="absolute bottom-4 left-32 h-16 w-16 bg-white"></div>
                }
            </div>
        </div>
    )
}

export default AuthUsers