<template>
    <component
        :is="tag"
        v-bind="$attrs"
        class="
            inline-flex justify-center items-center
            focus:z-10
        "
        :class="[classNames, {
            'pointer-events-none select-none': loading,
            'cursor-not-allowed opacity-75': disabled,
        }]"
        :disabled="disabled"
        tag="a"
        :to="to"
        :type="type"
        ref="button"
        v-on="buttonListeners"
    >
        <slot />
    </component>
</template>

<script>
    export default {
        name: 'Button',

        props: {
            loading: {
                type: Boolean,
                default: false,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            tag: {
                type: String,
                default: 'button',
            },
            to: {
                type: null,
                default: null,
            },
            type: {
                type: String,
                default: 'button',
            },
            className: {
                type: [String, Array],
                default: '',
            },
        },

        computed: {
            buttonListeners() {
                return {
                    ...this.$listeners,
                    click: this.onClick,
                };
            },

            classNames() {
                return Array.isArray(this.className)
                    ? this.className
                    : [this.className];
            },
        },

        methods: {
            onClick(e) {
                if (this.disabled) {
                    e.stopPropagation();
                }

                if (!this.disabled && !this.loading) {
                    this.$emit('click');
                }
            },

            focus() {
                this.$refs.button.focus();
            },
        },
    };
</script>
