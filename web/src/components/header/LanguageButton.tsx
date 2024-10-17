import * as Popover from "@radix-ui/react-popover"
import { GlobeAltIcon } from "@heroicons/react/24/outline"

import { AvailableLanguage, getLocaleText, useLocale } from "../../lib/i18n"

const langs: AvailableLanguage[] = ["pt", "en", "jp"]

export const LanguageButton = () => {
    const { locale, setLocale } = useLocale()
    const availableLanguages = getLocaleText(locale, "availableLanguages")

    return (
        <Popover.Root>
            <Popover.Trigger>
                <button className="stylish-button group p-3 self-end">
                    <GlobeAltIcon className="w-6 text-rose-50 group-hover:text-gray-900 duration-300" />
                </button>
            </Popover.Trigger>

            <Popover.Portal>
                <Popover.Content className="flex-center flex-col gap-2 bg-stone-900 border rounded-lg border-stone-600 focus:outline-none">
                    {availableLanguages
                        .split(" ")
                        .map((languageName, index) => (
                            <button
                                className="w-full text-center px-6 py-2 rounded-lg text-rose-200 hover:cursor-pointer hover:bg-rose-600 duration-300"
                                onClick={() => setLocale(langs[index])}
                                key={languageName}
                            >
                                {languageName}
                            </button>
                        ))}
                    <Popover.Arrow
                        height={6}
                        width={14}
                    />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}
