import { useState } from "react"
import {
    Alert,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"
import colors from "tailwindcss/colors"

import { BackButton } from "../components/BackButton"
import { Checkbox } from "../components/Checkbox"
import { Api } from "../lib/api"
import { getLocaleText } from "../lib/i18n/locales"

export const Creation = () => {
    const [title, setTitle] = useState("")
    const [weekdays, setWeekdays] = useState<number[]>([])

    const weekdaysLong = getLocaleText("weekdaysLong")

    const toggleWeekday = (dayIndex: number) =>
        weekdays.includes(dayIndex)
            ? setWeekdays(before => before.filter(day => day != dayIndex))
            : setWeekdays(before => [...before, dayIndex])

    const handleCreation = async () => {
        if (title.length < 1 && weekdays.length < 1) return

        try {
            await Api.createHabit({
                title,
                weekDays: weekdays,
            })

            setTitle("")
            setWeekdays([])
        } catch (error) {
            Alert.alert(
                getLocaleText("errorAlertTitle") as string,
                getLocaleText("creationFail") as string
            )

            console.error(`Failed to create habit:\n${error}`)
        }
    }

    return (
        <View className="flex-1 bg-black px-6 pt-16">
            <ScrollView
                contentContainerStyle={{ paddingBottom: 50 }}
                showsVerticalScrollIndicator={false}
            >
                <BackButton />

                <Text className="mt-6 text-rose-50 font-extrabold lowercase text-2xl">
                    {getLocaleText("createHabit")}
                </Text>

                <Text className="mt-6 text-rose-50 font-semibold lowercase leading-none">
                    {getLocaleText("enterHabitLabel")}
                </Text>
                <TextInput
                    className="h-12 pl-4 rounded-lg mt-2 bg-stone-900 text-rose-50 focus:border-2 border-rose-600"
                    placeholder={
                        getLocaleText("enterHabitPlaceholder") as string
                    }
                    placeholderTextColor={colors.stone[600]}
                    value={title}
                    onChangeText={setTitle}
                />

                <Text className="mt-6 mb-1 text-rose-50 font-semibold lowercase">
                    {getLocaleText("enterHabitRecurrence")}
                </Text>
                {weekdaysLong.split(" ").map((weekday, idx) => (
                    <Checkbox
                        key={weekday}
                        checked={weekdays.includes(idx)}
                        onPress={() => toggleWeekday(idx)}
                    >
                        {weekday.toLowerCase()}
                    </Checkbox>
                ))}

                <TouchableOpacity
                    className="flex flex-row w-full items-center justify-center bg-rose-600 py-4 mt-4 rounded-md"
                    activeOpacity={0.4}
                    onPress={handleCreation}
                >
                    <Text className="text-rose-50 font-bold lowercase">
                        {getLocaleText("create")}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}
