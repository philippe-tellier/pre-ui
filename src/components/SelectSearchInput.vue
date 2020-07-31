<template>
    <listbox-search-input
        v-bind="$attrs"
        :value="value"
        v-on="$listeners"
    />
</template>

<script>
    import { ListboxSearchInput } from './Listbox.js';

    export default {
        components: { ListboxSearchInput },

        props: {
            value: {
                type: String,
                require: true,
            },
        },
    };
</script>
