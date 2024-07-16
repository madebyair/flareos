import User from "../../types/user.ts"
import { Dispatch, SetStateAction } from "react"
import useAvatar from "./hooks/useAvatar.tsx"

const AuthUsers = ({users, setCurrent} : {users: User[], setCurrent: Dispatch<SetStateAction<number>>}) => {
    const avatar = useAvatar(users[1]?.uuid)

    return (
        <div className="absolute bottom-4 flex w-screen z-20">
            <div className="relative mx-auto">
                {users.length > 1 &&
                    <div className="w-64 mx-auto z-50" onClick={() => setCurrent(1)}>
                        <div
                            className="w-full h-16 flex rounded-md backdrop-blur-2xl hover:bg-gray-800/70 transition duration-300">
                            <div className="h-16 w-16 flex">
                                <img src={avatar} alt=""
                                    className="m-auto rounded-full" width="45px"/>
                            </div>
                            <div className="mt-auto mb-auto">
                                <h1 className="text-white font-medium">{users[1].firstName} {users[1].lastName}</h1>
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