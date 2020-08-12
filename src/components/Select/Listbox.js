const ListboxSymbol = Symbol('Listbox');

let id = 0;

function generateId() {
    return `listbox-id-${++id}`;
}

function defaultSlot(parent, scope) {
    if (parent.$slots.default) {
        return parent.$slots.default;
    }

    if (parent.$scopedSlots.default) {
        return parent.$scopedSlots.default(scope);
    }

    return null;
}

function onFocusOut(e, context) {
    const focusableRef = [
        context.listboxButtonRef.value(),
        context.listboxListRef.value(),
    ];

    if (context.listboxSearchInputRef.value) {
        focusableRef.push(context.listboxSearchInputRef.value());
    }

    if (!focusableRef.includes(e.relatedTarget)) {
        context.close(true);
    }
}

function onKeyDown(e, context, target) {
    switch (e.key) {
        case 'Esc':
        case 'Escape':
            e.preventDefault();
            context.close();
            break;

        case 'Up':
        case 'ArrowUp':
            e.preventDefault();
            context.focusPreviousItem();
            break;

        case 'Down':
        case 'ArrowDown':
            e.preventDefault();
            context.focusNextItem();
            break;

        case 'Enter':
            e.preventDefault();
            context.selectActiveItem();
            break;

        case 'Spacebar':
        case ' ':
            if (target === 'list') {
                e.preventDefault();
                context.selectActiveItem();
            }
            break;
    }
}

export const ListboxLabel = {
    inject: {
        context: ListboxSymbol,
    },
    data: () => ({
        id: generateId(),
    }),
    mounted() {
        this.context.labelId.value = this.id;
    },
    render(h) {
        return h(
            'span',
            {
                attrs: {
                    id: this.id,
                },
            },
            defaultSlot(this, {}),
        );
    },
};

export const ListboxGroupLabel = {
    render(h) {
        return h('li', {}, defaultSlot(this, {}));
    },
};

export const ListboxButton = {
    inject: {
        context: ListboxSymbol,
    },
    data: () => ({
        id: generateId(),
    }),
    created() {
        this.context.listboxButtonRef.value = () => this.$el;
        this.context.buttonId.value = this.id;
    },
    render(h) {
        return h(
            'button',
            {
                attrs: {
                    'id': this.id,
                    'type': 'button',
                    'aria-haspopup': 'listbox',
                    'aria-labelledby': `${this.context.labelId.value} ${this.id}`,
                    ...(this.context.isOpen.value ? { 'aria-expanded': 'true' } : {}),
                },
                on: {
                    click: this.context.toggle,
                },
            },
            defaultSlot(this, {}),
        );
    },
};

export const ListboxSearchInput = {
    props: ['value'],
    inject: {
        context: ListboxSymbol,
    },
    created() {
        this.context.listboxSearchInputRef.value = () => this.$refs.listboxSearchInput;
    },
    render(h) {
        return h(
            'input',
            {
                ref: 'listboxSearchInput',
                domProps: {
                    value: this.value,
                },
                attrs: {
                    type: 'text',
                },
                on: {
                    focusout: (e) => onFocusOut(e, this.context),
                    keydown: (e) => onKeyDown(e, this.context, 'search'),
                    input: (e) => {
                        this.$emit('input', e.target.value);
                    },
                },
            },
        );
    },
};

export const ListboxList = {
    inject: {
        context: ListboxSymbol,
    },
    created() {
        this.context.listboxListRef.value = () => this.$refs.listboxList;
    },
    render(h) {
        return h(
            'ul',
            {
                ref: 'listboxList',
                attrs: {
                    'tabindex': '-1',
                    'role': 'listbox',
                    'aria-activedescendant': this.context.getActiveOption().id,
                    'aria-labelledby': this.context.props.labelledby,
                },
                on: {
                    focusout: (e) => onFocusOut(e, this.context),
                    keydown: (e) => onKeyDown(e, this.context, 'list'),
                    mouseleave: () => {
                        this.context.activeItem.value = null;
                    },
                },
            },
            defaultSlot(this, {}),
        );
    },
};

