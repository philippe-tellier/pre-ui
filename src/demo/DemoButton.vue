<template>
    <span class="inline-flex rounded shadow-sm">
        <pre-button
            v-bind="$attrs"
            :class="[
                className,
                colorClasses,
                'border px-4 py-2 text-sm leading-5 rounded',
                'transition ease-in-out duration-150',
                'focus:outline-none focus:shadow-outline'
            ]"
            :disabled="disabled"
            :loading="loading"
            ref="button"
            v-on="$listeners"
        >
            <demo-spinner
                :inline="false"
                :light="lightSpinner"
                size="20px"
                v-if="loading"
            />
            <span class="inline-flex justify-center items-center" :class="{ 'opacity-0': loading }">
                <slot />
            </span>
        </pre-button>
    </span>
</template>

<script>
    import PreButton from '../components/PreButton.vue';
    import DemoSpinner from './DemoSpinner.vue';

    export default {
        components: {
            PreButton,
            DemoSpinner,
        },
        props: {
            loading: {
                type: Boolean,
                default: false,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            color: {
                type: String,
                default: 'white',
            },
            className: {
                type: String,
                default: '',
            },
        },

        computed: {
            lightSpinner() {
                return !['white', 'gray'].includes(this.color);
            },

            colorClasses() {
                switch (this.color) {
                    case 'blue':
                        return `
                            text-white bg-blue-500 border-blue-500
                            hover:text-blue-100 hover:bg-blue-600 hover:border-blue-600
                        `;
                    case 'gray':
                        return `
                            text-gray-700 bg-gray-200 border-gray-300
                            hover:text-gray-800 hover:bg-gray-300 hover:border-gray-400
                        `;
                    case 'white':
                    default:
                        return `
                            text-gray-700 bg-white border-gray-200
                            hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300
                        `;
                }
            },
        },

        methods: {
            focus() {
                this.$refs.button.focus();
            },
        },
    };
</script>
