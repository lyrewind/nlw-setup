import { PrismaClient } from "@prisma/client"
import { randomUUID } from "crypto"

const prisma = new PrismaClient()

const exampleHabits = [
    {
        id: randomUUID(),
        title: "Estudar a arte da lâmina",
        weekDays: [0, 1],
        createdAt: new Date("2023-01-16T03:00:00.000z"),
    },
    {
        id: randomUUID(),
        title: "Explorar calabouços",
        weekDays: [4, 5],
        createdAt: new Date("2023-01-14T03:00:00.000z"),
    },
    {
        id: randomUUID(),
        title: "Concluir uma missão de Rank A",
        weekDays: [6],
        createdAt: new Date("2023-01-09T03:00:00.000z"),
    },
]

async function run() {
    console.log("Deleting current table columns.")
    await prisma.dayHabit.deleteMany()
    await prisma.habitWeekDays.deleteMany()
    await prisma.habit.deleteMany()
    await prisma.day.deleteMany()
    console.log(`Deletion completed successfully.`)

    console.log("Creating fresh columns for table Habit.")
    await Promise.all(
        exampleHabits.map(habit =>
            prisma.habit.create({
                data: {
                    id: habit.id,
                    title: habit.title,
                    created_at: habit.createdAt,
                    weekDays: {
                        create: habit.weekDays.map(weekDay => ({
                            week_day: weekDay,
                        })),
                    },
                },
            })
        )
    )
    console.log(`Created ${exampleHabits.length} columns for table Habit.`)

    console.log(`Creating fresh columns for table Day.`)
    await Promise.all([
        prisma.day.create({
            data: {
                date: new Date("2023-01-19T03:00:00.000z"),
                dayHabits: {
                    create: {
                        habit_id: exampleHabits[0].id,
                    },
                },
            },
        }),
        prisma.day.create({
            data: {
                date: new Date("2023-01-21T03:00:00.000z"),
                dayHabits: {
                    create: {
                        habit_id: exampleHabits[1].id,
                    },
                },
            },
        }),
        prisma.day.create({
            data: {
                date: new Date("2023-01-22T03:00:00.000z"),
                dayHabits: {
                    create: [
                        {
                            habit_id: exampleHabits[1].id,
                        },
                        {
                            habit_id: exampleHabits[2].id,
                        },
                    ],
                },
            },
        }),
    ])
    console.log(`Created columns for table Day.`)
}

run()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async e => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
