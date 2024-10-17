import { useState } from "react"
import { CheckIcon } from "@heroicons/react/24/outline"

import { Api } from "../../lib/api"
import { getLocaleText, useLocale } from "../../lib/i18n"
import { CheckableText } from "../CheckableText"

export const HabitForm: React.FC = () => {
    const [text, setText] = useState("")
    const [selectedDays, setSelectedDays] = useState<number[]>([])

    const { locale } = useLocale()
    const weekdays = getLocaleText(locale, "weekdaysLong")

    const toggleDayCheck = (dayIndex: number) =>
        selectedDays.includes(dayIndex)
            ? setSelectedDays(selectedDays.filter(item => item != dayIndex))
            : setSelectedDays([...selectedDays, dayIndex])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (text.length < 0 && selectedDays.length < 1) return

        await Api.createHabit({
            title: text,
            weekDays: selectedDays,
        })

        setText("")
        setSelectedDays([])
        console.debug("Created.")
    }

    return (
        <form
            className="flex flex-col w-full mt-6"
            onSubmit={handleSubmit}
        >
            <label
                className="font-semibold uppercase text-sm"
                htmlFor="title"
            >
                {getLocaleText(locale, "enterHabitLabel")}
            </label>
            <input
                className="rounded px-4 py-3 text-stone-800 border-l-rose-300 focus:border-l-4 duration-300"
                type="text"
                id="title"
                placeholder="..."
                value={text}
                onChange={e => setText(e.target.value)}
                autoFocus
            />

            <label className="font-semibold uppercase text-sm leading-tight mt-4">
                {getLocaleText(locale, "enterHabitRecurrence")}
            </label>

            <div className="flex flex-col">
                {weekdays.split(" ").map((weekday, index) => (
                    <CheckableText
                        checked={selectedDays.includes(index)}
                        onCheckedChange={() => toggleDayCheck(index)}
                        key={index}
                    >
                        {weekday}
                    </CheckableText>
                ))}
            </div>

            <div className="flex-center h-10 mt-2">
                {selectedDays.length < 1 && (
                    <strong className="uppercase">{getLocaleText(locale, "noDaysSelected")}</strong>
                )}

                {selectedDays.length >= 1 &&
                    selectedDays.length < 7 &&
                    selectedDays.map((day) => (
                        <p className="px-1 whitespace-nowrap" key={day}>
                            {weekdays.split(" ")[day]}
                        </p>
                    ))}

                {selectedDays.length > 6 && (
                    <strong>{getLocaleText(locale, "everyday")}</strong>
                )}
            </div>

            <button
                className="w-full p-4 mt-4 rounded flex items-center justify-center bg-rose-500 text-rose-50 font-bold uppercase hover:bg-rose-100 hover:text-stone-900 hover:scale-[1.025] duration-500"
                type="submit"
            >
                <CheckIcon
                    width={20}
                    className="mr-4"
                />
                {getLocaleText(locale, "create")}
            </button>
        </form>
    )
}
