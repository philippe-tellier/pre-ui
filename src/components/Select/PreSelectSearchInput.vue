<template>
    <listbox-search-input
        v-bind="$attrs"
        :value="search.value"
        @input="search.onSearch"
    />
</template>

<script>
    import { ListboxSearchInput } from './Listbox.js';

    export default {
        inject: ['_search'],

        components: { ListboxSearchInput },

        props: {
            value: {
                type: String,
                require: true,
            },
        },

        computed: {
            search() {
                return this._search();
            },
        },
    };
</script>
