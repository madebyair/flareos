import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"

type ActionsButtonType = {
    text: string;
    subtext?: string;
    icon?: IconDefinition;
    iconSvg?: JSX.Element;
    enabled: boolean;
};

const ActionsButton = ({ text, subtext, icon, iconSvg, enabled }: ActionsButtonType) => {
    let className = "w-9/12 h-3/4 bg-sky-500/65 hover:bg-sky-500 m-auto rounded-md transition duration-300 flex"

    if (!enabled) {
        className = "w-9/12 h-3/4 bg-gray-500/65 hover:bg-gray-500 m-auto rounded-md transition duration-300 flex"
    }

    return (
        <div className="w-1/3 h-full flex">
            <div className={className}>
                <div className="h-full w-1/3 flex">
                    <div className="m-auto">
                        {icon && <FontAwesomeIcon icon={icon} />}
                        {iconSvg && <>{iconSvg}</>}
                    </div>
                </div>
                <div className="w-2/3 h-full flex">
                    {subtext &&
                        <div className="my-auto">
                            <span className="text-sm block -mb-1 font-bold">{text}</span>
                            <span
                                className="text-[12px] block text-zinc-600 dark:text-zinc-300 hover:text-white">{subtext}</span>
                        </div>
                    }
                    {!subtext &&
                        <div className="my-auto">
                            <span className="text-sm block font-bold">{text}</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ActionsButton
