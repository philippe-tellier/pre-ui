<template>
    <div
        class="spinner"
        :class="[
            { 'light': light },
            inline ? 'relative' : 'absolute',
        ]"
        :style="{ height: size, width: size }"
    />
</template>

<script>
    export default {
        props: {
            size: {
                type: String,
                default: '50px',
            },
            light: {
                type: Boolean,
                default: false,
            },
            inline: {
                type: Boolean,
                default: true,
            },
        },
    };
</script>

<style>
    .spinner:before, .spinner:after {
        @apply absolute block rounded-full h-full w-full border-2;
        content: '';
    }

    .spinner:before {
        @apply border-black border-opacity-25;
    }

    .spinner:after {
        @apply border-transparent;
        border-top-color: theme('colors.gray.700');
        animation: spinner 700ms linear infinite;
    }

    .spinner.light:after {
        border-top-color: theme('colors.white');
    }

    @keyframes spinner {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>
