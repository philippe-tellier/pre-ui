<template>
    <listbox-button v-bind="$attrs" :disabled="disabled">
        <slot />
    </listbox-button>
</template>

<script>
    import { ListboxButton } from './Listbox.js';

    export default {
        inject: ['_context'],

        components: { ListboxButton },

        computed: {
            disabled() {
                return this._context().disabled;
            },
        },
    };
</script>
