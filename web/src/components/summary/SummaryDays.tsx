import { getLocaleText, useLocale } from "../../lib/i18n"

export const SummaryDays: React.FC = () => {
    const { locale } = useLocale()
    const weekDays = getLocaleText(locale, "weekdays")

    return (
        <div className="grid grid-rows-7 grid-flow-row gap-3">
            {weekDays.split(" ").map((day, index) => (
                <div
                    className="flex text-stone-400 text-xl font-bold h-10 w-10 mr-1 justify-center place-items-center align-middle cursor-default"
                    key={index}
                >
                    {day}
                </div>
            ))}
        </div>
    )
}
