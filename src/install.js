export default {
    install(Vue) {
        if (this.installed) {
            return;
        }

        this.installed = true;

        const event = new Vue();
        const defaults = {
            type: 'info',
            timeout: 5000,
        };
        const notify = {
            get event() {
                return event;
            },

            show({ type = 'info', title = '', message }) {
                event.$emit('show', {
                    ...defaults,
                    type,
                    title,
                    message,
                });
            },

            info(message, title) {
                this.show({ type: 'info', title, message });
            },

            success(message, title) {
                this.show({ type: 'success', title, message });
            },

            warning(message, title) {
                this.show({ type: 'warning', title, message });
            },

            error(message, title) {
                this.show({ type: 'error', title, message });
            },
        };

        Vue.prototype.$notify = notify;
        Vue.notify = notify;
    },
};
