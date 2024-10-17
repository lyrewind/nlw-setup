import { useLocale } from "./I18nContext"

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
        pt: "DOM SEG TER QUA QUI SEX SAB",
        en: "SUN MON TUE WED THU FRI SAT",
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
    errorAlertTitle: {
        pt: "Ocorreu um erro",
        en: "An error has occurred",
        jp: "エラーが発生しました",
    },
    loadFail: {
        pt: "Não foi possível carregar os dados",
        en: "Failed to load data",
        jp: "データは読み込みできませんでした",
    },
    creationFail: {
        pt: "Falha ao criar novo hábito, tente novamente mais tarde.",
        en: "Failed to create new habit, please try again later.",
        jp: "新規アイテムは追加できませんでした。",
    },
    habitLoadFail: {
        pt: "Falha ao carregar dados do hábito.",
        en: "Failed to load habit data.",
        jp: "アイテムデータは読み込みできませんでした",
    },
    habbitToggleFail: {
        pt: "Falha ao checar hábito.",
        en: "Failed to toggle habit checked state.",
        jp: "アイテムのチェック状態を変更できませんでした。",
    },
    noItems: {
        pt: "Nada por aqui!",
        en: "No items around here!",
        jp: "アイテムはまだありませえん！",
    },
}

export function getLocaleText<LocaleText extends keyof typeof LOCALES>(
    text: LocaleText
) {
    const { locale } = useLocale()
    return LOCALES[text][locale] ?? LOCALES[text]["en"] ?? "Unknown Text"
}
