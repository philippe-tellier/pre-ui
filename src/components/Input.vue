<template>
    <div class="inline-flex items-center relative">
        <div
            class="absolute left-0 flex justify-center"
            :class="{ 'disabled': disabled }"
            @click="focus"
            v-if="$slots.before"
        >
            <slot name="before" />
        </div>
        <component
            :is="inputTag"
            v-bind="{ ...$attrs, ...money }"
            :class="[className, { 'focus': isFocused }]"
            :disabled="disabled"
            :mask="maskPattern"
            :tokens="maskTokens"
            :type="type"
            :value="value"
            ref="input"
            v-on="inputListeners"
        />
        <div
            class="absolute right-0 flex justify-center"
            :class="{ 'disabled': disabled }"
            @click="focus"
            v-if="$slots.after"
        >
            <slot name="after" />
        </div>
    </div>
</template>

<script>
    import { TheMask as MaskInput, tokens } from 'vue-the-mask';
    import { Money as MoneyInput } from 'v-money';
    import { insertAtCaret } from '../utils.js';

    export default {
        name: 'PreInput',

        components: {
            MaskInput,
            MoneyInput,
        },

        props: {
            disabled: {
                type: Boolean,
                default: false,
            },
            type: {
                type: String,
                default: 'text',
            },
            value: {
                default: '',
                required: true,
                validator: value => typeof value === 'string' || typeof value === 'number' || value === null,
            },
            className: {
                type: null,
                default: '',
            },
            mask: {
                type: String,
                default: '',
            },
            locale: {
                type: String,
                default: 'en',
                validator: value => ['en', 'fr'].includes(value),
            },
        },

        data() {
            return {
                isFocused: false,
            };
        },

        computed: {
            isMasked() {
                return !!this.mask && this.mask != 'money';
            },

            maskTokens() {
                if (!this.isMasked) {
                    return '';
                }

                return {
                    ...tokens,
                    P: { pattern: /[1-9]/ },
                };
            },

            maskPattern() {
                if (!this.isMasked) {
                    return '';
                }

                switch (this.mask) {
                    case 'phone':
                        return 'P## ###-####';
                    default:
                        return this.mask;
                }
            },

            inputTag() {
                if (this.mask == 'money') {
                    return 'money-input';
                } if (this.mask) {
                    return 'mask-input';
                }
                return 'input';
            },

            inputListeners() {
                return {
                    ...this.$listeners,
                    blur: this.onBlur,
                    focus: this.onFocus,
                    input: this.onInput,
                };
            },

            money() {
                if (this.locale === 'fr') {
                    return {
                        decimal: ',',
                        thousands: ' ',
                        prefix: '',
                        suffix: ' $',
                        precision: 2,
                        masked: false,
                    };
                }

                return {
                    decimal: '.',
                    thousands: ',',
                    prefix: '$',
                    suffix: '',
                    precision: 2,
                    masked: false,
                };
            },
        },

        methods: {
            async focus() {
                await this.$nextTick();

                if (typeof this.$refs.input.focus !== 'undefined') {
                    this.$refs.input.focus();
                } else {
                    this.$refs.input.$el.focus();
                }
            },

            async insertAtCaret(text) {
                await this.$nextTick();

                insertAtCaret(this.$refs.input, text);
            },

            onFocus() {
                this.isFocused = true;
                this.$emit('focus');
            },

            onBlur() {
                this.isFocused = false;
                this.$emit('blur');
            },

            onInput(value) {
                if (this.mask) {
                    this.$emit('input', value);
                } else {
                    this.$emit('input', value.target.value);
                }
            },
        },
    };
</script>
