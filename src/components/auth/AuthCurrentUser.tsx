import User from "../../types/user.ts";
import { useTranslation } from "react-i18next";

const AuthCurrentUser = ({ user }: { user: User }) => {
    const { t } = useTranslation();

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
                        {user.password == null ?
                            <h1 className="dark:text-white">Error</h1>
                        :
                            <div className="relative">
                                <input type="password"
                                       className="w-full h-[40px] outline-none m-auto border text-sm rounded-lg block p-2.5 bg-slate-300 dark:bg-[#252525] border-gray-600 placeholder-gray-400 dark:text-white focus:border-indigo-500 focus:border-2"
                                       placeholder={t("Password")} autoFocus={true}/>
                                <div className="absolute right-0 top-0 w-[40px] h-[40px] rounded-full flex">
                                    <div className="m-auto h-6 w-6 bg-slate-400 rounded-full">I</div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthCurrentUser;