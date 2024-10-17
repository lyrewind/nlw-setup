import { useEffect, useState } from "react"
import { Api, Summary } from "./lib/api"
import { Header } from "./components/header"
import { SummaryTable } from "./components/summary/SummaryTable"

export const App = () => {
    const [habits, setHabits] = useState<Summary[]>([])

    useEffect(() => {
        ;(async () => {
            try {
                const { data } = await Api.fetchSummary()
                setHabits(data.summary)
            } catch (error) {
                console.error(`Failed to load initial data:\n${error}`)
            }
        })()
    }, [])

    return (
        <div className="fullscreen flex-center bg-black text-rose-50">
            <div className="w-full max-w-5xl px-6 flex flex-col gap-6">
                <Header />
                <SummaryTable habits={habits} />
            </div>
        </div>
    )
}
