import { TouchableOpacity } from "react-native"
import { Feather } from "@expo/vector-icons"
import colors from "tailwindcss/colors"
import { useNavigation } from "@react-navigation/native"

export const BackButton = () => {
    const { goBack } = useNavigation()

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={goBack}
        >
            <Feather
                name="arrow-left"
                size={32}
                color={colors.rose[600]}
            />
        </TouchableOpacity>
    )
}
