import { Text, View } from "react-native"
import { getLocaleText } from "../../lib/i18n/locales"

import { DAY_SIZE } from "./SummaryTable"

export const SummaryDays = () => {
    const weekdays = getLocaleText("weekdays")

    return (
        <View className="flex-row justify-evenly mt-6 mb-1">
            {weekdays.split(" ").map((day, idx) => (
                <Text
                    key={idx}
                    className="text-rose-400 text-xs font-bold text-center mx-1"
                    style={{
                        width: DAY_SIZE,
                    }}
                >
                    {day}
                </Text>
            ))}
        </View>
    )
}
