import { storeApp } from "../../../types/storeApp.ts"

const GenericSixRow = ({apps, name}: {name: string | undefined, apps: storeApp[]}) => {
    return (
        <div className="">
            <h1 className="text-xl font-bold">{name}</h1>
            <div className="flex flex-wrap justify-between mt-6">
                {apps.map((app) => {
                    app.name = app.name.replace(/Desktop/g, "")

                    return (
                        <div
                            key={app.uuid}
                            className="bg-zinc-900 w-1/3 min-w-[270px] rounded-md flex h-[100px] mt-6 mb-6"
                            style={{
                                flex: "0 1 calc(33.33% - 4%)",
                                maxWidth: "calc(33.33% - 4%)",
                                margin: "0 2% 10px 10px"
                            }}
                        >
                            <div className="w-[90px] flex">
                                <img src={app.icon} width="50px" className="m-auto rounded-xl" alt=""/>
                            </div>
                            <div className="flex w-max">
                                <h1 className="text-xl font-bold mt-auto mb-auto">{app.name}</h1>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default GenericSixRow
