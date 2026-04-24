/**
 * Timestamp CLI Tool
 * Shows current timestamps and date conversions
 * 
 * Usage: run timestamp [unix timestamp]
 * Example: run timestamp
 *         run timestamp 1704067200
 */

function runTimestamp(args) {
    const now = new Date();
    
    if (!args || args.length === 0) {
        // Show current timestamps
        terminal.print('Timestamp', 'section');
        terminal.print('Current Time:', 'highlight');
        terminal.print(now.toISOString(), 'text');
        terminal.print('');
        terminal.print('Unix (seconds): ' + Math.floor(now.getTime() / 1000), 'text');
        terminal.print('Unix (ms):     ' + now.getTime(), 'text');
        terminal.print('UTC:          ' + now.toUTCString(), 'text');
        terminal.print('Local:         ' + now.toLocaleString(), 'text');
        terminal.print('');
        terminal.print('Usage: run timestamp [unix]', 'dim');
        return;
    }

    // Convert from Unix timestamp
    const input = args[0];
    let timestamp;

    if (/^\d{10}$/.test(input)) {
        timestamp = parseInt(input) * 1000;
    } else if (/^\d{13}$/.test(input)) {
        timestamp = parseInt(input);
    } else {
        terminal.print('Invalid timestamp (use 10 or 13 digits)', 'error');
        return;
    }

    const date = new Date(timestamp);

    terminal.print('Timestamp', 'section');
    terminal.print('Input: ' + input, 'dim');
    terminal.print('');
    terminal.print('Unix (seconds): ' + Math.floor(timestamp / 1000), 'highlight');
    terminal.print('Unix (ms):     ' + timestamp, 'highlight');
    terminal.print('UTC:            ' + date.toISOString(), 'text');
    terminal.print('Local:          ' + date.toLocaleString(), 'text');
}