/**
 * Hex Convert CLI Tool
 * Convert between decimal, hex, and binary
 * 
 * Usage: run hex-convert [number]
 * Example: run hex-convert 255
 *         run hex-convert 0xFF
 *         run hex-convert 11111111
 */

function runHexConvert(args) {
    if (!args || args.length === 0) {
        terminal.print('Hex Convert', 'section');
        terminal.print('Usage: run hex-convert [number]', 'dim');
        terminal.print('Example: run hex-convert 255', 'dim');
        terminal.print('        run hex-convert 0xFF', 'dim');
        terminal.print('        run hex-convert 11111111', 'dim');
        return;
    }

    const input = args[0];
    let num;

    // Detect input format and convert
    if (input.startsWith('0x') || input.startsWith('0X')) {
        // Hex
        num = parseInt(input, 16);
    } else if (/^[01]+$/.test(input) && input.length <= 32) {
        // Binary
        num = parseInt(input, 2);
    } else if (/^\d+$/.test(input)) {
        // Decimal
        num = parseInt(input, 10);
    } else {
        terminal.print('Invalid number format', 'error');
        return;
    }

    if (isNaN(num)) {
        terminal.print('Invalid number', 'error');
        return;
    }

    // Convert to all formats
    const decimal = num;
    const hex = '0x' + num.toString(16).toUpperCase();
    const binary = num.toString(2);
    const octal = num.toString(8);

    terminal.print('Hex Convert', 'section');
    terminal.print('Input: ' + input, 'dim');
    terminal.print('');
    terminal.print('Decimal: ' + decimal, 'highlight');
    terminal.print('Hex:    ' + hex, 'text');
    terminal.print('Binary: ' + binary, 'text');
    terminal.print('Octal:  ' + octal, 'text');
}