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
            v-bind="$attrs"
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
            @click="focus"
            v-if="$slots.after"
        >
            <slot name="after" />
        </div>
    </div>
</template>

<script>
    import { TheMask, tokens } from 'vue-the-mask';

    export default {
        name: 'PreInput',

        components: {
            TheMask,
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
                validator: value => typeof value === 'string' || value === null,
            },
            className: {
                type: [String, Array, Object],
                default: '',
            },
            mask: {
                type: String,
                default: '',
            },
        },

        data() {
            return {
                isFocused: false,
            };
        },

        computed: {
            maskTokens() {
                if (!this.mask) {
                    return '';
                }

                return {
                    ...tokens,
                    P: { pattern: /[1-9]/ },
                };
            },

            maskPattern() {
                switch (this.mask) {
                    case 'phone':
                        return 'P## ###-####';
                    default:
                        return this.mask;
                }
            },

            inputTag() {
                return this.mask ? 'the-mask' : 'input';
            },

            inputListeners() {
                return {
                    ...this.$listeners,
                    blur: this.onBlur,
                    focus: this.onFocus,
                    input: this.onInput,
                };
            },
        },

        methods: {
            async focus() {
                await this.$nextTick();

                this.$refs.input.focus();
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
