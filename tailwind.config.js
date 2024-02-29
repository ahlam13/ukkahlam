import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
        "./src/**/*.{js,jsx,ts,tsx}",
        "node_modules/flowbite-react/lib/esm/**/*.js",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
                roboto: ["Roboto",],
            },
            colors: {
                abu: "#A7B0BF",
                nav: "#0E7EC0",
                markBook: "#A4DDFF",
            },
        },
    },

    plugins: [forms, require("flowbite/plugin")],
};
