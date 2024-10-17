import * as Dialog from "@radix-ui/react-dialog"
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline"

import logoImg from "../../assets/logo.svg"
import { HabitForm } from "./HabitForm"
import { getLocaleText, useLocale } from "../../lib/i18n"
import { LanguageButton } from "./LanguageButton"

export const Header: React.FC = () => {
    const { locale } = useLocale()

    return (
        <div className="w-full max-w-5xl mx-auto flex items-center justify-between">
            <img
                src={logoImg}
                className="ml-4"
            />
            <div className="flex gap-12">
                <LanguageButton/>
                <Dialog.Root>
                    <Dialog.Trigger className="stylish-button group font-semibold uppercase px-6 py-3 mr-4 flex items-center self-end gap-3">
                        <PlusIcon className="w-[20px] text-rose-50 group-hover:text-gray-900 duration-300" />
                        <strong className="ml-4">
                            {getLocaleText(locale, "create")}
                        </strong>
                    </Dialog.Trigger>

                    <Dialog.Portal>
                        <Dialog.Overlay className="fullscreen bg-black/90 fixed inset-0" />

                        <Dialog.Content className="absolute p-10 bg-stone-900 text-rose-100 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="w-full flex justify-between place-items-end border-b border-b-stone-600">
                                <Dialog.Title className="flex justify-between items-center pb-1 text-xl uppercase font-extrabold">
                                    {getLocaleText(locale, "createHabit")}
                                </Dialog.Title>
                                <Dialog.Close className="w-10 rounded right-6 top-6 p-1 text-rose-400 hover:text-rose-100 hover:bg-rose-400 duration-300">
                                    <XMarkIcon />
                                </Dialog.Close>
                            </div>

                            <HabitForm />
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </div>
        </div>
    )
}
