<template>
    <pre-datetimepicker
        v-bind="$attrs"
        date-format="Y-m-d"
        display-date-format="j M Y"
        :enable-time="false"
        :inline="inline"
        :input-class-name="inline ? 'hidden' : 'form-input'"
        v-on="$listeners"
    />
</template>

<script>
    import PreDatetimepicker from '../components/Datetimepicker.vue';

    export default {
        components: {
            PreDatetimepicker,
        },

        props: {
            inline: {
                type: Boolean,
                default: false,
            },
        },
    };
</script>
