import * as Popover from "@radix-ui/react-popover"
import clsx from "clsx"
import dayjs from "dayjs"
import { useState } from "react"

import { Api, HabitItem } from "../../lib/api"
import { Loading } from "../Loading"
import { SummaryList } from "./SummaryList"

interface SummaryItemProps {
    date: Date | null
    completed: number
    total: number
    dead?: boolean
}

export const SummaryItem: React.FC<SummaryItemProps> = ({
    date,
    completed,
    total,
    dead,
}) => {
    const completion = total > 0 ? Math.round((completed / total) * 100) : 0
    const [habits, setHabits] = useState<HabitItem[]>([])
    const [completedHabits, setCompletedHabits] = useState<string[]>([])
    const [loading, setLoading] = useState(true)

    const weekday = dayjs(date).format("dddd")
    const dayAndMonth = dayjs(date).format("DD/MM")

    const loadItems = async () => {
        if (!date)
            return console.warn(
                "Attempt to load items from within a dead item failed."
            )

        console.debug(`Loading items for day: "${date.toISOString()}"`)
        const { data } = await Api.fetchDay({
            date: date.toISOString(),
        })

        setHabits(data.possibleHabits)
        setCompletedHabits(data.completedHabits)
        setLoading(false)
        console.debug(`Loaded items.`)
    }

    const handleItemToggle = () => {
        console.debug(`An item state was toggled, reloading...`)
        loadItems()
    }

    return (
        <Popover.Root>
            <Popover.Trigger
                className={clsx("w-10 h-10 border-2 rounded-lg", {
                    "cursor-pointer hover:bg-rose-600 hover:border-rose-600 hover:scale-[1.075] duration-300":
                        !dead,
                    "border-stone-800 bg-stone-900": dead,
                    "bg-rose-200 border-rose-50": completion >= 90 && !dead,
                    "bg-rose-300 border-rose-200":
                        completion < 90 && completion >= 75 && !dead,
                    "bg-rose-400 border-rose-300":
                        completion < 75 && completion >= 50 && !dead,
                    "bg-rose-500 border-rose-300":
                        completion < 50 && completion >= 25 && !dead,
                    "bg-rose-500 border-rose-500":
                        completion < 25 && completion >= 5 && !dead,
                    "bg-stone-800 border-stone-700": completion < 5 && !dead,
                })}
                disabled={dead}
                onClick={loadItems}
            />
            <Popover.Portal>
                <Popover.Content className="flex flex-col min-w-[320px] p-6 rounded-2xl border bg-stone-900 text-rose-50 focus:outline-none focus:border-stone-600">
                    <span className="font-semibold text-rose-400">
                        {weekday}
                    </span>
                    <strong className="font-extrabold leading-tight text-3xl mt-1 text-rose-100 motion-safe:glimmer">
                        {dayAndMonth}
                    </strong>

                    {loading ? (
                        <Loading />
                    ) : (
                        <SummaryList
                            habits={habits ?? []}
                            completedHabits={completedHabits ?? []}
                            date={date}
                            onItemToggle={handleItemToggle}
                        />
                    )}

                    <Popover.Arrow
                        height={8}
                        width={16}
                    />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}
