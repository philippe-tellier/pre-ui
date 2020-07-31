<template>
    <pre-datetimepicker
        v-bind="$attrs"
        :input-class-name="`form-input ${className}`"
        v-on="$listeners"
    />
</template>

<script>
    import PreDatetimepicker from '../components/Datetimepicker.vue';

    export default {
        components: { PreDatetimepicker },

        props: {
            className: {
                type: String,
                default: '',
            },
        },
    };
</script>
