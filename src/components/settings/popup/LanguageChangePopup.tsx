import { Dialog, Transition } from "@headlessui/react"
import { Dispatch, Fragment, SetStateAction, useState } from "react"
import { supportedLanguagesType } from "../../../types/supportedLanguages.ts"
import { UsaFlag } from "../../../assets/CountryFlags.tsx"
import Button from "../../../elements/Button.tsx"
import { useAtomState } from "@zedux/react"
import { settingsComponent } from "../settingsState.tsx"
import { useTranslation } from "react-i18next"
import { emit } from "@tauri-apps/api/event"

type LanguageType = {
    name: string,
    short: supportedLanguagesType,
    flag: JSX.Element,
    setChanged: Dispatch<SetStateAction<boolean>>
}

function Language({name, short, flag, setChanged} : LanguageType) {
    const [, i18n] = useTranslation()

    return (
        <div className="h-12 w-full rounded-md flex hover:bg-zinc-900/70 transition duration-300" onClick={() => {
            setChanged(true)
            void i18n.changeLanguage(short)
            void emit("language-change", short)
        }}>
            <div className="h-12 w-12 flex ml-4">
                {flag}
            </div>
            <div className="h-12 ml-4 flex">
                <div className="mb-auto mt-auto text-white">
                    {name}
                </div>
            </div>
        </div>
    )
}

export default function LanguageChangePopup() {
    const [changed, setChanged] = useState(false)
    const [, setComponent] = useAtomState(settingsComponent)
    const [ t ] = useTranslation()

    return (
        <>
            <Transition appear show as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => {}}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto select-none">
                        <div className="flex min-h-full items-center justify-center p-4 text-center dark:hidden">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-800 p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-white"
                                    >
                                        {!changed &&
                                            <span>{t("Change your language")}</span>
                                        }
                                        {changed &&
                                            <span>{t("Language was changed")}</span>
                                        }
                                    </Dialog.Title>
                                    <div className="mt-2 h-52 overflow-auto">
                                        {!changed &&
                                            <>
                                                <Language name="English" short="en" flag={<UsaFlag />} setChanged={setChanged} />
                                            </>
                                        }
                                        {changed &&
                                            <>
                                                <span className="text-white">{t("Your language was updated, but to update language in all apps, you should log out, or even restart your PC.")}</span>
                                                <div className="mt-4">
                                                    <Button label={t("Continue")}
                                                        submit={() => setComponent(<></>)}></Button>
                                                </div>
                                            </>
                                        }
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}