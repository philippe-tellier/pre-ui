<template>
    <pre-datetimepicker
        v-bind="$attrs"
        input-class-name="form-input"
        v-on="$listeners"
    />
</template>

<script>
    import PreDatetimepicker from '../components/PreDatetimepicker.vue';

    export default {
        components: {
            PreDatetimepicker,
        },
    };
</script>
