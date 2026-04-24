/**
 * Base64 CLI Tool
 * Encode or decode Base64
 * 
 * Usage: run base64 encode [text]
 *        run base64 decode [base64 text]
 * Example: run base64 encode Hello
 *         run base64 decode SGVsbG8=
 */

function runBase64(args) {
    if (!args || args.length === 0) {
        terminal.print('Base64', 'section');
        terminal.print('Usage: run base64 encode [text]', 'dim');
        terminal.print('       run base64 decode [base64]', 'dim');
        terminal.print('Example: run base64 encode Hello', 'dim');
        terminal.print('        run base64 decode SGVsbG8=', 'dim');
        return;
    }

    const operation = args[0].toLowerCase();
    const text = args.slice(1).join(' ');

    if (!text) {
        terminal.print('Base64', 'section');
        terminal.print('Usage: run base64 encode [text]', 'dim');
        terminal.print('       run base64 decode [base64]', 'dim');
        return;
    }

    if (operation === 'encode') {
        try {
            const encoded = btoa(text);
            terminal.print('Base64', 'section');
            terminal.print('Encoded: ' + encoded, 'highlight');
        } catch (e) {
            terminal.print('Error: Text contains invalid characters', 'error');
        }
    } else if (operation === 'decode') {
        try {
            const decoded = atob(text);
            terminal.print('Base64', 'section');
            terminal.print('Decoded: ' + decoded, 'highlight');
        } catch (e) {
            terminal.print('Error: Invalid Base64 string', 'error');
        }
    } else {
        terminal.print('Usage: run base64 encode [text] or decode [base64]', 'error');
    }
}