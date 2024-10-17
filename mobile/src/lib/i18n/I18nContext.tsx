import { createContext, useContext, useState } from "react"
import "dayjs/locale/pt-br"
import "dayjs/locale/en-gb"
import "dayjs/locale/ja"
import dayjs from "dayjs"

export type AvailableLanguage = "pt" | "en" | "jp"

interface i18nData {
    locale: AvailableLanguage
    setLocale: (to: AvailableLanguage) => void
}

const i18nContext = createContext<i18nData>(null as any)

interface i18nProviderProps {
    children: any
}

export const I18nProvider: React.FC<i18nProviderProps> = ({ children }) => {
    const [locale, setLocale] = useState<AvailableLanguage>("en")

    const onLocaleChange = (to: AvailableLanguage) => {
        setLocale(to)
        if (to == "pt") dayjs.locale("pt-br")
        else if (to == "en") dayjs.locale("en-gb")
        else if (to == "jp") dayjs.locale("ja")
        else
            throw new Error(
                `Failed to update time locale to match application, it was given an invalid one.`
            )
    }

    return (
        <i18nContext.Provider
            value={{
                locale,
                setLocale: onLocaleChange,
            }}
        >
            {children}
        </i18nContext.Provider>
    )
}

export const useLocale = () => useContext(i18nContext)
