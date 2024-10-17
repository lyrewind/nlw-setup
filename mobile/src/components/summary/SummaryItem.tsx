import clsx from "clsx"
import { TouchableOpacity, TouchableOpacityProps } from "react-native"

import { DAY_SIZE } from "./SummaryTable"

interface SummaryItemProps extends TouchableOpacityProps {
    date: string | null
    total: number
    completed: number
    dead?: boolean
}

export const SummaryItem: React.FC<SummaryItemProps> = ({ date, total, completed, dead, ...props }) => {
    const completion = total > 0 ? Math.round((completed / total) * 100) : 0

    return (
        <TouchableOpacity
            className={clsx("w-10 h-10 border-2 rounded-lg m-1", {
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
            style={{
                width: DAY_SIZE,
                height: DAY_SIZE,
            }}
            activeOpacity={0.7}
            {...props}
        />
    )
}
