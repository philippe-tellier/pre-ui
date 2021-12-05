<template>
    <listbox-group-label>
        <slot />
    </listbox-group-label>
</template>

<script>
    import { ListboxGroupLabel } from './Listbox.js';

    export default {
        components: { ListboxGroupLabel },
    };
</script>
