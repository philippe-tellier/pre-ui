<template>
    <pre-datetimepicker
        v-bind="$attrs"
        date-format="H:i:S"
        display-date-format="H:i"
        input-class-name="form-input"
        :no-calendar="true"
        v-on="$listeners"
    />
</template>

<script>
    import PreDatetimepicker from '../components/Datetimepicker.vue';

    export default {
        components: {
            PreDatetimepicker,
        },
    };
</script>
