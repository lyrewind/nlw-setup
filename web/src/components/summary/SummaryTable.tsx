import dayjs from "dayjs"
import { Summary } from "../../lib/api"
import { SummaryDays } from "./SummaryDays"
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

interface SummaryTableProps {
    habits: Summary[]
}

export const SummaryTable: React.FC<SummaryTableProps> = ({ habits }) => {
    return (
        <div className="w-full flex">
            <SummaryDays />

            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {summaryDays.map((date, index) => {
                    const habitsForDay = habits.find(day =>
                        dayjs(date).isSame(day.date, "day")
                    )

                    return (
                        <SummaryItem
                            date={date}
                            total={habitsForDay?.amount ?? 0}
                            completed={habitsForDay?.completed ?? 0}
                            key={index}
                        />
                    )
                })}
                {daysToFill > 0 &&
                    Array.from({ length: daysToFill }).map((_, index) => (
                        <SummaryItem
                            date={null}
                            completed={0}
                            total={0}
                            key={index}
                            dead
                        />
                    ))}
            </div>
        </div>
    )
}
