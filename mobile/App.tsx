import { StatusBar } from "expo-status-bar"
import colors from "tailwindcss/colors"

import {
    useFonts,
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
} from "@expo-google-fonts/inter"
import { Loading } from "./src/components/Loading"
import { Router } from "./src/routes/router"

import { I18nProvider } from "./src/lib/i18n/I18nContext"

export default function App() {
    let [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold,
        Inter_800ExtraBold,
    })

    if (!fontsLoaded) return <Loading />

    return (
        <I18nProvider>
            <Router />
            <StatusBar
                style="inverted"
                backgroundColor={colors.rose[600]}
                translucent
            />
        </I18nProvider>
    )
}
