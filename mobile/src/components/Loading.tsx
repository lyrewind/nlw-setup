import { ActivityIndicator, View } from "react-native"
import colors from "tailwindcss/colors"

export const Loading = () => {
    return <View className="flex-1 justify-center items-center bg-black">
        <ActivityIndicator color={colors.rose[500]} size="large"/>
    </View>
}
