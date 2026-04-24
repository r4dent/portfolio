/**
 * ASCII Table CLI Tool
 * Shows ASCII character table
 * 
 * Usage: run ascii-table [start] [end]
 * Example: run ascii-table 48 57
 */

function runAsciiTable(args) {
    let start = 33;
    let end = 126;

    if (args && args.length >= 2) {
        start = parseInt(args[0]);
        end = parseInt(args[1]);
    }

    if (isNaN(start) || isNaN(end) || start < 0 || end > 255 || start > end) {
        terminal.print('ASCII Table', 'section');
        terminal.print('Usage: run ascii-table [start] [end]', 'dim');
        terminal.print('Default: 33-126 (printable chars)', 'dim');
        return;
    }

    terminal.print('ASCII Table', 'section');
    terminal.print('Code  Char', 'dim');
    terminal.print('----  ----', 'dim');

    for (let i = start; i <= end; i++) {
        let char = String.fromCharCode(i);
        if (i < 32 || i === 127) char = '?';
        terminal.print('  ' + String(i).padStart(3) + '   ' + char, 'text');
    }
}