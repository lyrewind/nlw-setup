import React from "react"
import ReactDOM from "react-dom/client"

import { App } from "./App"
import { I18nProvider } from "./lib/i18n";
import "./global.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <I18nProvider>
            <App />
        </I18nProvider>
    </React.StrictMode>
)
