/* eslint-disable import/prefer-default-export */
export function insertAtCaret(el, text) {
    text = text || '';

    if (document.selection) {
        // IE
        el.focus();

        const sel = document.selection.createRange();
        sel.text = text;

        el.focus();
    } else if (el.selectionStart || el.selectionStart === 0) {
        // Others
        const startPos = el.selectionStart;
        const scrollTop = el.scrollTop;

        el.focus();
        document.execCommand('insertText', false, text);

        el.selectionStart = startPos + text.length;
        el.selectionEnd = startPos + text.length;
        el.scrollTop = scrollTop;
    } else {
        el.value += text;
        el.focus();
    }
}
