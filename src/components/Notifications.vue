<template>
    <div v-bind="$attrs" class="flex fixed inset-0 pointer-events-none" :class="wrapperPlacementClassName">
        <slot :notifications="notifications" :on-remove="remove" :placement-class-name="placementClassName" />
    </div>
</template>

<script>
    export default {
        props: {
            placement: {
                type: String,
                default: 'top-right',
                validator: (value) => [
                    'top-left', 'top-center', 'top-right',
                    'bottom-left', 'bottom-center', 'bottom-right',
                ].includes(value),
            },
        },

        data() {
            return {
                notifications: [],
            };
        },

        computed: {
            wrapperPlacementClassName() {
                if (this.placement.includes('top')) {
                    return 'items-start';
                }

                return 'items-end';
            },

            placementClassName() {
                if (this.placement.includes('left')) {
                    return 'flex justify-center sm:justify-start';
                }

                if (this.placement.includes('right')) {
                    return 'flex justify-center sm:justify-end';
                }

                return 'flex justify-center';
            },
        },

        methods: {
            add(notification) {
                if (notification.placement !== this.placement) {
                    return;
                }

                this.notifications.push(notification);
                this.deferHide(notification);
            },

            remove(notification) {
                const id = typeof notification === 'object' ? notification.id : notification;
                const index = this.notifications.findIndex(notification => {
                    return notification.id === id;
                });

                if (index !== -1) {
                    this.notifications.splice(index, 1);
                }
            },

            deferHide(notification) {
                if (!notification.timeout) {
                    return;
                }

                setTimeout(() => {
                    this.remove(notification);
                }, notification.timeout);
            },
        },

        mounted() {
            this.$notify.event.$on('show', this.add);
            this.$notify.event.$on('hide', this.remove);
        },

        beforeDestroy() {
            this.$notify.event.$off('show', this.add);
            this.$notify.event.$off('hide', this.remove);
        },
    };
</script>
