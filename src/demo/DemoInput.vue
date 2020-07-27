<template>
    <pre-input
        v-bind="$attrs"
        :class-name="customClassName"
        ref="input"
        v-on="$listeners"
    >
        <template #before>
            <div class="ml-3" v-if="$slots.before">
                <slot name="before" />
            </div>
        </template>
        <template #after>
            <div class="mr-3" v-if="$slots.after">
                <slot name="after" />
            </div>
        </template>
    </pre-input>
</template>

<script>
    import PreInput from '../components/PreInput.vue';

    export default {
        components: {
            PreInput,
        },

        props: {
            className: {
                type: [String, Array, Object],
                default: '',
            },
        },

        computed: {
            customClassName() {
                const classNames = Array.isArray(this.className) ? this.className : [this.className];

                return [
                    ...classNames,
                    'form-input',
                    {
                        'pl-8': this.$slots.before,
                        'pr-8': this.$slots.after,
                    },
                ];
            },
        },

        methods: {
            focus() {
                this.$refs.input.focus();
            },
        },
    };
</script>

<style>
    input.form-input[disabled] {
        @apply bg-gray-100 cursor-not-allowed;
    }

    @screen sm {
        input.form-input {
            @apply text-sm leading-5;
        }
    }
</style>
