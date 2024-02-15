import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Button from "../../../elements/Button.tsx";
import { useTranslation } from "react-i18next";
import { useAtomState } from "@zedux/react";
import { setupComponent } from "../setupState.tsx";
import WifiLoader from "../loaders/WifiLoader.tsx";

export default function BetaWarning() {
    const { t } = useTranslation()
    const [, setComponent] = useAtomState(setupComponent)


    // @ts-ignore
    return (
        <>
            <Transition appear show as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => console.log("idks")}>
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

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                                        {t("You are now using beta of airos")}
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            {t("You are currently using the beta version of airos. This is associated with a large number of bugs and system instability. Currently, no stable version of the system has been released. When we release the stable release, you will need to download an update package approximately ~2GB in size. We do not currently recommend using this system on your main computer.")}
                                            <br /><b className="text-white">{t("BAD THINGS MAY HAPPEN IF YOU DON'T READ THIS")}</b>
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <Button label={t("Continue")} submit={() => setComponent(<WifiLoader />)}></Button>
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
