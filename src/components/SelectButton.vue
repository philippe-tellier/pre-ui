<template>
    <listbox-button v-bind="$attrs">
        <slot />
    </listbox-button>
</template>

<script>
    import { ListboxButton } from './Listbox.js';

    export default {
        components: { ListboxButton },
    };
</script>