export const ListboxOption = {
    name: 'ListboxList',
    inject: {
        context: ListboxSymbol,
    },
    data: () => ({
        id: generateId(),
    }),
    props: ['value'],
    watch: {
        value(newValue, oldValue) {
            this.context.unregisterOption(oldValue);
            this.context.registerOption({
                value: newValue,
                id: this.id,
                ref: this.$el,
            });
        },
    },
    mounted() {
        this.context.registerOption({
            value: this.value,
            id: this.id,
            ref: this.$el,
        });
    },
    beforeDestroy() {
        this.context.unregisterOption(this.value);
    },
    render(h) {
        const isActive = this.context.activeItem.value === this.value;
        const isSelected = this.context.props.value === this.value;

        return h(
            'li',
            {
                attrs: {
                    id: this.id,
                    role: 'option',
                    ...(isSelected
                        ? { 'aria-selected': true }
                        : {}),
                },
                on: {
                    click: () => {
                        this.context.select(this.value);
                    },
                    mousemove: () => {
                        if (this.context.activeItem.value === this.value) {
                            return;
                        }

                        this.context.activeItem.value = this.value;
                    },
                },
            },
            defaultSlot(this, {
                isActive,
                isSelected,
            }),
        );
    },
};

export const Listbox = {
    props: {
        value: null,
        autofocus: {
            type: Boolean,
            default: true,
        },
    },
    data: (vm) => ({
        listboxButtonRef: { value: null },
        listboxListRef: { value: null },
        listboxSearchInputRef: { value: null },
        isOpen: { value: false },
        activeItem: { value: vm.value },
        values: { value: null },
        labelId: { value: null },
        buttonId: { value: null },
        options: { value: [] },
    }),
    provide() {
        return {
            [ListboxSymbol]: {
                listboxButtonRef: this.listboxButtonRef,
                listboxListRef: this.listboxListRef,
                listboxSearchInputRef: this.listboxSearchInputRef,
                isOpen: this.isOpen,
                activeItem: this.activeItem,
                values: this.values,
                labelId: this.labelId,
                buttonId: this.buttonId,
                props: this.$props,
                getActiveOption: this.getActiveOption,
                registerOption: this.registerOption,
                unregisterOption: this.unregisterOption,
                toggle: this.toggle,
                open: this.open,
                close: this.close,
                select: this.select,
                selectActiveItem: this.selectActiveItem,
                focusItem: this.focusItem,
                focusNextItem: this.focusNextItem,
                focusPreviousItem: this.focusPreviousItem,
            },
        };
    },
    watch: {
        'options.value'() {
            this.values.value = this.options.value.map(option => option.value);
        },
    },
    methods: {
        getActiveOption() {
            return this.options.value.find(option => {
                return option.value === this.activeItem.value;
            }) || { value: null, id: null, ref: null };
        },
        registerOption(option) {
            this.unregisterOption(option.value);
            this.options.value = [...this.options.value, option];
        },
        unregisterOption(value) {
            this.options.value = this.options.value.filter(option => {
                return option.value !== value;
            });
        },
        toggle() {
            this.isOpen.value ? this.close() : this.open();
        },
        open() {
            this.isOpen.value = true;
            this.focusItem(this.value);

            if (this.autofocus) {
                this.focus();
            }
        },
        close(focusedOut = false) {
            this.isOpen.value = false;

            if (!focusedOut) {
                this.listboxButtonRef.value().focus();
            }
        },
        selectActiveItem() {
            this.select(this.activeItem.value || this.value);
        },
        select(value) {
            this.$emit('input', value);
            this.$nextTick(() => {
                this.close();
            });
        },
        getFocusedIndex() {
            return this.values.value.indexOf(this.activeItem.value);
        },
        focusPreviousItem() {
            const focusedIndex = this.getFocusedIndex();
            const indexToFocus = focusedIndex - 1 < 0 ? this.values.value.length - 1 : focusedIndex - 1;
            this.focusItem(this.values.value[indexToFocus]);
        },
        focusNextItem() {
            const focusedIndex = this.getFocusedIndex();
            const indexToFocus = focusedIndex + 1 > this.values.value.length - 1 ? 0 : focusedIndex + 1;
            this.focusItem(this.values.value[indexToFocus]);
        },
        focusItem(value) {
            this.activeItem.value = value;

            if (value === null) {
                return;
            }

            this.$nextTick(() => {
                const activeOptionRef = this.getActiveOption().ref;

                if (activeOptionRef) {
                    activeOptionRef.scrollIntoView({ block: 'nearest' });
                }
            });
        },
        focus() {
            this.$nextTick(() => {
                if (this.listboxSearchInputRef.value) {
                    this.listboxSearchInputRef.value().focus();
                } else {
                    this.listboxListRef.value().focus();
                }
            });
        },
    },
    render(h) {
        return h('div', {}, defaultSlot(this, { isOpen: this.isOpen.value }));
    },
};
