import {
    Body,
    Controller,
    Get,
    HttpCode,
    Logger,
    Param,
    Patch,
    Post,
    Query,
} from "@nestjs/common"
import { CreateHabitBody } from "./dtos/create-habit.body"
import { GetHabitQuery } from "./dtos/get-habit.query"
import { ToggleStatusQuery } from "./dtos/toggle-status.query"
import { HabitService } from "./habit.service"

@Controller("/habits")
export class HabitController {
    private logger = new Logger(HabitController.name)

    constructor(private habitService: HabitService) {}

    @Get("/day:date")
    public async getByDay(@Query() data: GetHabitQuery) {
        this.logger.debug("Received request to retrieve habits.")

        return this.habitService.get(data)
    }

    @Post()
    public async create(@Body() data: CreateHabitBody) {
        this.logger.debug("Received request to create habit.")
        return this.habitService.create(data)
    }

    @Patch("/:id/toggle")
    @HttpCode(204)
    public async toggleStatus(@Param() data: ToggleStatusQuery) {
        this.logger.debug("Received request to toggle habit.")
        return this.habitService.toggleStatus(data)
    }

    @Get("/summary")
    public async fetchSummary() {
        this.logger.debug("Received request to fetch habit summary.")
        return this.habitService.fetchSummary()
    }
}
