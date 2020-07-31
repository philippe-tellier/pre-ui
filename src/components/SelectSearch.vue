<template>
    <div v-bind="$attrs">
        <span class="absolute inset-y-0 left-0 flex items-center justify-center pointer-events-none">
            <slot name="icon" />
        </span>
        <slot />
        <span class="absolute inset-y-0 right-0 flex items-center justify-center pointer-events-none" v-if="loading">
            <slot name="spinner" />
        </span>
    </div>
</template>

<script>
    export default {
        props: {
            loading: {
                type: Boolean,
                default: false,
            },
        },
    };
</script>
