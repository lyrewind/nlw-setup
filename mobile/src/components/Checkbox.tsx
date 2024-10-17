import {
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
} from "react-native"
import { Feather } from "@expo/vector-icons"
import colors from "tailwindcss/colors"

interface CheckboxProps extends TouchableOpacityProps {
    children: string
    checked?: boolean
}

export const Checkbox: React.FC<CheckboxProps> = ({
    checked,
    children,
    ...props
}) => {
    return (
        <TouchableOpacity
            className="flex-row mb-2 items-center"
            activeOpacity={0.7}
            {...props}
        >
            {checked ? (
                <View className="h-8 w-8 bg-rose-500 border border-rose-400 rounded-lg items-center justify-center">
                    <Feather
                        name="check"
                        size={20}
                        color={colors.stone[100]}
                    />
                </View>
            ) : (
                <View className="h-8 w-8 bg-rose-900 rounded-lg" />
            )}
            <Text className="text-rose-50 ml-2 font-semibold">{children}</Text>
        </TouchableOpacity>
    )
}
