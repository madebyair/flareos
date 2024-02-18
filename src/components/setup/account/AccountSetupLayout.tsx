function AccountSetupLayout({ children }: { children: JSX.Element }) {
    return (
        <div className="container w-full h-full flex">
            <div className="m-auto w-[400px] h-[400px]">
                {children}
            </div>
        </div>
    );
}

export default AccountSetupLayout