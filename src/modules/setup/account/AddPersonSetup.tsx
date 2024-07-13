import AccountSetup from "./AccountSetup.tsx"

const AddPersonSetup = () => {
    return (
        <div className="w-screen h-screen flex select-none">
            <div className="setup-bg w-screen h-screen flex">
                <div
                    className="w-[800px] h-[500px] bg-slate-200 dark:bg-black m-auto rounded-xl"
                >
                    <AccountSetup isFromAuth />
                </div>
            </div>
        </div>
    )
}

export default AddPersonSetup