import { View } from "react-native"

interface ProgressBarProps {
    progress: number
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    return (
        <View className="w-full h-3 mt-4 rounded-xl bg-stone-700">
            <View
                className="h-3 rounded-xl bg-rose-600"
                style={{ width: `${progress}%` }}
            />
        </View>
    )
}
