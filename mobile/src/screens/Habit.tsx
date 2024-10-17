import dayjs from "dayjs"
import { useRoute } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { Alert, ScrollView, Text, View } from "react-native"

import { BackButton } from "../components/BackButton"
import { Checkbox } from "../components/Checkbox"
import { ProgressBar } from "../components/ProgressBar"
import { Api, HabitItem } from "../lib/api"
import { Loading } from "../components/Loading"
import { getLocaleText } from "../lib/i18n/locales"

interface Params {
    date: string
}

export const Habit = () => {
    const [habits, setHabits] = useState<HabitItem[]>([])
    const [completedHabits, setCompletedHabits] = useState<string[]>([])
    const [loading, setLoading] = useState(true)

    const route = useRoute()
    const { date } = route.params as Params

    const parsedDate = dayjs(date)
    const weekday = parsedDate.format("dddd")
    const dayAndMonth = parsedDate.format("DD/MM")

    const completion =
        habits.length > 0
            ? Math.round((completedHabits.length / habits.length) * 100)
            : 0

    const isToday = dayjs().isSame(date, "day")

    const isChecked = (id: string) => completedHabits.includes(id)

    const handleCheck = async (habit: HabitItem) => {
        await toggleHabit(habit)
        await loadHabit()
    }

    const loadHabit = async () => {
        try {
            const { data } = await Api.fetchDay({
                date,
            })

            setHabits(data.possibleHabits)
            setCompletedHabits(data.completedHabits)
            setLoading(false)
        } catch (error) {
            Alert.alert(
                getLocaleText("errorAlertTitle") as string,
                getLocaleText("habitLoadFail") as string
            )

            console.error(`Failed to load habit data:\n${error}`)
        }
    }

    const toggleHabit = async (habit: HabitItem) => {
        try {
            await Api.toggleHabit(habit)
        } catch (error) {
            Alert.alert(
                getLocaleText("errorAlertTitle") as string,
                getLocaleText("habbitToggleFail") as string
            )

            console.error(`Failed to toggle habit:\n${error}`)
        }
    }

    useEffect(() => {
        loadHabit()
    }, [])

    if (loading) return <Loading />

    return (
        <View className="w-full screen h-full bg-black px-8 py-16">
            <ScrollView>
                <BackButton />
                <Text className="text-rose-50 mt-8 mb-2 font-semibold lowercase">
                    {weekday}
                </Text>
                <Text className="text-rose-50 font-bold text-2xl">
                    {dayAndMonth}
                </Text>
                <ProgressBar progress={completion} />

                <View className="mt-4 pt-4 border-t border-t-stone-600">
                    {habits.length > 0 ? (
                        habits.map((habit) => (
                            <Checkbox
                                checked={isChecked(habit.id)}
                                onPress={() => handleCheck(habit)}
                                disabled={!isToday}
                            >
                                {habit.title}
                            </Checkbox>
                        ))
                    ) : (
                        <Text className="mt-6 self-center text-rose-50 font-bold uppercase scale-[1.1]">
                            {getLocaleText("noItems")}
                        </Text>
                    )}
                </View>
            </ScrollView>
        </View>
    )
}
