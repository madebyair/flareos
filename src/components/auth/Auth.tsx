import { useEffect, useState } from "react"
import AuthCurrentUser from "./AuthCurrentUser.tsx"
import { get } from "../../store_manager.ts"
import User from "../../types/user.ts"
import Desktop from "../desktop/Desktop.tsx"
import { useAtomState } from "@zedux/react"
import { userState } from "../../state/currentUserState.ts"

const Auth = () => {
    const currentUser = 0
    const [users, setUsers] = useState<Array<User>>([])
    const [inDesktop, setInDesktop] = useState(false)
    const [hide, setHide] = useState(false)
    const [, setUser] = useAtomState(userState)

    useEffect(() => {
        get("users").then((users) => {
            if (Array.isArray(users)) {
                setUsers(users)
            }
        })
    }, [])

    return (
        <>
            {inDesktop &&
                <Desktop />
            }
            {!hide &&
                <div className={"w-screen h-screen auth-bg select-none absolute top-0"}>
                    <div className={`w-screen h-screen backdrop-blur-md flex ${
                        inDesktop && "fadeout"
                    }`}>
                        <div className="m-auto">
                            {users.length > 0 ? (
                                <AuthCurrentUser key={users[currentUser]["uuid"]} user={users[currentUser]}
                                    onDesktop={() => {
                                        setInDesktop(true)
                                        setUser(users[currentUser])
                                        setTimeout(() => setHide(true), 800)
                                    }}/>
                            ) : <span>Loading</span>}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Auth