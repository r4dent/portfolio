/**
 * Whoami Info CLI Tool
 * Shows current user information (simulated)
 * 
 * Usage: run whoami-info
 */

function runWhoamiInfo() {
    const hostname = window.location.hostname || 'unknown';
    const username = 'user';
    
    terminal.print('User Information', 'section');
    terminal.print('');
    terminal.print('Username: ' + username, 'highlight');
    terminal.print('Hostname: ' + hostname.replace(/^www\./, ''), 'text');
    terminal.print('Domain: N/A (browser context)', 'text');
    terminal.print('');
    terminal.print('Note: Actual AD user info requires server-side query', 'dim');
}