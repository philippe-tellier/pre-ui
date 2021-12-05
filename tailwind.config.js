module.exports = {
    mode: 'jit',
    presets: [
        require('./tailwind-preset.js'),
    ],
    purge: [
        './src/**/*.vue',
    ],
    theme: {
        extend: {},
    },
};
