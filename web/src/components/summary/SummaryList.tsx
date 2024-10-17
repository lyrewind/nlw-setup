import dayjs from "dayjs"
import { Api, HabitItem } from "../../lib/api"
import { getLocaleText, useLocale } from "../../lib/i18n"
import { CheckableText } from "../CheckableText"

interface SummaryListProps {
    habits: HabitItem[]
    completedHabits: string[]
    date: Date | null
    onItemToggle: () => void
}

export const SummaryList: React.FC<SummaryListProps> = ({
    habits,
    completedHabits,
    date,
    onItemToggle,
}) => {
    const { locale } = useLocale()

    const isDateDue = dayjs(date).endOf("day").isBefore(new Date())

    const handleToggleCheck = async (habitId: string) => {
        try {
            console.debug(`Toggling item: "${habitId}".`)

            await Api.toggleHabit({
                id: habitId,
            })
            onItemToggle()
        } catch (error) {
            console.error(`Failed to toggle habit:\n${error}`)
        }
    }

    return (
        <ul>
            {habits.length > 0 ? (
                habits.map((habit, index) => (
                    <CheckableText
                        defaultChecked={completedHabits.includes(habit.id)}
                        disabled={isDateDue}
                        key={index}
                        onCheckedChange={() => handleToggleCheck(habit.id)}
                    >
                        {habit.title}
                    </CheckableText>
                ))
            ) : (
                <p className="mt-2 font-semibold">
                    {getLocaleText(locale, "noItems")}
                </p>
            )}
        </ul>
    )
}
