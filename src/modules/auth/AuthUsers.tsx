const AuthUsers = () => {
    return (
        <div className="absolute bottom-4 flex w-screen z-20">
            <div className="w-64 mx-auto z-50">
                <div className="w-full h-16 flex rounded-md backdrop-blur-2xl hover:bg-gray-800/70 transition duration-300">
                    <div className="h-16 w-16 flex">
                        <img src="https://api.made-by-air.com/avatar/3307daba-7eaf-4485-ac05-c9d37694f0d1" alt="" className="m-auto rounded-full" width="45px" />
                    </div>
                    <div className="mt-auto mb-auto">
                        <h1 className="text-white font-medium">Oskar Niziol</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthUsers