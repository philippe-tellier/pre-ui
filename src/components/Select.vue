<template>
    <listbox
        :autofocus="false"
        class="relative"
        :value="selectedOption.value"
        ref="listbox"
        v-slot="{ isOpen }"
        @input="onSelect"
    >
        <slot :is-open="isOpen" name="trigger" :value="selectedOption.label" />

        <div class="absolute mt-1 w-full rounded-md bg-white shadow-lg text-base leading-6 sm:text-sm sm:leading-5" v-if="isOpen">
            <slot
                :loading="searchLoading"
                name="search"
                :on-search="onSearch"
                :value="search"
                v-if="searchEnabled"
            />
            <slot
                name="no-result"
                v-if="!hasVisibleOptions"
            />
            <!--<listbox-list class="overflow-auto py-1 max-h-64" v-show="hasVisibleOptions">
                <template v-for="(group, index) in filteredGroupedOptions">
                    <listbox-group-label
                        class="flex items-center px-4 pb-2 pt-3 mt-1"
                        :class="{ 'border-t border-gray-200': index !== 0 }"
                        :key="index"
                        v-if="group.label"
                    >
                        <span class="font-semibold text-sm uppercase" v-text="group.label" />
                    </listbox-group-label>
                    <listbox-option
                        :disabled="option.disabled"
                        :value="option.value"
                        :key="option.value"
                        v-slot="{ isActive, isSelected }"
                        v-for="option in group.options"
                    >
                        <div
                            class="cursor-default select-none relative py-2 px-4 | transition duration-300"
                            :class="{ 'bg-gray-100 text-gray-800': isActive, 'bg-gray-50': isSelected }"
                        >
                            <div class="flex items-center justify-between space-x-4 whitespace-no-wrap">
                                <span :class="isSelected ? 'font-semibold' : 'font-normal'">{{ option.label }}</span>
                            </div>
                        </div>
                    </listbox-option>
                </template>
            </listbox-list>-->
        </div>
    </listbox>
</template>

<script>
    import {
        Listbox,
        // ListboxGroupLabel,
        // ListboxList,
        // ListboxOption,
    } from './Listbox.js';

    export default {
        components: {
            Listbox,
            // ListboxGroupLabel,
            // ListboxList,
            // ListboxOption,
        },

        props: {
            placement: {
                type: String,
                default: 'bottom',
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
            placeholder: {
                type: String,
                default: '',
            },

            // Search
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

            // Classes
            triggerClassName: {
                type: String,
                default: '',
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
