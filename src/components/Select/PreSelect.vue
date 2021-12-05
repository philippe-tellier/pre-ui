<template>
    <listbox
        class="relative"
        :value="selectedOption.value"
        ref="listbox"
        v-slot="{ isOpen }"
        @input="onSelect"
    >
        <slot
            name="trigger"
            :opened="isOpen"
            :selected-option="selectedOption"
        />
        <slot
            name="dropdown"
            :opened="isOpen"
        />
    </listbox>
</template>

<script>
    import { Listbox } from './Listbox.js';

    export default {
        provide() {
            return {
                _context: () => ({
                    disabled: this.disabled,
                    hasVisibleOptions: this.hasVisibleOptions,
                    groupedOptions: this.filteredGroupedOptions,
                }),
                _search: () => ({
                    enabled: this.searchEnabled,
                    external: this.searchExternal,
                    loading: this.searchLoading,
                    value: this.search,
                    onSearch: this.onSearch,
                }),
            };
        },

        components: { Listbox },

        props: {
            autofocus: {
                type: Boolean,
                default: true,
            },
            value: {
                type: null,
                default: '',
            },
            options: {
                type: Array,
                required: true,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            searchEnabled: {
                type: Boolean,
                default: false,
            },
            searchExternal: {
                type: Boolean,
                default: false,
            },
            searchLoading: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            return {
                search: '',
            };
        },

        computed: {
            isGrouped() {
                return this.options.some(option => {
                    return !option.value && option.options;
                });
            },

            hasVisibleOptions() {
                return !!this.filteredFlattenedOptions.length;
            },

            selectedOption() {
                return this.flattenedOptions.find(option => {
                    return option.value == this.value;
                }) || { value: null, label: '' };
            },

            groupedOptions() {
                if (this.isGrouped) {
                    return this.options;
                }

                return [{ label: '', options: this.options }];
            },

            flattenedOptions() {
                return [].concat(...this.groupedOptions.map(option => option.options));
            },

            filteredFlattenedOptions() {
                return [].concat(...this.filteredGroupedOptions.map(option => option.options));
            },

            filteredGroupedOptions() {
                if (!this.searchEnabled || this.searchExternal) {
                    return this.groupedOptions;
                }

                return this.groupedOptions.map(group => {
                    return {
                        ...group,
                        options: group.options.filter(option => {
                            return option.value.trim().toLowerCase().includes(this.search.trim().toLowerCase());
                        }),
                    };
                });
            },
        },

        methods: {
            onSearch(value) {
                this.search = value;
                this.$emit('search', value);
            },

            onSelect(value) {
                this.search = '';
                this.$emit('input', value);
            },

            focus() {
                this.$refs.listbox.focus();
            },

            open() {
                this.$refs.listbox.open();
            },
        },
    };
</script>
