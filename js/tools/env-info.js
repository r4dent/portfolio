/**
 * Env Info CLI Tool
 * Shows browser and environment information
 * 
 * Usage: run env-info
 */

function runEnvInfo() {
    terminal.print('Environment Info', 'section');
    terminal.print('');

    terminal.print('Browser:', 'highlight');
    terminal.print('  User Agent: ' + navigator.userAgent, 'text');
    terminal.print('  Language: ' + navigator.language, 'text');
    terminal.print('  Cookies: ' + (navigator.cookieEnabled ? 'Enabled' : 'Disabled'), 'text');
    terminal.print('  Online: ' + (navigator.onLine ? 'Yes' : 'No'), 'text');
    terminal.print('');

    terminal.print('Display:', 'highlight');
    terminal.print('  Width: ' + screen.width + 'px', 'text');
    terminal.print('  Height: ' + screen.height + 'px', 'text');
    terminal.print('  Color Depth: ' + screen.colorDepth + ' bits', 'text');
    terminal.print('');

    terminal.print('Window:', 'highlight');
    terminal.print('  Inner Width: ' + window.innerWidth + 'px', 'text');
    terminal.print('  Inner Height: ' + window.innerHeight + 'px', 'text');

    if (typeof window.devicePixelRatio !== 'undefined') {
        terminal.print('  Pixel Ratio: ' + window.devicePixelRatio, 'text');
    }
}