/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {},
    },
    plugins: [require("@tailwindcss/typography"),require("daisyui")],
    daisyui: {
        themes: ["lofi", "dark"], // Just specify the light and dark themes you want
        darkTheme: "dark",
        logs: false,
    }
}
