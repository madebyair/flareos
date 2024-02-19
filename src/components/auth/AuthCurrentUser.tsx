import User from "../../types/user.ts";

const AuthCurrentUser = ({ user }: { user: User }) => {
    return (
        <div className="w-96 h-32 flex">
            <img
                src={`https://api.made-by-air.com/avatar/${user.uuid}`}
                alt=""
                className="w-32 h-32 rounded-full"
            />
            <div className="h-32 ml-4 mt-4">
                <h1 className="dark:text-white text-2xl font-bold">{user.firstName} {user.lastName}</h1>
                <h2 className="dark:text-white -mt-2">{user.email}</h2>
                <div className="h-14 flex">
                    <div className="m-auto">
                        <h1 className="dark:text-white">Error</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthCurrentUser;