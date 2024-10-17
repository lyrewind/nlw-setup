import { View } from "react-native"

import Logo from "../assets/logo.svg"
import { CreateButton } from "./CreateButton"
import { LanguageButton } from "./LanguageButton"

export const Header = () => {
    return (
        <View className="flex-row w-full items-center justify-between">
            <View className="pt-8">
                <Logo />
            </View>
            <LanguageButton />
            <CreateButton />
        </View>
    )
}
