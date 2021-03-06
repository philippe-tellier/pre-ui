module.exports = {
    purge: [
        './src/**/*.vue',
    ],
    theme: {
        extend: {},
    },
    variants: {},
    plugins: [
        require('@tailwindcss/custom-forms'),
    ],
    future: {
        removeDeprecatedGapUtilities: true,
    },
};
