import { useNavigation } from "@react-navigation/native"
import { Text, TouchableOpacity } from "react-native"
import { Feather } from "@expo/vector-icons"
import colors from "tailwindcss/colors"

import { getLocaleText } from "../../lib/i18n/locales"

export function CreateButton() {
    const { navigate } = useNavigation()

    return (
        <TouchableOpacity
            className="flex-row h-11 px-4 my-auto border border-rose-400 rounded-lg items-center active:bg-rose-400"
            activeOpacity={0.4}
            onPress={() => navigate("creation")}
        >
            <Feather
                name="plus"
                color={colors.rose[300]}
                size={20}
            />
            <Text className="text-rose-50 pl-4 font-semibold text-sm lowercase">
                {getLocaleText("new")}
            </Text>
        </TouchableOpacity>
    )
}
