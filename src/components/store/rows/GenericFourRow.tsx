import { storeApp } from "../../../types/storeApp.ts"
import { useAtomState } from "@zedux/react"
import { storeComponent } from "../storeState.tsx"
import StoreView from "../StoreView.tsx"

const GenericFourRow = ({apps, name}: {name: string | undefined, apps: storeApp[]}) => {
    const [, setComponent] = useAtomState(storeComponent)

    return (
        <div className="">
            <h1 className="text-xl font-bold">{name}</h1>
            <div className="flex flex-wrap justify-between mt-6">
                {apps.map((app, index) => {
                    app.name = app.name.replace(/Desktop/g, "")

                    return (
                        <div
                            key={app.uuid}
                            className="bg-slate-300 dark:bg-zinc-900 hover:dark:bg-zinc-950/5 hover:bg-slate-400 transition duration-300 min-w-[270px] rounded-md flex h-[100px] mt-6 mb-6"
                            style={{
                                flex: "0 1 calc(50% - 10px)",
                                maxWidth: "calc(50% - 10px)",
                                margin: index % 2 === 0 ? "0 10px 10px 0" : "0 0 10px 10px"
                            }}
                            onClick={() => setComponent(<StoreView app={app.uuid} />)}
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

export default GenericFourRow