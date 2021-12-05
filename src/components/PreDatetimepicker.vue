<template>
    <input
        :class="inputClassName"
        :disabled="disabled"
        :placeholder="placeholder"
        type="text"
        :value="value"
        ref="input"
    >
</template>

<script>
    import flatpickr from 'flatpickr';
    import { French } from 'flatpickr/dist/l10n/fr.js';

    export default {
        name: 'PreDatetimepicker',

        props: {
            value: {
                type: null,
                default: '',
            },
            placeholder: {
                type: String,
                default: '',
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            dateFormat: {
                type: String,
                default: 'Y-m-d H:i:S',
            },
            displayDateFormat: {
                type: String,
                default: 'j M Y H:i',
            },
            twelveHourTime: {
                type: Boolean,
                default: false,
            },
            enableTime: {
                type: Boolean,
                default: true,
            },
            enableSeconds: {
                type: Boolean,
                default: false,
            },
            firstDayOfWeek: {
                type: Number,
                default: 0,
            },
            locale: {
                type: String,
                default: 'en',
                validator: value => ['en', 'fr'].includes(value),
            },
            noCalendar: {
                type: Boolean,
                default: false,
            },
            inputClassName: {
                type: String,
                default: '',
            },
            inline: {
                type: Boolean,
                default: false,
            },
            minuteIncrement: {
                type: Number,
                default: 15,
            },
            showMonths: {
                type: Number,
                default: 1,
            },
            disableDates: {
                type: Array,
                default: () => [],
            },
        },

        data: () => ({
            flatpickr: null,
        }),

        computed: {
            disableConfig() {
                if (this.disabled) {
                    return [() => { return true }];
                }

                return this.disableDates;
            },
        },

        watch: {
            value(newValue) {
                if (this.flatpickr) {
                    this.flatpickr.setDate(newValue);
                }
            },

            locale() {
                this.destroy();
                this.init();
            },
        },

        methods: {
            async init() {
                await this.$nextTick();

                this.flatpickr = flatpickr(this.$refs.input, {
                    altFormat: this.displayDateFormat,
                    altInput: true,
                    dateFormat: this.dateFormat,
                    defaultDate: this.value,
                    disable: this.disableConfig,
                    enableSeconds: this.enableSeconds,
                    enableTime: this.enableTime,
                    inline: this.inline,
                    minuteIncrement: this.minuteIncrement,
                    noCalendar: this.noCalendar,
                    onChange: this.onChange,
                    onClose: this.onChange,
                    showMonths: this.showMonths,
                    time_24hr: !this.twelveHourTime,
                    locale: {
                        ...this.locale === 'fr' ? French : {},
                        firstDayOfWeek: this.firstDayOfWeek,
                    },
                });
            },

            destroy() {
                if (this.flatpickr) {
                    this.flatpickr.destroy();
                    this.flatpickr = null;
                }
            },

            onChange() {
                this.$emit('input', this.$refs.input.value);
            },
        },

        mounted() {
            this.init();
        },

        beforeDestroy() {
            this.destroy();
        },
    };
</script>
