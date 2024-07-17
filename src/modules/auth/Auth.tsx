import { useEffect, useState } from "react"
import AuthCurrentUser from "./AuthCurrentUser.tsx"
import { get, set } from "../../manager/store_manager.ts"
import User from "../../types/user.ts"
import Desktop from "../../components/desktop/Desktop.tsx"
import { useAtomState } from "@zedux/react"
import { userState } from "../../state/currentUserState.ts"
import { invoke } from "@tauri-apps/api/core"
import AuthFooter from "./AuthFooter.tsx"
import AuthUsers from "./AuthUsers.tsx"
import { listen } from "@tauri-apps/api/event"

const Auth = () => {
    const [currentUser, setCurrentUser] = useState(0)
    const [users, setUsers] = useState<Array<User>>([])
    const [inDesktop, setInDesktop] = useState(false)
    const [hide, setHide] = useState(false)
    const [, setUser] = useAtomState(userState)

    useEffect(() => {
        get("users").then((users) => {
            if (Array.isArray(users)) {
                setUsers(users.sort((a, b) => b.lastUsed - a.lastUsed))
            }
        })

        void listen("auth", () => {
            setInDesktop(false)
            setHide(false)
        })
    }, [])

    return (
        <>
            {inDesktop &&
                <Desktop />
            }
            {!hide &&
                <div className={"w-screen h-screen auth-bg select-none absolute top-0 z-20"}>
                    <div className={`w-screen h-screen backdrop-blur-md flex ${
                        inDesktop && "fadeout"
                    }`}>
                        <div className="m-auto bg-black p-8 text-white bg-gray-800/50 backdrop-blur-2xl rounded-xl">
                            {users.length > 0 ? (
                                <AuthCurrentUser key={users[currentUser]["uuid"]} user={users[currentUser]}
                                    onDesktop={() => {
                                        setInDesktop(true)
                                        setUser(users[currentUser])
                                        setTimeout(() => setHide(true), 800)
                                        void invoke("add_permissions", { user: users[currentUser].unixUser })

                                        get("users").then((r) => {
                                            const cur: unknown = r

                                            if (Array.isArray(cur)) {
                                                const indexToUpdate = cur.findIndex((key: User) => key.uuid === users[currentUser].uuid)
                                                if (indexToUpdate !== -1) {
                                                    const now = new Date
                                                    cur[indexToUpdate].lastUsed = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
                                                        now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()).toString()
                                                    set("users", cur)
                                                }
                                            }
                                        })
                                    }}/>
                            ) : <span>Loading</span>}
                        </div>
                        <AuthFooter />
                        {users.length > 0 &&
                            <AuthUsers users={users} current={currentUser} setCurrent={setCurrentUser} />
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Auth