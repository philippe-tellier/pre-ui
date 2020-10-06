/* eslint-disable import/prefer-default-export */
export function randomString(length = 8, value = '') {
    value += Math.random().toString(20).substr(2, length);

    if (value.length >= length) {
        return value.slice(0, length);
    }

    return randomString(length, value);
}
