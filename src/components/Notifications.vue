<template>
    <div v-bind="$attrs" class="fixed inset-0 pointer-events-none">
        <slot :notifications="notifications" :on-remove="remove" />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                notifications: [],
            };
        },

        methods: {
            add(props) {
                // The "setTimeout" ensures uniqueness of the id.
                setTimeout(() => {
                    const notification = { ...props, id: Date.now() };

                    this.notifications.push(notification);
                    this.deferHide(notification);
                }, 1);
            },

            remove({ id }) {
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
        },
    };
</script>
