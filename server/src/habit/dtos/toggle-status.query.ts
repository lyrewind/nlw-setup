import { IsUUID } from "class-validator"
import { REQUIRED_UUID } from "src/constants/validation.message"

export class ToggleStatusQuery {
    @IsUUID("all", {
        message: REQUIRED_UUID("id"),
    })
    id: string
}
