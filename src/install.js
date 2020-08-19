export default {
    install(Vue, { notifications = {} } = {}) {
        if (this.installed) {
            return;
        }

        this.installed = true;

        const defaults = {
            notifications: {
                type: 'info',
                timeout: 5000,
                placement: 'top-right',
                ...notifications,
            },
        };

        const notify = {
            get event() {
                if (!this._event) {
                    this._event = new Vue();
                }

                return this._event;
            },

            show(options) {
                this.event.$emit('show', {
                    ...defaults.notifications,
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
