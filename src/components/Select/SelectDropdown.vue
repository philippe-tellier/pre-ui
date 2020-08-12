<template>
    <component :is="tag" v-bind="$attrs" v-on="$listeners">
        <slot :loading="search.loading" name="search" v-if="search.enabled" />
        <slot name="no-result" v-if="!context.hasVisibleOptions" />
        <slot v-if="context.hasVisibleOptions" />
    </component>
</template>

<script>
    export default {
        inject: ['_search', '_context'],

        props: {
            tag: {
                type: String,
                default: 'div',
            },
        },

        computed: {
            search() {
                return this._search();
            },

            context() {
                return this._context();
            },
        },
    };
</script>
