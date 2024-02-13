import { Switch } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";

const Toggle = ({enabled, setEnabled}: {enabled: boolean, setEnabled: Dispatch<SetStateAction<boolean>> }) => {
    return (
        <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`bg-gray-800 relative inline-flex h-[30px] w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
        >
            <span className="sr-only">Use setting</span>
            <span
                aria-hidden="true"
                className={`${enabled ? 'translate-x-8' : 'translate-x-0'}
            pointer-events-none inline-block h-[27px] w-[27px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
        </Switch>
    )
}

export default Toggle