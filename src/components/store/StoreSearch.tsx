import { Dispatch, SetStateAction, useEffect, useState } from "react"
import algoliasearch from "algoliasearch/lite"
import { useAtomState } from "@zedux/react"
import { storeComponent } from "./storeState.tsx"
import StoreView from "./StoreView.tsx"
import { useTranslation } from "react-i18next"

const searchClient = algoliasearch("4PFSUAU6VD", "917b22a4179597548aa70efc9078223a")
const index = searchClient.initIndex("store_apps")

type Response = {
    uuid: string,
    icon: string,
    name: string
}

const StoreSearch = ({input, setInput} : {input: string, setInput: Dispatch<SetStateAction<string>>}) => {
    const [hits, setHits] = useState<Response[]>([])
    const [ t ] = useTranslation()

    const handleSearch = async () => {
        try {
            const { hits } = await index.search<Response[]>(input)
            // @ts-ignore
            setHits(hits)
        } catch (error) {
            console.error("Error searching:", error)
        }
    }

    useEffect(() => {
        void handleSearch()
    }, [input])

    const [, setComponent] = useAtomState(storeComponent)

    return (
        <div style={{height: "calc(100vh - 96px)"}} className="absolute w-full bg-slate-200 dark:bg-black flex dark:text-white overflow-hidden bottom-0 right-0">
            <div className="font-bold text-2xl w-full mr-4">
                <h1>{t("Searching for")} {input}</h1>
                <ul style={{height: "calc(100% - 32px - 50px)"}} className="mt-12 overflow-auto">
                    {hits.map((hit) => (
                        <li key={hit.uuid}
                            onClick={() => {
                                setComponent(<StoreView app={hit.uuid} />)
                                setInput("")
                            }}
                            className="mt-8 flex bg-slate-300 dark:bg-zinc-900 hover:dark:bg-zinc-950/5 hover:bg-slate-400 transition duration-[300ms] w-full rounded-md">
                            <div className="w-64 h-28 flex">
                                <img src={hit.icon} alt="" width="70px" className="m-auto rounded-xl"/>
                            </div>
                            <div className="h-28 ml-8 flex">
                                <div className="mt-auto mb-auto block">
                                    <span className="block">{hit.name}</span>
                                </div>
                            </div>
                        </li>
                    ))}
                    <div className="text-center w-full mt-8">
                        <p className="text-gray-500 text-base">{t("Results were generated by Algolia")}</p>
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default StoreSearch