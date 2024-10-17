import { View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { Creation } from "../screens/Creation"
import { Habit } from "../screens/Habit"
import { Home } from "../screens/Home"

const { Navigator, Screen } = createNativeStackNavigator()

export const Router = () => {
    return (
        <View className="flex-1 bg-background">
            <NavigationContainer>
                <Navigator
                    initialRouteName="home"
                    screenOptions={{ headerShown: false }}
                >
                    <Screen
                        name="home"
                        component={Home}
                    />
                    <Screen
                        name="habit"
                        component={Habit}
                    />
                    <Screen
                        name="creation"
                        component={Creation}
                    />
                </Navigator>
            </NavigationContainer>
        </View>
    )
}
