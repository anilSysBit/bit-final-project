const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'blood-red': '#D32F2F',     /* A strong red to symbolize blood and urgency */
                'heart-red': '#C62828',     /* A slightly lighter red for accents */
                'nepal-blue': '#003366',    /* A deep blue reflecting stability and trust */
                'sky-blue': '#00A4E4',      /* A bright blue for a sense of hope and clarity */
                'mountain-gray': '#B0BEC5', /* A neutral gray for balance and professionalism */
                'care-green': '#388E3C',    /* A green to symbolize health and care */
                'white': '#FFFFFF',         /* For clean, readable text */
                'light-gray': '#F5F5F5',    /* For backgrounds and softer elements */
              },
        },
    },

    plugins: [require('@tailwindcss/forms')],
};
