import { IsArray, IsNumber, IsString } from "class-validator"
import {
    REQUIRED_ARRAY,
    REQUIRED_NUMBER_ARRAY,
    REQUIRED_STRING,
} from "src/constants/validation.message"

export class CreateHabitBody {
    @IsString({
        message: REQUIRED_STRING("title"),
    })
    title: string

    @IsArray({
        message: REQUIRED_ARRAY("weekDays"),
    })
    @IsNumber({}, { message: REQUIRED_NUMBER_ARRAY("weekDays"), each: true })
    weekDays: number[]
}
