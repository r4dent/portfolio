/**
 * IP Info CLI Tool
 * Shows local network information
 * 
 * Usage: run ip-info
 */

function runIpInfo() {
    const hostname = window.location.hostname || 'unknown';
    const protocol = window.location.protocol;
    const port = window.location.port || (protocol === 'https:' ? '443' : '80');
    const path = window.location.pathname;

    terminal.print('Network Info', 'section');
    terminal.print('');
    terminal.print('Current Page:', 'highlight');
    terminal.print('  Protocol: ' + protocol.replace(':', ''), 'text');
    terminal.print('  Hostname: ' + hostname, 'text');
    terminal.print('  Port: ' + port, 'text');
    terminal.print('  Path: ' + path, 'text');
    terminal.print('');
    terminal.print('Note: Local IP not available in browser', 'dim');
    terminal.print('      Use "public-ip" for external IP', 'dim');
}