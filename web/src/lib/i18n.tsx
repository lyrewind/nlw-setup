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

// eww
const i18nContext = createContext<i18nData>(null as any)

const getDateLocaleFor = (language: AvailableLanguage) => {
    if (language == "pt") return "pt-br"
    else if (language == "en") return "en-gb"
    else if (language == "jp") return "ja"
    else
        throw new Error(
            `Failed to get data locale for "${language}", it isn't valid or available.`
        )
}

interface i18nProviderProps {
    children: any
}

export const I18nProvider: React.FC<i18nProviderProps> = ({ children }) => {
    const [locale, setLocale] = useState<AvailableLanguage>("en")

    return (
        <i18nContext.Provider
            value={{
                locale,
                setLocale: (to: AvailableLanguage) => {
                    setLocale(to)
                    dayjs.locale(getDateLocaleFor(to))

                    console.debug(`Changing app language to "${to}".`)
                },
            }}
        >
            {children}
        </i18nContext.Provider>
    )
}

export const useLocale = () => useContext(i18nContext)

const LOCALES = {
    new: {
        pt: "Novo",
        en: "New",
        jp: "新規",
    },
    create: {
        pt: "Criar",
        en: "Create",
        jp: "追加",
    },
    weekdays: {
        pt: "D S T Q Q S S",
        en: "S M T W T F S",
        jp: "日 月 火 水 木 金 土",
    },
    weekdaysLong: {
        pt: "Domingo Segunda Terça Quarta Quinta Sexta Sábado",
        en: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday",
        jp: "日曜日 月曜日 火曜日 水曜日 木曜日 金曜日 土曜日",
    },
    createHabit: {
        pt: "Criar hábito",
        en: "Create habit",
        jp: "新規アイテム",
    },
    enterHabitLabel: {
        pt: "Qual hábito deseja adicionar?",
        en: "What kind of habit are you planning to do?",
        jp: "アイテム題を入力ください",
    },
    enterHabitPlaceholder: {
        pt: "praticar a arte da lâmina, explorar calabouços...",
        en: "study elvish, slay a dragon...",
        jp: "睡眠、溶岩水泳。。",
    },
    enterHabitRecurrence: {
        pt: "Em quais dias da semana?",
        en: "On which days of the week?",
        jp: "何曜日ですか？",
    },
    availableLanguages: {
        pt: "Português Inglês Japonês",
        en: "Portuguese English Japanese",
        jp: "ポルトガル語 英語 日本語",
    },
    noDaysSelected: {
        pt: "Selecione pelo menos um dia.",
        en: "Pick a least one day.",
        jp: "一日以上をお選ぶください",
    },
    everyday: {
        pt: "Todo dia",
        en: "Everyday",
        jp: "毎日",
    },
    noItems: {
        pt: "Nenhum item.",
        en: "No items.",
        jp: "アイテムがありません。",
    },
    loading: {
        pt: "Carregando...",
        en: "Loading...",
        jp: "読み込み中。。"
    }
}

export function getLocaleText<LocaleText extends keyof typeof LOCALES>(
    locale: AvailableLanguage,
    text: LocaleText
) {
    return LOCALES[text][locale] ?? LOCALES[text]["en"] ?? "Unknown Text"
}
