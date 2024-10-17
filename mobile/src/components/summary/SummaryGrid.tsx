import { useNavigation } from "@react-navigation/native"
import dayjs from "dayjs"
import { ScrollView, View } from "react-native"
import { Summary } from "../../lib/api"

import { SummaryItem } from "./SummaryItem"

const getYearUntilNow = () => {
    const startingDay = dayjs().startOf("year")
    const today = new Date()

    const days = []
    let compareDate = startingDay

    while (compareDate.isBefore(today)) {
        days.push(compareDate.toDate())
        compareDate = compareDate.add(1, "day")
    }

    return days
}

const summaryDays = getYearUntilNow()
const minDays = 18 * 7
const daysToFill = minDays - summaryDays.length

interface SummaryGridProps {
    habits: Summary[]
}

export const SummaryGrid: React.FC<SummaryGridProps> = ({ habits }) => {
    const { navigate } = useNavigation()

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
            <View className="flex-row flex-wrap justify-center">
                {summaryDays.map((date, idx) => {
                    const habitsForDay = habits.find(day =>
                        dayjs(date).isSame(day.date, "day")
                    )

                    return (
                        <SummaryItem
                            key={idx}
                            date={date.toISOString()}
                            total={habitsForDay?.amount ?? 0}
                            completed={habitsForDay?.completed ?? 0}
                            onPress={() =>
                                navigate("habit", {
                                    date: date.toISOString(),
                                })
                            }
                        />
                    )
                })}

                {daysToFill > 0 &&
                    Array.from({ length: daysToFill }).map((_, idx) => (
                        <SummaryItem
                            key={idx + summaryDays.length}
                            date={null}
                            total={0}
                            completed={0}
                            dead
                        />
                    ))}
            </View>
        </ScrollView>
    )
}
