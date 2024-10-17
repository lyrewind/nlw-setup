import { getLocaleText, useLocale } from "../lib/i18n"

export const Loading = () => {
    const { locale } = useLocale()

    return (
        <div>
            <strong className="font-semibold">
                {getLocaleText(locale, "loading")}
            </strong>
        </div>
    )
}
