import { useEffect, useState } from "react";
import AuthCurrentUser from "./AuthCurrentUser.tsx";
import { get } from "../../store_manager.ts";
import User from "../../types/user.ts";

const Auth = () => {
    let currentUser = 0;
    const [users, setUsers] = useState<Array<User>>([]);

    useEffect(() => {
        get("users").then((users) => {
            if (Array.isArray(users)) {
                setUsers(users);
            }
        });
    }, []);

    return (
        <div className="w-screen h-screen auth-bg select-none">
            <div className="w-screen h-screen backdrop-blur-md flex">
                <div className="m-auto">
                    {users.length > 0 ? (
                        <AuthCurrentUser key={users[currentUser]["uuid"]} user={users[currentUser]} />
                    ) : <span>Loading</span>}
                </div>
            </div>
        </div>
    );
};

export default Auth;