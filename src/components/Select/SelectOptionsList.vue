<template>
    <listbox-list class="overflow-auto">
        <template v-for="(group, index) in context.groupedOptions">
            <slot
                :index="index"
                :label="group.label"
                name="group-label"
                v-if="group.label"
            />
            <listbox-option
                :disabled="option.disabled"
                :value="option.value"
                :key="option.value"
                v-slot="{ isActive, isSelected }"
                v-for="option in group.options"
            >
                <slot
                    :active="isActive"
                    :label="option.label"
                    name="option"
                    :selected="isSelected"
                >
                    {{ option.label }}
                </slot>
            </listbox-option>
        </template>
    </listbox-list>
</template>

<script>
    import { ListboxList, ListboxOption } from './Listbox.js';

    export default {
        inject: ['_context'],

        components: {
            ListboxList,
            ListboxOption,
        },

        computed: {
            context() {
                return this._context();
            },
        },
    };
</script>
