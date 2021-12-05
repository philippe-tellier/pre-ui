<template>
    <pre-input
        v-bind="$attrs"
        :class-name="inputClassName"
        ref="input"
        v-on="$listeners"
    >
        <template #before>
            <div class="flex items-center pl-3" v-if="$slots.before">
                <slot name="before" />
            </div>
        </template>
        <template #after>
            <div class="flex items-center pr-3" v-if="$slots.after">
                <slot name="after" />
            </div>
        </template>
    </pre-input>
</template>

<script>
    import PreInput from '../components/PreInput.vue';

    export default {
        components: { PreInput },

        props: {
            className: {
                type: null,
                default: '',
            },
        },

        computed: {
            inputClassName() {
                return [
                    this.className,
                    'form-input',
                    { 'pl-8': this.$slots.before, 'pr-8': this.$slots.after },
                ];
            },
        },

        methods: {
            focus() {
                this.$refs.input.focus();
            },

            insertAtCaret(text) {
                this.$refs.input.insertAtCaret(text);
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
