<template>
    <listbox-list class="overflow-auto focus:outline-none">
        <template v-for="(group, groupIndex) in context.groupedOptions">
            <slot
                :index="groupIndex"
                :label="group.label"
                name="group-label"
                v-if="group.label"
            />
            <listbox-option
                :disabled="option.disabled"
                :position="optionIndex"
                :value="option.value"
                :key="option.value"
                v-slot="{ isActive, isSelected }"
                v-for="(option, optionIndex) in group.options"
            >
                <slot
                    :active="isActive"
                    name="option"
                    :option="option"
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
