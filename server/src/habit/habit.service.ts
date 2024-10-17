import {
    Injectable,
    InternalServerErrorException,
    Logger,
} from "@nestjs/common"
import * as dayjs from "dayjs"

import { INTERNAL_ERROR } from "src/constants/error.message"
import { PrismaService } from "src/database/prisma.service"
import { CreateHabitBody } from "./dtos/create-habit.body"
import { GetHabitQuery } from "./dtos/get-habit.query"
import { ToggleStatusQuery } from "./dtos/toggle-status.query"

@Injectable()
export class HabitService {
    private logger = new Logger(HabitService.name)

    constructor(private prisma: PrismaService) {}

    public async get(data: GetHabitQuery) {
        const date = new Date(data.date)
        const parsedDate = dayjs(date).startOf("day")
        const weekDay = parsedDate.get("day")

        try {
            const possibleHabits = await this.prisma.habit.findMany({
                where: {
                    created_at: {
                        lte: date,
                    },
                    weekDays: {
                        some: {
                            week_day: weekDay,
                        },
                    },
                },
            })

            const day = await this.prisma.day.findUnique({
                where: {
                    date: parsedDate.toDate(),
                },
                include: {
                    dayHabits: true,
                },
            })

            const completedHabits =
                day?.dayHabits.map(dayHabit => dayHabit.habit_id) ?? []

            this.logger.debug("Returning retrieved items.")

            return {
                possibleHabits,
                completedHabits,
            }
        } catch (error) {
            this.logger.error(`Failed to retrieve items:\n${error}`)
            throw new InternalServerErrorException(INTERNAL_ERROR, {
                cause: error,
            })
        }
    }

    public async create(data: CreateHabitBody) {
        const { title, weekDays } = data

        try {
            const today = dayjs().startOf("day").toDate()

            await this.prisma.habit.create({
                data: {
                    title,
                    created_at: today,
                    weekDays: {
                        create: weekDays.map(weekDay => ({
                            week_day: weekDay,
                        })),
                    },
                },
            })

            this.logger.debug(
                `Created item: "${title}" for days ${weekDays.join("-")}.`
            )
        } catch (error) {
            this.logger.error(`Failed to create item:\n${error}`)
            throw new InternalServerErrorException(INTERNAL_ERROR, {
                cause: error,
            })
        }
    }

    public async toggleStatus(data: ToggleStatusQuery) {
        const { id } = data

        const today = dayjs().startOf("day").toDate()

        try {
            const day =
                (await this.prisma.day.findUnique({
                    where: {
                        date: today,
                    },
                })) ??
                (await this.prisma.day.create({
                    data: {
                        date: today,
                    },
                }))

            const dayHabit = await this.prisma.dayHabit.findUnique({
                where: {
                    day_id_habit_id: {
                        habit_id: id,
                        day_id: day.id,
                    },
                },
            })

            if (!!dayHabit) {
                await this.prisma.dayHabit.delete({
                    where: {
                        id: dayHabit.id,
                    },
                })

                this.logger.debug(`Toggled on habit. (ID ${id})`)
            } else {
                await this.prisma.dayHabit.create({
                    data: {
                        habit_id: id,
                        day_id: day.id,
                    },
                })
                this.logger.debug(`Toggled off habit. (ID ${id})`)
            }
        } catch (error) {
            this.logger.error(`Failed to update item:\n${error}`)
            throw new InternalServerErrorException(INTERNAL_ERROR, {
                cause: error,
            })
        }
    }

    public async fetchSummary() {
        try {
            const summary = await this.prisma.$queryRaw`
                SELECT day.id, day.date, 
                    (
                        SELECT cast(count(*) as Float)
                        FROM day_habits day_habit
                        WHERE day_habit.day_id = day.id
                    ) as completed,

                    (
                        SELECT cast(count(*) as float)
                        FROM habit_week_days habit_week_day
                        JOIN habits habit 
                            ON habit.id = habit_week_day.habit_id
                        WHERE habit_week_day.week_day = cast(strftime('%w', day.date/1000.0, 'unixepoch') as Int)
                            AND habit.created_at <= day.date
                    ) as amount
                FROM days day
            `

            this.logger.debug(`Returning retrieved summary as response.`)
            return {
                summary,
            }

        } catch (error) {
            this.logger.error(`Failed to fetch item summary:\n${error}`) 
            throw new InternalServerErrorException(INTERNAL_ERROR, {
                cause: error
            })
        }
    }
}
