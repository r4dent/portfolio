/**
 * Random CLI Tool
 * Generates random numbers or UUIDs
 * 
 * Usage: run random [min] [max] or run random uuid
 * Example: run random 1 100
 *         run random uuid
 */

function runRandom(args) {
    if (!args || args.length === 0) {
        // Default: random number 1-100
        const num = Math.floor(Math.random() * 100) + 1;
        terminal.print('Random', 'section');
        terminal.print('Number: ' + num, 'highlight');
        terminal.print('');
        terminal.print('Usage: run random [min] [max]', 'dim');
        terminal.print('Or: run random uuid', 'dim');
        return;
    }

    if (args[0] === 'uuid') {
        // Generate UUID
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        terminal.print('Random', 'section');
        terminal.print('UUID: ' + uuid, 'highlight');
        return;
    }

    // Random number in range
    let min = parseInt(args[0]);
    let max = parseInt(args[1]);

    if (isNaN(min)) min = 1;
    if (isNaN(max)) max = 100;
    
    if (min > max) {
        const temp = min;
        min = max;
        max = temp;
    }

    const num = Math.floor(Math.random() * (max - min + 1)) + min;

    terminal.print('Random', 'section');
    terminal.print('Number: ' + num, 'highlight');
    terminal.print('Range: ' + min + ' to ' + max, 'dim');
}