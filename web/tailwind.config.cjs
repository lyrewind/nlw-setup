/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            gridTemplateRows: {
                7: "repeat(7, minmax(0, 1fr))",
            },
        },
    },
}
