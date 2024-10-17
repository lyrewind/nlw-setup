import { AvailableLanguage } from "../lib/i18n"

export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            home: undefined,
            creation: undefined,
            habit: {
                date: string
            }
        }
    }
}
