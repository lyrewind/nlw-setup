import { IsDateString } from "class-validator"
import { REQUIRED_DATE_STRING } from "src/constants/validation.message"

export class GetHabitQuery {
    @IsDateString(
        {},
        {
            message: REQUIRED_DATE_STRING("date"),
        }
    )
    date: string
}
