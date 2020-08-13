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

            show(options) {
                event.$emit('show', {
                    ...defaults,
                    ...options,
                });
            },

            info(message, options) {
                this.show({ ...options, message, type: 'info' });
            },

            success(message, options) {
                this.show({ ...options, message, type: 'success' });
            },

            warning(message, options) {
                this.show({ ...options, message, type: 'warning' });
            },

            error(message, options) {
                this.show({ ...options, message, type: 'error' });
            },
        };

        Vue.prototype.$notify = notify;
        Vue.notify = notify;
    },
};
