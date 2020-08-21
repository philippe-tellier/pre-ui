import { randomString } from './utils.js';

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
                const self = this;
                const notification = {
                    ...defaults.notifications,
                    ...options,
                    id: randomString(),
                    hide() {
                        self.event.$emit('hide', this.id);
                    },
                };

                this.event.$emit('show', notification);

                return notification;
            },

            info(message, options) {
                return this.show({ ...options, message, type: 'info' });
            },

            success(message, options) {
                return this.show({ ...options, message, type: 'success' });
            },

            warning(message, options) {
                return this.show({ ...options, message, type: 'warning' });
            },

            error(message, options) {
                return this.show({ ...options, message, type: 'error' });
            },
        };

        Vue.prototype.$notify = notify;
        Vue.notify = notify;
    },
};
