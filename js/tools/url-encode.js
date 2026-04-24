/**
 * URL Encode CLI Tool
 * Encode or decode URL
 * 
 * Usage: run url-encode encode [text]
 *        run url-encode decode [URL encoded text]
 * Example: run url-encode encode Hello World
 *         run url-encode decode Hello%20World
 */

function runUrlEncode(args) {
    if (!args || args.length === 0) {
        terminal.print('URL Encode', 'section');
        terminal.print('Usage: run url-encode encode [text]', 'dim');
        terminal.print('       run url-encode decode [text]', 'dim');
        terminal.print('Example: run url-encode encode Hello World', 'dim');
        return;
    }

    const operation = args[0].toLowerCase();
    const text = args.slice(1).join(' ');

    if (!text) {
        terminal.print('Usage: run url-encode encode [text] or decode [text]', 'error');
        return;
    }

    if (operation === 'encode') {
        const encoded = encodeURIComponent(text);
        terminal.print('URL Encode', 'section');
        terminal.print('Encoded: ' + encoded, 'highlight');
    } else if (operation === 'decode') {
        try {
            const decoded = decodeURIComponent(text);
            terminal.print('URL Encode', 'section');
            terminal.print('Decoded: ' + decoded, 'highlight');
        } catch (e) {
            terminal.print('Error: Invalid URL encoded string', 'error');
        }
    } else {
        terminal.print('Usage: run url-encode encode [text] or decode [text]', 'error');
    }
}