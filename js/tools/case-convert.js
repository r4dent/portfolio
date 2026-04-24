/**
 * Case Convert CLI Tool
 * Convert text to UPPER, lower, or Title Case
 * 
 * Usage: run case-convert [mode] [text]
 * Example: run case-convert upper hello world
 *         run case-convert lower Hello World
 *         run case-convert title hello world
 */

function runCaseConvert(args) {
    if (!args || args.length === 0) {
        terminal.print('Case Convert', 'section');
        terminal.print('Usage: run case-convert [mode] [text]', 'dim');
        terminal.print('Modes: upper, lower, title', 'dim');
        terminal.print('Example: run case-convert upper hello', 'dim');
        return;
    }

    const mode = args[0].toLowerCase();
    const text = args.slice(1).join(' ');

    if (!text) {
        terminal.print('Usage: run case-convert [mode] [text]', 'error');
        return;
    }

    let result;

    if (mode === 'upper') {
        result = text.toUpperCase();
    } else if (mode === 'lower') {
        result = text.toLowerCase();
    } else if (mode === 'title') {
        result = text.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    } else {
        terminal.print('Mode must be: upper, lower, or title', 'error');
        return;
    }

    terminal.print('Case Convert', 'section');
    terminal.print('Input:  ' + text, 'dim');
    terminal.print('Output: ' + result, 'highlight');
}