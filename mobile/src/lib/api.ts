import Axios from "axios"

export interface Summary {
    id: string
    date: string
    completed: number
    amount: number
}

export interface HabitItem {
    id: string
    title: string
    created_at: string | null
}

interface FetchSummaryResponse {
    summary: Summary[]
}

interface CreateHabitData {
    title: string
    weekDays: number[]
}

interface FetchDayData {
    date: string
}

interface FetchDayResponse {
    possibleHabits: HabitItem[]
    completedHabits: string[]
}

interface ToggleHabitData {
    id: string
}

export class Api {
    private static instance = Axios.create({
        baseURL: "http://10.0.0.225:3000",
    })

    public static fetchSummary() {
        return Api.instance.get<FetchSummaryResponse>("/habits/summary")
    }

    public static createHabit(data: CreateHabitData) {
        return Api.instance.post("/habits", data)
    }

    public static fetchDay(data: FetchDayData) {
        return Api.instance.get<FetchDayResponse>("/habits/day", {
            params: data,
        })
    }

    public static toggleHabit(data: ToggleHabitData) {
        return Api.instance.patch(`/habits/${data.id}/toggle`)
    }
}
