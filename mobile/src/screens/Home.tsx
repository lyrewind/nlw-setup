import { useEffect, useState } from "react"
import { Alert, View } from "react-native"

import { Header } from "../components/header"
import { Loading } from "../components/Loading"
import { SummaryTable } from "../components/summary/SummaryTable"
import { Api, Summary } from "../lib/api"
import { getLocaleText } from "../lib/i18n/locales"

export const Home = () => {
    const [loading, setLoading] = useState(true)
    const [summary, setSummary] = useState<Summary[] | null>(null)

    const loadData = async () => {
        try {
            const { data } = await Api.fetchSummary()
            setSummary(data.summary)
        } catch (error) {
            Alert.alert(
                getLocaleText("errorAlertTitle") as string,
                getLocaleText("loadFail") as string
            )

            console.error(`Failed to load initial data:\n${error}`)
        }

        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [])

    if (loading) return <Loading />

    return (
        <View className="flex-1 px-8 pt-10 bg-background">
            <Header />
            <SummaryTable habits={summary ?? []} />
        </View>
    )
}
