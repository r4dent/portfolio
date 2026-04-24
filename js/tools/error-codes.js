/**
 * Error Codes CLI Tool
 * Lookup common Windows and HTTP error codes
 * 
 * Usage: run error-codes [code]
 * Example: run error-codes 0x80070005
 */

function runErrorCodes(args) {
    const errors = [
        { code: '0x80070005', name: 'Access Denied', desc: 'Insufficient permissions' },
        { code: '0x8007000E', name: 'Out of Memory', desc: 'System resources exhausted' },
        { code: '0x80070020', name: 'The process cannot access', desc: 'File in use' },
        { code: '0x80070490', name: 'Element not found', desc: 'Registry/service not found' },
        { code: '0x80004005', name: 'Unspecified error', desc: 'Generic error' },
        { code: '0x80070035', name: 'Network path not found', desc: 'SMB share unreachable' },
        { code: '0x80070057', name: 'Parameter is incorrect', desc: 'Bad argument' },
        { code: '0x800706BE', name: 'RPC call failed', desc: 'Remote procedure error' },
        { code: '0x80072EE2', name: 'Windows Update error', desc: 'Update service unreachable' },
        { code: '0x80072EFD', name: 'HTTPS not supported', desc: 'WinHTTP not configured' },
        { code: '0x800C0008', name: 'Not found', desc: 'Download/file not found' },
        { code: '0x80072EE7', name: 'Server not found', desc: 'DNS resolution failed' },
        { code: '0x8007001B', name: 'Time offset in hours', desc: 'Clock sync issue' },
        { code: '0x800700A8', name: 'Map drive already used', desc: 'Network drive conflict' },
        { code: '0x80072030', name: 'Invalid LDAP dn', desc: 'LDAP query syntax error' },
        { code: '139', name: 'Invalid network handle', desc: 'SMB connection issue' },
        { code: '121', name: 'Semaphore timeout', desc: 'Network timeout' },
        { code: '53', name: 'Network path not found', desc: 'NetBIOS name not found' },
        { code: '65', name: 'Network access denied', desc: 'Share permissions issue' },
        { code: '1234', name: 'Site terminated by heartbeat', desc: 'Server shutdown' }
    ];

    const httpErrors = [
        { code: '200', name: 'OK', desc: 'Request successful' },
        { code: '301', name: 'Moved Permanently', desc: 'Redirect to new URL' },
        { code: '302', name: 'Found', desc: 'Temporary redirect' },
        { code: '400', name: 'Bad Request', desc: 'Malformed request' },
        { code: '401', name: 'Unauthorized', desc: 'Authentication required' },
        { code: '403', name: 'Forbidden', desc: 'Access denied' },
        { code: '404', name: 'Not Found', desc: 'Resource missing' },
        { code: '500', name: 'Internal Server Error', desc: 'Server-side failure' },
        { code: '502', name: 'Bad Gateway', desc: 'Proxy/gateway error' },
        { code: '503', name: 'Service Unavailable', desc: 'Server overloaded' },
        { code: '504', name: 'Gateway Timeout', desc: 'Upstream timeout' }
    ];

    terminal.print('Error Codes Reference', 'section');
    terminal.print('');

    if (!args || args.length === 0) {
        terminal.print('Windows Errors:', 'highlight');
        errors.slice(0, 10).forEach(e => {
            terminal.print('  ' + e.code.padEnd(15) + e.name, 'text');
        });
        terminal.print('');
        terminal.print('HTTP Status Codes:', 'highlight');
        httpErrors.forEach(e => {
            terminal.print('  ' + e.code.padEnd(5) + e.name.padEnd(22) + e.desc, 'text');
        });
        terminal.print('');
        terminal.print('Usage: run error-codes [code]', 'dim');
        return;
    }

    const search = args.join(' ').toLowerCase();

    const winMatch = errors.filter(e => 
        e.code.toLowerCase().includes(search) ||
        e.name.toLowerCase().includes(search)
    );

    const httpMatch = httpErrors.filter(e =>
        e.code.includes(search) ||
        e.name.toLowerCase().includes(search)
    );

    if (winMatch.length > 0) {
        terminal.print('Windows Errors:', 'highlight');
        winMatch.forEach(e => {
            terminal.print('  ' + e.code.padEnd(15) + e.name, 'text');
            terminal.print('    ' + e.desc, 'dim');
        });
    }

    if (httpMatch.length > 0) {
        terminal.print('HTTP Errors:', 'highlight');
        httpMatch.forEach(e => {
            terminal.print('  ' + e.code.padEnd(5) + e.name, 'text');
            terminal.print('    ' + e.desc, 'dim');
        });
    }

    if (winMatch.length === 0 && httpMatch.length === 0) {
        terminal.print('No matching error codes found', 'dim');
    }
}