import { Dimensions, View } from "react-native"
import { Summary } from "../../lib/api"

import { SummaryDays } from "./SummaryDays"
import { SummaryGrid } from "./SummaryGrid"

const SCREEN_PADDING_X = (32 * 2) / 5
export const DAY_SIZE =
    Dimensions.get("screen").width / 7 - (SCREEN_PADDING_X + 5)

interface SummaryTableProps {
    habits: Summary[]
}

export const SummaryTable: React.FC<SummaryTableProps> = ({ habits }) => {
    return (
        <View className="flex-1 justify-between">
            <SummaryDays />
            <SummaryGrid habits={habits}/>
        </View>
    )
}
