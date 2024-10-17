import { TouchableOpacity } from "react-native"
import { Feather } from "@expo/vector-icons"
import colors from "tailwindcss/colors"

import { useLocale } from "../lib/i18n/I18nContext"

export const LanguageButton = () => {
    const { locale, setLocale } = useLocale()

    const cycleToNextLanguage = () => {
        if (locale == "pt") setLocale("en")
        else if (locale == "en") setLocale("jp")
        else if (locale == "jp") setLocale("pt")
        else
            throw new Error(
                `Failed to toggle to invalid language, this should never happen.`
            )
    }

    return (
        <TouchableOpacity
            className="p-3 rounded border border-rose-400"
            onPress={cycleToNextLanguage}
        >
            <Feather
                name="globe"
                color={colors.rose[50]}
                size={20}
            />
        </TouchableOpacity>
    )
}
